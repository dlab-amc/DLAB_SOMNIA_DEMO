import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListHeader from '../../../components/list/ListHeader';
import ListContents from '../../../components/list/ListContents';
import { setCurrentPage } from '../../../stores/list/list.slice';

const SubmitListPage = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.listSlice.currentPage);

  const handleTabChange = useCallback(
    (newTab) => {
      if (newTab !== currentTab) {
        dispatch(setCurrentPage(newTab));
      }
    },
    [dispatch, currentTab]
  );

  useEffect(() => {
    if (!currentTab) {
      dispatch(setCurrentPage('submit'));
    }
  }, [currentTab, dispatch]);

  if (!currentTab) {
    return <div>Loading...</div>;
  }

  return (
    <div className='submit-list-page'>
      <ListHeader page={currentTab} onChangePage={handleTabChange} />
      <ListContents page={currentTab} />
    </div>
  );
};

export default SubmitListPage;
