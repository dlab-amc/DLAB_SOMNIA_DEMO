import React, { useState, useRef, useEffect } from 'react';
import S from './SubmitDetailForm.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { changeInputField } from '../../stores/submit/submit.slice';
import ProgressBar from '../common/ProgressBar';
import PrevNextBar from '../common/PrevNextBar';
import { useI18n } from '../../assets/i18n';
import { useSubmitPage } from '../../contexts/SubmitPageContext';
import { isDemoMode } from '../../demo/isDemoMode';
import { DEMO_SUBMIT_INFO } from '../../demo/autoFillSubmit';

const SubmitDetailForm = () => {
  const { tf } = useI18n();
  const { screenshotMode, paths, progressSteps } = useSubmitPage();
  const dispatch = useAppDispatch();
  const { submitTitle, submitDescription } = useAppSelector(
    (state) => state.submitSlice.info
  );

  // Demo: auto-fill title/description so the user only clicks Next
  useEffect(() => {
    if (!isDemoMode()) return;
    if (!String(submitTitle ?? '').trim()) {
      dispatch(
        changeInputField({
          name: 'submitTitle',
          value: DEMO_SUBMIT_INFO.submitTitle,
        })
      );
    }
    if (!String(submitDescription ?? '').trim()) {
      dispatch(
        changeInputField({
          name: 'submitDescription',
          value: DEMO_SUBMIT_INFO.submitDescription,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const [isGuideHover, setGuideHover] = useState({
    title: false,
    description: false,
  });
  const guideLeaveTimers = useRef({});

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInputField({
        name,
        value,
      })
    );
  };

  const handleMouseEnter = (e) => {
    const key = e.currentTarget.dataset.guide;
    if (!key) return;
    const t = guideLeaveTimers.current[key];
    if (t) {
      clearTimeout(t);
      guideLeaveTimers.current[key] = null;
    }
    setGuideHover((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (e) => {
    const key = e.currentTarget.dataset.guide;
    if (!key) return;
    guideLeaveTimers.current[key] = setTimeout(() => {
      setGuideHover((prev) => ({ ...prev, [key]: false }));
      guideLeaveTimers.current[key] = null;
    }, 150);
  };

  return (
    <S.Container $screenshot={screenshotMode}>
      <div className='submit-title'>
        <ProgressBar
          steps={progressSteps}
          currentStep={1}
          screenshot={screenshotMode}
        />
      </div>
      <div className='submit-header'>
        <div className='title-wrap'>
          <h2 className='submit-title'>
            {tf('1. 기본 정보 입력', '1. Enter Submission Information')}
          </h2>
          <p className='submit-desc'>
            <span className='required'>*</span> {tf('는 필수 입력 필드입니다.','indicates a required field.')}
          </p>
        </div>
      </div>

      <form className='submit-form'>
        <div className='input-wrap'>
          <label className='label' htmlFor='submitTitle'>
            <span className='required'>*</span>
            {tf('제출명','Submission Title')}
            <span
              className='guide-wrap'
              data-guide='title'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className='guide'>?</span>
              {isGuideHover.title && (
                <span className='guide-tip' role='tooltip'>
                  {tf(
                    '간단하고 구분 가능한 제출 제목을 입력하세요. 여러 번 제출 시 각 제출마다 다른 제목을 사용하세요.',
                    'Enter a simple, distinguishable title. Use a different title for each submission if submitting multiple times.'
                  )}
                </span>
              )}
            </span>
          </label>
          <input
            className='input'
            name='submitTitle'
            id='submitTitle'
            type='text'
            placeholder={tf('예: “Model X - Version 2.1 테스트”','Ex. “Model X - Version 2.1 Test”')}
            autoComplete='off'
            onChange={handleChangeInput}
            value={submitTitle}
          />
        </div>
        <div className='input-wrap'>
          <label className='label' htmlFor='submitDescription'>
            <span className='required'>*</span> {tf('제출 설명','Submission Description')}
            <span
              className='guide-wrap'
              data-guide='description'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className='guide'>?</span>
              {isGuideHover.description && (
                <span className='guide-tip' role='tooltip'>
                  {tf('이 테스트에 대한 간단한 설명을 200자 이내로 입력하세요.','Provide a brief description of this test within 200 characters.')}
                </span>
              )}
            </span>
          </label>
          <textarea
            name='submitDescription'
            className='textarea'
            id='submitDescription'
            placeholder={tf(
              '예: ABC 회사 A팀이 제출한 AHI 측정 모델입니다. 첫 번째 테스트입니다.',
              'Ex. This is the AHI measurement model submitted by Team A of ABC Company. First test.'
            )}
            onChange={handleChangeInput}
            value={submitDescription}
            maxLength={200}
          ></textarea>
        </div>
      </form>
      <PrevNextBar
        next={paths.upload}
        nextText={tf('다음','Next')}
        nextDisabled={
          !String(submitTitle ?? '').trim() ||
          !String(submitDescription ?? '').trim()
        }
      />
    </S.Container>
  );
};

export default SubmitDetailForm;
