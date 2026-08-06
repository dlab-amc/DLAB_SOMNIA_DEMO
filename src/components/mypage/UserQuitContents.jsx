import React, { useEffect, useState } from 'react';
import S from './UserQuitContents.styled';
import {
  useNavigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import axios from 'axios';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import { userLogout } from '../../stores/user/user.slice';
import { ReactComponent as Check } from '../../assets/resource/icons/check.svg';
import PrevNextBar from '../common/PrevNextBar';
import { useI18n } from '../../assets/i18n';

const UserQuitContents = () => {
  const { tf } = useI18n();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userPassword, setUserPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [userQuited, setUserQuited] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );

  useEffect(() => {
    // Redirect After Modal Closed
    if (!userQuited) return;
    if (userQuited && !isVisibleModal) {
      navigate('/');
      dispatch(userLogout());
    }
  }, [userQuited, isVisibleModal]);

  const token = useAppSelector((state) => state.userSlice.user.token);

  const handleChangeCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const handleChangeInput = (e) => {
    setUserPassword(e.target.value);
  };

  const handleClickQuitButton = () => {
    if (!isChecked || userPassword.length < 8 || !token) return;
    fetchUserQuitAPI();
  };

  const fetchUserQuitAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        login_pw: userPassword,
      };
      const response = await axios.post(
        `${BACKEND_URL}/user/account/quit`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        setUserQuited(true);
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('안내','Notice'),
            text: tf('회원 탈퇴 완료되었습니다.','Your account has been deleted.'),
            isScrollable: false,
          })
        );
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.__authHandled) return;
      const msg =
        error.response?.data?.error?.message ||
        tf('비밀번호가 올바르지 않습니다. 다시 입력해 주세요.', 'Incorrect password. Please try again.');
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf('에러', 'Error'),
          text: msg,
          isScrollable: false,
        })
      );
    }
  };

  return (
    <S.Container>
      <h2 className='title'>{tf('회원 탈퇴','Delete Account')}</h2>
      <div className='quit-contents-wrap'>
        <h3 className='quit-contents-title'>{tf('회원 탈퇴 안내','Account Deletion Guide')}</h3>
        <div className='quit-contents-desc'>
          {tf('회원 탈퇴 진행 전, 탈퇴 시 유의사항을 확인해주세요.','Please review the following before proceeding.')}
        </div>

        <div className='quit-warning-text'>
          <div className='about-wrap'>
            <p className='about'>
              {tf('탈퇴 시 회원정보 및 서비스 이용 데이터가 ','When deleting your account, all personal information and usage data ')}
              <strong className='bold'>{tf('모두 삭제','will be deleted')}</strong>{tf('됩니다.','.')}
            </p>
            <p className='about'>{tf('삭제된 데이터는 복구되지 않습니다.','Deleted data cannot be recovered.')}</p>
          </div>
          <ul className='about-list'>
            <li className='about-element'>{tf('제출 내역이 모두 삭제됩니다.','All submission history will be deleted.')}</li>
            <li className='about-element'>
              {tf('제출 결과 및 분석 리포트 데이터가 모두 삭제됩니다.','All results and report data will be deleted.')}
            </li>
            <li className='about-element'>
              {tf('사용자 이용 내역, 알림 데이터가 모두 삭제됩니다.','All usage history and notification data will be deleted.')}
            </li>
          </ul>
        </div>

        <div className='quit-form-wrap'>
          <div className='quit-agree-form'>
            <input
              className='input'
              type='checkbox'
              id='quitAgree'
              checked={isChecked}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor='quitAgree' className='checkbox'>
              {isChecked && <Check />}
            </label>
            <label htmlFor='quitAgree' className='label'>
              {tf('탈퇴 시 유의사항을 확인하였으며, 데이터 삭제에 동의합니다.','I agree to the terms and understand that all data will be deleted.')}
            </label>
          </div>
          <div className='password-form'>
            <div className='desc'>{tf('비밀번호 입력 후, 탈퇴하기를 눌러주세요.','Enter your password and click Delete.')}</div>
            <input
              type='password'
              className='input'
              id='quitPassword'
              placeholder={tf('비밀번호 입력','Enter password')}
              autoComplete='off'
              value={userPassword}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>
      <PrevNextBar
        prev='/mypage'
        prevText={tf('이전','Prev')}
        next={handleClickQuitButton}
        nextText={tf('탈퇴하기','Delete')}
        nextDisabled={!isChecked || userPassword.length < 8}
      />
      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default UserQuitContents;
