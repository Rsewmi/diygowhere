// Centralized test exports.
// Wraps a custom user-state fixture as the default `test`
// and re-exports Playwright's `expect` for convenience.

export {userStateTest as test} from './user-state.fixture';
export { expect } from '@playwright/test';