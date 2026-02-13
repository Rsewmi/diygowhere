export type User = {
  email: string;
};

export const users: Record<string, User> = {
  standardUser: {
    email: process.env.STANDARD_USER_EMAIL || '',
  }
};      