import React from "react";
import { Navigate } from "react-router-dom";
import { USER_TYPE } from "../../assets/data/data";
import { useAppSelector } from "../../assets/hooks/useRedux";

const RedirectRoute = ({ type, login = false, children }) => {
  // Temp
  const isUserLogined = useAppSelector(
    (state) => state.userSlice.user.isLogined
  );
  const isAdminLogined = useAppSelector(
    (state) => state.userSlice.admin.isLogined
  );

  if (login) {
    if (type === USER_TYPE.USER) {
      return isUserLogined ? <Navigate to="/" /> : children;
    } else if (type === USER_TYPE.ADMIN) {
      return isAdminLogined ? <Navigate to="/admin" /> : children;
    }
  } else {
    if (type === USER_TYPE.USER) {
      return isUserLogined ? children : <Navigate to="/login" />;
    } else if (type === USER_TYPE.ADMIN) {
      return isAdminLogined ? children : <Navigate to="/admin/login" />;
    }
  }
};

export default RedirectRoute;
