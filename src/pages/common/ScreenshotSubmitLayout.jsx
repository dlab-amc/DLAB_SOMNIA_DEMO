import { SubmitLayout } from './SubmitLayout';
import {
  SubmitPageProvider,
  SCREENSHOT_SUBMIT_ROUTE_BASE,
} from '../../contexts/SubmitPageContext';

export const ScreenshotSubmitLayout = () => (
  <SubmitPageProvider
    screenshotMode
    routeBase={SCREENSHOT_SUBMIT_ROUTE_BASE}
  >
    <SubmitLayout />
  </SubmitPageProvider>
);
