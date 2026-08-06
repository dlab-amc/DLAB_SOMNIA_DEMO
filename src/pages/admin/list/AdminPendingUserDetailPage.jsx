import React from "react";
import UserDetailHeader from "../../../components/list/UserDetailHeader";
import UserDetailContents from "../../../components/list/UserDetailContents";

const AdminPendingUserDetailPage = () => {
  return (
    <div>
      <UserDetailHeader page="pending" />
      <UserDetailContents page="pending" />
    </div>
  );
};

export default AdminPendingUserDetailPage;
