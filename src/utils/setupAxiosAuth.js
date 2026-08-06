import axios from 'axios';
import { store } from '../stores';
import { userLogout, adminLogout } from '../stores/user/user.slice';
import { setVisibleModal, setLoading } from '../stores/common/common.slice';

const AUTH_REDIRECT_KEY = 'authRedirectTo';

/** 비밀번호 재확인용 API — 틀려도 401이지만 세션 만료가 아님 */
const CREDENTIAL_VERIFY_URL_HINTS = [
  '/user/account/quit',
  '/user/password',
];

let handling401 = false;

/** 로컬 catch에서 세션 만료 401을 중복 모달로 띄우지 않도록 */
export function isAuthErrorHandled(error) {
  return Boolean(error?.__authHandled);
}

export function resetAuthHandling() {
  handling401 = false;
}

function extract401Message(error) {
  const data = error?.response?.data;
  if (!data) return '';
  if (typeof data === 'string') return data;
  if (typeof data.detail === 'string') return data.detail;
  if (data.detail?.message) return String(data.detail.message);
  if (data.detail?.error?.message) return String(data.detail.error.message);
  if (data.error?.message) return String(data.error.message);
  if (data.message && data.message !== 'Unauthorized') return String(data.message);
  return '';
}

function isLoginPath(pathname) {
  const p = pathname || '';
  return p === '/login' || p.endsWith('/login') || p.includes('/signup');
}

function isCredentialVerification401(error) {
  const url = String(error?.config?.url || '');
  if (CREDENTIAL_VERIFY_URL_HINTS.some((hint) => url.includes(hint))) {
    return true;
  }
  const code = error?.response?.data?.error?.code;
  const message = extract401Message(error);
  return (
    code === 'AUTHENTICATION_FAILED' ||
    message.includes('비밀번호가 틀렸습니다')
  );
}

/**
 * 401 응답 시 세션 정리 + 안내 모달 후 로그인으로 리다이렉트할 준비.
 * (모달 닫힐 때 AuthRedirectWatcher가 navigate)
 * 단, 탈퇴/비밀번호 변경처럼 비밀번호 재확인 실패 401은 제외.
 */
export function setupAxiosAuthInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status !== 401) {
        return Promise.reject(error);
      }

      const pathname = window.location.pathname || '';
      if (isLoginPath(pathname)) {
        return Promise.reject(error);
      }

      // 비밀번호 틀림 등 — 세션 유지, 페이지 catch에서 안내
      if (isCredentialVerification401(error)) {
        return Promise.reject(error);
      }

      error.__authHandled = true;

      if (handling401) {
        return Promise.reject(error);
      }
      handling401 = true;

      const isAdmin = pathname.includes('/admin');
      store.dispatch(isAdmin ? adminLogout() : userLogout());
      store.dispatch(setLoading(false));

      const serverMsg = extract401Message(error);
      const text =
        serverMsg ||
        '로그인 세션이 만료되었거나 유효하지 않습니다. 다시 로그인해 주세요.';

      store.dispatch(
        setVisibleModal({
          isVisible: true,
          title: '알림',
          text,
          isScrollable: false,
        })
      );

      sessionStorage.setItem(
        AUTH_REDIRECT_KEY,
        isAdmin ? '/admin/login' : '/login'
      );

      return Promise.reject(error);
    }
  );
}

export function consumeAuthRedirectPath() {
  const to = sessionStorage.getItem(AUTH_REDIRECT_KEY);
  if (to) sessionStorage.removeItem(AUTH_REDIRECT_KEY);
  return to;
}
