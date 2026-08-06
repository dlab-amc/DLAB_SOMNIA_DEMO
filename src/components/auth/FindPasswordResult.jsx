import React, { useEffect, useState } from 'react';
import S from './FindPasswordResult.styled';
import { VALID_CHECK_REGEX } from '../../assets/data/signup';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import axios from 'axios';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import { useI18n } from '../../assets/i18n';

const FindPasswordResult = () => {
  const { tf } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = location?.state || '';
  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const [inputValues, setInputValues] = useState({
    changeNewPassword: '',
    changeNewPasswordCheck: '',
  });
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  useEffect(() => {
    // Check Id and Redirect
    if (!id) navigate('/')
  }, []);

  useEffect(() => {
    // Redirect After Modal Closed
    if (!isPasswordChanged) return;
    if (isPasswordChanged && !isVisibleModal) {
      navigate('/login');
    }
  }, [isPasswordChanged, isVisibleModal]);

  useEffect(() => {
    // Check PasswordCheck
    if (!inputValues.changeNewPasswordCheck) return;
    if (inputValues.changeNewPassword !== inputValues.changeNewPasswordCheck) {
      setPasswordChecked(false);
    } else {
      setPasswordChecked(true);
    }
  }, [inputValues]);


  const handleChangeInput = (e) => {
    const { id, value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClickChangeButton = () => {
    if (
      !inputValues.changeNewPassword ||
      !inputValues.changeNewPasswordCheck ||
      !id
    )
      return;

    fetchChangePasswordAPI();
  };

  const fetchChangePasswordAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        login_id: id,
        new_password: inputValues.changeNewPassword,
      };
      const response = await axios.patch(
        `${BACKEND_URL}/password/find`,
        params
      );
      dispatch(setLoading(false));
      if (response.data.status === 200) {
        setPasswordChanged(true);
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('안내', 'Info'),
            text: tf('비밀번호가 변경되었습니다. 로그인 화면으로 이동합니다.', 'Your password has been changed. Redirecting to the login page.'),
            isScrollable: false,
          })
        );
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: error.response.data.error.message,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng), error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.Container>
      <h2 className='title'>{tf('비밀번호 재설정', 'Reset Password')}</h2>
      <div className='desc-wrap'>
        <p className='desc'>{tf('인증이 완료되었습니다.', 'Verification has been completed.')}</p>
        <p className='desc'>{tf('새로운 비밀번호를 설정해주세요.', 'Please set a new password.')}</p>
      </div>

      <div className='password-form-wrap'>
        <div className='password-form'>
          <label className='label' htmlFor='changeNewPassword'>
            {tf('신규 비밀번호', 'New Password')}
            {!VALID_CHECK_REGEX.userPassword.test(inputValues.changeNewPassword) && (
              <span className='message'>
                {tf(
                  '문자, 숫자, 특수문자 포함 8~16자를 작성해주세요.',
                  'Enter 8–16 letters, numbers, and symbols.'
                )}
              </span>
            )}
          </label>
          <input
            id='changeNewPassword'
            className='input'
            type='password'
            placeholder={tf(
              '문자, 숫자, 특수문자 포함 8~16자',
              'Enter password (8–16 letters, numbers, and symbols)'
            )}
            onChange={handleChangeInput}
            value={inputValues.changeNewPassword}
          />
        </div>

        <div className='password-form'>
          <label className='label' htmlFor='changeNewPasswordCheck'>
            {tf('신규 비밀번호 확인', 'Confirm New Password')}
            {!isPasswordChecked && (
              <span className='message'>
                {tf('비밀번호가 일치하지 않습니다.', 'Passwords do not match.')}
              </span>
            )}
          </label>
          <input
            id='changeNewPasswordCheck'
            className='input'
            type='password'
            placeholder={tf(
              '신규 비밀번호 재입력',
              'Re-enter new password'
            )}
            onChange={handleChangeInput}
            value={inputValues.changeNewPasswordCheck}
          />
        </div>
      </div>

      <div className='button-wrap'>
        <button
          className='change-button'
          onClick={handleClickChangeButton}
          disabled={
            !(
              VALID_CHECK_REGEX.userPassword.test(inputValues.changeNewPassword) &&
              VALID_CHECK_REGEX.userPassword.test(inputValues.changeNewPasswordCheck)
            ) || !isPasswordChecked
          }
        >
          {tf('비밀번호 변경', 'Change Password')}
        </button>
      </div>

      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default FindPasswordResult;
