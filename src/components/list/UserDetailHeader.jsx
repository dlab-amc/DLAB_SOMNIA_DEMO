import React from 'react';
import S from './UserDetailHeader.styled';
import { Link } from 'react-router-dom';
import { ReactComponent as Alarm } from '../../assets/resource/icons/alarm.svg';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { setVisibleNotificationModal } from '../../stores/common/common.slice';

const UserDetailHeader = ({ page }) => {
  // page = 'total' | 'pending'
  const dispatch = useAppDispatch();
  const { currentPageList, currentUserIndex } = useAppSelector(
    (state) => state.listSlice
  );

  const handleClickSendNotification = () => {
    if (!currentPageList.length || currentUserIndex < 0) return;
    const userId = currentPageList[currentUserIndex].user_id;
    const userName = currentPageList[currentUserIndex].name;
    dispatch(
      setVisibleNotificationModal({
        isVisible: true,
        userId,
        userName,
      })
    );
  };

  return (
    <S.Container>
      <div className='header-contents-wrap'>
        <div className='header-button-wrap'>
          <Link className='back-button' to='/admin/user'>
            뒤로가기
          </Link>
        </div>
        <div className='header-title-wrap'>
          <h2 className='header-title'>
            {page === 'total' ? '회원 정보 상세' : '가입 대기 회원 정보 상세'}
          </h2>
        </div>
        <div className='notification-button-wrap'>
          {page === 'total' && (
            <button
              className='notification-button'
              onClick={handleClickSendNotification}
            >
              <span className='icon'>
                <Alarm />
              </span>
              <span className='text'>알림 보내기</span>
            </button>
          )}
        </div>
      </div>
    </S.Container>
  );
};

export default UserDetailHeader;
