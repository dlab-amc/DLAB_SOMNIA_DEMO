import React from "react";
import Sidebar from "../../components/common/Sidebar";
import S from "./GuideLayout.styled";
import { Link } from "react-router-dom";

const GuideLayout = ({ children }) => {
  return (
    <S.Container>
      <Sidebar page="guide" />
      <div className="guide-container">
        <div className="guide-header">
          <Link to="/submit/details" className="submit-button">
            Start Submit
          </Link>
        </div>
        <div className="guide-contents">{children}</div>
      </div>
    </S.Container>
  );
};

export default GuideLayout;
