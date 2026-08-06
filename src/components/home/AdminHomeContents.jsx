import React, { useEffect, useState } from 'react';
import S from './AdminHomeContents.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setVisibleModal } from '../../stores/common/common.slice';
import Modal from '../common/Modal';
import { useI18n } from '../../assets/i18n';
import { PLATFORM } from '../../config/platform';
import { SUBMIT_STATUS_BY_CODE } from '../../assets/data/submitStatus';

const AdminHomeContents = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { userId, token } = useAppSelector((state) => state.userSlice.admin);
  const { isVisibleModal } = useAppSelector((state) => state.commonSlice);
  const [submitCountData, setSubmitCountData] = useState({
    total: 0,
    progress: 0,
    done: 0,
    error: 0,
  });
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  useEffect(() => {
    if (!token) return;
    fetchAdminProfileAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAdminProfileAPI = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 200) {
        setSubmitCountData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: '에러',
            text: ` ${error.response.data.error.message}`,
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.Container>
      <h1 className='main-title'>{PLATFORM.shortName} Admin</h1>
      <p className='main-title-desc'>
        <span className='user-id'>{userId}</span> 
        { tf('님, 안녕하세요!', ', Hello!')}
      </p>

      <div className='task-counts-wrap'>
        <Link className='count-wrap total' to='/admin/task'>
          <span className='label'>{tf('전체 요청', 'Total Request')}</span>
          <span className='data'>
            <span className='number'>{submitCountData.total}</span> {tf('건', '')}
          </span>
        </Link>
        <div className='count-wrap progress'>
          <span className='label'>
            {tf(SUBMIT_STATUS_BY_CODE[1].ko, SUBMIT_STATUS_BY_CODE[1].en)}
          </span>
          <span className='data'>
            <span className='number'>{submitCountData.progress}</span> {tf('건', '')}
          </span>
        </div>
        <div className='count-wrap done'>
          <span className='label'>{tf('완료', 'Completed')}</span>
          <span className='data'>
            <span className='number'>{submitCountData.done}</span> {tf('건', '')}
          </span>
        </div>
        <div className='count-wrap error'>
          <span className='label'>{tf('에러', 'Error')}</span>
          <span className='data'>
            <span className='number'>{submitCountData.error}</span> {tf('건', '')}
          </span>
        </div>
      </div>
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default AdminHomeContents;
