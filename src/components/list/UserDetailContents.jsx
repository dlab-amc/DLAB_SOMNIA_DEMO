import React, { use, useEffect, useState } from 'react';
import S from './UserDetailContents.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import Modal from '../common/Modal';
import {
  USER_ACCOUNT_TYPE,
  USER_ACCOUNT_TYPE_STRING,
  USER_GRADE_STRING,
  USER_TYPE,
} from '../../assets/data/data';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import { useNavigate } from 'react-router-dom';
import { getMinimizedFileName } from '../../assets/module/module';
import axios from 'axios';
import { useI18n } from '../../assets/i18n';

const UserDetailContents = ({ page }) => {
  // page = 'total' | 'pending'
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isVisibleModal, isVisibleNotificationModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const { currentPageList, currentUserIndex } = useAppSelector(
    (state) => state.listSlice
  );
  const adminToken = useAppSelector((state) => state.userSlice.admin.token);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isSessionEnd, setSessionEnd] = useState(false);
  const [isPendingChecked, setPendingChecked] = useState(false); // 승인 or 거절 여부
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  const fetchAndDownloadFile = async (loginId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/business/registration`,
        { login_id: loginId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data?.data?.file_content && response.data?.data?.filename) {
        const { file_content, filename } = response.data.data;

        // Decode Base64 content to a Blob
        const binary = atob(file_content);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], {
          type: 'application/octet-stream',
        });

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      // Show error modal or notification here if needed
    }
  };

  useEffect(() => {
    if (currentUserIndex < 0 || !currentPageList.length) {
      // error handling (유효하지 않은 인덱스 or 리스트 X)
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf('에러', 'Error'),
          text: tf('세션이 만료되었습니다. 회원 리스트로 이동합니다.', 'Your session has expired. Redirecting to the member list.') ,
          isScrollable: false,
        })
      );
      setSessionEnd(true);
      return;
    }
    setCurrentUserInfo(currentPageList[currentUserIndex]);
  }, [currentPageList, currentUserIndex]);

  useEffect(() => {
    if (isSessionEnd && !isVisibleModal) {
      navigate('/admin/user');
      setSessionEnd(false);
    }
  }, [isVisibleModal, isSessionEnd]);

  useEffect(() => {
    if (isPendingChecked && !isVisibleModal) {
      navigate('/admin/user');
      setPendingChecked(false);
    }
  }, [isVisibleModal, isPendingChecked]);

  const handleClickButton = (status) => {
    if (!currentUserInfo) return;
    fetchPatchUserPendingAPI(status);
  };

  const fetchPatchUserPendingAPI = async (status) => {
    // 승인 or 거절 처리 (0 = 거절 / 2 = 승인)
    try {
      dispatch(setLoading(true));
      const params = {
        login_id: currentUserInfo.user_id,
        pending_status: status,
      };
      const response = await axios.patch(
        `${BACKEND_URL}/user/pending`,
        params,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        // Success - Temp
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('안내', 'Info'),
            text:
              status === 0
                ? tf('가입 거절 처리되었습니다.', 'Registration has been rejected.')
                : tf('가입 승인 처리되었습니다.', 'Registration has been approved.'),
            isScrollable: false,
          })
        );
        setPendingChecked(true);
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
      <div className='detail-contents-wrap'>
        <div className='user-info-wrap'>
          <div className='user-info-title'>
            <h3 className='title'>회원 정보</h3>
          </div>
          <table className='user-info-table'>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{currentUserInfo?.user_id}</td>
                <th>성함</th>
                <td>{currentUserInfo?.name}</td>
              </tr>
              <tr>
                <th>회원 구분</th>
                <td>
                  {currentUserInfo?.user_type &&
                    USER_ACCOUNT_TYPE_STRING[currentUserInfo.user_type]}
                </td>
                <th>가입 일시</th>
                <td>
                  {currentUserInfo?.create_time &&
                    new Date(currentUserInfo.create_time).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{currentUserInfo?.phone_number}</td>
                <th>이메일</th>
                <td>{currentUserInfo?.email}</td>
              </tr>
              {page === 'total' && (
                <tr>
                  <th className='span-row'>회원 등급</th>
                  <td colSpan='3'>
                    {currentUserInfo?.membership_level &&
                      USER_GRADE_STRING[currentUserInfo.membership_level]}
                  </td>
                </tr>
              )}
              {currentUserInfo?.user_type === USER_ACCOUNT_TYPE.PERSONAL && (
                <tr>
                  <th className='span-row'>소속 기관</th>
                  <td colSpan='3'>{currentUserInfo?.organization}</td>
                </tr>
              )}
              {currentUserInfo?.user_type === USER_ACCOUNT_TYPE.BUSINESS &&
                currentUserInfo?.business_info && (
                  <>
                    <tr>
                      <th>기업명</th>
                      <td>{currentUserInfo?.business_info?.business_name}</td>
                      <th>부서 및 소속</th>
                      <td>{currentUserInfo?.business_info?.department}</td>
                    </tr>
                    <tr>
                      <th>기업 주소지</th>
                      <td>
                        {currentUserInfo?.business_info?.business_address}
                      </td>
                      <th>기업 전화번호</th>
                      <td>{currentUserInfo?.business_info?.business_tel}</td>
                    </tr>
                    <tr>
                      <th>사업자 번호</th>
                      <td>
                        {
                          currentUserInfo?.business_info
                            ?.business_registration_number
                        }
                      </td>
                      <th>사업자 등록증</th>
                      <td>
                        {currentUserInfo?.business_info?.business_file_name ? (
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              fetchAndDownloadFile(currentUserInfo?.user_id);
                            }}
                            className='file-download-link'
                          >
                            {getMinimizedFileName(
                              currentUserInfo.business_info.business_file_name
                            )}
                          </a>
                        ) : (
                          '파일 없음'
                        )}
                      </td>
                    </tr>
                  </>
                )}
            </tbody>
          </table>
        </div>
        {page === 'total' && (
          <div className='submit-info-wrap'>
            <div className='submit-info-title'>
              <h3 className='title'>제출 정보</h3>
            </div>
            <table className='submit-info-table'>
              <tbody>
                <tr>
                  <th className='span-row'>진행중</th>
                  <td>
                    {currentUserInfo?.user_submit_detail?.progress || '0'}건
                  </td>
                </tr>
                <tr>
                  <th className='span-row'>완료</th>
                  <td>{currentUserInfo?.user_submit_detail?.done || '0'}건</td>
                </tr>
                <tr>
                  <th className='span-row'>에러</th>
                  <td>{currentUserInfo?.user_submit_detail?.error || '0'}건</td>
                </tr>
                <tr className='total'>
                  <th>전체</th>
                  <td>
                    총{' '}
                    {currentUserInfo?.user_submit_detail?.progress +
                      currentUserInfo?.user_submit_detail?.done +
                      currentUserInfo?.user_submit_detail?.error}
                    건
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {page === 'pending' && (
          <div className='button-wrap'>
            <button
              className='reject-button'
              onClick={() => handleClickButton(0)}
            >
              가입 거절하기
            </button>
            <button
              className='approve-button'
              onClick={() => handleClickButton(2)}
            >
              가입 승인하기
            </button>
          </div>
        )}
      </div>
      {isVisibleModal && <Modal />}
      {isVisibleNotificationModal && <Modal notification />}
    </S.Container>
  );
};

export default UserDetailContents;
