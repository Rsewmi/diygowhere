// User type definition and test user configuration.
// Environment variables are used for credentials to support
// secure, environment-specific test execution.

export type User = {
  email: string;
};

export const users: Record<string, User> = {
  standardUser: {
    email: process.env.STANDARD_USER_EMAIL || '',
  }
};      