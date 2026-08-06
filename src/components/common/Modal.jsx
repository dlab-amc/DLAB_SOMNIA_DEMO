import React from 'react';
import S from './Modal.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import {
  changeNotificationText,
  setLoading,
  setVisibleModal,
  setVisibleNotificationModal,
  setVisibleUserInfoModal,
} from '../../stores/common/common.slice';
import { USER_ACCOUNT_TYPE_STRING } from '../../assets/data/data';
import Loading from './Loading';
import axios from 'axios';
import { useI18n } from '../../assets/i18n';
import { getLocalizedErrorMessage } from '../../assets/data/errorMessages';

const Modal = ({ notification, user }) => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { title, text, isScrollable } = useAppSelector(
    (state) => state.commonSlice.modalInfo
  );
  const { userId, userName, textArea } = useAppSelector(
    (state) => state.commonSlice.notificationModalInfo
  );
  const currentPageList = useAppSelector(
    (state) => state.listSlice.currentPageList
  );
  const userInfoModalIndex = useAppSelector(
    (state) => state.commonSlice.userInfoModalIndex
  );
  const isLoading = useAppSelector((state) => state.commonSlice.isLoading);
  const adminInfo = useAppSelector((state) => state.userSlice.admin);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  const handleCloseModal = () => {
    dispatch(
      setVisibleModal({
        isVisible: false,
        title: '',
        text: '',
        isScrollable: false,
      })
    );
  };

  const handleCloseNotification = () => {
    dispatch(
      setVisibleNotificationModal({
        isVisible: false,
        uesrId: '',
        userName: '',
      })
    );
    dispatch(changeNotificationText(''));
  };

  const handleCloseUser = () => {
    dispatch(
      setVisibleUserInfoModal({
        isVisible: false,
        index: -1,
      })
    );
  };

  const handleChangeTextArea = (e) => {
    dispatch(changeNotificationText(e.target.value));
  };

  const handleSendNotification = () => {
    if (!adminInfo.token || !userId || !textArea) return;
    fetchSendNotificationAPI();
  };

  const fetchSendNotificationAPI = async () => {
    try {
      dispatch(setLoading(true));
      const params = {
        from_id: adminInfo.userId,
        to_id: userId,
        message: textArea,
      };
      const response = await axios.post(`${BACKEND_URL}/notification`, params, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });
      if (response.data.status === 200) {
        dispatch(
          setVisibleNotificationModal({
            isVisible: false,
            uesrId: '',
            userName: '',
          })
        );
        dispatch(changeNotificationText(''));

        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('안내', 'Info'),
            text: tf('알림이 성공적으로 전송되었습니다.', 'The notification has been sent successfully.'),
            isScrollable: false,
          })
        );
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      dispatch(
        setVisibleNotificationModal({
          isVisible: false,
          uesrId: '',
          userName: '',
        })
      );
      dispatch(changeNotificationText(''));
      // Error Modal
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
    <S.FullScreen>
      {notification ? (
        // Notification
        <S.ModalContainer className='notification'>
          <div className='modal-header'>
            <h3 className='modal-title'>{tf('알림 전송하기','Send Notification')}</h3>
          </div>
          <div className='modal-contents-wrap'>
            <div className='modal-content'>
              <span className='label'>{tf('유저 ID','User ID')}</span>
              <span className='data'>{userId}</span>
            </div>
            <div className='modal-content'>
              <span className='label'>{tf('유저명','User Name')}</span>
              <span className='data'>{userName}</span>
            </div>
            <div className='modal-content'>
              <span className='label'>{tf('알림 내용','Message')}</span>
              <textarea
                className='textarea'
                value={textArea}
                onChange={handleChangeTextArea}
                placeholder={tf('알림 내용 입력','Enter message')}
              />
            </div>
          </div>
          <div className='buttons-wrap'>
            <button
              className='modal-close-button'
              onClick={handleCloseNotification}
            >
              {tf('취소','Cancel')}
            </button>
            <button
              className='send-button'
              onClick={handleSendNotification}
              disabled={textArea.length < 5}
            >
              {tf('전송','Send')}
            </button>
          </div>
        </S.ModalContainer>
      ) : user ? (
        // User Info
        <S.ModalContainer className='user'>
          <h3 className='modal-title'>{tf('회원정보 상세','User Info')}</h3>
          <div className='modal-contents-wrap'>
            <table className='info-table'>
              <tbody>
                <tr>
                  <td className='key'>{tf('회원 구분','Type')}</td>
                  <td className='value'>
                    {
                      USER_ACCOUNT_TYPE_STRING[
                        currentPageList[userInfoModalIndex]?.user_type
                      ]
                    }
                  </td>
                  <td className='key'>{tf('가입 일자','Joined')}</td>
                  <td className='value'>
                    {new Date(
                      currentPageList[userInfoModalIndex]?.create_time
                    ).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className='key'>{tf('성함','Name')}</td>
                  <td className='value'>
                    {currentPageList[userInfoModalIndex]?.name}
                  </td>
                  <td className='key'>ID</td>
                  <td className='value'>
                    {currentPageList[userInfoModalIndex]?.user_id}
                  </td>
                </tr>
                <tr>
                  <td className='key'>{tf('전화번호','Phone')}</td>
                  <td className='value'>
                    {currentPageList[userInfoModalIndex]?.phone_number}
                  </td>
                  <td className='key'>{tf('이메일주소','Email')}</td>
                  <td className='value'>
                    {currentPageList[userInfoModalIndex]?.email}
                  </td>
                </tr>
                {currentPageList[userInfoModalIndex]?.business_info && (
                  <>
                    <tr>
                      <td className='key'>{tf('기업명','Company')}</td>
                      <td className='value'>
                        {
                          currentPageList[userInfoModalIndex]?.business_info
                            .business_name
                        }
                      </td>
                      <td className='key'>{tf('부서 및 소속','Department')}</td>
                      <td className='value'>
                        {
                          currentPageList[userInfoModalIndex]?.business_info
                            .department
                        }
                      </td>
                    </tr>
                    {currentPageList[userInfoModalIndex]?.business_info
                      .business_tel && (
                      <tr>
                        <td className='key'>{tf('기업 연락처','Company Tel')}</td>
                        <td className='value'>
                          {
                            currentPageList[userInfoModalIndex]?.business_info
                              .business_tel
                          }
                        </td>
                        <td className='key'></td>
                        <td className='value'></td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>

            <button className='modal-close-button' onClick={handleCloseUser}>
              {tf('닫기','Close')}
            </button>
          </div>
        </S.ModalContainer>
      ) : (
        // Common
        <S.ModalContainer>
          <h3 className='modal-title'>
            {title === '알림' || title === 'Notice'
              ? tf('알림', 'Notice')
              : title === '에러' || title === 'Error'
                ? tf('에러', 'Error')
                : title === '안내' || title === 'Info'
                  ? tf('안내', 'Info')
                  : title}
          </h3>
          <div className={`modal-text ${isScrollable && 'scroll'}`}>
            {getLocalizedErrorMessage(text, tf) || text}
          </div>
          <button className='modal-close-button' onClick={handleCloseModal}>
            {tf('닫기','Close')}
          </button>
        </S.ModalContainer>
      )}
      {isLoading && <Loading />}
    </S.FullScreen>
  );
};

export default Modal;
