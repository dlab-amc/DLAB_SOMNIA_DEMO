import React from "react";
import LoginForm from "../../../components/auth/LoginForm";
import { USER_TYPE } from "../../../assets/data/data";

const AdminLoginPage = () => {
  return (
    <div>
      <LoginForm userType={USER_TYPE.ADMIN} />
    </div>
  );
};

export default AdminLoginPage;
