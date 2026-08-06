import React, { useState } from 'react';
import S from './SignUpForm.styled';
import TermListTab from './tab/TermFormTab';
import InfoFormTab from './tab/InfoFormTab';
import { useAppSelector } from '../../assets/hooks/useRedux';
import Modal from '../common/Modal';
import BottomBar from './tab/BottomBar';
import Loading from '../common/Loading';

import ProgressBar from '../common/ProgressBar';
import SelectMembershipType from './tab/SelectMembershipType';

import { USER_REGISTRATION_STEPS } from '../../assets/data/progressSteps';
import { useI18n } from '../../assets/i18n';


const SignUpForm = () => {
  const { tf } = useI18n();
  let { isVisibleModal, isLoading } = useAppSelector(
    (state) => state.commonSlice
  );

  const signupState = useAppSelector((state) => state.signupSlice);

  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState('business');

  const handleSelectUserType = (type) => setAccountType(type);

  // 단계 이동 함수
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // 단계별 화면 렌더링
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectMembershipType
            accountType={accountType}
            handleSelectUserType={handleSelectUserType}
          />
        );
      case 2:
        return <TermListTab />;
      case 3:
        return <InfoFormTab accountType={accountType} />;
      default:
        return <SelectMembershipType />;
    }
  };

  return (
    <S.Background>
      <S.Container>
        <h2 className='signup-title'>{tf('회원가입', 'Sign Up')}</h2>

        {/* 프로그래스바 */}
        <div className='header-wrap'>
          <ProgressBar
            steps={USER_REGISTRATION_STEPS}
            currentStep={currentStep}
            wide
          />
        </div>

        {/* 단계별 내용 */}
        {renderStepContent()}

        <BottomBar
          accountType={accountType}
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
        />

        {isVisibleModal && <Modal />}
        {isLoading && <Loading />}
      </S.Container>
    </S.Background>
  );
};

export default SignUpForm;
