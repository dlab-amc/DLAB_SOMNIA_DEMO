/** @deprecated submitStatus.js 를 직접 import 하세요 */
export { SUBMIT_PROGRESS_TEXT } from './submitStatus';

// Submit Detail Page

export const LOG_MAP = {
  VENV_DONE: ['가상 환경 설정 완료', 'Virtual environment setup complete'],
  SAMPLE_DONE: ['데이터 샘플링 완료', 'Data sampling complete'],

  USER_RUN_START: ['사용자 코드 실행 중...', 'Running user code...'],
  USER_RUN_DONE: ['사용자 코드 실행 완료', 'User code execution completed'],

  USER_EVAL_START: ['사용자 코드 평가 중...', 'Evaluating user code...'],
  USER_EVAL_DONE: ['사용자 코드 평가 완료', 'User code evaluation completed'],

  JOB_STOPPED: ['작업이 정지되었습니다.', 'Job has been stopped.'],
};

export function toLogKey(message) {
  for (const key in LOG_MAP) {
    if (LOG_MAP[key].includes(message)) return key;
  }
  return null;
}

export function tLog(message) {
  const key = toLogKey(message);
  if (!key) return message;
  return LOG_MAP[key][1];
}

/** 알림/로그 메시지를 현재 언어에 맞게 반환. tf(한글, 영문) 사용 */
/** 백엔드 알림이 "S260305001: 데이터 샘플링 완료" 형태일 때 접두사는 유지하고 뒤 메시지만 번역 */
export function getLocalizedLogMessage(message, tf) {
  if (!message) return message;
  const trimmed = String(message).trim();
  if (!trimmed) return message;

  const colonIndex = trimmed.indexOf(": ");
  if (colonIndex > 0) {
    const prefix = trimmed.slice(0, colonIndex);
    const body = trimmed.slice(colonIndex + 2).trim();
    const key = toLogKey(body);
    const localizedBody = key ? tf(LOG_MAP[key][0], LOG_MAP[key][1]) : body;
    return `${prefix}: ${localizedBody}`;
  }

  const key = toLogKey(trimmed);
  if (!key) return message;
  return tf(LOG_MAP[key][0], LOG_MAP[key][1]);
}

export const STAGES = [
  {
    step_ko: '1단계',
    step_en: 'Step 1',
    name_ko: '데이터 전처리',
    name_en: 'Data Preprocessing',
    doneKeys: ['VENV_DONE', 'SAMPLE_DONE'],
  },
  {
    step_ko: '2단계',
    step_en: 'Step 2',
    name_ko: '알고리즘 분석',
    name_en: 'Algorithm Analysis',
    doneKeys: ['USER_RUN_DONE'],
  },
  {
    step_ko: '3단계',
    step_en: 'Step 3',
    name_ko: '성능 평가',
    name_en: 'Performance Evaluation',
    doneKeys: ['USER_EVAL_DONE'],
  },
];
