/** Static fixtures for the core submit → report demo flow.
 * Matches examples/demo_submit (sleep_stage_5) + real ReportDocument field shapes.
 */

export const DEMO_ACCOUNTS = {
  user: {
    login_id: 'Fakeuser1',
    login_pw: 'Demo1234!',
    name: '홍길동',
    organization: 'ulsan university',
  },
  admin: {
    login_id: 'Fakeadmin1',
    login_pw: 'Demo1234!',
    name: 'Admin',
  },
};

export const DEMO_TOKEN_USER = 'demo-user-token';
export const DEMO_TOKEN_ADMIN = 'demo-admin-token';

/** Seed submit already completed — open report immediately from the list. */
export const SEED_SUBMIT_NUM = 'SDEMO0001';

/** Matches examples/demo_submit validation shape. */
export const VALIDATION_OK = {
  status: 200,
  message: 'OK',
  data: {
    paths: ['main.py', 'requirements.txt'],
    input_var_list: ['eeg_c3_m2', 'eeg_c4_m1'],
    output_var_list: ['sleep_stage_5'],
  },
};

/** Pediatric band ids must match PEDIATRIC_BAND_OPTIONS in ageCohort.js */
export const PEDIATRIC_BAND_COUNTS = {
  '0_1': 42,
  '1_2': 58,
  '3_5': 71,
  '6_12': 84,
  '13_18': 63,
};

export const SAMPLE_GROUP = (n, ageMean, ageStd, bmiMean, bmiStd, male, female) => ({
  n,
  age_mean: ageMean,
  age_std: ageStd,
  bmi_mean: bmiMean,
  bmi_std: bmiStd,
  sex_counts: { Male: male, Female: female },
});

/** Classification metrics shape expected by ReportDocument for sleep_stage_5. */
export function buildSleepStage5Metrics(variant = 0) {
  const bump = variant * 0.01;
  const clamp = (v) => Math.min(0.99, Math.max(0.05, v));
  const opa = clamp(0.812 + bump);
  const matrix = [
    [48, 4, 3, 1, 2],
    [5, 28, 9, 2, 3],
    [3, 7, 92, 11, 6],
    [1, 2, 9, 38, 3],
    [2, 1, 5, 2, 51],
  ].map((row, ri) =>
    row.map((v, ci) => Math.max(0, v + ((ri + ci + variant) % 3) - 1))
  );

  const metrics = {
    sleep_stage_5_calculate_confusion_matrix: matrix,
    sleep_stage_5_overall_accuracy: opa,
    sleep_stage_5_kappa: clamp(0.741 + bump),
  };
  for (let i = 0; i < 5; i += 1) {
    metrics[`sleep_stage_5_class_${i}_sensitivity`] = clamp(0.72 + i * 0.03 + bump);
    metrics[`sleep_stage_5_class_${i}_specificity`] = clamp(0.9 - i * 0.01 + bump);
  }
  return metrics;
}

const SUBGROUP_LEVELS = {
  bmi: ['obese', 'not_obese'],
  severity: ['normal', 'mild', 'moderate', 'severe'],
  race: ['white', 'black', 'asian', 'other'],
  age: ['adult', 'child'],
};

function buildSubgroupPerf(selectedSubgroups) {
  const out = {};
  (selectedSubgroups || []).forEach((sg, sgIdx) => {
    const key = String(sg).toLowerCase();
    const levels = SUBGROUP_LEVELS[key];
    if (!levels) return;
    out[key] = {};
    levels.forEach((level, i) => {
      out[key][level] = buildSleepStage5Metrics(sgIdx * 3 + i + 1);
    });
  });
  return out;
}

export function buildReportPayload(submit) {
  const selected = (submit.selected_subgroups || []).map((s) =>
    String(s).toLowerCase()
  );
  const pediatric = String(submit.age_cohort || 'adult').toLowerCase() === 'pediatric';
  const overall = buildSleepStage5Metrics(0);
  const subgroupPerf = pediatric
    ? buildSubgroupPerf(selected.filter((s) => s === 'severity'))
    : buildSubgroupPerf(selected);

  const extra = {
    submit_num: submit.submit_num,
    submit_title: submit.submit_title,
    submit_description: submit.submit_description,
    submit_time: submit.submit_time,
    client_name: DEMO_ACCOUNTS.user.name,
    client_organization: DEMO_ACCOUNTS.user.organization,
    input_user_parameters: submit.input_var_list || [
      'eeg_c3_m2',
      'eeg_c4_m1',
    ],
    output_user_parameters: submit.output_var_list || ['sleep_stage_5'],
    selected_subgroups: selected,
    age_cohort: submit.age_cohort || 'adult',
    pediatric_age_bands: submit.pediatric_age_bands || null,
    sampling_mode: submit.sampling_mode || 'manual',
    target_sample_size: submit.target_sample_size || 120,
    sampled_n: submit.target_sample_size || 120,
    primary_parameter: submit.primary_parameter || 'accuracy',
    alpha: submit.alpha || 0.025,
    power: submit.power || 0.8,
    sigma: submit.sigma || 6.4,
    delta: submit.delta || 5,
    used_preset: Boolean(submit.used_preset),
    preset_key: submit.preset_key || '',
    overall: SAMPLE_GROUP(120, 48.2, 12.1, 27.4, 4.8, 72, 48),
    bmi_obese: SAMPLE_GROUP(55, 49.1, 11.8, 31.2, 3.1, 34, 21),
    bmi_not_obese: SAMPLE_GROUP(65, 47.4, 12.4, 23.8, 2.4, 38, 27),
    severity_normal: SAMPLE_GROUP(30, 45.0, 11.0, 25.1, 3.8, 16, 14),
    severity_mild: SAMPLE_GROUP(35, 47.2, 10.5, 26.4, 4.0, 20, 15),
    severity_moderate: SAMPLE_GROUP(30, 50.1, 12.0, 28.8, 4.2, 19, 11),
    severity_severe: SAMPLE_GROUP(25, 52.4, 11.8, 30.5, 4.6, 17, 8),
    race_white: SAMPLE_GROUP(50, 49.0, 11.2, 27.0, 4.1, 30, 20),
    race_black: SAMPLE_GROUP(30, 47.5, 12.0, 28.2, 4.5, 18, 12),
    race_asian: SAMPLE_GROUP(25, 46.8, 10.8, 24.9, 3.6, 14, 11),
    race_other: SAMPLE_GROUP(15, 48.1, 11.5, 26.7, 4.0, 10, 5),
    race_count: {},
    osa_severity_count: {},
    performance_result_overall: overall,
  };

  return {
    performance_results: {
      overall,
      ...subgroupPerf,
      overall_plot: {},
      bmi_plot: {},
      age_plot: {},
      severity_plot: {},
      race_plot: {},
    },
    extra_info: extra,
  };
}
