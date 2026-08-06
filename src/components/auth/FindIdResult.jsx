import React, { useEffect } from "react";
import S from "./FindIdResult.styled";
import {
  Link,
  useLocation,
} from "react-router-dom";

const FindIdResult = () => {
  const location = useLocation();
  const { id, date } = location.state;

  useEffect(() => {}, []);

  return (
    <S.Container>
      <h2 className="title">아이디 조회 결과</h2>
      <p className="desc">입력하신 정보와 일치하는 아이디 입니다.</p>
      {id && date && (
        <div className="find-id-result">
          <div className="id-wrap">
            <div className="id">{id}</div>
            <div className="created-date">
              {`가입일: ${new Date(date).toLocaleDateString()}`}
            </div>
          </div>
          <div className="buttons-wrap">
            <Link className="login-button" to="/login">
              로그인하기
            </Link>
            <Link className="password-button" to="/find/password">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      )}
    </S.Container>
  );
};

export default FindIdResult;
