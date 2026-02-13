// Generates a pseudo-unique string using a prefix, current timestamp,
// and a random alphanumeric suffix.
// Useful for creating unique test data (e.g., usernames, workspace names)
// to avoid collisions between test runs.

export function uniqueString(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
}
