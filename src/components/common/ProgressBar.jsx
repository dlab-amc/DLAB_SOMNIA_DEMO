import React from 'react';
import S from './ProgressBar.styled';
import { ReactComponent as Check } from '../../assets/resource/icons/check.svg';
import { useI18n } from '../../assets/i18n';


const ProgressBar = ({ steps, currentStep, wide = false, screenshot = false }) => {
  const { tf } = useI18n();
  const isWide = wide || screenshot;

  const stepCount = steps?.length ?? 0;
  /** 첫 원 중심 → 마지막 완료 구간까지 채울 비율 (1단계만 있거나 단계 1이면 0) */
  const completedRatio =
    stepCount <= 1
      ? 0
      : Math.max(0, Math.min(1, (currentStep - 1) / (stepCount - 1)));

  return (
    <S.StyledProgressBar
      $wide={isWide}
      $screenshot={screenshot}
      $stepCount={stepCount}
      $completedRatio={completedRatio}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <S.Step $wide={isWide} $screenshot={screenshot} $isActive={currentStep === index + 1}>
            <div
              className={`step-indicator ${
                currentStep > index + 1 ? 'done' : ''
              }`}
            >
              {currentStep > index + 1 ? <Check /> : index + 1}
            </div>
            <span className='step-title'>{tf(step.title, step.title_eng)}</span>
          </S.Step>
        </React.Fragment>
      ))}
    </S.StyledProgressBar>
  );
};

export default ProgressBar;
