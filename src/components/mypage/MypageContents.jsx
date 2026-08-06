import React, { useEffect, useState } from 'react';
import S from './MypageContents.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import axios from 'axios';
import Loading from '../common/Loading';
import {
  setLoading,
  setVisibleModal,
  toggleEditedMode,
} from '../../stores/common/common.slice';
import { USER_ACCOUNT_TYPE_STRING } from '../../assets/data/data';
import { Link } from 'react-router-dom';
import { ReactComponent as Expand } from '../../assets/resource/icons/expand.svg';
import Modal from '../common/Modal';
import { useI18n } from '../../assets/i18n';

const MypageContents = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const [userInfoList, setUserInfoList] = useState();
  const [submitInfo, setSubmitInfo] = useState();
  const [changedTel, setChangedTel] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isAuthMailSent, setAuthMailSent] = useState(false);
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isAuthCorrect, setAuthCorrect] = useState(false);
  const [isTelChanged, setTelChanged] = useState(false);
  const [isMailChanged, setMailChanged] = useState(false);
  const [isEditable, setEditable] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const { token, userId } = useAppSelector((state) => state.userSlice.user);
  const { isLoading, isEditedMode, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );

  useEffect(() => {
    if (!token || !userId) return;
    fetchGetUserInfoAPI();
  }, []);

  useEffect(() => {
    if (userInfoList && userInfoList.phone_number && userInfoList.email) {
      setChangedTel(userInfoList.phone_number);
      setChangedEmail(userInfoList.email);
    }
  }, [userInfoList]);

  useEffect(() => {
    if (isMailChanged || isTelChanged) {
      setEditable(true);
    }
  }, [isMailChanged, isTelChanged]);

  const resetInputDatas = () => {
    setChangedTel(userInfoList.phone_number);
    setChangedEmail(userInfoList.email);
    setAuthNumber('');
    setAuthMailSent(false);
    setTelChanged(false);
    setMailChanged(false);
  };

  //  Event Handler
  const handleClickEditButton = () => {
    dispatch(toggleEditedMode(!isEditedMode));
  };

  const handleClickCancelButton = () => {
    dispatch(toggleEditedMode(!isEditedMode));
    // Reset
    resetInputDatas();
  };

  const handleClickSaveButton = () => {
    if (!token) return;
    const params = {
      new_tel: isTelChanged ? changedTel : null,
      new_email: isMailChanged ? changedEmail : null,
    };

    if (fetchPatchUserInfoAPI(params)) {
      // Success
      resetInputDatas();
      dispatch(toggleEditedMode(false));
    } else {
      // Failure
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'editTel') {
      setChangedTel(value);
      if (isTelChanged) {
        setTelChanged(false);
      }
    } else if (name === 'editEmail') {
      setChangedEmail(value);
      if (isMailChanged) {
        setMailChanged(false);
      }
    } else {
      // name === "editAuth"
      setAuthNumber(value);
    }
  };

  const handleClickCheckTel = () => {
    const params = {
      phone_number: changedTel,
    };
    fetchCheckAPI('/check/tel', params);
  };

  const handleClickCheckEmail = () => {
    if (!changedEmail) return;
    const params = {
      email: changedEmail,
    };
    fetchCheckAPI('/user/profile/auth', params, token);
  };

  const handleClickCheckAuth = () => {
    const params = {
      auth_number: authNumber,
      email: changedEmail,
    };
    fetchCheckAPI('/check/auth', params);
    setAuthChecked(true);
  };

  // API Fetch
  const fetchGetUserInfoAPI = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data.user;
      const submitData = response.data.data.submit;
      if (response.data.status === 200 && userData && submitData) {
        setUserInfoList(userData);
        setSubmitInfo(submitData);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: `${error.response.data.error.message}`,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      }
    }
  };

  const fetchCheckAPI = async (path, params, token = null) => {
    try {
      dispatch(setLoading(true));
      if (path === '/check/tel') {
        const response = await axios.post(`${BACKEND_URL}${path}`, params);
        if (response.data.status === 200) {
          setTelChanged(true);
        }
      } else if (path === '/user/profile/auth') {
        const response = await axios.post(`${BACKEND_URL}${path}`, params, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === 200) {
          setAuthMailSent(true);
        }
      } else {
        // path === "/check/auth"
        const response = await axios.post(`${BACKEND_URL}${path}`, params);
        if (response.data.status === 200) {
          setMailChanged(true);
          setAuthCorrect(true);
        } else {
          setAuthCorrect(false);
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      // 429 등(/auth) 처리 필요  - API 추가 개발 후 진행

      if (error.response.data.error.message) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: `${error.response.data.error.message}`,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      } else {


      }
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf('에러', 'Error'),
          text: ` ${error.response.data.error.message}`,
          isScrollable: false,
        })
      );
    }
  };

  const fetchPatchUserInfoAPI = async (params) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.patch(
        `${BACKEND_URL}/user/profile`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        dispatch(setLoading(false));
        return true;
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: '에러',
          text: ` ${error.response.data.error.message}`,
          isScrollable: false,
        })
      );
    }
  };

  return (
    <S.Container>
      <h2 className='mypage-title'>{tf('마이페이지','My Page')}</h2>
      <S.UserInfoContainer>
        <div className='container-header'>
          <h3 className='container-title'>{tf('회원 정보','User Info')}</h3>
          {isEditedMode ? (
            <div className='button-wrap'>
              <button
                className='cancel-button'
                onClick={handleClickCancelButton}
              >
                {tf('취소','Cancel')}
              </button>
              <button
                className='save-button'
                onClick={handleClickSaveButton}
                disabled={!isEditable}
              >
                {tf('저장','Save')}
              </button>
            </div>
          ) : (
            <button className='edit-button' onClick={handleClickEditButton}>
              {tf('편집','Edit')}
            </button>
          )}
        </div>
        <div className='user-info-wrap'>
          <div className='user-info'>
            <span className='label'>{tf('회원 구분','Account Type')}</span>
            <span className='data'>
              {userInfoList
                ? tf(USER_ACCOUNT_TYPE_STRING[userInfoList.user_type], userInfoList.user_type)
                : ''}
            </span>
          </div>
          <div className='user-info'>
            <span className='label'>{tf('성명','Name')}</span>
            <span className='data'>
              {userInfoList ? userInfoList.name : ''}
            </span>
          </div>
          <div className='user-info'>
            <span className='label'>{tf('아이디','ID')}</span>
            <span className='data'>{userInfoList ? userId : ''}</span>
          </div>
          <div className='user-info'>
            <span className='label'>{tf('전화번호','Phone')}</span>
            {userInfoList ? (
              isEditedMode ? (
                <div className='input-form'>
                  <input
                    className='input'
                    type='text'
                    name='editTel'
                    id='editTel'
                    placeholder={tf('전화번호 입력','Enter phone number')}
                    onChange={handleChangeInput}
                    value={changedTel}
                    autoComplete='off'
                  />
                  <button
                    className='check-button'
                    disabled={
                      userInfoList.phone_number === changedTel || isTelChanged
                    }
                    onClick={handleClickCheckTel}
                  >
                    {isTelChanged ? tf('확인 완료','Confirmed') : tf('중복 확인','Check')}
                  </button>
                  {isTelChanged && (
                    <span className='message'>{tf('변경되었습니다.','Updated')}</span>
                  )}
                </div>
              ) : (
                <span className='data'>{userInfoList.phone_number}</span>
              )
            ) : (
              ''
            )}
          </div>
          <div className={`user-info ${isAuthMailSent && 'email'}`}>
            <span className='label'>{tf('이메일 주소','Email')}</span>
            {isEditedMode ? (
              <div className='input-form-wrap'>
                <div className='input-form'>
                  <input
                    className='input'
                    type='text'
                    name='editEmail'
                    id='editEmail'
                    placeholder={tf('이메일 입력','Enter email')}
                    onChange={handleChangeInput}
                    value={changedEmail}
                    autoComplete='off'
                  />
                  <button
                    className='check-button'
                    disabled={
                      userInfoList?.email === changedEmail || isAuthMailSent
                    }
                    onClick={handleClickCheckEmail}
                  >
                    {isAuthMailSent ? tf('전송 완료','Sent') : tf('인증번호 전송','Send code')}
                  </button>
                  {isAuthMailSent && (
                    <span className='message'>{tf('인증 메일이 전송되었습니다.','Verification email sent.')}</span>
                  )}
                </div>
                {isAuthMailSent && (
                  <div className='input-form'>
                    <input
                      className='input'
                      type='text'
                      name='editAuth'
                      id='editAuth'
                      placeholder={tf('인증번호 입력','Enter code')}
                      onChange={handleChangeInput}
                      value={authNumber}
                      autoComplete='off'
                    />
                    <button
                      className='check-button'
                      disabled={authNumber.length !== 6 || isMailChanged}
                      onClick={handleClickCheckAuth}
                    >
                      {isMailChanged ? tf('인증 완료','Verified') : tf('인증','Verify')}
                    </button>
                    {isMailChanged && (
                      <span className='message'>{tf('변경되었습니다.','Updated')}</span>
                    )}
                    {isAuthChecked && !isAuthCorrect && (
                      <span className='message'>
                        {tf('인증번호가 일치하지 않습니다.','Verification code does not match.')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <span className='data'>{userInfoList?.email}</span>
            )}
          </div>
          {userInfoList?.organization &&
            userInfoList.organization.trim() !== '' && (
              <div className='user-info'>
                <span className='label'>{tf('소속','Organization')}</span>
                <span className='data'>{userInfoList.organization}</span>
              </div>
            )}
          {userInfoList
            ? userInfoList.business_info && (
                <>
                  <div className='user-info'>
                    <span className='label'>{tf('기업명','Company')}</span>
                    <span className='data'>
                      {userInfoList.business_info.business_name}
                    </span>
                  </div>
                  <div className='user-info'>
                    <span className='label'>{tf('부서 및 소속','Department')}</span>
                    <span className='data'>
                      {userInfoList.business_info.department}
                    </span>
                  </div>
                  {userInfoList.business_info.business_tel && (
                    <div className='user-info'>
                      <span className='label'>{tf('기업 전화번호','Company Phone')}</span>
                      <span className='data'>
                        {userInfoList.business_info.business_tel}
                      </span>
                    </div>
                  )}
                  <div className='user-info'>
                    <span className='label'>{tf('기업 주소지','Company Address')}</span>
                    <span className='data'>
                      {userInfoList.business_info.business_address}
                    </span>
                  </div>
                </>
              )
            : ''}
          <Link className='change-button' to='/mypage/password'>
            {tf('비밀번호 변경','Change password')}
          </Link>
        </div>
      </S.UserInfoContainer>
      <S.SubmitContainer>
        <div className='container-header'>
          <h3 className='container-title tab'>{tf('이용 정보','Usage Info')}</h3>
        </div>
        <div className='submit-info-wrap'>
          <div className='submit-info'>
            <div className='label'>{tf('전체 제출','Total Submissions')}</div>
            <div className='data'>
              <span className='number'>
                {submitInfo?.total_count ? submitInfo.total_count : 0}
              </span>
              <span className='unit'>{tf('건','')}</span>
            </div>
          </div>
          <div className='submit-info'>
            <div className='label'>{tf('신규 알림','New Notifications')}</div>
            <div className='data'>
              <span className='number'>
                {submitInfo?.new_notification_count
                  ? submitInfo.new_notification_count
                  : 0}
              </span>
              <span className='unit'>{tf('건','')}</span>
            </div>
          </div>
          <div className='submit-info'>
            <div className='label'>{tf('신규 제출','New Submission')}</div>
            <div className='data'>
              <Link className='submit-button' to='/submit/details'>
                {tf('제출하기','Submit')}
                <Expand />
              </Link>
            </div>
          </div>
        </div>
      </S.SubmitContainer>
      <S.Footer>
        <Link className='quit-button' to='/mypage/quit'>
          {tf('회원 탈퇴하기','Delete Account')}
        </Link>
      </S.Footer>
      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default MypageContents;
