# 🎭 DIYGoWhere Site Builder Automation Suite (Node.js + TypeScript)

## Overview

This repository contains a robust, scalable, and type-safe End-to-End (E2E) automation framework built with Playwright and TypeScript. The suite is specifically designed to validate the DIYGoWhere Site Builder, covering the user journey from authentication to complex canvas interactions.

---

## Key Objectives

The framework is built for scalability and maintainability, moving away from legacy automation scripts toward a modern, event-driven architecture.

- **Page Object Model (POM)**: Encapsulates UI logic within src/pages/, ensuring that tests remain readable and resilient to UI changes.
- **Fixture-Based Dependency Injection**: Instead of traditional beforeEach hooks, this suite leverages custom Playwright fixtures (src/fixtures/). This provides:
  - **Total Test Isolation**: Every test gets a fresh, isolated context.
  - **Persistent Auth State**: The loggedUser fixture establishes authentication once, significantly speeding up the execution of the suite.
- **Centralized Constants & Data**: All configuration values (URLs, styles, component names) are centralized in `src/common/` and `src/data/` using TypeScript as const for full type safety.

---

## Technical Highlights

- ### Advanced Canvas Interactions
Unlike standard web forms, site builders require precise interactions. The `dragAndDropComponentToCanvas` method calculates the **bounding box** of the canvas to ensure components are placed accurately, overcoming the common flakiness of default "center-point" drag actions.

- ### Multi-Environment Orchestration
The suite is configured for seamless switching between **Dev** and **UAT** environments via `playwright.config.ts`. It utilizes `dotenv` for secure management of environment-specific credentials.

- ### Intelligence in Execution
  - **Worker Serialization**: Configured to `workers: 1` to ensure stable session handling in the UAT environment, preventing session collisions.
  - **Web-First Assertions**: Leverages Playwright’s auto-waiting and actionability checks to eliminate the need for brittle manual waits (e.g., `Thread.sleep`).

## Project Structure

```text
├── src
│   ├── pages        # Page Objects (UI locators and actions)
│   ├── data         # Test data and user definitions
│   ├── fixtures     # Playwright fixtures and dependency wiring
│   └── utils        # Reusable utilities (authentication, helpers)
├── tests            # Test scenarios
├── playwright.config.ts
├── package.json
└── .env
```

---

## Strategic Roadmap & Scalability

- ### Functional Flow Layer
  - **Abstraction**: Introducing a `flows/` directory to move multi-step functional logic out of the `tests/` layer.
  - **Benefit**: This keeps the test specs purely focused on assertions, making them easier for stakeholders to read and maintain.

- ### Shift-Left & API-Accelerated Setups
  I advocate for a Shift-Left approach to quality, where testing occurs as early as possible in the development lifecycle:
  - **Pyramid Optimization**: Moving forward, we should aim to cover core business logic through Unit and Integration tests first.
  - **API Setups**: For UI-level testing, we can use direct API calls to "inject" state (e.g., creating a site via a POST request) rather than navigating the UI. This reduces test execution time by 40-60% and limits UI testing to the actual front-end interactions.

- ### Automated Test Data Cleanup (Teardown)
  - **Environment Hygiene**: Introduce a centralized teardown mechanism to programmatically delete created entities (workspaces/sites) after test completion. This prevents "data bloat" in the UAT environment and ensures consistent test conditions for every run.

---

## Environment Configuration

Sensitive data such as credentials are stored in a `.env.uat` file.

```env
STANDARD_USER_EMAIL=your_email@gov.sg
```

- `.env` is ignored from version control
- Environment variables are loaded once in `playwright.config.ts`
- Accessed throughout the framework using `process.env`

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
Run in specific environemt:
```bash
npx playwright test --project=uat --headed
```

---

## Engineering Design Choices

### Learning Agility & Tech Stack Transition
  While I bring 8+ years of experience in the Java/Selenium and Kotlin ecosystem, I intentionally chose to implement this suite using Playwright and TypeScript.

  My goal was to demonstrate rapid technical pivot and mastery of a modern stack. In less than a week, I deep-dived into Playwright-native patterns to ensure the implementation follows industry best practices:
  - **Dependency Injection via Fixtures**: Moving away from linear hooks to modular, isolated test contexts.
  - **Asynchronous Event Handling**: Leveraging Playwright’s non-blocking architecture for faster execution.
