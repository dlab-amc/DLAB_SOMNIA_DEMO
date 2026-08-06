import { css } from 'styled-components';

/**
 * 논문 figure용 스크린샷 — /submit 레이아웃 유지, 글자만 크게, 스텝바·여백 압축
 * (세로로 여러 장을 붙여도 본문이 읽히도록 rem 기준 확대)
 */
export const submitScreenshotContainerStyles = css`
  ${(p) =>
    p.$screenshot &&
    css`
      max-width: 1100px;
      padding: 0.5rem 1.5rem 1.25rem;

      /* figure용: 상단 스텝 프로그레스 숨김 */
      > .submit-title {
        display: none !important;
      }

      .submit-header {
        margin-bottom: 1.15rem !important;
        padding-bottom: 0.75rem;

        .title-wrap {
          align-items: baseline;
          gap: 0.75rem;
        }

        .title-wrap .submit-title,
        .title-wrap .submit-title-typo {
          margin-bottom: 0.4rem !important;
        }

        h2.submit-title,
        .submit-header .submit-title,
        .submit-title-typo {
          font-size: 1.85rem !important;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.3;
          color: #0f172a;
        }

        .submit-desc,
        .title-desc {
          font-size: 1.2rem !important;
          line-height: 1.45;
          margin-bottom: 0.35rem !important;
        }
      }

      .required {
        font-size: 1.2rem !important;
      }

      .submit-form {
        margin-bottom: 0 !important;

        .input-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 1.5rem;
          margin-bottom: 1.5rem !important;

          .label {
            width: 34%;
            min-width: 11rem;
            flex-shrink: 0;
            font-size: 1.4rem !important;
            font-weight: 600;
            line-height: 1.4;
          }

          .input,
          .textarea,
          .combobox {
            flex: 1;
            width: auto;
            min-width: 0;
            max-width: 62%;
            font-size: 1.4rem !important;
            padding: 0.85rem 1.1rem !important;
          }

          .textarea {
            min-height: 5.5rem;
            align-self: flex-start;
          }

          &:has(.textarea) {
            align-items: flex-start;
          }

          .guide {
            width: 1.65rem;
            height: 1.65rem;
            font-size: 1rem !important;
          }

          .guide-tip {
            font-size: 1.05rem !important;
            white-space: normal;
            max-width: 22rem;
          }

          .drop-area {
            flex: 1;
            min-width: 0;
            max-width: 62%;
            min-height: 10.5rem;

            .drop-desc {
              font-size: 1.35rem !important;
              line-height: 1.55;
              padding: 1.5rem 1.15rem;
              min-height: 8.5rem;

              &::before {
                width: 52px;
                height: 52px;
                margin-bottom: 0.85rem;
                background-size: 26px 26px;
              }
            }

            .drop-hint {
              font-size: 1.2rem !important;
            }
          }
        }
      }

      .uploaded-files {
        margin-bottom: 1.15rem !important;

        .uploaded-files-header {
          padding-bottom: 0.55rem;
          margin-bottom: 0.75rem;
        }

        .uploaded-files-title {
          font-size: 1.4rem !important;
        }

        .total-file {
          font-size: 1.15rem !important;
        }

        .file-wrap {
          padding: 0.9rem 1.15rem;
          margin-bottom: 0.65rem;

          .file-title {
            font-size: 1.35rem !important;
          }

          .file-size {
            font-size: 1.2rem !important;
          }

          .delete-button {
            font-size: 1.15rem !important;
            padding: 0.5rem 1.05rem !important;
          }
        }
      }

      .zip-tree-section {
        margin: 0.85rem 0 1.15rem !important;
        padding: 1rem 1.15rem !important;
        max-height: none;
      }

      .zip-tree-scroll {
        max-height: none !important;
        overflow: visible !important;
      }

      .zip-tree-title {
        font-size: 1.35rem !important;
        margin-bottom: 0.4rem !important;
      }

      .zip-tree-hint {
        font-size: 1.15rem !important;
        margin-bottom: 0.55rem !important;
      }

      .zip-tree {
        font-size: 1.3rem !important;
        line-height: 1.55 !important;
      }

      .zip-tree-loading,
      .zip-tree-empty {
        font-size: 1.2rem !important;
      }

      .validation-status {
        margin: 0.85rem 0 !important;
        padding: 0.85rem 1.1rem !important;
      }

      .validation-status.ok .validation-status-primary,
      .validation-status.err .validation-status-primary {
        font-size: 1.35rem !important;
      }

      .validation-status.ok .validation-status-detail,
      .validation-status.err .validation-status-detail {
        font-size: 1.2rem !important;
        line-height: 1.5 !important;
      }

      .validation-status.ok .validation-detail-label,
      .validation-status.ok .validation-detail-value,
      .validation-status.err .validation-detail-label,
      .validation-status.err .validation-detail-value {
        font-size: 1.2rem !important;
      }

      .next-blocked-hint {
        font-size: 1.2rem !important;
        line-height: 1.55 !important;
        margin: 0.85rem 0 0 !important;
        padding: 0.85rem 1rem !important;
      }

      /* —— Parameters step —— */
      .parameters-section-card {
        margin-bottom: 1rem;
      }

      .parameters-section-card .card-contents {
        padding: 1.15rem 1.25rem;
      }

      .sample-criteria-heading .title-desc {
        font-size: 1.35rem !important;
      }

      .noninferiority-guide-title {
        font-size: 1.3rem !important;
      }

      .noninferiority-guide-item dt {
        font-size: 1.2rem !important;
      }

      .noninferiority-guide-item dd,
      .noninferiority-guide-panel .submit-desc,
      .noninferiority-guide-panel .submit-desc p {
        font-size: 1.15rem !important;
        line-height: 1.55 !important;
      }

      .sampling-mode-toggle button {
        font-size: 1.25rem !important;
        padding: 0.65rem 1rem !important;
        min-height: 2.75rem;
      }

      .subgroup-section-title {
        font-size: 1.35rem !important;
      }

      .subgroup-option-title {
        font-size: 1.3rem !important;
      }

      .subgroup-option-desc {
        font-size: 1.15rem !important;
      }

      .MuiInputLabel-root,
      .MuiFormLabel-root.MuiInputLabel-root {
        font-size: 1.25rem !important;
      }

      .MuiInputBase-input,
      .MuiSelect-select {
        font-size: 1.35rem !important;
        padding-top: 0.85rem !important;
        padding-bottom: 0.85rem !important;
      }

      .MuiTypography-root {
        font-size: 1.2rem !important;
      }

      .MuiFormControlLabel-label {
        font-size: 1.25rem !important;
      }

      .pediatric-band-chip-label {
        font-size: 1.1rem !important;
      }
    `}
`;

/**
 * 제출 상세보기 figure용 스크린샷 스타일
 */
export const submitDetailScreenshotStyles = css`
  ${(p) =>
    p.$screenshot &&
    css`
      .container {
        padding: 1rem 1.5rem 1.5rem !important;
        min-height: auto !important;
      }

      .contents-wrap {
        max-width: 720px !important;
      }

      .container-header-wrap {
        margin-bottom: 1.25rem !important;

        .title {
          font-size: 1.85rem !important;
        }

        .prev-button,
        .error-log-button,
        .result-button {
          font-size: 1.2rem !important;
          padding: 0.55rem 1.1rem !important;
          min-height: 2.6rem;
        }
      }

      .header-title {
        font-size: 1.45rem !important;
      }

      .step-badge {
        font-size: 1.15rem !important;
        padding: 0.3rem 0.7rem !important;
      }

      .step-name,
      .step-title {
        font-size: 1.4rem !important;
      }

      .current-status {
        font-size: 1.3rem !important;
      }

      .duration {
        font-size: 1.2rem !important;
      }

      .progress-bar-label {
        font-size: 1.2rem !important;
      }

      .progress-log-panel {
        padding: 1.5rem 1.65rem !important;
      }

      .progress-track {
        height: 2.35rem !important;
      }

      .progress-loading-spinner {
        width: 1.35rem;
        height: 1.35rem;
      }

      .submit-info-container {
        .info-wrap {
          margin-bottom: 1rem !important;
        }

        .label {
          font-size: 1.3rem !important;
        }

        .data {
          font-size: 1.35rem !important;
        }
      }

      .submit-file-container {
        .section-title,
        .uploaded-files-title,
        h3,
        h4 {
          font-size: 1.4rem !important;
        }

        .file-title {
          font-size: 1.3rem !important;
        }

        .file-size {
          font-size: 1.15rem !important;
        }
      }

      .MuiTypography-root {
        font-size: 1.25rem !important;
      }
    `}
`;
