import React, { useState } from "react";
import ListHeader from "../../../components/list/ListHeader";
import ListContents from "../../../components/list/ListContents";

const AdminUserPage = () => {
  const [currentPage, setCurrentPage] = useState("user");

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ListHeader page={currentPage} onChangePage={onChangePage} />
      <ListContents page={currentPage} />
    </div>
  );
};

export default AdminUserPage;
