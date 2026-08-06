import React, { useState } from "react";
import ListHeader from "../../../components/list/ListHeader";
import ListContents from "../../../components/list/ListContents";

const AdminTaskPage = () => {
  const [currentPage, setCurrentPage] = useState("task"); // Default tab

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update tab state
  };

  return (
    <div>
      <ListHeader page={currentPage} onChangePage={handlePageChange} />
      <ListContents page={currentPage} />
    </div>
  );
};

export default AdminTaskPage;
