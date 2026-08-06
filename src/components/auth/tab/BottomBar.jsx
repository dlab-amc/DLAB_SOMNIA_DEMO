import React from 'react';
import S from '../SignUpForm.styled';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/useRedux';
import { USER_ACCOUNT_TYPE } from '../../../assets/data/data';
import axios from 'axios';
import {
  setLoading,
  setVisibleModal,
} from '../../../stores/common/common.slice';
import { clearAll } from '../../../stores/signup/signup.slice';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../assets/i18n';


const BottomBar = ({ accountType, currentStep, nextStep, prevStep }) => {
  const { tf } = useI18n();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    userIdChecked,
    userPasswordChecked,
    userPasswordCheckChecked,
    userNameChecked,
    userTelChecked,
    userEmailChecked,
    authNumberChecked,
    companyNameChecked,
    companyDepartmentChecked,
    isPasswordCorrect,
    isIdUnique,
    isUserTelUnique,
    isAuthMailSent,
    isAuthNumberCorrect,
    userId,
    userPassword,
    userName,
    organization,
    userTel,
    userEmail,
    companyName,
    companyDepartment,
    companyTel,
    businessNumber,
    businessFile,
    companyAddress,
  } = useAppSelector((state) => state.signupSlice.info);
  const isChecked = useAppSelector(
    (state) => state.signupSlice.terms.isChecked
  );
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  // 필수 약관 항목만 확인
  const REQUIRED_TERMS_COUNT = 3; // 필수 항목 개수
  const requiredTermsChecked = isChecked
    .slice(0, REQUIRED_TERMS_COUNT)
    .every((item) => item);

  // 단계별 유효성 검사
  const isStepValid = () => {
    if (currentStep === 2) {
      // 약관 동의 검증 (필수 항목만 확인)
      return requiredTermsChecked;
    } else if (currentStep === 3) {
      // 정보 입력 검증
      return accountType === USER_ACCOUNT_TYPE.BUSINESS
        ? userIdChecked &&
            userPasswordChecked &&
            userPasswordCheckChecked &&
            userNameChecked &&
            userTelChecked &&
            userEmailChecked &&
            authNumberChecked &&
            companyNameChecked &&
            companyDepartmentChecked &&
            isPasswordCorrect &&
            isIdUnique &&
            isUserTelUnique &&
            isAuthMailSent &&
            isAuthNumberCorrect
        : userIdChecked &&
            userPasswordChecked &&
            userPasswordCheckChecked &&
            userNameChecked &&
            userTelChecked &&
            userEmailChecked &&
            authNumberChecked &&
            isPasswordCorrect &&
            isIdUnique &&
            isUserTelUnique &&
            isAuthMailSent &&
            isAuthNumberCorrect;
    }
    return true;
  };

  const handleClickButton = () => {
    const formData = new FormData();

    formData.append('login_id', userId.trim());
    formData.append('login_pw', userPassword.trim());
    formData.append('user_type', accountType);
    formData.append('name', userName.trim());
    formData.append('phone_number', userTel);
    formData.append('email', userEmail.trim());
    formData.append('organization', organization.trim());

    if (accountType === USER_ACCOUNT_TYPE.BUSINESS) {
      const businessInfo = {
        business_registration_number: businessNumber.trim(), // 사업자등록번호
        business_name: companyName, // 회사 이름
        department: companyDepartment, // 부서명
        business_address: companyAddress, //기업 주소
        business_tel: companyTel, // 회사 전화번호
      };

      // JSON 객체를 문자열로 변환해서 추가
      formData.append('business_info', JSON.stringify(businessInfo));

      // 사업자등록증 파일은 별도로 추가
      formData.append('business_file', businessFile);
    }

    fetchSignUpAPI(formData);
  };

  const fetchSignUpAPI = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BACKEND_URL}/user/account`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch(setLoading(false));
      if (response.data.status === 200) {
        dispatch(clearAll());
        navigate('/signup/success');
      } else {
        dispatch(clearAll());
        navigate('/signup/failure');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.response.data?.error?.code) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: error.response.data.error.message,
            // text: tf(error.response.data.error.message, error.response.data.error.message_eng), error.response.data.error.message_eng),
            isScrollable: false,
          })
        );
      }
    }
  };

  return (
    <S.BottomBar>
      <div className='button-wrap'>
        {currentStep > 1 ? (
          <button className='prev-button' type='button' onClick={prevStep}>
            {tf('이전', 'Prev')}
          </button>
        ) : (
          <div className='blank' aria-hidden />
        )}

        {currentStep < 3 ? (
          <button
            type='button'
            className='next-button'
            disabled={!isStepValid()}
            onClick={nextStep}
          >
            {tf('다음', 'Next')}
          </button>
        ) : (
          <button
            type='button'
            className='sign-up-button'
            disabled={!isStepValid()}
            onClick={handleClickButton}
          >
            {tf('가입하기', 'Submit')}
          </button>
        )}
      </div>
    </S.BottomBar>
  );
};

export default BottomBar;
