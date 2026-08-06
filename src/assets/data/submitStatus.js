/**
 * 제출 progress_status 단일 정의 (code ↔ ko/en/color).
 * 리스트·상세·필터·모듈에서 이 파일만 사용한다.
 */

export const SUBMIT_STATUS_CODE = {
  PENDING: -1,
  ERROR: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  STOPPED: 3,
  STOPPING: 4,
};

/** code → { ko, en, color } */
export const SUBMIT_STATUS_BY_CODE = {
  [-1]: { ko: '대기중', en: 'Pending', color: '#757575' },
  0: { ko: '에러', en: 'Error', color: '#f44336' },
  1: { ko: '진행중', en: 'In Progress', color: '#2196f3' },
  2: { ko: '완료', en: 'Completed', color: '#4caf50' },
  3: { ko: '중단됨', en: 'Stopped', color: '#ff9800' },
  4: { ko: '중단중', en: 'Stopping', color: '#ff9800' },
};

/** 목록 필터에 노출하는 상태 (백엔드 filter 자리수 = progress_status 코드) */
export const SUBMIT_STATUS_FILTER_OPTIONS = [
  {
    key: 'error',
    code: SUBMIT_STATUS_CODE.ERROR,
    ko: SUBMIT_STATUS_BY_CODE[0].ko,
    en: SUBMIT_STATUS_BY_CODE[0].en,
  },
  {
    key: 'inProgress',
    code: SUBMIT_STATUS_CODE.IN_PROGRESS,
    ko: SUBMIT_STATUS_BY_CODE[1].ko,
    en: SUBMIT_STATUS_BY_CODE[1].en,
  },
  {
    key: 'completed',
    code: SUBMIT_STATUS_CODE.COMPLETED,
    ko: SUBMIT_STATUS_BY_CODE[2].ko,
    en: SUBMIT_STATUS_BY_CODE[2].en,
  },
];

/** @deprecated 호환용 — SUBMIT_STATUS_BY_CODE 사용 권장 */
export const SUBMIT_STATUS_NAME = Object.fromEntries(
  Object.entries(SUBMIT_STATUS_BY_CODE)
    .filter(([code]) => Number(code) >= 0)
    .map(([code, meta]) => [Number(code), meta.ko])
);

/** @deprecated 호환용 */
export const SUBMIT_STATUS_NAME_ENG = Object.fromEntries(
  Object.entries(SUBMIT_STATUS_BY_CODE)
    .filter(([code]) => Number(code) >= 0)
    .map(([code, meta]) => [Number(code), meta.en])
);

/** @deprecated 호환용 */
export const SUBMIT_STATUS_COLORS = Object.fromEntries(
  Object.entries(SUBMIT_STATUS_BY_CODE).map(([code, meta]) => [code, meta.color])
);

/** @deprecated 호환용 */
export const SUBMIT_STATUS_COLOR_BY_KO = Object.fromEntries(
  Object.values(SUBMIT_STATUS_BY_CODE).map((meta) => [meta.ko, meta.color])
);

/** @deprecated 호환용 — getStatusMeta / getStatusLabel 사용 권장 */
export const SUBMIT_PROGRESS_TEXT = Object.entries(SUBMIT_STATUS_BY_CODE).map(
  ([code, meta]) => ({
    code: Number(code),
    statusText: meta.ko,
    statusText_eng: meta.en,
    logColor: meta.color,
  })
);

export function normalizeStatusCode(code) {
  if (code === null || code === undefined || code === '') return null;
  const n = Number(code);
  return Number.isFinite(n) && SUBMIT_STATUS_BY_CODE[n] ? n : null;
}

export function getStatusMeta(code) {
  const normalized = normalizeStatusCode(code);
  if (normalized === null) return SUBMIT_STATUS_BY_CODE[-1];
  return SUBMIT_STATUS_BY_CODE[normalized];
}

/** language: 'ko' | 'en' */
export function getStatusLabel(code, language = 'ko') {
  const meta = getStatusMeta(code);
  return language === 'en' ? meta.en : meta.ko;
}

export function getStatusColor(code) {
  return getStatusMeta(code).color;
}

export function getStatusColorByKo(statusKo) {
  return SUBMIT_STATUS_COLOR_BY_KO[statusKo] || SUBMIT_STATUS_BY_CODE[-1].color;
}

export function getStatusTextEng(statusText) {
  const found = Object.values(SUBMIT_STATUS_BY_CODE).find(
    (meta) => meta.ko === statusText
  );
  return found ? found.en : statusText;
}

/**
 * status_log / 단계 완료율로부터 progress_status 코드를 추정 (API 값 없을 때 fallback).
 * @param {{ hasError: boolean, stopped: boolean, stopping?: boolean, pct: number }} flags
 */
export function statusCodeFromFlags({
  hasError,
  stopped,
  stopping = false,
  pct,
}) {
  if (hasError) return SUBMIT_STATUS_CODE.ERROR;
  if (stopping) return SUBMIT_STATUS_CODE.STOPPING;
  if (stopped) return SUBMIT_STATUS_CODE.STOPPED;
  if (pct === 100) return SUBMIT_STATUS_CODE.COMPLETED;
  if (pct > 0) return SUBMIT_STATUS_CODE.IN_PROGRESS;
  return SUBMIT_STATUS_CODE.PENDING;
}

/**
 * API progress_status를 우선 사용하고, 없으면 flags로 산출.
 */
export function resolveSubmitStatusCode(progressStatus, flags) {
  const fromApi = normalizeStatusCode(progressStatus);
  if (fromApi !== null) return fromApi;
  return statusCodeFromFlags(flags);
}

/** 스피너/경과시간 표시용: 대기·진행·중단중 */
export function isActiveSubmitStatus(code) {
  const n = normalizeStatusCode(code);
  return (
    n === SUBMIT_STATUS_CODE.PENDING ||
    n === SUBMIT_STATUS_CODE.IN_PROGRESS ||
    n === SUBMIT_STATUS_CODE.STOPPING
  );
}
