import { inputParams, outputParams } from "./params";

/** Short labels aligned with the PDF report; fall back to params.definition */
const INPUT_CHANNEL_LABELS = {
  eeg_c3: "EEG (C3)",
  eeg_c4: "EEG (C4)",
  eog_loc: "EOG (Left)",
  eog_roc: "EOG (Right)",
  emg_chin: "EMG (Chin)",
  abdomen: "Abdominal Belt",
  spo2: "SpO₂",
};

const inputDefinitionByName = Object.fromEntries(
  inputParams.map((p) => [p.name, p.definition])
);

const outputDefinitionByName = Object.fromEntries(
  outputParams.map((p) => [p.name, p.definition])
);

export const REPORT_OUTPUT_PARAMETER_LABELS = {
  sleep_stage_5: "Sleep Staging (5-class)",
  sleep_stage_3: "Sleep Staging (3-class)",
  ahi: "Apnea-Hypopnea Index (AHI)",
  arousal_index: "Arousal Index",
  osa_severity: "OSA Severity",
};

export function getInputChannelLabel(key) {
  if (!key) return "";
  return INPUT_CHANNEL_LABELS[key] || inputDefinitionByName[key] || key;
}

export function getOutputParameterLabel(key) {
  if (!key) return "";
  if (REPORT_OUTPUT_PARAMETER_LABELS[key]) return REPORT_OUTPUT_PARAMETER_LABELS[key];
  const def = outputDefinitionByName[key];
  if (def) {
    const trimmed = def.split(" *")[0].trim();
    return trimmed.length > 96 ? `${trimmed.slice(0, 93)}…` : trimmed;
  }
  return key;
}

/** Section titles: use polished label when defined, else UPPER_CASE key */
export function getOutputParameterLabelForReport(parameter) {
  if (!parameter) return "";
  const label = getOutputParameterLabel(parameter);
  return label !== parameter ? label : parameter.toUpperCase();
}

export function formatChannelLabelList(keys, getLabel) {
  if (!Array.isArray(keys) || keys.length === 0) return "";
  return keys.map(getLabel).join(", ");
}
