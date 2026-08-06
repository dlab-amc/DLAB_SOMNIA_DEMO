import React from "react";
import { useAppSelector } from "../../../assets/hooks/useRedux";
import S from "./TopTab.styled";
import { useI18n } from "../../../assets/i18n";

const TopTab = ({ page, onChangePage, tabType }) => {
  const { tf } = useI18n();
  const { userTopTabCount, taskTopTabCount } = useAppSelector(
    (state) => state.listSlice
  );

  const handleTabClick = (tabPage) => {
    if (typeof onChangePage === "function") {
      onChangePage(tabPage); // 단순히 페이지 변경만 호출
    } else {
      console.error(
        `onChangePage is not a function. Received: ${onChangePage}`
      );
    }
  };

  const renderTabs = () => {
    if (tabType === "user") {
      return (
        <>
          <button
            className={`tab-button ${page === "user" ? "active" : ""}`}
            onClick={() => handleTabClick("user")}
          >
            {tf('전체','All')} <span>({userTopTabCount?.[0] || 0}{tf('건','')})</span>
          </button>
          <button
            className={`tab-button ${page === "pending" ? "active" : ""}`}
            onClick={() => handleTabClick("pending")}
          >
            {tf('가입 대기','Pending')} <span>({userTopTabCount?.[1] || 0}{tf('건','')})</span>
          </button>
        </>
      );
    } else if (tabType === "adminTask") {
      return (
        <>
          <button
            className={`tab-button ${page === "task" ? "active" : ""}`}
            onClick={() => handleTabClick("task")}
          >
            {tf('전체','All')} <span>({taskTopTabCount?.total_count || 0}{tf('건','')})</span>
          </button>
          <button
            className={`tab-button ${page === "progress" ? "active" : ""}`}
            onClick={() => handleTabClick("progress")}
          >
            {tf('진행 중','In progress')} {" "}
            <span>({taskTopTabCount?.total_progress_count || 0}{tf('건','')})</span>
          </button>
        </>
      );
    }
    return null;
  };

  return <S.Container>{renderTabs()}</S.Container>;
};

export default TopTab;
