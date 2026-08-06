import React, { useEffect, useState } from 'react';
import S from './ChangePasswordContents.styled';
import { VALID_CHECK_REGEX } from '../../assets/data/signup';
import {
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import Loading from '../common/Loading';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import axios from 'axios';
import Modal from '../common/Modal';
import PrevNextBar from '../common/PrevNextBar';
import { useI18n } from '../../assets/i18n';

const ChangePasswordContents = () => {
  const { tf } = useI18n();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputValues, setInputValues] = useState({
    changeCurrentPassword: '',
    changeNewPassword: '',
    changeNewPasswordCheck: '',
  });
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [passwordCheckChecked, setPasswordCheckChecked] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const token = useAppSelector((state) => state.userSlice.user.token);

  useEffect(() => {
    // Check PasswordCheck
    if (!inputValues.changeNewPassword || !inputValues.changeNewPasswordCheck)
      return;
    if (inputValues.changeNewPasswordCheck !== inputValues.changeNewPassword) {
      setPasswordCheckChecked(false);
    } else {
      setPasswordCheckChecked(true);
    }
  }, [inputValues]);

  useEffect(() => {
    // Redirect After Modal Closed
    if (!passwordChanged) return;
    if (passwordChanged && !isVisibleModal) {
      navigate('/mypage');
    }
  }, [passwordChanged, isVisibleModal]);

  const inputValidCheck = (value) => {
    const isValid = VALID_CHECK_REGEX.userPassword.test(value);
    setPasswordChecked(isValid);
  };

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (id === 'changeNewPassword') {
      inputValidCheck(value);
    }
  };

  const handleClickChangeButton = () => {
    if (!token) return;
    fetchChangePasswordAPI();
  };

  const fetchChangePasswordAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        current_password: inputValues.changeCurrentPassword,
        new_password: inputValues.changeNewPassword,
      };

      const response = await axios.patch(
        `${BACKEND_URL}/user/password`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setPasswordChanged(true);
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('안내','Notice'),
            text: tf('비밀번호가 변경되었습니다.','Password has been changed.'),
            isScrollable: false,
          })
        );
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러','Error'),
            text: `[${error.response.data.error?.code}] ${error.response.data.error?.message}`,
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.Container>
      <h2 className='title'>{tf('비밀번호 변경','Change Password')}</h2>
      <div className='input-forms-wrap'>
        <div className='input-form'>
          <label htmlFor='changeCurrentPassword' className='label'>
            {tf('기존 비밀번호','Current Password')}
          </label>
          <input
            className='input'
            id='changeCurrentPassword'
            type='password'
            placeholder={tf('기존 비밀번호 입력','Enter current password')}
            value={inputValues.changeCurrentPassword}
            onChange={handleChangeInput}
          />
        </div>
        <div className='input-form'>
          <label htmlFor='changeNewPassword' className='label'>
            <span className='text'>{tf('신규 비밀번호','New Password')}</span>
            {!passwordChecked && (
              <span className='error'>
                {tf('영어 대소문자, 숫자 포함 5~20자 입력해주세요.','5–20 letters/numbers required.')}
              </span>
            )}
          </label>
          <input
            className='input'
            id='changeNewPassword'
            type='password'
            placeholder={tf('신규 비밀번호 입력','Enter new password')}
            value={inputValues.changeNewPassword}
            onChange={handleChangeInput}
          />
        </div>
        <div className='input-form'>
          <label htmlFor='changeNewPasswordCheck' className='label'>
            {tf('신규 비밀번호 확인','Confirm New Password')}
            {inputValues.changeNewPasswordCheck && !passwordCheckChecked && (
              <span className='error'>{tf('비밀번호가 일치하지 않습니다.','Passwords do not match.')}</span>
            )}
          </label>
          <input
            className='input'
            id='changeNewPasswordCheck'
            type='password'
            placeholder={tf('신규 비밀번호 재입력','Re-enter new password')}
            value={inputValues.changeNewPasswordCheck}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <PrevNextBar
        prev='/mypage'
        prevText={tf('이전','Prev')}
        next={handleClickChangeButton}
        nextText={tf('변경', 'Change')}
        nextDisabled={
          !(
            inputValues.changeCurrentPassword.length >= 8 &&
            inputValues.changeNewPassword.length >= 8 &&
            inputValues.changeNewPasswordCheck.length >= 8 &&
            passwordCheckChecked &&
            passwordChecked
          )
        }
      />
      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default ChangePasswordContents;
