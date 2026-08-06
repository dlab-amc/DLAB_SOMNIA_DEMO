import React, { useState } from 'react';
import S from './ContactContents.styled';
import Modal from '../../components/common/Modal';
import Loading from '../common/Loading';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import axios from 'axios';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import { VALID_CHECK_REGEX } from '../../assets/data/signup';
import { useI18n } from '../../assets/i18n';
import { PLATFORM } from '../../config/platform';

const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

const ContactContents = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { isLoading, isVisibleModal, modalInfo } = useAppSelector(
    (state) => state.commonSlice
  );
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'message') {
      setMessage(value);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf('오류', 'Error'),
          text: tf('모든 필드를 작성해주세요.', 'Please fill in all fields.'),
          isScrollable: false,
        })
      );
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BACKEND_URL}/user/contact`, {
        email,
        message,
      });

      if (response.status === 200) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('성공', 'Success'),
            text: tf(
              '문의가 성공적으로 전송되었습니다.',
              'Your inquiry has been sent successfully.'
            ),
            isScrollable: false,
          })
        );
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        tf('서버 오류가 발생했습니다.', 'A server error has occurred.');
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf('전송 실패', 'Error'),
          text: errorMessage,
          isScrollable: false,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const isSubmitDisabled =
    !VALID_CHECK_REGEX.userEmail.test(email) || message.length <= 5;

  return (
    <S.PageShell>
      <S.Container>
        <S.FormCard>
          <h2 className='contact-title'>{tf('1:1 문의', 'Contact')}</h2>
          <p className='contact-desc'>
            {tf(
              '궁금하신 점이나 문제를 남겨주시면 입력한 이메일 주소로 답변드리겠습니다.',
              'Leave your questions or issues, and we will reply to the email you provide.'
            )}
          </p>
          <form onSubmit={handleInquirySubmit}>
            <div className='form-group'>
              <label htmlFor='email'>{tf('이메일 주소', 'Email address')}</label>
              <input
                type='email'
                id='email'
                placeholder={tf('이메일 주소 입력', 'Enter email address')}
                required
                onChange={handleChangeInput}
                value={email}
                autoComplete='email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='message'>{tf('문의 내용', 'Message')}</label>
              <textarea
                id='message'
                placeholder={tf('문의 내용 작성', 'Write your message')}
                required
                onChange={handleChangeInput}
                value={message}
                rows={6}
              />
            </div>
            <div className='button-wrap'>
              <button type='submit' disabled={isSubmitDisabled}>
                {tf('문의하기', 'Send inquiry')}
              </button>
            </div>
          </form>
        </S.FormCard>

        <S.InfoCard>
          <div className='info-row'>
            <div className='info-label'>{tf('주소', 'Address')}</div>
            <p className='info-value'>
              {tf(PLATFORM.contactAddressKo, PLATFORM.contactAddressEn)}
            </p>
          </div>
          <div className='info-row'>
            <div className='info-label'>{tf('이메일', 'Email')}</div>
            <a className='info-value' href={`mailto:${PLATFORM.contactEmail}`}>
              {PLATFORM.contactEmail}
            </a>
          </div>
        </S.InfoCard>

        {isLoading && <Loading />}
        {isVisibleModal && (
          <Modal
            title={modalInfo.title}
            text={modalInfo.text}
            isScrollable={modalInfo.isScrollable}
            onClose={() =>
              dispatch(
                setVisibleModal({ isVisible: false, title: '', text: '' })
              )
            }
          />
        )}
      </S.Container>
    </S.PageShell>
  );
};

export default ContactContents;
