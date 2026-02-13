// Centralized route definitions for the app.
// Using `as const` ensures values are treated as literal types,
// helping with type safety and preventing accidental changes.

export const URLS = {
    LOGIN_PAGE: '/',   
    DASHBOARD_PAGE: '/dashboard',
    WORKSPACE_PAGE: 'v2/workspace/new',
    EDITOR_PAGE: 'v2/workspace',
} as const;