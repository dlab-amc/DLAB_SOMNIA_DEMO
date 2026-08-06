import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";
import S from "../../components/common/Common.styled";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getNotificationCount } from "../../stores/user/user.slice";
import { setVisibleModal } from "../../stores/common/common.slice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const { token } = useAppSelector((state) => state.userSlice.admin);

  useEffect(() => {
    const type = location.pathname.includes("admin") ? "admin" : "user";
    fetchNotificationCountAPI(type);
  }, [location.pathname]);

  const fetchNotificationCountAPI = async (type) => {
    try {
      if (!token) return;
      const response = await axios.get(
        `${BACKEND_URL}/notification/count/admin`,
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
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: "에러",
            text: `[${error.response.data.error?.code}] ${error.response.data.error?.message}`,
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.Container>
      <AdminHeader />
      <S.MainContents>
        <Outlet />
      </S.MainContents>
    </S.Container>
  );
};

export default AdminLayout;
