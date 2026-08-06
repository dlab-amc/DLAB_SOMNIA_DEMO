import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../assets/hooks/useRedux';
import {
  consumeAuthRedirectPath,
  resetAuthHandling,
} from '../../utils/setupAxiosAuth';

/**
 * 401 처리 후 모달이 닫히면 로그인 페이지로 이동.
 */
const AuthRedirectWatcher = () => {
  const navigate = useNavigate();
  const isVisibleModal = useAppSelector(
    (state) => state.commonSlice.isVisibleModal
  );
  const wasVisibleRef = useRef(isVisibleModal);

  useEffect(() => {
    const wasVisible = wasVisibleRef.current;
    wasVisibleRef.current = isVisibleModal;

    if (wasVisible && !isVisibleModal) {
      const to = consumeAuthRedirectPath();
      if (to) {
        resetAuthHandling();
        navigate(to, { replace: true });
      }
    }
  }, [isVisibleModal, navigate]);

  return null;
};

export default AuthRedirectWatcher;
