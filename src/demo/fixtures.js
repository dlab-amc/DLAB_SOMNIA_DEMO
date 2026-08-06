/** Demo fixtures — sleep_stage_5 showcase matching real ReportDocument layout.
 * Best adult report: Overall OPA/CM + BMI/Severity/Race subgroup tables & matrices.
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

export const PEDIATRIC_BAND_COUNTS = {
  '0_1': 42,
  '1_2': 58,
  '3_5': 71,
  '6_12': 84,
  '13_18': 63,
};

/** Full adult subgroup set — richest sleep_stage_5 report in ReportDocument. */
export const SHOWCASE_SUBGROUPS = ['bmi', 'severity', 'race'];

export const SAMPLE_GROUP = (n, ageMean, ageStd, bmiMean, bmiStd, male, female) => ({
  n,
  age_mean: ageMean,
  age_std: ageStd,
  bmi_mean: bmiMean,
  bmi_std: bmiStd,
  sex_counts: { Male: male, Female: female },
});

/**
 * Strong diagonal confusion matrix + high OPA/Kappa for a polished demo look.
 * variant shifts numbers slightly per subgroup level.
 */
export function buildSleepStage5Metrics(variant = 0) {
  const clamp = (v) => Math.min(0.985, Math.max(0.55, v));
  const d = variant % 5;
  // Wake, N1, N2, N3, REM — diagonal-dominant
  const base = [
    [86, 5, 3, 1, 2],
    [4, 62, 10, 2, 3],
    [2, 6, 148, 9, 5],
    [1, 1, 8, 71, 2],
    [2, 1, 4, 2, 94],
  ];
  const matrix = base.map((row, ri) =>
    row.map((v, ci) => {
      if (ri === ci) return v + d;
      return Math.max(0, v - (d % 2));
    })
  );
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const diag = matrix.reduce((a, row, i) => a + row[i], 0);
  const opa = clamp(diag / total);
  const kappa = clamp(opa - 0.07 + variant * 0.002);

  // Per-class PPA (sensitivity) from diagonal / row sum
  const metrics = {
    sleep_stage_5_calculate_confusion_matrix: matrix,
    sleep_stage_5_overall_accuracy: Number(opa.toFixed(4)),
    sleep_stage_5_kappa: Number(kappa.toFixed(4)),
  };
  for (let i = 0; i < 5; i += 1) {
    const rowSum = matrix[i].reduce((a, b) => a + b, 0);
    const colSum = matrix.reduce((a, row) => a + row[i], 0);
    const tp = matrix[i][i];
    const fn = rowSum - tp;
    const fp = colSum - tp;
    const tn = total - tp - fn - fp;
    metrics[`sleep_stage_5_class_${i}_sensitivity`] = Number(
      clamp(tp / (tp + fn || 1)).toFixed(4)
    );
    metrics[`sleep_stage_5_class_${i}_specificity`] = Number(
      clamp(tn / (tn + fp || 1)).toFixed(4)
    );
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
      out[key][level] = buildSleepStage5Metrics(sgIdx * 4 + i + 1);
    });
  });
  return out;
}

/** Showcase seed submit used by list + report (full adult sleep_stage_5). */
export function createShowcaseSubmit() {
  const createdAt = new Date(Date.now() - 60_000).toISOString();
  return {
    submit_id: 'demo-seed-id',
    submit_num: SEED_SUBMIT_NUM,
    submit_title: 'Sleep Stage 5 Classification (Demo)',
    submit_description:
      'Showcase report: overall + BMI / OSA Severity / Race subgroup analysis.',
    submit_time: createdAt,
    createdAt,
    progress_status: 2,
    job_id: 'demo-job-seed',
    files: [
      { name: 'main.py', size: 2048 },
      { name: 'requirements.txt', size: 128 },
    ],
    input_var_list: ['eeg_c3_m2', 'eeg_c4_m1'],
    output_var_list: ['sleep_stage_5'],
    selected_subgroups: [...SHOWCASE_SUBGROUPS],
    age_cohort: 'adult',
    pediatric_age_bands: null,
    sampling_mode: 'manual',
    target_sample_size: 128,
    primary_parameter: 'accuracy',
    alpha: 0.025,
    power: 0.8,
    sigma: 6.4,
    delta: 5,
    used_preset: true,
    preset_key: 'accuracy',
  };
}

export function buildReportPayload(submit) {
  const pediatric =
    String(submit.age_cohort || 'adult').toLowerCase() === 'pediatric';

  // Showcase seed (and adult demos with empty selection) → fullest adult report
  let selected = (submit.selected_subgroups || []).map((s) =>
    String(s).toLowerCase()
  );
  if (
    !pediatric &&
    (submit.submit_num === SEED_SUBMIT_NUM || selected.length === 0)
  ) {
    selected = [...SHOWCASE_SUBGROUPS];
  }
  if (pediatric) {
    selected = selected.filter((s) => s === 'severity');
    if (selected.length === 0) selected = ['severity'];
  }

  const overall = buildSleepStage5Metrics(0);
  const subgroupPerf = buildSubgroupPerf(selected);

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
    target_sample_size: submit.target_sample_size || 128,
    sampled_n: 128,
    primary_parameter: submit.primary_parameter || 'accuracy',
    alpha: submit.alpha ?? 0.025,
    power: submit.power ?? 0.8,
    sigma: submit.sigma ?? 6.4,
    delta: submit.delta ?? 5,
    used_preset: Boolean(submit.used_preset),
    preset_key: submit.preset_key || 'accuracy',
    overall: SAMPLE_GROUP(128, 51.4, 11.8, 27.6, 4.7, 78, 50),
    bmi_obese: SAMPLE_GROUP(58, 52.1, 11.2, 31.4, 3.0, 36, 22),
    bmi_not_obese: SAMPLE_GROUP(70, 50.8, 12.1, 24.1, 2.5, 42, 28),
    severity_normal: SAMPLE_GROUP(32, 48.2, 10.4, 25.4, 3.6, 18, 14),
    severity_mild: SAMPLE_GROUP(36, 50.6, 11.0, 26.8, 3.9, 22, 14),
    severity_moderate: SAMPLE_GROUP(34, 53.0, 11.6, 28.9, 4.1, 21, 13),
    severity_severe: SAMPLE_GROUP(26, 55.1, 12.0, 30.8, 4.4, 17, 9),
    race_white: SAMPLE_GROUP(52, 52.0, 11.0, 27.2, 4.0, 32, 20),
    race_black: SAMPLE_GROUP(32, 50.4, 12.2, 28.5, 4.4, 19, 13),
    race_asian: SAMPLE_GROUP(28, 49.8, 10.6, 25.1, 3.5, 16, 12),
    race_other: SAMPLE_GROUP(16, 51.2, 11.4, 26.9, 3.9, 11, 5),
    // Sampling coverage page (adult)
    race_count: { white: 420, black: 210, asian: 180, other: 95 },
    osa_severity_count: {
      normal: 260,
      mild: 240,
      moderate: 220,
      severe: 185,
    },
    performance_result_overall: overall,
    performance_result_bmi: subgroupPerf.bmi || {},
    performance_result_severity: subgroupPerf.severity || {},
    performance_result_race: subgroupPerf.race || {},
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
