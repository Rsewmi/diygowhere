import { objectTest } from './object.fixture';
import {users} from '../data/user.data';

// Authentication fixture layer.
// Automates login and establishes a reusable logged-in state,
// enabling faster and more maintainable end-to-end tests.

type UserStateFixtures = {
  loggedUser: void;
};

export const userStateTest = objectTest.extend<UserStateFixtures>({
  loggedUser: async ({ loginPage }, use) => {   
    await loginPage.goto();
    await loginPage.clickLoginButton();
    await loginPage.enterEmail("test_sewmi@gowhere.gov.sg");
    await loginPage.clickSecondaryLoginButton();
    await use();
  },
});