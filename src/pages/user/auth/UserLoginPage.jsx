import React from "react";
import LoginForm from "../../../components/auth/LoginForm";
import { USER_TYPE } from "../../../assets/data/data";

const UserLoginPage = () => {
  return (
    <div>
      <LoginForm userType={USER_TYPE.USER} />
    </div>
  );
};

export default UserLoginPage;
