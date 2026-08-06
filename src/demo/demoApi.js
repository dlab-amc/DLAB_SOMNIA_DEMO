import {
  DEMO_ACCOUNTS,
  DEMO_TOKEN_ADMIN,
  DEMO_TOKEN_USER,
  SEED_SUBMIT_NUM,
  VALIDATION_OK,
  buildReportPayload,
} from './fixtures';

const LOG_KO = {
  VENV_DONE: '가상 환경 설정 완료',
  SAMPLE_DONE: '데이터 샘플링 완료',
  USER_RUN_START: '사용자 코드 실행 중...',
  USER_RUN_DONE: '사용자 코드 실행 완료',
  USER_EVAL_START: '사용자 코드 평가 중...',
  USER_EVAL_DONE: '사용자 코드 평가 완료',
};

function nowIso() {
  return new Date().toISOString();
}

function logEntry(message, status, offsetMs = 0) {
  return {
    message,
    status,
    timestamp: new Date(Date.now() + offsetMs).toISOString(),
  };
}

/** Build status_log + progress_status from submit age (ms). */
export function buildProgressForSubmit(submit) {
  const elapsed = Date.now() - new Date(submit.createdAt).getTime();

  if (elapsed < 4000) {
    return {
      progress_status: 1,
      log_data: {
        parameter_value: 'N/A',
        status_log: [
          logEntry(LOG_KO.VENV_DONE, 'completed', -3000),
          logEntry(LOG_KO.SAMPLE_DONE, 'completed', -1000),
          logEntry(LOG_KO.USER_RUN_START, 'running', 0),
        ],
      },
    };
  }
  if (elapsed < 8000) {
    return {
      progress_status: 1,
      log_data: {
        parameter_value: 'N/A',
        status_log: [
          logEntry(LOG_KO.VENV_DONE, 'completed', -7000),
          logEntry(LOG_KO.SAMPLE_DONE, 'completed', -5000),
          logEntry(LOG_KO.USER_RUN_DONE, 'completed', -2000),
          logEntry(LOG_KO.USER_EVAL_START, 'running', 0),
        ],
      },
    };
  }

  submit.progress_status = 2;
  return {
    progress_status: 2,
    log_data: {
      parameter_value: 'N/A',
      status_log: [
        logEntry(LOG_KO.VENV_DONE, 'completed', -12000),
        logEntry(LOG_KO.SAMPLE_DONE, 'completed', -10000),
        logEntry(LOG_KO.USER_RUN_DONE, 'completed', -6000),
        logEntry(LOG_KO.USER_EVAL_DONE, 'completed', -1000),
      ],
    },
  };
}

function createSeedSubmit() {
  const createdAt = new Date(Date.now() - 60_000).toISOString();
  return {
    submit_id: 'demo-seed-id',
    submit_num: SEED_SUBMIT_NUM,
    submit_title: 'Demo AHI Algorithm',
    submit_description: 'GitHub Pages mock submission (pre-completed).',
    submit_time: createdAt,
    createdAt,
    progress_status: 2,
    job_id: 'demo-job-seed',
    files: [
      { name: 'main.py', size: 2048 },
      { name: 'requirements.txt', size: 128 },
    ],
    input_var_list: ['ECG', 'SpO2'],
    output_var_list: ['ahi'],
    selected_subgroups: ['bmi', 'age'],
    age_cohort: 'adult',
    sampling_mode: 'manual',
    target_sample_size: 120,
    primary_parameter: 'ahi',
    alpha: 0.05,
    power: 0.8,
    sigma: 10,
    delta: 5,
  };
}

const state = {
  counter: 1,
  submits: [createSeedSubmit()],
};

function ok(data, message = 'OK') {
  return { status: 200, message, data };
}

function listPage(content) {
  return ok({
    content,
    total_count: content.length,
    total_index: Math.max(1, Math.ceil(content.length / 10) || 1),
  });
}

function parsePath(url) {
  try {
    const u = new URL(url, 'https://demo.local');
    return u.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return String(url || '').split('?')[0];
  }
}

function readFormValue(data, key) {
  if (!data) return null;
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    return data.get(key);
  }
  if (typeof data === 'object') return data[key];
  return null;
}

function parseJsonField(raw, fallback) {
  if (raw == null || raw === '') return fallback;
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function handleDemoRequest({ method = 'GET', url, data, headers }) {
  const path = parsePath(url);
  const m = String(method).toUpperCase();
  const auth = headers?.Authorization || headers?.authorization || '';

  if (m === 'POST' && path.endsWith('/login/user')) {
    const id = data?.login_id;
    const pw = data?.login_pw;
    if (id === DEMO_ACCOUNTS.user.login_id && pw === DEMO_ACCOUNTS.user.login_pw) {
      return { status: 200, data: ok({ token: DEMO_TOKEN_USER }) };
    }
    return {
      status: 401,
      data: {
        status: 401,
        error: {
          code: 'LOGIN_FAILED',
          message:
            '아이디 또는 비밀번호가 올바르지 않습니다. (데모: Fakeuser1 / Demo1234!)',
        },
      },
    };
  }

  if (m === 'POST' && path.endsWith('/login/admin')) {
    const id = data?.login_id;
    const pw = data?.login_pw;
    if (
      id === DEMO_ACCOUNTS.admin.login_id &&
      pw === DEMO_ACCOUNTS.admin.login_pw
    ) {
      return { status: 200, data: ok({ token: DEMO_TOKEN_ADMIN }) };
    }
    return {
      status: 401,
      data: {
        status: 401,
        error: {
          code: 'LOGIN_FAILED',
          message: '관리자 로그인 실패 (데모 계정 확인)',
        },
      },
    };
  }

  void auth;

  if (m === 'GET' && path.includes('/notification/count')) {
    return { status: 200, data: ok({ new_notification_count: 0 }) };
  }
  if (m === 'GET' && path.includes('/notification')) {
    return { status: 200, data: listPage([]) };
  }

  if (m === 'GET' && path.includes('/answers/pediatric_band_counts')) {
    return {
      status: 200,
      data: ok({
        counts: {
          '0-1': 40,
          '1-5': 55,
          '5-12': 70,
          '12-18': 60,
        },
      }),
    };
  }
  if (m === 'POST' && path.includes('/answers/get_sample_size')) {
    return { status: 200, data: ok({ total_sample_size: 120 }) };
  }

  if (m === 'POST' && path.endsWith('/submit/validation')) {
    return { status: 200, data: VALIDATION_OK };
  }

  if (m === 'POST' && (path.endsWith('/submit') || path === '/submit')) {
    state.counter += 1;
    const n = String(state.counter).padStart(3, '0');
    const submitNum = `SDEMO0${n}`;
    const title =
      readFormValue(data, 'submit_title') || `Demo Submission ${submitNum}`;
    const description =
      readFormValue(data, 'submit_description') || 'Interactive demo submission';
    const input_var_list = parseJsonField(readFormValue(data, 'input_var_list'), [
      'ECG',
      'SpO2',
    ]);
    const output_var_list = parseJsonField(
      readFormValue(data, 'output_var_list'),
      ['ahi']
    );
    const selected_subgroups = parseJsonField(
      readFormValue(data, 'selected_subgroups'),
      ['bmi', 'age']
    );
    const createdAt = nowIso();
    const submit = {
      submit_id: `demo-id-${submitNum}`,
      submit_num: submitNum,
      submit_title: String(title),
      submit_description: String(description),
      submit_time: createdAt,
      createdAt,
      progress_status: 1,
      job_id: `demo-job-${submitNum}`,
      files: [
        { name: 'main.py', size: 2048 },
        { name: 'requirements.txt', size: 128 },
        { name: 'submission.zip', size: 4096 },
      ],
      input_var_list,
      output_var_list,
      selected_subgroups,
      age_cohort: String(readFormValue(data, 'age_cohort') || 'adult'),
      sampling_mode: String(readFormValue(data, 'sampling_mode') || 'manual'),
      target_sample_size:
        Number(readFormValue(data, 'target_sample_size')) || 120,
      primary_parameter: String(
        readFormValue(data, 'primary_parameter') || 'ahi'
      ),
      alpha: readFormValue(data, 'alpha') || 0.05,
      power: readFormValue(data, 'power') || 0.8,
      sigma: readFormValue(data, 'sigma') || 10,
      delta: readFormValue(data, 'delta') || 5,
    };
    state.submits.unshift(submit);
    return {
      status: 200,
      data: ok({ submit_id: submit.submit_id, submit_num: submit.submit_num }),
    };
  }

  const detailMatch = path.match(
    /\/submit\/submit_detail(?:\/admin)?\/([^/]+)$/
  );
  if (m === 'GET' && detailMatch) {
    const submitNum = decodeURIComponent(detailMatch[1]);
    const submit = state.submits.find((s) => s.submit_num === submitNum);
    if (!submit) {
      return { status: 404, data: { detail: 'Submit not found' } };
    }
    if (submit.progress_status === 2 && submit.submit_num === SEED_SUBMIT_NUM) {
      return {
        status: 200,
        data: {
          progress_status: 2,
          log_data: {
            parameter_value: 'N/A',
            status_log: [
              logEntry(LOG_KO.VENV_DONE, 'completed', -30000),
              logEntry(LOG_KO.SAMPLE_DONE, 'completed', -25000),
              logEntry(LOG_KO.USER_RUN_DONE, 'completed', -15000),
              logEntry(LOG_KO.USER_EVAL_DONE, 'completed', -5000),
            ],
          },
        },
      };
    }
    return { status: 200, data: buildProgressForSubmit(submit) };
  }

  if (m === 'GET' && path.includes('/submit/submit_table')) {
    return {
      status: 200,
      data: state.submits.map((s) => ({
        _id: s.submit_id,
        user_id: DEMO_ACCOUNTS.user.login_id,
        submit_num: s.submit_num,
        submit_time: s.submit_time,
        submit_title: s.submit_title,
        submit_description: s.submit_description,
        submit_path: '',
        files: s.files || [],
      })),
    };
  }

  if (
    m === 'GET' &&
    (path.endsWith('/submit/list') || path.includes('/submit/list/'))
  ) {
    const content = state.submits.map((s) => {
      if (s.progress_status !== 2) {
        const prog = buildProgressForSubmit(s);
        s.progress_status = prog.progress_status;
      }
      return {
        submit_num: s.submit_num,
        submit_title: s.submit_title,
        submit_description: s.submit_description,
        submit_time: s.submit_time,
        progress_status: s.progress_status,
        job_id: s.job_id,
        user_id: DEMO_ACCOUNTS.user.login_id,
      };
    });
    return { status: 200, data: listPage(content) };
  }

  if (m === 'POST' && /\/submit\/jobs\/(stop|restart)\//.test(path)) {
    return { status: 200, data: ok({ ok: true }) };
  }
  if (m === 'DELETE' && path.includes('/submit/jobs/delete/')) {
    return { status: 200, data: ok({ ok: true }) };
  }

  const reportMatch = path.match(/\/report(?:\/admin)?\/([^/]+)$/);
  if (m === 'GET' && reportMatch) {
    const submitNum = decodeURIComponent(reportMatch[1]);
    const submit = state.submits.find((s) => s.submit_num === submitNum);
    if (!submit) {
      return { status: 404, data: { detail: 'Report not found' } };
    }
    return { status: 200, data: buildReportPayload(submit) };
  }

  if (m === 'GET' && path.includes('/user/list')) {
    return { status: 200, data: listPage([]) };
  }

  return {
    status: 200,
    data: ok({}),
    unhandled: true,
  };
}
