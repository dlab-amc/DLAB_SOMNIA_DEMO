import React from "react";
import UserDetailHeader from "../../../components/list/UserDetailHeader";
import UserDetailContents from "../../../components/list/UserDetailContents";

const AdminUserDetailPage = () => {
  return (
    <div>
      <UserDetailHeader page="total" />
      <UserDetailContents page="total" />
    </div>
  );
};

export default AdminUserDetailPage;
