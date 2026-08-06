/** This package is the static UI demo — always on. */
export function isDemoMode() {
  return true;
}

export const DEMO_BACKEND_URL =
  process.env.REACT_APP_ENDPOINT_URL || 'https://demo.local';
