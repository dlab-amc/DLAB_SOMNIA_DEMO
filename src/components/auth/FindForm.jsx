import React, { useState } from 'react';
import S from './FindForm.styled';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import { VALID_CHECK_REGEX, FIND_FORM_INFO } from '../../assets/data/signup';
import { useI18n } from '../../assets/i18n';

const FindForm = ({ type }) => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    findIdName: '',
    findIdEmail: '',
    findPasswordId: '',
    findPasswordEmail: '',
    findPasswordAuth: '',
  });
  const [isAuthMailSent, setAuthMailSent] = useState(false);
  const [isAuthMailChecked, setAuthMailChecked] = useState(false);
  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  const handleClickFunctions = {
    handleClickFindId: () => {
      if (!inputValues.findIdName || !inputValues.findIdEmail) return;
      fetchFindIdAPI();
    },
    handleClickFindPassword: () => {
      if (!inputValues.findPasswordId || !inputValues.findPasswordEmail) return;
      fetchFindPasswordAPI();
    },
    handleClickAuthSend: () => {
      if (!inputValues.findPasswordEmail) return;
      fetchSendAuthAPI();
    },
    handleClickAuthCheck: () => {
      if (!inputValues.findPasswordAuth) return;
      fetchCheckAuthAPI();
    },
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const fetchFindIdAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        name: inputValues.findIdName.trim(),
        email: inputValues.findIdEmail.trim(),
      };
      const response = await axios.post(`${BACKEND_URL}/id/find`, params);

      if (response.data.status === 200) {
        navigate('/find/id/result', {
          state: {
            id: response.data.data.login_id,
            date: response.data.data.create_time,
          },
        });
        dispatch(setLoading(false));
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

  const fetchFindPasswordAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        login_id: inputValues.findPasswordId.trim(),
        email: inputValues.findPasswordEmail.trim(),
        is_email_verified: 1,
      };
      const response = await axios.post(`${BACKEND_URL}/password/find`, params);
      if (response.data.status === 200) {
        navigate('/change/password', {
          state: {
            id: inputValues.findPasswordId,
          },
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
    }
  };

  const fetchSendAuthAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        email: inputValues.findPasswordEmail.trim(),
        login_id: inputValues.findPasswordId.trim(),
      };
      const response = await axios.post(
        `${BACKEND_URL}/user/password/auth`,
        params
      );
      if (response.data.status === 200) setAuthMailSent(true);

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: ` ${error.response.data.error.message}`,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng), error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      }
    }
  };

  const fetchCheckAuthAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        auth_number: inputValues.findPasswordAuth.trim(),
        email: inputValues.findPasswordEmail.trim(),
      };
      const response = await axios.post(`${BACKEND_URL}/check/auth`, params);

      dispatch(setLoading(false));

      if (response.data.status === 200) setAuthMailChecked(true);
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: ` ${error.response.data.error.message}`,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng), error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.PageShell>
      <S.Container>
        <S.FormCard>
          <h2 className='find-title'>{tf(FIND_FORM_INFO[type].title, FIND_FORM_INFO[type].title_eng)}</h2>
          <p className='find-desc'>{tf(FIND_FORM_INFO[type].desc, FIND_FORM_INFO[type].desc_eng)}</p>
          <div className='inputs-wrap'>
        {FIND_FORM_INFO[type].inputs.map((input, index) => (
          <div className='input-wrap' key={index}>
            <label className='label' htmlFor={input.id}>
              {tf(input.label, input.label_eng)}
              {input.id === 'findPasswordEmail' && isAuthMailSent && (
                <span className='message'>{tf('인증 메일이 발송되었습니다.', 'A verification email has been sent.')}</span>
              )}
              {input.id === 'findPasswordAuth' && isAuthMailChecked && (
                <span className='message'>{tf('인증이 완료되었습니다.', 'Verification completed.')}</span>
              )}
            </label>
            <div className='inputs'>
              <input
                type='text'
                className='input'
                id={input.id}
                name={input.id}
                placeholder={tf(input.placeholder, input.placeholder_eng)}
                value={inputValues[input.id]}
                onChange={handleChangeInput}
                disabled={
                  input.button?.clickFunc === 'handleClickAuthCheck' &&
                  !isAuthMailSent
                }
                autoComplete='off'
              />
              {input.button ? (
                input.button?.clickFunc === 'handleClickAuthSend' ? (
                  <button
                    className='input-button'
                    disabled={
                      !VALID_CHECK_REGEX.userEmail.test(
                        inputValues.findPasswordEmail
                      ) || isAuthMailSent
                    }
                    onClick={handleClickFunctions[input.button.clickFunc]}
                  >
                    {isAuthMailSent ? tf('전송 완료', 'Sent') : tf('인증번호 전송', 'Send Code')}
                  </button>
                ) : (
                  <button
                    className='input-button'
                    disabled={
                      !VALID_CHECK_REGEX.authNumber.test(
                        inputValues.findPasswordAuth
                      ) || isAuthMailChecked
                    }
                    onClick={handleClickFunctions[input.button.clickFunc]}
                  >
                    {isAuthMailChecked ? tf('인증 완료', 'Verified') : tf('인증번호 확인', 'Verify Code')}
                  </button>
                )
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className='find-button-wrap'>
        <button
          id='herewego'
          className='find-button'
          onClick={handleClickFunctions[FIND_FORM_INFO[type].button.clickFunc]}
          disabled={
            type === 'id'
              ? !(
                  VALID_CHECK_REGEX.userName.test(inputValues.findIdName) &&
                  VALID_CHECK_REGEX.userEmail.test(inputValues.findIdEmail)
                )
              : !(
                  VALID_CHECK_REGEX.userId.test(inputValues.findPasswordId) &&
                  VALID_CHECK_REGEX.userEmail.test(
                    inputValues.findPasswordEmail
                  ) &&
                  isAuthMailSent &&
                  isAuthMailChecked
                )
          }
        >
          {tf(FIND_FORM_INFO[type].button.text, FIND_FORM_INFO[type].button.text_eng)}
        </button>
      </div>
      {FIND_FORM_INFO[type].links && (
        <div className='footer-link-wrap'>
          {FIND_FORM_INFO[type].links.map((link, index) => (
            <Link className='link' to={link.path} key={index}>
              {tf(link.text, link.text_eng)}
            </Link>
          ))}
        </div>
      )}
        </S.FormCard>
        {isLoading && <Loading />}
        {isVisibleModal && <Modal />}
      </S.Container>
    </S.PageShell>
  );
};

export default FindForm;
