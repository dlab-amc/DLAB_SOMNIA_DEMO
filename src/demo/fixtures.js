/** Static fixtures for the core submit → report demo flow. */

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

const regressionMetrics = (rmse, r2, slope, ttest) => ({
  ahi_rmse: rmse,
  ahi_r2: r2,
  ahi_ttest: ttest,
  ahi_deming_regression: {
    slope,
    ci_slope: [slope - 0.05, slope + 0.05],
    p_slope: 0.01,
  },
});

export const SAMPLE_GROUP = (n, ageMean, ageStd, bmiMean, bmiStd, male, female) => ({
  n,
  age_mean: ageMean,
  age_std: ageStd,
  bmi_mean: bmiMean,
  bmi_std: bmiStd,
  sex_counts: { Male: male, Female: female },
});

export function buildReportPayload(submit) {
  const overall = regressionMetrics(11.392, 0.658, 0.96, 0.142);
  const bmi = {
    obese: regressionMetrics(12.481, 0.612, 0.94, 0.18),
    not_obese: regressionMetrics(10.204, 0.701, 0.98, 0.11),
  };
  const age = {
    adult: regressionMetrics(11.12, 0.671, 0.97, 0.13),
    child: regressionMetrics(9.845, 0.722, 0.99, 0.09),
  };

  return {
    performance_results: {
      overall,
      bmi,
      age,
      overall_plot: {},
      bmi_plot: {},
      age_plot: {},
      severity_plot: {},
      race_plot: {},
    },
    extra_info: {
      submit_num: submit.submit_num,
      submit_title: submit.submit_title,
      submit_description: submit.submit_description,
      submit_time: submit.submit_time,
      client_name: DEMO_ACCOUNTS.user.name,
      client_organization: DEMO_ACCOUNTS.user.organization,
      input_user_parameters: submit.input_var_list || ['ECG', 'SpO2'],
      output_user_parameters: submit.output_var_list || ['ahi'],
      selected_subgroups: submit.selected_subgroups || ['bmi', 'age'],
      age_cohort: submit.age_cohort || 'adult',
      sampling_mode: submit.sampling_mode || 'manual',
      target_sample_size: submit.target_sample_size || 120,
      sampled_n: 120,
      primary_parameter: submit.primary_parameter || 'ahi',
      alpha: submit.alpha || 0.05,
      power: submit.power || 0.8,
      sigma: submit.sigma || 10,
      delta: submit.delta || 5,
      used_preset: false,
      preset_key: '',
      overall: SAMPLE_GROUP(120, 48.2, 12.1, 27.4, 4.8, 72, 48),
      bmi_obese: SAMPLE_GROUP(55, 49.1, 11.8, 31.2, 3.1, 34, 21),
      bmi_not_obese: SAMPLE_GROUP(65, 47.4, 12.4, 23.8, 2.4, 38, 27),
      age_adult: SAMPLE_GROUP(90, 54.6, 9.2, 28.1, 4.5, 55, 35),
      age_child: SAMPLE_GROUP(30, 14.2, 2.8, 21.5, 3.2, 17, 13),
      race_count: {},
      osa_severity_count: {},
      performance_result_overall: overall,
      performance_result_bmi: bmi,
      performance_result_age: age,
    },
  };
}

export const VALIDATION_OK = {
  status: 200,
  message: 'OK',
  data: {
    paths: [
      'demo_algorithm/',
      'demo_algorithm/main.py',
      'demo_algorithm/requirements.txt',
      'demo_algorithm/model.py',
    ],
    input_var_list: ['ECG', 'SpO2'],
    output_var_list: ['ahi'],
  },
};
