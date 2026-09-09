import React from "react";
import S from "./FindIdResult.styled";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../../assets/i18n";

const FindIdResult = () => {
  const { tf, language } = useI18n();
  const location = useLocation();
  const { id, date } = location.state || {};
  const joinedDate =
    date &&
    new Date(date).toLocaleDateString(language === "en" ? "en-US" : "ko-KR");

  return (
    <S.Container>
      <h2 className="title">{tf("아이디 조회 결과", "ID Lookup Result")}</h2>
      <p className="desc">
        {tf(
          "입력하신 정보와 일치하는 아이디 입니다.",
          "This ID matches the information you entered."
        )}
      </p>
      {id && date && (
        <div className="find-id-result">
          <div className="id-wrap">
            <div className="id">{id}</div>
            <div className="created-date">
              {tf("가입일", "Joined")}: {joinedDate}
            </div>
          </div>
          <div className="buttons-wrap">
            <Link className="login-button" to="/login">
              {tf("로그인하기", "Go to Login")}
            </Link>
            <Link className="password-button" to="/find/password">
              {tf("비밀번호 찾기", "Find Password")}
            </Link>
          </div>
        </div>
      )}
    </S.Container>
  );
};

export default FindIdResult;
