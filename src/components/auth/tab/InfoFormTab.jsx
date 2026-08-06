import React, { useEffect, useState } from 'react';
import S from '../SignUpForm.styled';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/useRedux';
import {
  changeInputField,
  inputFieldCheck,
  viewCheckMessage,
} from '../../../stores/signup/signup.slice';
import { USER_ACCOUNT_TYPE } from '../../../assets/data/data';
import { UNIQUE_CHECK, VALID_CHECK_REGEX } from '../../../assets/data/signup';
import axios from 'axios';
import {
  setLoading,
  setVisibleModal,
} from '../../../stores/common/common.slice';

import { checkBusinessNumber } from '../../../assets/module/businessAPI';
import { useI18n } from '../../../assets/i18n';

const InfoFormTab = ({ accountType }) => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  let {
    userId,
    userPassword,
    userPasswordCheck,
    organization,
    userName,
    userTel,
    userEmail,
    authNumber,
    companyName,
    companyAddress,
    companyDepartment,
    companyTel,
    businessNumber,
    userIdChecked,
    userPasswordChecked,
    userNameChecked,
    userTelChecked,
    userEmailChecked,
    authNumberChecked,
    companyNameChecked,
    companyTelChecked,
    companyDepartmentChecked,
    isIdUnique,
    isPasswordCorrect,
    isUserTelUnique,
    isAuthMailSent,
    isAuthNumberCorrect,
    isIdUniqueMessage,
    isUserTelUniqueMessage,
    isAuthMailSentMessage,
    isAuthNumberCorrectMessage,
  } = useAppSelector((state) => state.signupSlice.info);

  const [businessNumberValid, setBusinessNumberValid] = useState(null);
  const [businessNumberMessage, setBusinessNumberMessage] = useState('');
  const [isFieldDuplicated, setFieldDuplicated] = useState({
    isIdUnique: false,
    isUserTelUnique: false,
    isAuthMailSent: false,
    isAuthNumberCorrect: false,
  });

  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const [showDetailPopup, setShowDetailPopup] = useState(false); // 팝업 상태
  const [detailAddress, setDetailAddress] = useState(''); // 상세 주소

  const [showDetailAddressMessage, setShowDetailAddressMessage] =
    useState(false);

  // 주소 검색 핸들러 (Daum CDN 불가 시 수동 입력으로 fallback)
  const handleAddressSearch = () => {
    if (typeof window !== 'undefined' && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          const fullAddress = data.address;
          dispatch(
            changeInputField({ name: 'companyAddress', value: fullAddress })
          );
          setShowDetailPopup(true);
        },
      }).open();
      return;
    }
    // 폐쇄망·CDN 차단 환경: 직접 입력 유도
    setShowDetailPopup(false);
  };

  // 상세 주소 입력 핸들러
  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  // 팝업 닫기 및 주소 합치기
  const handleSaveDetailAddress = () => {
    const fullAddress = `${companyAddress} ${detailAddress}`.trim();
    dispatch(changeInputField({ name: 'companyAddress', value: fullAddress })); // Redux 상태에 주소 업데이트
    setShowDetailPopup(false);
  };

  const handleBusinessNumberCheck = async () => {
    try {
      const { isValid, skipped } = await checkBusinessNumber(businessNumber);
      if (isValid) {
        setBusinessNumberValid(true);
        setBusinessNumberMessage(
          skipped
            ? tf(
                '사업자 API 키가 없어 검증을 건너뛰었습니다. (로컬/OSS 데모)',
                'Business API key is not set; validation skipped (local/OSS demo).'
              )
            : tf('유효한 사업자등록번호입니다.', 'Valid business registration number.')
        );
        dispatch(
          inputFieldCheck({ name: 'businessNumberChecked', boolean: true })
        );
      } else {
        setBusinessNumberValid(false);
        setBusinessNumberMessage(tf('유효하지 않은 사업자등록번호입니다.', 'Invalid business registration number.'));
      }
    } catch (error) {
      setBusinessNumberValid(false);
      setBusinessNumberMessage(tf('API 호출에 실패했습니다. 다시 시도해주세요.', 'Failed to call the API. Please try again.'));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2));
      dispatch(changeInputField({ name: 'businessFile', value: file }));
    }
  };

  const handleRemoveFile = () => {
    setFileName('');
    setFileSize('');
    dispatch(changeInputField({ name: 'businessFile', value: null }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2));
      dispatch(changeInputField({ name: 'businessFile', value: file }));
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInputField({
        name,
        value,
      })
    );
    inputValidCheck(name, value);

    // Temp
    if (name === 'userId' && isIdUnique) {
      dispatch(
        inputFieldCheck({
          name: 'isIdUnique',
          boolean: false,
        })
      );
      setFieldDuplicated((prev) => ({ ...prev, isIdUnique: false }));
    }
    if (name === 'userTel' && isUserTelUnique) {
      dispatch(
        inputFieldCheck({
          name: 'isUserTelUnique',
          boolean: false,
        })
      );
      setFieldDuplicated((prev) => ({ ...prev, isUserTelUnique: false }));
    }
    if (name === 'userEmail' && isAuthMailSent) {
      dispatch(
        inputFieldCheck({
          name: 'isAuthMailSent',
          boolean: false,
        })
      );
      setFieldDuplicated((prev) => ({ ...prev, isAuthMailSent: false }));
    }
    if (name === 'authNumber' && isAuthNumberCorrect) {
      dispatch(
        inputFieldCheck({
          name: 'isAuthNumberCorrect',
          boolean: false,
        })
      );
      setFieldDuplicated((prev) => ({ ...prev, isAuthNumberCorrect: false }));
    }
  };

  const inputValidCheck = (name, value) => {
    const isValid = VALID_CHECK_REGEX[name].test(value);
    if (!isValid) {
      dispatch(
        inputFieldCheck({
          name: `${name}Checked`,
          boolean: false,
        })
      );
    } else {
      dispatch(
        inputFieldCheck({
          name: `${name}Checked`,
          boolean: true,
        })
      );
    }

    if (name === 'userPasswordCheck') {
      checkPasswordCheck(value);
    }
  };

  const checkPasswordCheck = (value) => {
    if (value !== userPassword) {
      dispatch(
        inputFieldCheck({
          name: 'isPasswordCorrect',
          boolean: false,
        })
      );
    } else {
      dispatch(
        inputFieldCheck({
          name: 'isPasswordCorrect',
          boolean: true,
        })
      );
    }
  };

  const checkIdUnique = () => {
    const params = {
      login_id: userId,
    };
    fetchCheckApi(params, '/check/id', 'isIdUnique');
  };

  const checkTelUnique = () => {
    const params = {
      phone_number: userTel,
    };
    fetchCheckApi(params, '/check/tel', 'isUserTelUnique');
  };

  const sendAuthMail = () => {
    const params = {
      email: userEmail,
    };
    fetchCheckApi(params, '/auth', 'isAuthMailSent');
  };

  const checkAuthNumber = () => {
    const params = { auth_number: authNumber, email: userEmail };
    fetchCheckApi(params, '/check/auth', 'isAuthNumberCorrect');
  };

  const fetchCheckApi = async (params, path, name) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BACKEND_URL}${path}`, params);
      if (response.data.status === 200) {
        const match = tf(name, `${name}_eng`);
        dispatch(
          inputFieldCheck({
            name,
            boolean: true,
          })
        );
        dispatch(
          viewCheckMessage({
            name,
            message: UNIQUE_CHECK[match].success,
          })
        );
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.status === 409) {
        const match = tf(name, `${name}_eng`);
        setFieldDuplicated((prev) => ({ ...prev, [name]: true }));
        dispatch(
          inputFieldCheck({
            name,
            boolean: false,
          })
        );
        dispatch(
          viewCheckMessage({
            name,
            message: UNIQUE_CHECK[match].failure,
          })
        );
      } else {
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
    <S.InfoBlock>
      <h2 className='form-title'>{tf('3. 회원 정보 입력', '3. Enter Info')}</h2>

      <div className='input-wrap'>
        <label className='input-label' htmlFor='userId'>
          <span className='text'>
            {tf('아이디', 'ID')} <span className='required'>*</span>
          </span>
          {!userIdChecked && !isFieldDuplicated.isIdUnique && (
            <span className='error'>
              {tf('영어 대소문자, 숫자 포함 5~20자 입력해주세요.', 'Enter 5–20 characters including letters and numbers.')}
            </span>
          )}
          {userIdChecked && (isIdUnique || isFieldDuplicated.isIdUnique) && (
            <span className='check'>{isIdUniqueMessage}</span>
          )}
        </label>
        <div className='inputs'>
          <input
            className='input short'
            type='text'
            name='userId'
            id='userId'
            placeholder={tf('아이디 입력 (영문자, 숫자 5~20자)', 'Enter username (5–20 letters or numbers)')}
            value={userId}
            onChange={handleChangeInput}
            maxLength={20}
            autoComplete='off'
          />
          <button
            className='form-button'
            disabled={!userIdChecked || isIdUnique}
            onClick={checkIdUnique}
          >
            {isIdUnique ? tf('중복 확인 완료', 'Checked') : tf('중복 확인', 'Check')}
          </button>
        </div>
      </div>

      <div className='input-wrap'>
        <label className='input-label' htmlFor='userPassword'>
          <span className='text'>
            {tf('비밀번호', 'Password')} <span className='required'>*</span>
          </span>
          {!userPasswordChecked && (
            <span className='error'>
              {tf('영어 대소문자, 숫자, 특수문자 포함 8~16자 입력해주세요.', 'Enter 8–16 characters including letters, numbers, and symbols.')}
            </span>
          )}
        </label>
        <div className='inputs'>
          <input
            className='input long'
            type='password'
            name='userPassword'
            id='userPassword'
            placeholder={tf('비밀번호 입력 (영문자, 숫자, 특수문자 8~16자)', 'Enter password (8–16 letters, numbers, and symbols)')}
            value={userPassword}
            onChange={handleChangeInput}
            maxLength={16}
          />
        </div>
      </div>

      <div className='input-wrap'>
        <label className='input-label' htmlFor='userPasswordCheck'>
          <span className='text'>
            {tf('비밀번호 확인', 'Confirm Password')} <span className='required'>*</span>
          </span>
          {!isPasswordCorrect && (
            <span className='error'>
              {tf('비밀번호가 일치하지 않습니다. 다시 확인해주세요.', 'Passwords do not match. Please check again.')}
            </span>
          )}
        </label>
        <div className='inputs'>
          <input
            className='input long'
            type='password'
            name='userPasswordCheck'
            id='userPasswordCheck'
            placeholder={tf('비밀번호 재입력', 'Re-enter password')}
            value={userPasswordCheck}
            onChange={handleChangeInput}
            maxLength={16}
          />
        </div>
      </div>

      {accountType === USER_ACCOUNT_TYPE.BUSINESS ? (
        <>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userName'>
              <span className='text'>
                {tf('담당자 성명', 'Name')} <span className='required'>*</span>
              </span>
              {!userNameChecked && (
                <span className='error'>{tf('최소 2자 이상 작성해주세요.', 'Please enter at least 2 characters.')}</span>
              )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='userName'
                id='userName'
                placeholder={tf('담당자 성명 입력', 'Enter your name')}
                value={userName}
                onChange={handleChangeInput}
                autoComplete='off'
              />
            </div>
          </div>

          <div className='input-wrap'>
            <label className='input-label' htmlFor='businessFile'>
              <span className='text'>
                {tf('사업자 등록증', 'Business License')} <span className='required'>*</span>
              </span>
            </label>
            <div className='file-upload-container'>
              <label
                htmlFor='businessFileInput'
                className={`upload-area ${dragActive ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!fileName ? (
                  <>
                    <span type='button' className='upload-button'>
                      <span>⬆ {tf('파일 업로드', 'Upload File')}</span>
                    </span>
                    <span className='upload-placeholder'>
                      {tf('파일을 선택하거나 드래그하세요','Select or drag a file')}
                    </span>
                  </>
                ) : (
                  <div className='file-info'>
                    <span className='file-name'>{fileName}</span>
                    <span className='file-size'>{fileSize} KB</span>
                    <button
                      type='button'
                      className='remove-file'
                      onClick={handleRemoveFile}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </label>
              <input
                id='businessFileInput'
                type='file'
                accept='.pdf'
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* 사업자등록번호 입력 */}
          <div className='input-wrap'>
            <label className='input-label' htmlFor='businessNumber'>
              <span className='text'>
                {tf('사업자 등록번호', 'Business Registration Number')} <span className='required'>*</span>
              </span>
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='businessNumber'
                id='businessNumber'
                placeholder={tf('사업자등록번호 입력', 'Enter a business registration number')}
                value={businessNumber || ''}
                onChange={handleChangeInput}
                maxLength={10}
              />
              <button
                className='form-button'
                onClick={handleBusinessNumberCheck}
              >
                {tf('사업자 확인', 'Check')}
              </button>
            </div>
            {businessNumberValid === true && (
              <span className='check'>{businessNumberMessage}</span>
            )}
            {businessNumberValid === false && (
              <span className='error'>{businessNumberMessage}</span>
            )}
          </div>

          <div className='input-wrap'>
            <label className='input-label' htmlFor='companyName'>
              <span className='text'>
                {tf('기업명', 'Company Name')} <span className='required'>*</span>
              </span>
              {!companyNameChecked && (
                <span className='error'>{tf('최소 2자 이상 작성해주세요.', 'Please enter at least 2 characters.')}</span>
              )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='companyName'
                id='companyName'
                placeholder={tf('기업명 입력', 'Enter a company name')}
                value={companyName}
                onChange={handleChangeInput}
                autoComplete='off'
              />
            </div>
          </div>

          <div className='input-wrap'>
            <label className='input-label' htmlFor='companyAddress'>
              <span className='text'>
                {tf('기업 주소지', 'Company Address')} <span className='required'>*</span>
              </span>
            </label>
            <div className='inputs'>
              <input
                className='input long'
                type='text'
                name='companyAddress'
                id='companyAddress'
                placeholder={tf(
                  '주소를 직접 입력하거나 주소 검색을 사용하세요',
                  'Enter an address manually or use address search'
                )}
                value={companyAddress}
                onChange={handleChangeInput}
              />
              <button className='form-button' type='button' onClick={handleAddressSearch}>
                {tf('주소 검색', 'Search')}
              </button>
            </div>
          </div>

          {/* 상세 주소 입력 팝업 */}
          {showDetailPopup && (
            <div className='popup-overlay'>
              <div className='popup-content'>
                <h3>{tf('상세 주소 입력', 'Detail Address')}</h3>
                <input
                  type='text'
                  className='input long'
                  placeholder={tf('상세 주소를 입력해주세요', 'Enter a detail address')}
                  value={detailAddress}
                  onChange={handleDetailAddressChange}
                />
                <S.PopupButtons>
                  <button
                    className='popup-button save'
                    onClick={handleSaveDetailAddress}
                  >
                    저장
                  </button>
                  <button
                    className='popup-button cancel'
                    onClick={() => setShowDetailPopup(false)}
                  >
                    취소
                  </button>
                </S.PopupButtons>
              </div>
            </div>
          )}
          <div className='input-wrap'>
            <label className='input-label' htmlFor='companyDepartment'>
              <span className='text'>
                {tf('부서 및 소속', 'Department')} <span className='required'>*</span>
              </span>
              {!companyDepartmentChecked && (
                <span className='error'>{tf('최소 2자 이상 작성해주세요.', 'Please enter at least 2 characters.')}</span>
              )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='companyDepartment'
                id='companyDepartment'
                placeholder={tf('부서 및 소속 입력', 'Enter a department')}
                value={companyDepartment}
                onChange={handleChangeInput}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='companyDepartment'>
              <span className='text'>
                <span className='selected'>{tf('(선택)', '(Optional)')}</span> {tf('기업 연락처', 'Company Tel')}
              </span>
              {!companyTelChecked && (
                <span className='error'>
                  {tf("'-' 제외 6자리 숫자를 입력해주세요.", "Enter 6 digits without dashes (-)")}
                </span>
              )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='companyTel'
                id='companyTel'
                placeholder={tf('(선택) 기업 연락처 입력','(Optional) Enter a company tel')}
                value={companyTel}
                onChange={handleChangeInput}
                maxLength={20}
                autoComplete='off'
              />
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userTel'>
              <span className='text'>
                {tf('담당자 전화번호', 'User Tel')} <span className='required'>*</span>
              </span>
              {!userTelChecked && !isFieldDuplicated.isUserTelUnique && (
                <span className='error'>
                  {tf("'-' 제외 11자리 숫자를 입력해주세요.", "Enter 11 digits without dashes (-)")}
                </span>
              )}
              {userTelChecked &&
                (isUserTelUnique || isFieldDuplicated.isUserTelUnique) && (
                  <span className='check'>{isUserTelUniqueMessage}</span>
                )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='tel'
                name='userTel'
                id='userTel'
                placeholder={tf("'-' 제외 11자리 숫자 입력", "Enter 11 digits without dashes (-)")}
                value={userTel}
                onChange={handleChangeInput}
                maxLength={11}
                autoComplete='off'
              />
              <button
                className='form-button'
                onClick={checkTelUnique}
                disabled={!userTelChecked || isUserTelUnique}
              >
                {isUserTelUnique ? tf('중복 확인 완료', 'Checked') : tf('중복 확인', 'Check')}
              </button>
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userEmail'>
              <span className='text'>
                {tf('이메일 주소', 'User Email')} <span className='required'>*</span>
              </span>
              {!userEmailChecked && !isFieldDuplicated.isAuthMailSent && (
                <span className='error'>
                  {tf('올바른 형식의 이메일 주소를 입력해주세요.', 'Please enter a valid email address.')}
                </span>
              )}
              {userEmailChecked &&
                (isAuthMailSent || isFieldDuplicated.isAuthMailSent) && (
                  <span className='check'>{isAuthMailSentMessage}</span>
                )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='email'
                name='userEmail'
                id='userEmail'
                placeholder={tf('이메일 주소 입력', 'Enter a email address')}
                value={userEmail}
                onChange={handleChangeInput}
                autoComplete='off'
              />
              <button
                className='form-button'
                onClick={sendAuthMail}
                disabled={!userEmailChecked || isAuthMailSent}
              >
                {isAuthMailSent ? tf('인증번호 전송 완료', 'Sent') : tf('인증번호 전송', 'Send Code')}
              </button>
            </div>
          </div>
          {isAuthMailSent && (
            <div className='input-wrap'>
              <label className='input-label' htmlFor='authNumber'>
                <span className='text'>
                  인증번호 입력 <span className='required'>*</span>
                </span>
                {!authNumberChecked && (
                  <span className='error'>
                    전송받은 메일의 6자리 숫자를 입력해주세요.
                  </span>
                )}
                {authNumberChecked && isAuthNumberCorrect && (
                  <span className='check'>{isAuthNumberCorrectMessage}</span>
                )}
              </label>
              <div className='inputs'>
                <input
                  className='input short'
                  type='text'
                  name='authNumber'
                  id='authNumber'
                  placeholder='인증번호 6자리 입력'
                  value={authNumber}
                  onChange={handleChangeInput}
                  maxLength={6}
                  autoComplete='off'
                />
                <button
                  className='form-button'
                  onClick={checkAuthNumber}
                  disabled={isAuthNumberCorrect}
                >
                  {isAuthNumberCorrect ? '인증 완료' : '인증번호 확인'}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userName'>
              <span className='text'>
                {tf('성명', 'Name')}
                <span className='required'>*</span>
              </span>
              {!userNameChecked && (
                <span className='error'>{tf('최소 2자 이상 작성해주세요.', 'Please enter at least 2 characters.')}</span>
              )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='userName'
                id='userName'
                placeholder={tf('성명 입력', 'Enter your name')}
                value={userName}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='organization'>
              <span className='text'>
                {tf('소속', 'Organization')}
                <span className='required'>*</span>
              </span>
              <span className='error'>{tf('소속을 입력해주세요.', 'Please enter your organization.')}</span>
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='organization'
                id='organization'
                placeholder={tf('소속 입력', 'Enter organization')}
                value={organization} 
                onChange={handleChangeInput} 
                autoComplete='off'
              />
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userTel'>
              <span className='text'>
                {tf('전화번호', 'Phone Number')}
                <span className='required'>*</span>
              </span>
              {!userTelChecked && !isFieldDuplicated.isUserTelUnique && (
                <span className='error'>
                  {tf("'-' 제외 11자리 숫자를 입력해주세요.", "Enter 11 digits without dashes (-)")}
                </span>
              )}
              {userTelChecked &&
                (isUserTelUnique || isFieldDuplicated.isUserTelUnique) && (
                  <span className='check'>{isUserTelUniqueMessage}</span>
                )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='text'
                name='userTel'
                id='userTel'
                placeholder={tf("'-' 제외 11자리 숫자 입력", "Enter 11 digits (no dashes)")}
                value={userTel}
                onChange={handleChangeInput}
                maxLength={11}
                autoComplete='off'
              />
              <button
                className='form-button'
                onClick={checkTelUnique}
                disabled={!userTelChecked || isUserTelUnique}
              >
                {isUserTelUnique ? tf('중복 확인 완료', 'Checked') : tf('중복 확인', 'Check')}
              </button>
            </div>
          </div>
          <div className='input-wrap'>
            <label className='input-label' htmlFor='userEmail'>
              <span className='text'>
                {tf('이메일 주소', 'Email Address')}
                <span className='required'>*</span>
              </span>
              {!userEmailChecked && !isFieldDuplicated.isAuthMailSent && (
                <span className='error'>
                  {tf('올바른 형식의 이메일 주소를 입력해주세요.', 'Please enter a valid email address.')}
                </span>
              )}
              {userEmailChecked &&
                (isAuthMailSent || isFieldDuplicated.isAuthMailSent) && (
                  <span className='check'>{isAuthMailSentMessage}</span>
                )}
            </label>
            <div className='inputs'>
              <input
                className='input short'
                type='email'
                name='userEmail'
                id='userEmail'
                placeholder={tf('이메일 주소 입력', 'Enter your email address')}
                value={userEmail}
                onChange={handleChangeInput}
                autoComplete='off'
              />
              <button
                className='form-button'
                onClick={sendAuthMail}
                disabled={!userEmailChecked || isAuthMailSent}
              >
                {isAuthMailSent ? tf('인증번호 전송 완료', 'Sent') : tf('인증번호 전송', 'Send Code')}
              </button>
            </div>
          </div>
          {isAuthMailSent && (
            <div className='input-wrap'>
              <label className='input-label' htmlFor='authNumber'>
                {tf('인증번호 입력', 'Verification Code')}
                {!authNumberChecked && (
                  <span className='error'>
                    {tf('전송받은 메일의 6자리 숫자를 입력해주세요.', 'Please enter the 6-digit code sent to your email.')}
                  </span>
                )}
                {authNumberChecked && isAuthNumberCorrect && (
                  <span className='check'>{isAuthNumberCorrectMessage}</span>
                )}
              </label>
              <div className='inputs'>
                <input
                  className='input short'
                  type='text'
                  name='authNumber'
                  id='authNumber'
                  placeholder={tf('인증번호 6자리 입력', 'Enter 6-digit verification code')}
                  value={authNumber}
                  onChange={handleChangeInput}
                  maxLength={6}
                  autoComplete='off'
                />
                <button
                  className='form-button'
                  onClick={checkAuthNumber}
                  disabled={isAuthNumberCorrect}
                >
                  {isAuthNumberCorrect ? tf('인증 완료', 'Verified') : tf('인증번호 확인', 'Verify Code')}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </S.InfoBlock>
  );
};

export default InfoFormTab;
