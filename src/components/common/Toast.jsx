import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { setVisibleToast } from '../../stores/common/common.slice';
import { ReactComponent as Info } from '../../assets/resource/icons/info.svg';
import { ReactComponent as Close } from '../../assets/resource/icons/close.svg';
import S from './Toast.styled';
import { useI18n } from '../../assets/i18n';
import { getLocalizedErrorMessage } from '../../assets/data/errorMessages';

const Toast = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { isVisibleToast, toastInfo } = useAppSelector(
    (state) => state.commonSlice
  );
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isVisibleToast) return;

    const autoCloseTimer = setTimeout(() => {
      setClosing(true);
    }, 7000);

    return () => clearTimeout(autoCloseTimer);
  }, [isVisibleToast]);

  useEffect(() => {
    if (!closing) return;

    const removeTimer = setTimeout(() => {
      dispatch(
        setVisibleToast({
          isVisible: false,
          text: '',
        })
      );
      setClosing(false);
    }, 300);

    return () => clearTimeout(removeTimer);
  }, [closing, dispatch]);

  const handleClose = () => {
    setClosing(true);
  };

  if (!isVisibleToast && !closing) return null;

  const raw = toastInfo?.text ?? '';
  const display = getLocalizedErrorMessage(raw, tf) || raw;

  return (
    <S.Container type={toastInfo?.type} closing={closing}>
      <div className='icon'>
        <Info />
      </div>
      <div className='text'>{display.replace(/\n/g, ' ')}</div>
      <button className='close-button' onClick={handleClose}>
        <Close />
      </button>
    </S.Container>
  );
};

export default Toast;
