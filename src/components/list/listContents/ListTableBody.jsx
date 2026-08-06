import React from 'react';
import { Link } from 'react-router-dom';
import S from '../ListContents.styled';
import {
  LIST_PAGES_INFO,
  USER_ACCOUNT_TYPE_STRING,
  USER_GRADE_STRING,
  PROGRESS_STATUS_MESSAGE,
} from '../../../assets/data/data';
import {
  SUBMIT_STATUS_BY_CODE,
  SUBMIT_STATUS_CODE,
} from '../../../assets/data/submitStatus';
import { formatDateTime, getSubmitDetailString } from '../../../assets/module/module';
import { getLocalizedLogMessage } from '../../../assets/data/submit';
import TruncatedTooltipCell from './TruncatedTooltipCell';

const statusLabelTf = (code, tf) => {
  const meta = SUBMIT_STATUS_BY_CODE[code];
  if (!meta) return 'N/A';
  return tf(meta.ko, meta.en);
};

/**
 * 페이지별 테이블 tbody 행 렌더링.
 * 목록 fetch/핸들러는 ListContents에 두고 UI 분기만 분리한다.
 */
const ListTableBody = ({
  page,
  currentPageList,
  jobStatuses,
  navigate,
  handleClickRow,
  handleStopJob,
  handleRestartJob,
  handleDeleteJob,
  tf,
}) => {
  if (page === 'task' && currentPageList.length > 0) {
    return currentPageList.map((row, index) => (
      <tr
        key={index}
        onClick={() => navigate(`/admin/submit/${row.submit_num}`)}
      >
        <td className='submit-number'>
          <Link to={`/admin//submit/${row.submit_num}`}>{row.submit_num}</Link>
        </td>
        <td className='submit-title'>
          <Link to={`/admin//submit/${row.submit_num}`}>{row.submit_title}</Link>
        </td>
        <td className='submit-description'>{row.submit_description}</td>
        <td className='user-id'>{row.user_id || 'N/A'}</td>
        <td className='submit-date'>{formatDateTime(row.submit_time)}</td>
        <td className='submit-status'>
          <span className='status-text' data-color={row.progress_status}>
            {statusLabelTf(row.progress_status, tf)}
          </span>
        </td>
      </tr>
    ));
  }

  if (page === 'adminNotification' && currentPageList.length > 0) {
    return currentPageList.map((notification, index) => (
      <tr className='notification-row' key={index}>
        <td className='notification-text'>
          {getLocalizedLogMessage(notification.message, tf)}
        </td>
        <td className='sent-time'>
          {new Date(notification.sent_time).toLocaleString()}
        </td>
      </tr>
    ));
  }

  if (page === 'adminTotalNotification' && currentPageList.length > 0) {
    return currentPageList.map((notification, index) => (
      <tr className='notification-row' key={index}>
        <td className='from-type'>{notification?.from_info?.from || 'N/A'}</td>
        <td className='to-type'>{notification?.to_info?.to || 'N/A'}</td>
        <td className='to-id'>{notification?.to_info?.login_id || 'N/A'}</td>
        <td className='notification-text'>
          {getLocalizedLogMessage(notification?.message || '', tf) || 'N/A'}
        </td>
        <td className='sent-time'>
          {notification?.sent_time
            ? formatDateTime(notification.sent_time)
            : 'N/A'}
        </td>
      </tr>
    ));
  }

  if (page === 'submit' && currentPageList.length > 0) {
    return currentPageList.map((submit, index) => (
      <tr
        key={index}
        onClick={() => navigate(`/submit/${submit.submit_num}`)}
      >
        <td className='submit-number'>{submit.submit_num}</td>
        <td className='submit-title'>
          <TruncatedTooltipCell text={submit.submit_title} isTitle />
        </td>
        <td className='submit-description'>
          <TruncatedTooltipCell text={submit.submit_description} />
        </td>
        <td className='submit-date'>{formatDateTime(submit.submit_time)}</td>
        <td className='submit-status'>
          <span className='status-text' data-color={submit.progress_status}>
            {statusLabelTf(submit.progress_status, tf)}
          </span>
        </td>
      </tr>
    ));
  }

  if (page === 'userNotification' && currentPageList.length > 0) {
    return currentPageList.map((notification, index) => (
      <tr key={index} className='notification-row'>
        <td className='notification-text'>
          {getLocalizedLogMessage(notification.message, tf)}
        </td>
        <td className='sent-time'>
          {formatDateTime(notification.sent_time)}
        </td>
      </tr>
    ));
  }

  if (currentPageList.length) {
    return currentPageList.map((row, index) => (
      <tr
        key={index}
        onClick={() =>
          handleClickRow(row.submit_num || row.user_id, index)
        }
      >
        {page === 'pending' ? (
          <>
            <td className='user-id'>{row.user_id}</td>
            <td className='user-type'>
              {USER_ACCOUNT_TYPE_STRING[row.user_type] || tf('미정', 'N/A')}
            </td>
            <td className='user-name'>{row.name}</td>
            <td className='user-phone-number'>{row.phone_number}</td>
            <td className='user-email'>{row.email}</td>
            <td className='request-date'>
              {new Date(row.create_time).toLocaleString()}
            </td>
            <td className='notification-button-wrap'>
              <button
                className='notification-button'
                onClick={() =>
                  navigate(`/admin/user/pending/detail/${row.user_id}`)
                }
              >
                {tf('상세보기', 'View')}
              </button>
            </td>
          </>
        ) : page === 'user' ? (
          <>
            <td className='user-id'>{row.user_id || 'N/A'}</td>
            <td className='user-type'>
              {tf(USER_ACCOUNT_TYPE_STRING[row.user_type], row.user_type) ||
                'N/A'}
            </td>
            <td className='user-name'>{row.name || 'N/A'}</td>
            <td className='user-phone-number'>{row.phone_number || 'N/A'}</td>
            <td className='user-submit-detail'>
              {getSubmitDetailString(row.user_submit_detail, tf(false, true)) ||
                'N/A'}
            </td>
            <td className='user-submit'>{row.user_submit || 0}</td>
            <td className='user-grade'>
              {tf(
                USER_GRADE_STRING[row.membership_level],
                row.membership_level
              ) || 'N/A'}
            </td>
          </>
        ) : page === 'progress' ? (
          <>
            <td className='submit-number'>
              <Link to={`/submit/${row.submit_num}`}>
                {row.submit_num || 'N/A'}
              </Link>
            </td>
            <td className='user-id'>{row.user_id || 'N/A'}</td>
            <td className='submit-title'>
              <Link to={`/submit/${row.submit_num}`}>{row.submit_title}</Link>
            </td>
            <td className='submit-date'>
              {row.submit_time ? formatDateTime(row.submit_time) : 'N/A'}
            </td>
            <td className='submit-status'>
              <span className='status-text' data-color={row.progress_status}>
                {PROGRESS_STATUS_MESSAGE[row.progress_stage] ||
                  statusLabelTf(row.progress_status, tf)}
              </span>
            </td>
            <td className='submit-action'>
              {row.job_id &&
              (jobStatuses[row.job_id] === 'running' ||
                row.progress_status === SUBMIT_STATUS_CODE.IN_PROGRESS ||
                row.progress_status === SUBMIT_STATUS_CODE.STOPPING) ? (
                <S.Button
                  data-button-color={
                    row.progress_status === SUBMIT_STATUS_CODE.STOPPING
                      ? 'stopping'
                      : 'stop'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (row.progress_status !== SUBMIT_STATUS_CODE.STOPPING)
                      handleStopJob(row.job_id);
                  }}
                  disabled={
                    row.progress_status === SUBMIT_STATUS_CODE.STOPPING
                  }
                >
                  {row.progress_status === SUBMIT_STATUS_CODE.STOPPING
                    ? tf(
                        SUBMIT_STATUS_BY_CODE[4].ko,
                        SUBMIT_STATUS_BY_CODE[4].en
                      )
                    : tf('정지', 'Stop')}
                </S.Button>
              ) : row.job_id &&
                (jobStatuses[row.job_id] === 'stopped' ||
                  row.progress_status === SUBMIT_STATUS_CODE.STOPPED) ? (
                <>
                  <S.Button
                    data-button-color='restart'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestartJob(row.job_id);
                    }}
                  >
                    다시 시작
                  </S.Button>
                  <S.Button
                    data-button-color='delete'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteJob(row.job_id);
                    }}
                  >
                    삭제
                  </S.Button>
                </>
              ) : (
                'N/A'
              )}
            </td>
          </>
        ) : (
          <>
            <td className='submit-number'>
              <Link to={`/submit/${row.submit_num}`}>{row.submit_num}</Link>
            </td>
            <td className='submit-title'>
              <Link to={`/submit/${row.submit_num}`}>{row.submit_title}</Link>
            </td>
            <td className='submit-description'>{row.submit_description}</td>
            <td className='submit-date'>
              {new Date(row.submit_time).toLocaleString()}
            </td>
            <td className='submit-status'>
              <span className='status-text' data-color={row.progress_status}>
                {statusLabelTf(row.progress_status, tf)}
              </span>
            </td>
          </>
        )}
      </tr>
    ));
  }

  return (
    <tr className='no-data-wrap'>
      <td
        colSpan={LIST_PAGES_INFO[page].headers.length}
        className='no-data-text'
      >
        <span className='text'>
          {tf('데이터가 존재하지 않습니다.', 'No data available.')}
        </span>
      </td>
    </tr>
  );
};

export default ListTableBody;
