import React from "react";
import SignUpResult from "../../../components/auth/SignUpResult";

const SignUpFailurePage = () => {
  return (
    <div>
      <SignUpResult result="failure" />
    </div>
  );
};

export default SignUpFailurePage;
