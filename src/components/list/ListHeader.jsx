import React, { useMemo } from 'react';
import S from './ListHeader.styled';
import { useAppSelector } from '../../assets/hooks/useRedux';
import SortFilter from './tab/SortFilter';
import StatusFilter from './tab/StatusFilter';
import SearchInput from './tab/SearchInput';
import SearchSelect from './tab/SearchSelect';
import DatePickerTab from './tab/DatePickerTab';
import { LIST_PAGES_INFO } from '../../assets/data/data';
import { useLocation } from 'react-router-dom';
import TopTab from './tab/TopTab';
import { useI18n } from '../../assets/i18n';

const ListHeader = ({ page, onChangePage }) => {
  const { tf } = useI18n();
  const { totalListCount, userTopTabCount } = useAppSelector(
    (state) => state.listSlice
  );
  const location = useLocation();
  const path = location.pathname;

  // Determine tab type
  const tabType = useMemo(() => {
    if (page === 'user' || page === 'pending') return 'user';
    if (page === 'task' || page === 'progress') return 'adminTask';
    return null;
  }, [page]);

  // Filters based on the current page
  const filters = useMemo(() => {
    const pageInfo = LIST_PAGES_INFO[page];
    return pageInfo?.filters || {};
  }, [page]);

  return (
    <S.Container>
      {/* Header Title */}
      <div
        className={`list-header-wrap ${
          tabType === 'user' || page === 'task' || page === 'progress'
            ? 'user-page'
            : ''
        }`}
      >
        <h2 className='list-header-title'>{tf(LIST_PAGES_INFO[page]?.title, LIST_PAGES_INFO[page]?.title_eng)}</h2>
        {!path.startsWith('/admin') && (
          <span className='total-count'>
            {totalListCount}
            {page === 'submit' && tf('건',' Submission(s)')}
            {page === 'userNotification' && tf('건',' Notification(s)')}
          </span>
        )}
      </div>

      {/* Tabs */}
      {tabType && (
        <TopTab
          page={page}
          onChangePage={onChangePage}
          tabType={tabType}
          counts={userTopTabCount} // 고정된 데이터 전달
        />
      )}

      {/* Filters and Search */}
      <div className={`list-filters-wrap ${page}`}>
        <div className='left-side-wrap'>
          {filters.sorting && <SortFilter />}
          {filters.status && <StatusFilter />}
        </div>
        <div className='right-side-wrap'>
          {filters.date && <DatePickerTab page={page} />}
          <div className='search-wrap'>
            {filters.select && (
              <SearchSelect page={path.endsWith('task') ? 'task' : 'user'} />
            )}
            {filters.search && <SearchInput page={page} />}
          </div>
        </div>
      </div>
    </S.Container>
  );
};

export default ListHeader;
