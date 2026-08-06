import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../../components/header/UserHeader";
import S from "../../components/common/Common.styled";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getNotificationCount } from "../../stores/user/user.slice";
import { setVisibleModal } from "../../stores/common/common.slice";
import { useI18n } from "../../assets/i18n";
import { isAuthErrorHandled } from "../../utils/setupAxiosAuth";

const UserLayout = () => {
  const { tf } = useI18n();
  const isVisibleModal = useAppSelector(
    (state) => state.commonSlice.isVisibleModal
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isScreenshotPage = location.pathname.startsWith('/screenshot');
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const { token } = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    const type = location.pathname.includes("admin") ? "admin" : "user";
    fetchNotificationCountAPI(type);
  }, [location.pathname]);

  const fetchNotificationCountAPI = async (type) => {
    try {
      if (!token) return;
      const response = await axios.get(
        `${BACKEND_URL}/notification/count/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        const count = response.data.data.new_notification_count;
        dispatch(
          getNotificationCount({
            type,
            count,
          })
        );
      }
    } catch (error) {
      console.error(error);
      // 401은 axios 인터셉터가 로그아웃·로그인 리다이렉트 처리
      if (isAuthErrorHandled(error) || !error.response) return;

      if (error.response.data?.detail?.message) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf("에러", "Error"),
            text: `${error.response.data.detail.message}`,
            isScrollable: false,
          })
        );
      } else if (error.response.data?.error?.message) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf("에러", "Error"),
            text: `${error.response.data.error.message}`,
            isScrollable: false,
          })
        );
      } else {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf("에러", "Error"),
            text: tf('서버 오류가 발생했습니다.','A server error has occurred.'),
            isScrollable: false,
          })
        );
      }
    }
  };

  useEffect(() => {
    // Prevent Modal Background Scroll
    if (isVisibleModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisibleModal]);

  return (
    <S.Container>
      {!isScreenshotPage && <UserHeader />}
      <S.MainContents className={isScreenshotPage ? 'screenshot-page' : undefined}>
        <Outlet />
      </S.MainContents>
    </S.Container>
  );
};

export default UserLayout;
