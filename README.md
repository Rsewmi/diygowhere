# 🎭 DIYGoWhere Site Builder Automation Suite (Node.js + TypeScript)

## Overview

This repository contains a robust, scalable, and type-safe End-to-End (E2E) automation framework built with Playwright and TypeScript. The suite is specifically designed to validate the DIYGoWhere Site Builder, covering the user journey from authentication to complex canvas interactions.

---

## Key Objectives

The framework is built for scalability and maintainability, moving away from legacy automation scripts toward a modern, event-driven architecture.

- **Page Object Model (POM)**: Encapsulates UI logic within src/pages/, ensuring that tests remain readable and resilient to UI changes.
- **Fixture-Based Dependency Injection**: Instead of traditional beforeEach hooks, this suite leverages custom Playwright fixtures (src/fixtures/). This provides:
  - **Smart Preconditions (Fixture Chaining)**: Replaces long, complex beforeEach blocks with modular fixtures. This allows different test states to be "chained" together—for example, a `loggedUser` fixture can automatically trigger a `canvasReady` fixture. This architecture is highly scalable, enabling the creation of tests with complex starting conditions without code duplication.
- **Centralized Constants & Data**: All configuration values (URLs, styles, component names) are centralized in `src/common/` and `src/data/` using TypeScript as const for full type safety.

---

## Technical Highlights

- ### Advanced Canvas Interactions
Unlike standard web forms, site builders require precise interactions. The `dragAndDropComponentToCanvas` method calculates the **bounding box** of the canvas to ensure components are placed accurately, overcoming the common flakiness of default "center-point" drag actions.

- ### Multi-Environment Orchestration
The suite is configured for seamless switching between **Dev** and **UAT** environments and can be scaled to any additional environments via `playwright.config.ts`. It utilizes `dotenv` for secure management of environment-specific credentials.

- ### Intelligence in Execution
  - **Worker Serialization**: Configured to `workers: 1` to ensure stable session handling in the environment, preventing session collisions.
  - **Web-First Assertions**: Leverages Playwright’s auto-waiting and actionability checks to eliminate the need for brittle manual waits (e.g., `Thread.sleep`).

---

## Project Structure

```text
├── src
│   ├── pages        # Page Objects (UI locators and actions)
│   ├── data         # Test data and user definitions
│   ├── fixtures     # Playwright fixtures and dependency wiring
│   └── common       # Reusable utilities (authentication, helpers, constants)
├── tests            # Test scenarios
├── playwright.config.ts
├── package.json
└── .env
```

---

## Strategic Roadmap & Scalability

- ### Functional Flow Layer
  A planned structural improvement is to implement a `flows/` layer to handle multi-step functional sequences. By abstracting complex logic away from the `tests/` directory, the spec files remain strictly focused on assertions. This separation of concerns simplifies long-term maintenance, as changes to a multi-stage process would only require updates in a single file rather than across multiple test cases.

- ### Shift-Left & API-Accelerated Setups
  Future iterations should prioritize a Shift-Left approach to quality by moving core logic coverage to Unit and Integration layers. To optimize the E2E suite, the framework can be enhanced to use direct API calls for state injection (such as creating a site via a POST request or login) instead of relying on UI-driven setup steps. This transition would significantly decrease execution time and increase test reliability by focusing UI-level testing strictly on front-end interactions and user behavior.

- ### Automated Test Data Cleanup (Teardown)
  A planned enhancement includes the implementation of a centralized teardown mechanism to programmatically delete entities, such as workspaces or sites, upon test completion. Utilizing API-driven cleanup ensures consistent environment conditions for every run and prevents data accumulation. This approach maintains the integrity of the test environment and reduces the manual overhead required for data maintenance.

---

## Environment Configuration

Sensitive data such as credentials are stored in a `.env.${environment}` file.
The `${environment}` variable supports values such as `qa`, `dev`, `prod` or `uat`

```env
STANDARD_USER_EMAIL=your_email@gov.sg
```

- `.env` is ignored from version control
- Environment variables are loaded once in `playwright.config.ts`
- Accessed throughout the framework using `process.env`

---

## Reporting
The framework is configured to provide detailed diagnostic data to speed up root-cause analysis:
  - **HTML Reporting**: Every run generates a standalone HTML report providing a step-by-step breakdown of execution logs, durations, and failure points.
  - **Automated Artifact Generation**: The current setup uses `trace: 'retain-on-failure'` to ensure any unsuccessful test generates a debug trace. This allows for a full review of the DOM, network traffic, and console logs at the exact moment of failure.
  - **Visual Verification Mode**: For this submission, reporting is supported by `headed` execution and `slowMo` settings. This ensures the visual state of the Site Builder canvas is easy to follow, providing clear context to the logs in the final report.
  - **CI-Optimized Artifact Strategy**: The `playwright.config.ts` is structured to toggle traces, screenshots, and videos to `on-first-retry` when running in a pipeline. This provides visibility into flaky tests while keeping CI runner storage efficient by ignoring passing runs.

---

## Running the Tests

Install dependencies:
```bash
npm install
npx playwright install
```
Run all tests:
```bash
npx playwright test
```
Run in UI mode:
```bash
npx playwright test --headed
```
Run in specific environemt: Eg:uat
```bash
npx playwright test --project=uat --headed
```

---

## Engineering Design Choices

### Learning Agility & Tech Stack Transition
  While I bring 8+ years of experience in the Java/Selenium and Kotlin ecosystem, I intentionally chose to implement this suite using Playwright and TypeScript.

  My goal was to demonstrate rapid technical pivot and mastery of a modern stack. In less than a week, I deep-dived into Playwright-native patterns to ensure the implementation follows industry best practices:
  - **Dependency Injection via Fixtures**: Moving away from linear hooks to modular, isolated test contexts.
  - **Asynchronous Architecture**: Leveraging Playwright’s native async/await driven events, ensuring the framework handles UI state changes more reliably than legacy blocking drivers.
