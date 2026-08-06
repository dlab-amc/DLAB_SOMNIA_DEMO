import React from "react";
import S from "./SignUpResult.styled";
import { ReactComponent as Success } from "../../assets/resource/icons/success.svg";
import { ReactComponent as Failure } from "../../assets/resource/icons/failure.svg";
import { useAppSelector } from "../../assets/hooks/useRedux";
import { Link } from "react-router-dom";
import { useI18n } from "../../assets/i18n";

const SignUpResult = ({ result }) => {
  const { tf } = useI18n();
  const resultErrorMessage = useAppSelector(
    (state) => state.signupSlice.info.resultErrorMessage
  );

  return (
    <S.Background>
      <S.Container>
        <div className="result-icon">
          {result === "success" ? <Success /> : <Failure />}
        </div>
        <h2 className="result-title">
          {result === "success" ? tf("회원가입 신청 완료","Sign-up Submitted") : tf("회원가입 실패","Sign-up Failed")}
        </h2>
        <div className="result-desc">
          {result === "success" ? (
            <>
              <p className="line">{tf('회원가입 신청 되었습니다.','Your sign-up request has been submitted.')}</p>
              <p className="line">
                {tf('관리자 승인 이후 로그인 및 서비스 이용이 가능합니다.','You can log in and use the service after admin approval.')}
              </p>
              <p className="line">
                {tf('관리자 승인 후, 가입하신 이메일로 안내 메일이 전송됩니다.','A guidance email will be sent to your registered email after approval.')}
              </p>
            </>
          ) : (
            <>
              <p className="line">{tf('회원가입에 실패하였습니다.','Sign-up failed.')}</p>
              {resultErrorMessage && (
                <p className="line error">
                  [Error Message] {resultErrorMessage}
                </p>
              )}
            </>
          )}
        </div>
        <div className="login-button-wrap">
          <Link className="login-button" to="/login">
            {tf('로그인하기','Go to Login')}
          </Link>
        </div>
      </S.Container>
    </S.Background>
  );
};

export default SignUpResult;
