import React, { useEffect, useState, useCallback } from 'react';
import S from './LoginForm.styled';
import { Link, useNavigate } from 'react-router-dom';
import { USER_TYPE } from '../../assets/data/data';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import { adminLogin, userLogin } from '../../stores/user/user.slice';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import { useI18n } from '../../assets/i18n';
import { DEMO_ACCOUNTS } from '../../demo/fixtures';

const LoginForm = ({ userType }) => {
  const { tf, t } = useI18n();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    id: userType !== USER_TYPE.ADMIN ? DEMO_ACCOUNTS.user.login_id : '',
    password: userType !== USER_TYPE.ADMIN ? DEMO_ACCOUNTS.user.login_pw : '',
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL || 'https://demo.local';
  let { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!isButtonActive || !loginInfo.id || !loginInfo.password) return;

    // Fetch API
    fetchLoginAPI(userType);
  };

  const fetchLoginAPI = async (userType) => {
    dispatch(setLoading(true));
    try {
      const apiPath =
        userType === USER_TYPE.USER ? '/login/user' : '/login/admin';
      const redirectPath = userType === USER_TYPE.USER ? '/' : '/admin';
      // const tokenType = userType === USER_TYPE.USER ? 'userToken' : 'adminToken';

      const params = {
        login_id: loginInfo.id.trim(),
        login_pw: loginInfo.password.trim(),
      };
      const response = await axios.post(`${BACKEND_URL}${apiPath}`, params);
      const token = response.data.data.token;
      dispatch(setLoading(false));
      if (userType === USER_TYPE.USER) {
        dispatch(
          userLogin({
            userId: params.login_id,
            token: token,
          })
        );
      } else {
        dispatch(
          adminLogin({
            userId: params.login_id,
            token: token,
          })
        );
      }

      navigate(redirectPath);
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

  const checkInputValid = useCallback(() => {
    // Button Activate (Valid Check)
    if (
      loginInfo.id.trim().length >= 5 &&
      loginInfo.password.trim().length >= 8
    ) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [loginInfo.id, loginInfo.password]);

  useEffect(() => {
    checkInputValid();
  }, [checkInputValid]);

  return (
    <S.Background>
      <S.Container>
        <form className='login-form' onSubmit={handleSubmitForm}>
          <h2 className='login-title'>
            {userType === USER_TYPE.ADMIN
              ? tf('관리자 로그인', 'Admin Login')
              : tf('로그인', 'Login')}
          </h2>
          <label className='login-label' htmlFor='id'>
            {tf('아이디', 'ID')}
          </label>
          <input
            id='id'
            className='id'
            name='id'
            type='text'
            placeholder={tf('아이디를 입력하세요', 'Enter your ID')}
            onChange={handleChangeInput}
            autoComplete='off'
          />
          <label className='login-label' htmlFor='password'>
            {tf('비밀번호', 'Password')}
          </label>
          <input
            id='password'
            className='password'
            name='password'
            type='password'
            placeholder={tf('비밀번호를 입력하세요', 'Enter your password')}
            onChange={handleChangeInput}
            autoComplete='off'
          />
          {userType === USER_TYPE.USER ? (
            <div className='find-links'>
              <Link to='/find/id'>{tf('아이디 찾기', 'Find ID')}</Link>
              <Link to='/find/password'>{tf('비밀번호 찾기', 'Find Password')}</Link>
            </div>
          ) : (
            <div className='margin'></div>
          )}
          <button className='button login' disabled={!isButtonActive}>
            {tf('로그인', 'Login')}
          </button>
          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: '#4a6670',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            {tf(
              '데모 계정으로 로그인한 뒤 Submit → Report 흐름을 확인하세요.',
              'Sign in with the demo account, then walk through Submit → Report.'
            )}
          </p>
        </form>
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
      </S.Container>
      {isVisibleModal && <Modal />}
    </S.Background>
  );
};

export default LoginForm;
