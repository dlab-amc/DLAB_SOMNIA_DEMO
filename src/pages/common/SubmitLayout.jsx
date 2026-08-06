import { useEffect } from 'react';
import { useAppDispatch } from '../../assets/hooks/useRedux';
import { resetDatas } from '../../stores/submit/submit.slice';
import { Outlet } from 'react-router-dom';

export const SubmitLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDatas());
    };
  }, [dispatch]);

  return <Outlet />;
}