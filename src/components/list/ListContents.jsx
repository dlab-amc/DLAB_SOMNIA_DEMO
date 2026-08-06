import React, { useEffect, useState } from 'react';
import S from './ListContents.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import axios from 'axios';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import {
  fetchDataList,
  movePageIndex,
  resetDatas,
  resetFilters,
  selectSearchField,
  changeInputSearch,
  selectCurrentUser,
  setUserTopTabCount,
  setTaskTopTabCount,
} from '../../stores/list/list.slice';
import Pagination from '../common/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { LIST_PAGES_INFO, SEARCH_VALUE } from '../../assets/data/data';
import { SUBMIT_STATUS_CODE } from '../../assets/data/submitStatus';
import { useI18n } from '../../assets/i18n';
import ListTableBody from './listContents/ListTableBody';

const ListContents = ({ page }) => {
  const { tf } = useI18n();
  const urlPath = window.location.pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    currentPageList,
    currentPageIndex,
    sort,
    filter,
    startDate,
    endDate,
    searchField,
    searchValue,
    searchedValue,
    totalPageIndex,
  } = useAppSelector((state) => state.listSlice);
  const {
    isLoading,
    isVisibleModal,
    isVisibleNotificationModal,
    isVisibleUserInfoModal,
  } = useAppSelector((state) => state.commonSlice);
  const userToken = useAppSelector((state) => state.userSlice.user.token);
  const adminToken = useAppSelector((state) => state.userSlice.admin.token);
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  const [jobStatuses, setJobStatuses] = useState({});
  const [submitList, setSubmitList] = useState([]);

  const updateJobStatus = (jobId, newStatus) => {
    setJobStatuses((prev) => ({
      ...prev,
      [jobId]: newStatus, // 상태 업데이트
    }));
  };

  useEffect(() => {
    dispatch(resetDatas());
    dispatch(resetFilters());
    dispatch(selectSearchField(SEARCH_VALUE[page]?.[0]));

    // 알림 페이지 접근 시 읽음 처리 API 호출
    if (page === 'userNotification' || page === 'adminNotification') {
      markNotificationsAsRead(page);
    }
  }, [page]);

  useEffect(() => {
    if (page === 'userNotification') {
      fetchGetDataAPI(page);
    }
  }, [page]);

  useEffect(() => {
    if (page === 'user') {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('id');
      if (!id) return;

      dispatch(selectSearchField(SEARCH_VALUE.user[0]));
      dispatch(changeInputSearch(id));
    }
  }, [page, location]);

  useEffect(() => {
    // Temp
    if (currentPageIndex !== 1) {
      dispatch(movePageIndex(1));
    }
  }, [sort, startDate, endDate, searchField, filter, searchedValue]);

  useEffect(() => {
    if ((!startDate && endDate) || (startDate && !endDate)) return;
    fetchGetDataAPI(page);
  }, [sort, startDate, endDate, filter, searchedValue, currentPageIndex]);

  useEffect(() => {
    const syncJobStatuses = () => {
      const statuses = currentPageList.reduce((acc, row) => {
        if (row.job_id) {
          acc[row.job_id] =
            row.progress_status === SUBMIT_STATUS_CODE.IN_PROGRESS ||
            row.progress_status === SUBMIT_STATUS_CODE.STOPPING
              ? 'running'
              : row.progress_status === SUBMIT_STATUS_CODE.STOPPED
              ? 'stopped'
              : 'error';
        }
        return acc;
      }, {});
      setJobStatuses(statuses);
    };

    syncJobStatuses();
  }, [currentPageList]); // currentPageList가 변경될 때마다 실행

  const fetchGetDataAPI = async (page) => {
    try {
      dispatch(setLoading(true));

      const params = {
        ...(page === 'progress'
          ? { status: '1,3,4' } // ✅ 진행중, 중단됨, 중단중 모두 포함
          : filter && filter.length > 0
          ? { filter }
          : {}),
        ...(searchField?.value && searchValue && { search: searchField.value }),
        ...(searchValue && { keyword: searchValue }),
        ...(currentPageIndex !== undefined && { page: currentPageIndex }),
        ...(sort && page !== 'user' && page !== 'pending' && { sort }),
        ...(startDate &&
          endDate &&
          page !== 'user' &&
          page !== 'pending' && { startdate: startDate, enddate: endDate }),
      };

      const apiPath = LIST_PAGES_INFO[page]?.path || '/submit/list';
      const token = urlPath.startsWith('/admin') ? adminToken : userToken;

      const response = await axios.get(`${BACKEND_URL}${apiPath}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setLoading(false));

      if (response.data.status === 200) {
        dispatch(
          fetchDataList({
            data: response.data.data.content || [],
            count: response.data.data.total_count || 0,
            totalIndex: response.data.data.total_index || 0,
          })
        );

        // jobStatuses 초기화
        const statuses = (response.data.data.content || []).reduce(
          (acc, row) => {
            if (row.job_id) {
              acc[row.job_id] =
                row.progress_status === SUBMIT_STATUS_CODE.IN_PROGRESS ||
                row.progress_status === SUBMIT_STATUS_CODE.STOPPING
                  ? 'running'
                  : row.progress_status === SUBMIT_STATUS_CODE.STOPPED
                  ? 'stopped'
                  : 'error';
            }
            return acc;
          },
          {}
        );
        setJobStatuses(statuses);

        // 유저 탭 업데이트
        if (page === 'user' || page === 'pending') {
          dispatch(
            setUserTopTabCount([
              response.data.data.total_count || 0, // 전체 유저 수
              response.data.data.total_pending_count || 0, // 가입 대기 유저 수
            ])
          );
        }

        if (page === 'task' || page === 'progress') {
          dispatch(
            setTaskTopTabCount({
              total_count: response.data.data.total_count || 0, // 전체 작업 수
              total_progress_count:
                response.data.data.total_progress_count || 0, // 진행 중 작업 수
            })
          );
        }
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
      console.error('API Error:', error);
    }
  };

  const handleClickRow = (id, index) => {
    if (page === 'submit') {
      navigate(`/submit/${id}`);
    }
    if (page === 'user') {
      dispatch(selectCurrentUser(index));
      navigate(`/admin/user/detail/${id}`);
    }
    if (page === 'pending') {
      dispatch(selectCurrentUser(index));
      navigate(`/admin/user/pending/detail/${id}`);
    }
    if (page === 'task') {
      navigate(`/admin/submit/${id}`);
    }
    if (page === 'progress') {
      navigate(`/admin/submit/${id}`);
    }
  };

  const handleClickUserId = (e, id) => {
    if (page === 'user') return;
    e.stopPropagation();
    navigate(`/admin/user?id=${id}`);
  };

  const markNotificationsAsRead = async (page) => {
    try {
      const readPath = LIST_PAGES_INFO[page]?.readPath;

      if (!readPath) return; // 경로가 없으면 실행 X

      const token = urlPath.startsWith('/admin') ? adminToken : userToken;

      await axios.get(`${BACKEND_URL}${readPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('알림 읽음 처리 실패', error);
    }
  };

  const handleStopJob = async (jobId) => {
    if (!jobId) {
      console.error('Invalid job ID provided for stop');
      return;
    }

    try {
      // 1. "중단 중" 상태로 즉시 표시
      updateJobStatus(jobId, 'stopping');
      const updatedList = currentPageList.map((row) =>
        row.job_id === jobId
          ? { ...row, progress_status: SUBMIT_STATUS_CODE.STOPPING } // rogress_status: 4 = "중단 중"
          : row
      );
      dispatch(fetchDataList({ data: updatedList, count: updatedList.length }));

      // 2. 서버에 중단 요청
      const response = await axios.post(
        `${BACKEND_URL}/submit/jobs/stop/${jobId}`,
        null,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      // 3. 서버 응답이 성공하면 "중단됨"으로 표시
      if (response.data.status === 200) {
        updateJobStatus(jobId, 'stopped');
        const finalUpdatedList = currentPageList.map((row) =>
          row.job_id === jobId ? { ...row, progress_status: SUBMIT_STATUS_CODE.STOPPING } : row
        );
        dispatch(
          fetchDataList({
            data: finalUpdatedList,
            count: finalUpdatedList.length,
          })
        );
      } else {
        throw new Error(
          response.data?.error?.message || 'Server failed to stop the job'
        );
      }
    } catch (error) {
      console.error('Failed to stop job:', error);

      // 실패 시 3초 후 상태를 다시 확인
      setTimeout(() => fetchGetDataAPI(page), 3000);
    }
  };

  const handleRestartJob = async (jobId) => {
    if (!jobId) {
      console.error('Invalid job ID provided for restart');
      return;
    }

    try {

      // 서버에 작업 재시작 요청
      const response = await axios.post(
        `${BACKEND_URL}/submit/jobs/restart/${jobId}`,
        null,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      // 1. API 요청 성공
      if (response.data.status === 200) {
        const { new_job_id } = response.data.data; // 새로운 job_id 가져오기

        // 2. UI에서 상태 업데이트
        const updatedList = currentPageList.map((row) =>
          row.job_id === jobId
            ? {
                ...row,
                progress_status: SUBMIT_STATUS_CODE.IN_PROGRESS, // 진행 중 상태로 업데이트
                job_id: new_job_id, // 새로운 job_id로 갱신
              }
            : row
        );
        dispatch(
          fetchDataList({ data: updatedList, count: updatedList.length })
        );
        updateJobStatus(new_job_id, 'running');
      } else {
        throw new Error('Failed to restart job');
      }
    } catch (error) {
      console.error('Failed to restart job:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
    }
  };

  // Function to handle deleting a job
  const handleDeleteJob = async (jobId) => {
    if (!jobId) {
      console.error('Invalid job ID provided for deletion');
      return;
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/submit/jobs/delete/${jobId}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.data.status === 200) {
        const updatedStatuses = { ...jobStatuses };
        delete updatedStatuses[jobId]; // 삭제된 작업 상태 제거
        setJobStatuses(updatedStatuses);

        await fetchGetDataAPI(page);
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <S.Container>
      <div className={`list-table-wrap ${page || ''}`}>
        {LIST_PAGES_INFO[page]?.headers ? (
          <>
            <table className='list-table'>
              <thead className='list-table-header'>
                <tr>
                  {LIST_PAGES_INFO[page].headers.map((header, index) => (
                    <th key={index} className={header.className}>
                      {tf(header.text, header.text_eng)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='list-table-body'>
                <ListTableBody
                  page={page}
                  currentPageList={currentPageList}
                  jobStatuses={jobStatuses}
                  navigate={navigate}
                  handleClickRow={handleClickRow}
                  handleStopJob={handleStopJob}
                  handleRestartJob={handleRestartJob}
                  handleDeleteJob={handleDeleteJob}
                  tf={tf}
                />
              </tbody>
            </table>
          </>
        ) : (
          <S.NotificationContainer>
            {currentPageList.length ? (
              currentPageList.map((row, index) => (
                <div className='notification-wrap' key={index}>
                  <div className='sent-date'>
                    {new Date(row.sent_time).toLocaleString()}
                  </div>
                  <div className='sent-text'>
                    {row.message?.includes('\n')
                      ? row.message.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                      : row.message}
                  </div>
                </div>
              ))
            ) : (
              <div className='no-data-wrap'>{tf('데이터가 존재하지 않습니다.','No data available.')}</div>
            )}
          </S.NotificationContainer>
        )}
      </div>

      {totalPageIndex ? <Pagination /> : null}
      {isLoading && <Loading />}
      {isVisibleNotificationModal && <Modal notification />}
      {isVisibleUserInfoModal && <Modal user />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default ListContents;
