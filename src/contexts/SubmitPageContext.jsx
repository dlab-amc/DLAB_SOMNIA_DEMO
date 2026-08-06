import React, { createContext, useContext, useMemo } from 'react';
import {
  getSubmitPaths,
  getSubmitProgressSteps,
  SCREENSHOT_SUBMIT_ROUTE_BASE,
  SUBMIT_ROUTE_BASE,
} from '../utils/submitRoutes';

const defaultContextValue = {
  screenshotMode: false,
  routeBase: SUBMIT_ROUTE_BASE,
  paths: getSubmitPaths(SUBMIT_ROUTE_BASE),
  progressSteps: getSubmitProgressSteps(SUBMIT_ROUTE_BASE),
};

const SubmitPageContext = createContext(defaultContextValue);

export function SubmitPageProvider({
  children,
  screenshotMode = false,
  routeBase = SUBMIT_ROUTE_BASE,
}) {
  const value = useMemo(
    () => ({
      screenshotMode,
      routeBase,
      paths: getSubmitPaths(routeBase),
      progressSteps: getSubmitProgressSteps(routeBase),
    }),
    [screenshotMode, routeBase]
  );

  return (
    <SubmitPageContext.Provider value={value}>
      {children}
    </SubmitPageContext.Provider>
  );
}

export function useSubmitPage() {
  return useContext(SubmitPageContext);
}

export { SCREENSHOT_SUBMIT_ROUTE_BASE, SUBMIT_ROUTE_BASE };
