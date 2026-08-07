import { VALIDATION_OK } from './fixtures';

/** Prefill values so the demo submit wizard is click-through only. */
export const DEMO_SUBMIT_INFO = {
  submitTitle: 'Sleep Stage 5 Classification (Demo)',
  submitDescription:
    'Pre-filled demo submission for the GitHub Pages walkthrough. Click Next / Submit to continue.',
};

/** Adult subgroup labels match ADULT_SUBGROUP_OPTIONS in ageCohort.js */
export const DEMO_SUBGROUPS = ['BMI', 'Severity', 'Race'];

export const DEMO_MANUAL_SAMPLE_SIZE = '128';

/** Tiny placeholder zip — mock validation ignores contents. */
export function createDemoZipFile() {
  const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]);
  return new File([bytes], 'demo_submit.zip', {
    type: 'application/zip',
    lastModified: Date.now(),
  });
}

export function getDemoValidationPaths() {
  return VALIDATION_OK.data.paths;
}
