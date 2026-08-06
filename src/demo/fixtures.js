/** Demo fixtures — sleep_stage_5 showcase matching real ReportDocument + backend shapes.
 * Sampling coverage counts == used stratum n (Percent Used ≈ 100%, same as generate_subgroup_reports).
 */

export const DEMO_ACCOUNTS = {
  user: {
    login_id: 'Fakeuser1',
    login_pw: 'Demo1234!',
    name: 'Hong Gildong',
    organization: 'Ulsan University',
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

/** Backend SAMPLE_GROUP shape (+ sample_ratio like generate_subgroup_reports). */
export const SAMPLE_GROUP = (
  n,
  ageMean,
  ageStd,
  bmiMean,
  bmiStd,
  male,
  female,
  sampledN = n
) => ({
  n,
  age_mean: ageMean,
  age_std: ageStd,
  bmi_mean: bmiMean,
  bmi_std: bmiStd,
  sex_counts: { Male: male, Female: female },
  sample_ratio: sampledN > 0 ? Number((n / sampledN).toFixed(4)) : 0,
});

/**
 * Strong diagonal confusion matrix + OPA/Kappa for polished but plausible metrics.
 */
export function buildSleepStage5Metrics(variant = 0) {
  const clamp = (v) => Math.min(0.985, Math.max(0.55, v));
  const d = variant % 5;
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

/** Allocate adult sample tables that sum to sampledN (real pipeline consistency). */
function buildAdultSampleTables(sampledN) {
  // Fixed proportions totaling 128, then scale to sampledN
  const baseN = 128;
  const scale = (x) => Math.max(1, Math.round((x * sampledN) / baseN));

  const bmiObeseN = scale(58);
  const bmiNotN = sampledN - bmiObeseN;

  const sev = [scale(32), scale(36), scale(34)];
  const sevSevereN = sampledN - sev[0] - sev[1] - sev[2];

  const race = [scale(52), scale(32), scale(28)];
  const raceOtherN = sampledN - race[0] - race[1] - race[2];

  const maleOverall = Math.round(sampledN * 0.61);
  const femaleOverall = sampledN - maleOverall;

  const splitSex = (n, maleRatio = 0.6) => {
    const male = Math.min(n, Math.round(n * maleRatio));
    return [male, n - male];
  };

  const [mOb, fOb] = splitSex(bmiObeseN, 0.62);
  const [mNb, fNb] = splitSex(bmiNotN, 0.6);
  const [mSn, fSn] = splitSex(sev[0], 0.56);
  const [mSm, fSm] = splitSex(sev[1], 0.61);
  const [mSo, fSo] = splitSex(sev[2], 0.62);
  const [mSs, fSs] = splitSex(sevSevereN, 0.65);
  const [mRw, fRw] = splitSex(race[0], 0.62);
  const [mRb, fRb] = splitSex(race[1], 0.59);
  const [mRa, fRa] = splitSex(race[2], 0.57);
  const [mRo, fRo] = splitSex(raceOtherN, 0.69);

  const tables = {
    overall: SAMPLE_GROUP(
      sampledN,
      51.4,
      11.8,
      27.6,
      4.7,
      maleOverall,
      femaleOverall,
      sampledN
    ),
    bmi_obese: SAMPLE_GROUP(bmiObeseN, 52.1, 11.2, 31.4, 3.0, mOb, fOb, sampledN),
    bmi_not_obese: SAMPLE_GROUP(bmiNotN, 50.8, 12.1, 24.1, 2.5, mNb, fNb, sampledN),
    severity_normal: SAMPLE_GROUP(sev[0], 48.2, 10.4, 25.4, 3.6, mSn, fSn, sampledN),
    severity_mild: SAMPLE_GROUP(sev[1], 50.6, 11.0, 26.8, 3.9, mSm, fSm, sampledN),
    severity_moderate: SAMPLE_GROUP(
      sev[2],
      53.0,
      11.6,
      28.9,
      4.1,
      mSo,
      fSo,
      sampledN
    ),
    severity_severe: SAMPLE_GROUP(
      sevSevereN,
      55.1,
      12.0,
      30.8,
      4.4,
      mSs,
      fSs,
      sampledN
    ),
    race_white: SAMPLE_GROUP(race[0], 52.0, 11.0, 27.2, 4.0, mRw, fRw, sampledN),
    race_black: SAMPLE_GROUP(race[1], 50.4, 12.2, 28.5, 4.4, mRb, fRb, sampledN),
    race_asian: SAMPLE_GROUP(race[2], 49.8, 10.6, 25.1, 3.5, mRa, fRa, sampledN),
    race_other: SAMPLE_GROUP(raceOtherN, 51.2, 11.4, 26.9, 3.9, mRo, fRo, sampledN),
  };

  // Real service: race_count / osa_severity_count == sampled stratum n → ~100% used
  const race_count = {
    white: tables.race_white.n,
    black: tables.race_black.n,
    asian: tables.race_asian.n,
    other: tables.race_other.n,
  };
  const osa_severity_count = {
    normal: tables.severity_normal.n,
    mild: tables.severity_mild.n,
    moderate: tables.severity_moderate.n,
    severe: tables.severity_severe.n,
  };

  return { tables, race_count, osa_severity_count };
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
    // Auto + accuracy preset — matches real NI flow UI text more closely
    sampling_mode: 'auto',
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

  const target = Number(submit.target_sample_size) || 128;
  // Real stack may bump sample size for stratification minima (adult ≥ 64)
  const sampledN = Math.max(target, pediatric ? 8 : 64);

  const overall = buildSleepStage5Metrics(0);
  const subgroupPerf = buildSubgroupPerf(selected);
  const { tables, race_count, osa_severity_count } =
    buildAdultSampleTables(sampledN);

  const samplingMode = String(submit.sampling_mode || 'manual').toLowerCase();

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
    sampling_mode: samplingMode,
    target_sample_size: target,
    sampled_n: sampledN,
    primary_parameter: submit.primary_parameter || 'accuracy',
    alpha: submit.alpha ?? 0.025,
    power: submit.power ?? 0.8,
    sigma: submit.sigma ?? 6.4,
    delta: submit.delta ?? 5,
    used_preset: Boolean(submit.used_preset),
    preset_key: submit.preset_key || (samplingMode === 'auto' ? 'accuracy' : ''),
    ...tables,
    // Same as backend count_info from sampled_records → Percent Used = 100%
    race_count,
    osa_severity_count,
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
