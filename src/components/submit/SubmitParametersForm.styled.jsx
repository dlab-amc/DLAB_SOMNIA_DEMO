import styled from 'styled-components';
import { submitScreenshotContainerStyles } from './submitScreenshotStyles';

const S = {};
S.Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding-bottom: 5.5rem;

  .card-contents {
    padding: 0;
  }

  .parameters-section-card {
    border: 1px solid #e8ecf1;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
    overflow: visible;
  }

  .parameters-section-card + .parameters-section-card {
    margin-top: 3rem;
  }

  .parameters-section-card .card-contents {
    padding: 1.35rem 1.5rem;
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0 0 1rem;
    flex-wrap: wrap;
  }

  .section-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    flex-shrink: 0;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
    background: #0f172a;
    box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e2e8f0;
  }

  .section-heading-title {
    margin: 0 !important;
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
    color: #0f172a !important;
  }

  .age-cohort-card .section-heading {
    margin-bottom: 1rem;
  }

  /* 탭 아래 불필요 여백 제거 — 소아 구간이 있을 때만 간격 */
  .age-cohort-card .sampling-mode-toggle {
    margin-bottom: 0;
  }

  /* 연령군 / 샘플링 모드 토글 버튼 높이 통일 */
  .sampling-mode-toggle.age-cohort-toggle button,
  .sampling-mode-toggle.sampling-mode-toggle--fixed-height button {
    height: 52px !important;
    min-height: 52px !important;
    max-height: 52px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    box-sizing: border-box;
  }

  .age-cohort-btn-text {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.05rem;
    line-height: 1.15;
  }

  .age-cohort-btn-title {
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  .age-cohort-btn-sub {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.78;
    line-height: 1.15;
  }

  .age-cohort-card .pediatric-band-block {
    margin-top: 1.25rem;
  }

  > .submit-title {
    margin-bottom: 5rem;
    padding-top: 1.5rem;
    margin-top: 0.25rem;
  }

  .sample-criteria-heading {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.15rem;
    flex-wrap: wrap;
  }

  .title-desc {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .submit-guide-toggle {
    margin-top: 0.35rem;
    padding: 0.25rem 0.15rem;
    min-width: 0;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #0094ff;
    text-transform: none;
    border-radius: 6px;

    &:hover {
      background-color: rgba(0, 148, 255, 0.06);
    }
  }

  .submit-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e8ecf1;

    .submit-title-typo {
      margin: 0 0 0.35rem;
      font-size: 1.375rem;
      font-weight: 700;
      letter-spacing: -0.035em;
      color: #0f172a;
      line-height: 1.35;
    }

    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .submit-title-typo {
        margin-bottom: 1rem;
      }

      .submit-desc {
        font-size: 0.9375rem;
        margin-bottom: 1rem;
      }
    }

    .guide-link {
      text-decoration: underline;
      font-weight: 600;
      color: #0094ff;

      &:hover {
        color: #0078d4;
      }
    }
  }

  .noninferiority-guide-panel {
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
    padding: 1.2rem 1.35rem 1.15rem;
    background: #f8fafc;
    border: 1px solid #e8ecf1;
    border-radius: 10px;
    border-left: 3px solid #0094ff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .noninferiority-guide-title {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
  }

  .noninferiority-guide-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .noninferiority-guide-item {
    margin: 0;
    padding: 0;
  }

  .noninferiority-guide-item dt {
    margin: 0 0 0.2rem;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #0f172a;
  }

  .noninferiority-guide-item dd {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.55;
    color: #475569;
  }

  .noninferiority-guide-footer {
    margin-top: 1.1rem;
    padding-top: 0.9rem;
    border-top: 1px solid #e8ecf1;
  }

  .noninferiority-guide-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #0094ff;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 148, 255, 0.35);
    padding-bottom: 1px;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: #0078d4;
      border-bottom-color: #0078d4;
    }
  }

  .noninferiority-guide-link-arrow {
    font-size: 0.9em;
    line-height: 1;
  }

  .noninferiority-guide-section {
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #e8ecf1;
  }

  /* 세그먼트형 샘플링 모드 */
  .sampling-mode-toggle {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 0;
    padding: 4px;
    margin-bottom: 1.35rem;
    background: #f1f5f9;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    button {
      flex: 1;
      min-width: min(200px, 100%);
      min-height: 40px;
      border-radius: 10px !important;
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      box-shadow: none !important;
      border-width: 0 !important;
      transition: background-color 0.18s ease, color 0.18s ease;
    }

    .MuiButton-contained {
      background-color: #0094ff !important;
      color: #fff !important;
      box-shadow: 0 1px 3px rgba(0, 148, 255, 0.28) !important;
    }

    .MuiButton-outlined {
      background-color: transparent !important;
      color: #64748b !important;
      border: none !important;

      &:hover {
        background-color: rgba(255, 255, 255, 0.65) !important;
        color: #475569 !important;
      }
    }
  }

  /* 기준값 프리셋 셀렉트 — 입력 영역만 (메뉴는 JSX sx) */
  .preset-form-control {
    .MuiOutlinedInput-root {
      border-radius: 10px;
      background-color: #fafbfc;
      transition: background-color 0.18s ease;

      &:hover {
        background-color: #f8fafc;
      }

      &.Mui-focused {
        background-color: #fff;
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #e2e8f0;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #cbd5e1;
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border-width: 2px;
      border-color: #0094ff;
    }

    .MuiInputLabel-root.Mui-focused {
      color: #0094ff;
    }
  }

  .manual-sample-field .MuiOutlinedInput-root {
    border-radius: 10px;
    background-color: #fafbfc;
  }

  .param-fields-grid {
    margin-top: 0.25rem;

    .MuiOutlinedInput-root {
      border-radius: 10px;
      background-color: #fafbfc;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #e2e8f0;
    }
  }

  .subgroup-section-title {
    margin-bottom: 0 !important;
    font-size: 1.125rem !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
    color: #0f172a !important;
  }

  .subgroup-card .section-heading {
    margin-bottom: 1rem;
  }

  .subgroup-row {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 12px;

    .MuiFormControlLabel-root {
      flex: 1;
      min-width: min(160px, 100%);
      margin: 0;
      padding: 12px 14px 10px;
      border: 1px solid #e8ecf1;
      border-radius: 10px;
      background: #fafbfc;
      transition: border-color 0.18s ease, background-color 0.18s ease,
        box-shadow 0.18s ease;
      align-items: flex-start;

      &:hover {
        border-color: #cbd5e1;
        background: #fff;
      }
    }

    .MuiFormControlLabel-label {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .MuiFormControlLabel-root.Mui-disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .MuiFormControlLabel-label.Mui-disabled {
      color: #94a3b8;
    }

    .MuiCheckbox-root {
      padding: 6px 10px 6px 4px;
      color: #94a3b8;

      &.Mui-checked {
        color: #0094ff;
      }
    }

    .subgroup-option-label {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin: 0;
      padding: 0;
      line-height: 1.2;
    }

    .subgroup-option-title {
      display: block;
      font-weight: 700;
      font-size: 0.9375rem;
      letter-spacing: -0.02em;
      color: #0f172a;
    }

    .subgroup-option-desc {
      display: block;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.3;
      letter-spacing: 0.01em;
      color: #333;
    }

    .MuiFormControlLabel-root:has(.Mui-checked) {
      border-color: rgba(0, 148, 255, 0.45);
      background: rgba(0, 148, 255, 0.05);
      box-shadow: 0 1px 2px rgba(0, 148, 255, 0.08);
    }
  }

  .pediatric-band-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: stretch;
  }

  .pediatric-band-chip {
    flex: 1 1 calc(20% - 8px);
    min-width: 88px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 8px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: #f8fafc;
    cursor: pointer;
    transition: border-color 0.18s ease, background-color 0.18s ease,
      box-shadow 0.18s ease;
    font-family: inherit;
    text-align: center;

    &:hover:not(:disabled) {
      border-color: #94a3b8;
      background: #fff;
    }

    &.is-selected {
      border-color: #0094ff;
      background: #eff8ff;
      box-shadow: inset 0 0 0 1px #0094ff;
    }

    &.is-disabled,
    &:disabled {
      opacity: 0.42;
      cursor: not-allowed;
      background: #f1f5f9;
    }
  }

  .pediatric-band-chip-label {
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.3;
    color: #0f172a;
    word-break: keep-all;
  }

  .guide-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    vertical-align: middle;
  }

  .guide {
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 700;
    display: inline-flex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #0094ff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #169eff;
    }
  }

  .guide-tip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 10050;
    display: block;
    width: max-content;
    max-width: min(480px, calc(100vw - 3rem));
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: rgba(24, 26, 32, 0.96);
    color: #fff;
    padding: 0.55rem 0.8rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
    white-space: pre-line;
    word-break: keep-all;
    overflow-wrap: break-word;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      right: 100%;
      width: 12px;
      top: 0;
      bottom: 0;
      min-height: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;

    .submit-header .title-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }

    .subgroup-row {
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
    }

    .pediatric-band-chip {
      flex: 1 1 calc(33.333% - 8px);
      min-width: 72px;
      padding: 10px 6px;
    }

    .pediatric-band-chip-label {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .pediatric-band-chip {
      flex: 1 1 calc(50% - 8px);
    }
  }
`;

S.ParamDataForm = styled.div`
  /* TEMP - MUI Custom Styling */
  .MuiTypography-root,
  .MuiSelect-select,
  .option label,
  .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl {
    font-family: 'Pretendard', Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
  }

  /* CardContent */
  .param-box-contents {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 6px;
    padding: 1.5rem 2rem;
  }

  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .header-title {
      font-weight: 600;
      font-size: 1.5rem;
    }

    .header-button-wrap {
      .header-button {
        font-size: 1.0625rem;
        font-weight: 600;
        padding: 0.6rem 1.4rem;
        box-shadow: none;
        transition: background-color 0.2s ease-in;

        &.edit {
          background-color: #fff;
          color: #000;
          border: 1px solid #000;
          &:hover {
            background-color: #eee;
          }
        }

        &.setting {
          background-color: #000;
          color: #fff;
          border: 1px solid #000;

          &:hover {
            background-color: #222;
            border: 1px solid #222;
          }
        }
      }
    }
  }

  .MuiMenuItem-root.option {
    padding: 1rem 1.5rem !important;
  }

  .main-label {
    background-color: #fff;
  }

  @media (max-width: 768px) {
    .param-box-contents {
      padding: 1rem 1rem;
    }

    .header-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }

  ${submitScreenshotContainerStyles}
`;

export default S;
