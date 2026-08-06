/** 연령군 · 연령대 (백엔드 PEDIATRIC_AGE_BANDS 와 동일 키) */

/** 성인: age > 18 / 소아·청소년: age ≤ 18 (백엔드 filter_docs_by_age_cohort 와 동일) */
export const ADULT_COHORT_LABEL_KO = '>18세 (성인)';
export const ADULT_COHORT_LABEL_EN = 'Age > 18 (Adult)';
export const PEDIATRIC_COHORT_LABEL_KO = '≤18세 (소아·청소년)';
export const PEDIATRIC_COHORT_LABEL_EN = 'Age ≤ 18 (Pediatric/Adolescent)';

/** 가이드·리포트 본문용 연령군 표기 (UI 선택 버튼 라벨과 구분) */
export const ADULT_AGE_GROUP_LABEL_KO = '성인군(>18세)';
export const PEDIATRIC_AGE_GROUP_LABEL_KO = '소아·청소년군(≤18세)';
export const ADULT_AGE_GROUP_LABEL_EN = 'adult group (age > 18)';
export const PEDIATRIC_AGE_GROUP_LABEL_EN = 'pediatric and adolescent group (age ≤ 18)';

export const PEDIATRIC_BANDS_GUIDE_LIST_KO = '4~12개월, 1–2세, 3–5세, 6–12세, 13–18세';
export const PEDIATRIC_BANDS_GUIDE_LIST_EN = '4–12 months, 1–2, 3–5, 6–12, and 13–18 years';

export const PEDIATRIC_BANDS_SUMMARY_KO =
  '4~12개월 영아, 1~2·3~5세 유아, 6~12세 아동, 13~18세 청소년';
export const PEDIATRIC_BANDS_SUMMARY_EN =
  'infants 4–12 months, children 1–2/3–5/6–12, adolescents 13–18';

/**
 * 성인 층화 무작위 추출 최소 표본 수.
 * BMI(2) × Severity(4) × Race(4) × Sex(2) = 64
 * (Age는 상단 연령군 선택으로 구분 — 층화 축에서 제외)
 */
export const MIN_STRATIFIED_SAMPLE_SIZE = 64;

export const formatMinStratifiedSampleKo = () =>
  `최소 ${MIN_STRATIFIED_SAMPLE_SIZE.toLocaleString('en-US')}개`;
export const formatMinStratifiedSampleEn = () =>
  `at least ${MIN_STRATIFIED_SAMPLE_SIZE}`;

/** 소아·청소년 연령대 (키는 백엔드 PEDIATRIC_AGE_BANDS 와 동일) */
export const PEDIATRIC_BAND_OPTIONS = [
  { id: '0_1', label: '4~12개월 영아', label_eng: 'Infants 4–12 months' },
  { id: '1_2', label: '1~2세 유아', label_eng: 'Early childhood ages 1–2' },
  { id: '3_5', label: '3~5세 유아', label_eng: 'Early childhood ages 3–5' },
  { id: '6_12', label: '6~12세 아동', label_eng: 'Children ages 6–12' },
  { id: '13_18', label: '13~18세 청소년', label_eng: 'Adolescents ages 13–18' },
];

/** 성인(>18) 연령군에서 선택 가능한 서브그룹 — Age는 상단 연령군 선택에서 이미 구분 */
export const ADULT_SUBGROUP_OPTIONS = ['BMI', 'Severity', 'Race'];

/** 성인 Race 서브그룹 (백엔드 VALUES_MAP.race 와 동일) */
export const RACE_SUBGROUP_VALUES = ['white', 'black', 'asian', 'other'];
export const RACE_SUBGROUP_LIST_EN = 'White, Black, Asian, Other';
export const RACE_SUBGROUP_LIST_KO = 'White, Black, Asian, Other';

export const RACE_DISPLAY_NAMES = {
  white: 'White',
  black: 'Black',
  asian: 'Asian',
  other: 'Other',
};

/** 성인군 샘플링 층화 축 — 리포트 서브그룹 선택과 무관하게 항상 적용 */
export const ADULT_STRATIFICATION_SUMMARY_KO =
  'BMI, OSA Severity, Race, Sex 기준 층화 무작위 추출 (2×4×4×2=64 조합)';
export const ADULT_STRATIFICATION_SUMMARY_EN =
  'Stratified random sampling by BMI, OSA severity, race, and sex (2×4×4×2=64 combinations)';

/** 소아·청소년군 샘플링 층화 축 — 리포트 서브그룹 선택과 무관하게 항상 적용 */
export const PEDIATRIC_STRATIFICATION_SUMMARY_KO =
  'OSA Severity, Sex 기준 층화 무작위 추출 (4×2=8 조합)';
export const PEDIATRIC_STRATIFICATION_SUMMARY_EN =
  'Stratified random sampling by OSA severity and sex (4×2=8 combinations)';

/** 제출 폼 연령군 선택 버튼 라벨 */
export const AGE_COHORT_BUTTON_LABEL_KO = {
  adult: '성인군',
  pediatric: '소아·청소년군',
};
export const AGE_COHORT_BUTTON_LABEL_EN = {
  adult: 'Adult group',
  pediatric: 'Pediatric and adolescent group',
};
export const AGE_COHORT_BUTTON_SUBLABEL_KO = {
  adult: '19세 이상',
  pediatric: '19세 미만',
};
export const AGE_COHORT_BUTTON_SUBLABEL_EN = {
  adult: 'Age 19 and older',
  pediatric: 'Under age 19',
};

export const PEDIATRIC_BAND_SELECTION_TOOLTIP_KO =
  '아래 5개 연령대 중 서로 인접한 하나 이상의 연령대를 선택할 수 있습니다.';
export const PEDIATRIC_BAND_SELECTION_TOOLTIP_EN =
  'You may select one or more adjacent age bands from the five options below.';

/** @deprecated use formatSampleSizeAdjustmentTooltip* */
export const formatSamplingTooltipKo = (stratSummary) => stratSummary;
/** @deprecated use formatSampleSizeAdjustmentTooltip* */
export const formatSamplingTooltipEn = (stratSummary) => stratSummary;

export const PEDIATRIC_AGE_RANGE_LABEL_KO = '연령 구간 선택';
export const PEDIATRIC_AGE_RANGE_LABEL_EN = 'Select age range';

/** @deprecated use PEDIATRIC_AGE_RANGE_LABEL_* */
export const PEDIATRIC_AGE_RANGE_SELECTION_NOTE_KO = PEDIATRIC_AGE_RANGE_LABEL_KO;
export const PEDIATRIC_AGE_RANGE_SELECTION_NOTE_EN = PEDIATRIC_AGE_RANGE_LABEL_EN;

export const AGE_COHORT_OPTIONS = [
  {
    id: 'adult',
    label: AGE_COHORT_BUTTON_LABEL_KO.adult,
    label_eng: AGE_COHORT_BUTTON_LABEL_EN.adult,
    sublabel: AGE_COHORT_BUTTON_SUBLABEL_KO.adult,
    sublabel_eng: AGE_COHORT_BUTTON_SUBLABEL_EN.adult,
    desc: ADULT_STRATIFICATION_SUMMARY_KO,
    desc_eng: ADULT_STRATIFICATION_SUMMARY_EN,
  },
  {
    id: 'pediatric',
    label: AGE_COHORT_BUTTON_LABEL_KO.pediatric,
    label_eng: AGE_COHORT_BUTTON_LABEL_EN.pediatric,
    sublabel: AGE_COHORT_BUTTON_SUBLABEL_KO.pediatric,
    sublabel_eng: AGE_COHORT_BUTTON_SUBLABEL_EN.pediatric,
    desc: PEDIATRIC_STRATIFICATION_SUMMARY_KO,
    desc_eng: PEDIATRIC_STRATIFICATION_SUMMARY_EN,
  },
];

export const PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE = 8;

/** @deprecated use PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE */
export const PEDIATRIC_MIN_STRATIFIED_SAMPLE_PER_BAND = PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE;

export const formatMinPediatricSampleKo = () =>
  `최소 ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE.toLocaleString('en-US')}개`;
export const formatMinPediatricSampleEn = () =>
  `at least ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE}`;

export const formatSampleSizeAdjustmentTooltipKo = () =>
  `각 군별 층화 규칙에 따라 데이터 분포의 균형을 유지하고 특정 층의 데이터 누락을 방지하기 위해, 실제 분석 샘플 수는 설정하신 목표 표본 수보다 상향 조정될 수 있습니다.\n성인군: ${formatMinStratifiedSampleKo()} 이상\n소아·청소년군: ${formatMinPediatricSampleKo()} 이상`;

export const formatSampleSizeAdjustmentTooltipEn = () =>
  `Depending on each cohort's stratification rules, the actual analysis sample size may be adjusted upward from your target N to maintain balanced distribution and prevent missing strata.\nAdult group: ${formatMinStratifiedSampleEn()} or more\nPediatric and adolescent group: ${formatMinPediatricSampleEn()} or more`;

/** 리포트·가이드 — 분석 방법 본문 */
export const REPORT_ANALYSIS_METHOD_INTRO_KO =
  '상세 프로토콜은 사용자가 선택한 연령군에 따라 다르게 적용됩니다.\n본 리포트에서 성인군은 19세 이상, 소아·청소년군은 19세 미만을 의미합니다.';
export const REPORT_ANALYSIS_METHOD_INTRO_EN =
  'Detailed protocols differ according to the age group selected by the user.\nIn this report, the adult group means age 19 and older,\nand the pediatric and adolescent group means under age 19.';

export const REPORT_SAMPLING_PROTOCOL_SUMMARY_KO =
  '테스트 데이터는 사용자가 선택한 연령군의 전체 데이터세트에서 층화 무작위 추출(Stratified Random Sampling)을 통해 추출합니다. 서브그룹 분석은 사용자가 선택한 기준에 따라 추가로 수행합니다.';
export const REPORT_SAMPLING_PROTOCOL_SUMMARY_EN =
  'Test data are drawn from the full dataset of the user-selected age group via stratified random sampling.\nSubgroup analysis is additionally performed according to criteria selected by the user.';

export const buildReportAdultProtocolKo = () =>
  `성인군의 층화 추출 기준은 아래와 같습니다.\n- BMI (≥25 kg/m², <25 kg/m²)\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Race (${RACE_SUBGROUP_LIST_KO})\n- Sex (Male, Female)\n\n이때, 성인군의 OSA Severity는 AHI 기준으로 Normal < 5, Mild 5–<15, Moderate 15–<30, Severe ≥30으로 정의합니다.\n\n성인군의 서브그룹 분석 기준은 아래와 같습니다.\n- BMI (≥25 kg/m², <25 kg/m²)\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Race (${RACE_SUBGROUP_LIST_KO})`;

export const buildReportAdultProtocolEn = () =>
  `Adult stratification criteria are as follows:\n- BMI (≥25 kg/m², <25 kg/m²)\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Race (${RACE_SUBGROUP_LIST_EN})\n- Sex (Male, Female)\n\nFor the adult group, OSA Severity is defined by AHI as Normal < 5, Mild 5–<15, Moderate 15–<30, Severe ≥30.\n\nAdult subgroup analysis criteria are as follows:\n- BMI (≥25 kg/m², <25 kg/m²)\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Race (${RACE_SUBGROUP_LIST_EN})`;

export const buildReportPediatricProtocolKo = () => {
  const bands = PEDIATRIC_BAND_OPTIONS.map((b) => `- ${b.label}`).join('\n');
  return `소아·청소년군 테스트 데이터는 사용자가 선택한 연령 범위 내에서 구성합니다. 선택 가능한 연령대는 아래와 같습니다.\n${bands}\n\n이때, 소아·청소년군의 OSA Severity는 AHI 기준으로 Normal < 1, Mild 1–<5, Moderate 5–<10, Severe ≥10으로 정의합니다.\n\n소아·청소년군의 층화 추출 기준은 아래와 같습니다.\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Sex (Male, Female)\n\n소아·청소년군의 서브그룹 분석 기준은 아래와 같습니다.\n- OSA Severity (Normal, Mild, Moderate, Severe)`;
};

export const buildReportPediatricProtocolEn = () => {
  const bands = PEDIATRIC_BAND_OPTIONS.map((b) => `- ${b.label_eng}`).join('\n');
  return `Pediatric and adolescent test data are drawn within the age range selected by the user.\nAvailable age bands are as follows:\n${bands}\n\nFor the pediatric and adolescent group, OSA Severity is defined by AHI as Normal < 1, Mild 1–<5, Moderate 5–<10, Severe ≥10.\n\nPediatric and adolescent stratification criteria are as follows:\n- OSA Severity (Normal, Mild, Moderate, Severe)\n- Sex (Male, Female)\n\nPediatric and adolescent subgroup analysis criteria are as follows:\n- OSA Severity (Normal, Mild, Moderate, Severe)`;
};

export const buildReportSampleSizeSectionKo = () =>
  `목표 표본 수(N)는 선택된 샘플링 모드에 따라 결정됩니다. Auto Mode에서는 비열등성 검정 프레임워크를 기반으로 사용자가 설정한 유의수준(α), 검정력(1-β), 분석 파라미터 및 비열등성 마진(Non-inferiority margin)을 투입하여 통계적으로 유효한 수치를 산출하며, Manual Mode에서는 사용자가 분석에 필요한 목표 표본 수를 직접 입력합니다.\n\n단, 실제 분석 샘플 수는 사용자가 설정한 목표 표본 수(N)보다 상향 조정될 수 있습니다. 이는 각 연령군의 층화 규칙에 따라 데이터 분포의 균형을 유지하고, 특정 층의 데이터 누락을 방지하기 위한 조정입니다. 성인군의 경우 ${MIN_STRATIFIED_SAMPLE_SIZE}개 층을 구성하므로, 실제 분석 샘플 수는 최소 ${MIN_STRATIFIED_SAMPLE_SIZE}개 이상으로 조정될 수 있습니다. 소아·청소년군의 경우 ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE}개 층을 구성하므로, 실제 분석 샘플 수는 최소 ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE}개 이상으로 조정될 수 있습니다.`;

export const buildReportSampleSizeSectionEn = () =>
  `Target sample size (N) is determined by the selected sampling mode.\nIn Auto Mode, a statistically valid value is computed based on a non-inferiority testing framework using the user-specified significance level (α), power (1−β), analysis parameters, and non-inferiority margin.\nIn Manual Mode, the user directly enters the target sample size required for analysis.\n\nHowever, the actual analysis sample size may be adjusted upward from the user-specified target N.\nThis adjustment maintains balanced data distribution according to each age group's stratification rules and prevents missing strata.\nThe adult group comprises ${MIN_STRATIFIED_SAMPLE_SIZE} strata, so the actual analysis sample size may be adjusted to at least ${MIN_STRATIFIED_SAMPLE_SIZE}.\nThe pediatric and adolescent group comprises ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE} strata, so the actual analysis sample size may be adjusted to at least ${PEDIATRIC_MIN_STRATIFIED_SAMPLE_SIZE}.`;

export const REPORT_ANALYSIS_PROCEDURE_KO =
  '개별 가상환경 내에서 사용자 알고리즘을 수행하여 나온 예측 결과를 PSG 검사 결과 데이터와 비교하여 다양한 평가지표를 계산합니다.';
export const REPORT_ANALYSIS_PROCEDURE_EN =
  'Various evaluation metrics are calculated by comparing predicted results from user algorithms executed in individual virtual environments\nwith PSG test result data.';

export const REPORT_DATASET_KO =
  '본 분석에 사용된 데이터세트는 다음과 같습니다: ABC, APPLE, CFS, MESA, MrOS, SHHS, SOF, WSC.\n\n위 코호트는 NSRR 등 공개 PSG 데이터입니다. ASAN/AMC 임상 데이터는 공개 스냅샷에 포함되지 않습니다. 공통 수면 분석 파라미터를 정의하여 분석 시스템을 제공하며, 제공되는 생체신호는 각 채널마다 특정 신호로 리샘플링되어 사용자에게 제공됩니다.';
export const REPORT_DATASET_EN =
  'The datasets used in this analysis are as follows:\nABC, APPLE, CFS, MESA, MrOS, SHHS, SOF, WSC.\n\nThese cohorts are open-access PSG datasets (e.g. NSRR). ASAN/AMC clinical data is not included in this public snapshot.\nCommon sleep analysis parameters are defined to provide an analysis system.\nBiological signals are resampled to specific signals for each channel before being provided to users.';

/** @deprecated use formatMinPediatricSampleKo */
export const formatMinPediatricPerBandKo = formatMinPediatricSampleKo;
/** @deprecated use formatMinPediatricSampleEn */
export const formatMinPediatricPerBandEn = formatMinPediatricSampleEn;

export const PEDIATRIC_BAND_ORDER = PEDIATRIC_BAND_OPTIONS.map((o) => o.id);

/** 소아·청소년(≤18) 연령군에서 선택 가능한 서브그룹 */
export const PEDIATRIC_SUBGROUP_OPTIONS = ['Severity'];

/** 소아 기본: 서브그룹 미선택(선택 안함). Severity는 선택 가능. */
export const PEDIATRIC_DEFAULT_SUBGROUPS = [];

export const NO_SUBGROUP_LABEL_KO = '선택 안함';
export const NO_SUBGROUP_LABEL_EN = 'None';

export const pediatricBandLabel = (id, tf) => {
  const opt = PEDIATRIC_BAND_OPTIONS.find((o) => o.id === id);
  return opt ? tf(opt.label, opt.label_eng) : id;
};

/** API 응답을 연령대별 건수 맵으로 정규화 (누락 키는 0) */
export const normalizePediatricBandCounts = (raw) => {
  const counts = {};
  PEDIATRIC_BAND_OPTIONS.forEach(({ id }) => {
    const n = raw?.[id];
    counts[id] = typeof n === 'number' && Number.isFinite(n) ? n : Number(n) || 0;
  });
  return counts;
};

export const isPediatricBandSelectable = (counts, bandId) => {
  if (!counts) return false;
  return (counts[bandId] ?? 0) > 0;
};

export const normalizePediatricBands = (bands) =>
  PEDIATRIC_BAND_ORDER.filter((id) => (bands || []).includes(id));

export const isPediatricBandsContiguous = (bands) => {
  const ordered = normalizePediatricBands(bands);
  if (ordered.length === 0) return false;
  const indices = ordered.map((id) => PEDIATRIC_BAND_ORDER.indexOf(id));
  return indices[indices.length - 1] - indices[0] + 1 === ordered.length;
};

export const bandsFromRangeIndices = (startIdx, endIdx) =>
  PEDIATRIC_BAND_OPTIONS.slice(startIdx, endIdx + 1).map((o) => o.id);

export const rangeIndicesFromBands = (bands) => {
  const ordered = normalizePediatricBands(bands);
  if (ordered.length === 0) return [0, 0];
  const startIdx = PEDIATRIC_BAND_ORDER.indexOf(ordered[0]);
  const endIdx = PEDIATRIC_BAND_ORDER.indexOf(ordered[ordered.length - 1]);
  return [startIdx, endIdx];
};

/** 데이터가 있는 첫 연령대를 기본 단일 구간으로 */
export const getDefaultPediatricBandRange = (counts) => {
  const idx = PEDIATRIC_BAND_OPTIONS.findIndex((b) =>
    isPediatricBandSelectable(counts, b.id)
  );
  return idx >= 0 ? [idx, idx] : [0, 0];
};

/** 구간 [startIdx, endIdx] 내 모든 연령대에 데이터가 있는지 */
export const isPediatricRangeSelectable = (counts, startIdx, endIdx) => {
  if (!counts) return false;
  const lo = Math.min(startIdx, endIdx);
  const hi = Math.max(startIdx, endIdx);
  for (let i = lo; i <= hi; i += 1) {
    if (!isPediatricBandSelectable(counts, PEDIATRIC_BAND_OPTIONS[i].id)) {
      return false;
    }
  }
  return true;
};

const PEDIATRIC_BAND_MERGE = {
  '0_1': { ko: { start: '4~12개월', end: '4~12개월', suffix: '' }, en: { start: '4–12 months', end: '4–12 months', suffix: '' } },
  '1_2': { ko: { start: '1', end: '2', suffix: '세' }, en: { start: '1', end: '2', suffix: ' years' } },
  '3_5': { ko: { start: '3', end: '5', suffix: '세' }, en: { start: '3', end: '5', suffix: ' years' } },
  '6_12': { ko: { start: '6', end: '12', suffix: '세' }, en: { start: '6', end: '12', suffix: ' years' } },
  '13_18': { ko: { start: '13', end: '18', suffix: '세' }, en: { start: '13', end: '18', suffix: ' years' } },
};

/** 연속 연령 구간을 하나의 라벨로 (예: 1_2+3_5 → 1~5세) */
export const formatPediatricContiguousRange = (bands, tf) => {
  const ordered = normalizePediatricBands(bands);
  if (ordered.length === 0) return '';
  if (ordered.length === 1) return pediatricBandShortLabel(ordered[0], tf);
  const first = PEDIATRIC_BAND_MERGE[ordered[0]];
  const last = PEDIATRIC_BAND_MERGE[ordered[ordered.length - 1]];
  if (!first || !last) {
    return ordered.map((b) => pediatricBandShortLabel(b, tf)).join(', ');
  }
  return tf(
    `${first.ko.start}~${last.ko.end}${last.ko.suffix}`,
    `${first.en.start}–${last.en.end}${last.en.suffix}`
  );
};
/** 리포트·팝업용 짧은 연령대 표기 (예: 13~18세) */
const PEDIATRIC_BAND_SHORT = {
  '0_1': { ko: '4~12개월', en: '4–12 months' },
  '1_2': { ko: '1~2세', en: '1–2 years' },
  '3_5': { ko: '3~5세', en: '3–5 years' },
  '6_12': { ko: '6~12세', en: '6–12 years' },
  '13_18': { ko: '13~18세', en: '13–18 years' },
};

export const pediatricBandShortLabel = (id, tf) => {
  const s = PEDIATRIC_BAND_SHORT[id];
  return s ? tf(s.ko, s.en) : pediatricBandLabel(id, tf);
};

/** 제출 확인 팝업·리포트용 분석 대상 연령대 (소아 단일 연령대는 밴드 라벨만) */
export const formatAgeCohortDisplay = (opt, tf) => {
  if (!opt) return 'N/A';
  const main = tf(opt.label, opt.label_eng);
  const sub = tf(opt.sublabel, opt.sublabel_eng);
  return sub ? `${main} (${sub})` : main;
};

export const formatAnalysisAgeRange = ({ ageCohort, pediatricBands }, tf) => {
  const cohort = String(ageCohort || 'adult').toLowerCase();
  if (cohort === 'pediatric') {
    const bands = pediatricBands || [];
    if (bands.length > 0) {
      return formatPediatricContiguousRange(bands, tf);
    }
    return tf(PEDIATRIC_COHORT_LABEL_KO, PEDIATRIC_COHORT_LABEL_EN);
  }
  const opt = AGE_COHORT_OPTIONS.find((o) => o.id === cohort);
  return formatAgeCohortDisplay(opt, tf);
};

export const PEDIATRIC_COMBINED_RANGE_KEY = 'range';

export const pediatricCombinedRangeKey = (bands) => {
  const ordered = normalizePediatricBands(bands || []);
  if (ordered.length <= 1) {
    return ordered[0] || PEDIATRIC_COMBINED_RANGE_KEY;
  }
  return PEDIATRIC_COMBINED_RANGE_KEY;
};

/** 리포트 성능 결과 키 — 연속 다중 연령대는 단일 range */
export const getPediatricReportPerfKeys = (extraInfo, pediatricPerf = {}) => {
  const bands = extraInfo?.pediatric_age_bands;
  if (!Array.isArray(bands) || bands.length === 0) {
    return Object.keys(pediatricPerf || {});
  }
  const combinedKey = pediatricCombinedRangeKey(bands);
  if (pediatricPerf?.[combinedKey]) return [combinedKey];
  const legacy = bands.filter((b) => pediatricPerf?.[b]);
  if (legacy.length) return legacy;
  return [combinedKey];
};

export const pediatricReportRangeLabel = (key, extraInfo, tf) => {
  const bands = extraInfo?.pediatric_age_bands;
  if (
    (key === PEDIATRIC_COMBINED_RANGE_KEY || key === 'range') &&
    Array.isArray(bands) &&
    bands.length > 1
  ) {
    return formatPediatricContiguousRange(bands, tf);
  }
  return pediatricBandLabel(key, tf);
};

export const pediatricReportStatsPrefix = (extraInfo) => {
  const bands = extraInfo?.pediatric_age_bands;
  if (!Array.isArray(bands) || !bands.length) return null;
  return `pediatric_${pediatricCombinedRangeKey(bands)}`;
};

/** extraInfo 객체에서 연령대 문자열 추출 (formatAnalysisAgeRange 래퍼) */
export const formatAnalysisAgeRangeFromExtra = (extraInfo, tf) =>
  formatAnalysisAgeRange(
    {
      ageCohort: extraInfo?.age_cohort,
      pediatricBands: extraInfo?.pediatric_age_bands,
    },
    tf
  );
