import React from 'react';
import { useAppSelector } from '../../../assets/hooks/useRedux';
import SignUpForm from '../../../components/auth/SignUpForm';
import Modal from '../../../components/common/Modal';

const SignUpPage = () => {
  const { isVisibleModal } = useAppSelector((state) => state.commonSlice);
  return (
    <div>
      <SignUpForm />
      {isVisibleModal && <Modal />}
    </div>
  );
};

export default SignUpPage;
