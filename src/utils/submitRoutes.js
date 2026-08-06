import { SUBMIT_PROGRESS_STEPS } from '../assets/data/progressSteps';

export const SUBMIT_ROUTE_BASE = '/submit';
export const SCREENSHOT_SUBMIT_ROUTE_BASE = '/screenshot/submit';

export function getSubmitPaths(routeBase = SUBMIT_ROUTE_BASE) {
  return {
    details: `${routeBase}/details`,
    upload: `${routeBase}/upload`,
    parameters: `${routeBase}/parameters`,
  };
}

export function getSubmitProgressSteps(routeBase = SUBMIT_ROUTE_BASE) {
  return SUBMIT_PROGRESS_STEPS.map((step) => ({
    ...step,
    path: step.path.replace(SUBMIT_ROUTE_BASE, routeBase),
  }));
}
