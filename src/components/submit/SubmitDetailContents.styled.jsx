import styled from 'styled-components';
import { submitDetailScreenshotStyles } from './submitScreenshotStyles';
const S = {};

S.Container = styled.div`
  width: 100%;
  ${submitDetailScreenshotStyles}

  .header-title {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .step-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #334155;
  }

  .step-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    background: #e8f4fd;
    border: 1px solid #c5e3fa;
    color: #0b84df;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.3;
    white-space: nowrap;
  }

  .step-name {
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #334155;
  }

  .container {
    width: 100%;
    min-height: calc(100vh - 65px);
    padding: 2rem 1.5rem 3rem;
    box-sizing: border-box;

    .container-header-wrap {
      margin: 0 auto;
      width: 100%;
      max-width: 1024px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin-bottom: 2.5rem;

      .title {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: -0.035em;
        color: #0f172a;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .button-wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.65rem;
        flex-wrap: wrap;

        button {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem 1rem;
          font-size: 0.9375rem;
          line-height: 1.25;
          font-weight: 600;
          letter-spacing: -0.01em;
          border-radius: 8px;
          box-shadow: none;
          text-transform: none;
          transition: background-color 0.18s ease, border-color 0.18s ease,
            color 0.18s ease;
        }

        .prev-button {
          background-color: #fff;
          border: 1px solid #cbd5e1;
          color: #475569;

          &:hover {
            background-color: #f8fafc;
            border-color: #94a3b8;
            color: #334155;
          }
        }

        .error-log-button {
          background-color: #dc2626;
          border: 1px solid #dc2626;
          color: #fff;

          &:hover {
            background-color: #b91c1c;
            border-color: #b91c1c;
          }
        }

        .result-button {
          background-color: #0094ff;
          border: 1px solid #0094ff;
          color: #fff;

          &:hover {
            background-color: #0086e6;
            border-color: #0086e6;
          }
        }
      }
    }

    .contents-wrap {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;

      .submit-info-container {
        margin-bottom: 2rem;
        padding: 1.25rem 1.5rem;
        background: #f8fafc;
        border: 1px solid #e8ecf1;
        border-radius: 12px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

        .info-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem 1rem;
          margin-bottom: 1rem;
          align-items: baseline;

          &:last-child {
            margin-bottom: 0;
          }

          .label {
            flex: 0 0 9rem;
            min-width: 7rem;
            font-size: 0.9375rem;
            font-weight: 600;
            color: #64748b;
            letter-spacing: -0.01em;
          }

          .data {
            flex: 1;
            min-width: 0;
            font-size: 1rem;
            font-weight: 500;
            color: #0f172a;
            line-height: 1.55;
            word-break: break-word;
          }
        }
      }

      .submit-file-container {
        margin-bottom: 3rem;
        padding-bottom: 0.25rem;
        border: 1px solid #e8ecf1;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
        overflow: hidden;

        .file-title-wrap {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          padding: 1rem 1.15rem;
          border-bottom: 1px solid #e8ecf1;
          background: #fafbfc;

          .file-title {
            margin: 0;
            font-size: 1.125rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            color: #0f172a;
          }

          /* ListHeader / 업로드 폼과 동일한 n건 배지 */
          .total-count {
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            padding: 0.28rem 0.65rem;
            border-radius: 999px;
            background: rgba(0, 148, 255, 0.12);
            color: #0077cc;
          }
        }

        .file-info-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.15s ease;

          &:last-of-type {
            border-bottom: none;
          }

          &:hover {
            background-color: rgba(248, 250, 252, 0.9);
          }

          .file-info {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.4rem 1rem;
            flex: 1;
            min-width: 0;

            .file-name {
              font-weight: 600;
              font-size: 0.9375rem;
              color: #0f172a;
              max-width: min(28rem, 100%);
              word-break: break-all;
            }

            .file-size {
              font-size: 0.875rem;
              font-weight: 500;
              color: #64748b;
            }
          }
        }

        .download-button {
          cursor: pointer;
          flex-shrink: 0;
          background-color: transparent;
          padding: 0.3rem 0.45rem;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: background-color 0.18s ease, border-color 0.18s ease;

          svg {
            display: block;
            width: 16px;
            height: 16px;
          }

          svg path {
            fill: #64748b;
            transition: fill 0.18s ease;
          }

          &:hover {
            background-color: rgba(0, 148, 255, 0.08);
            border-color: rgba(0, 148, 255, 0.2);

            svg path {
              fill: #0094ff;
            }
          }
        }

        .no-files {
          text-align: center;
          padding: 2rem 1rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #64748b;
        }
      }
    }

    /* 진행 로그 패널 */
    .progress-log-panel {
      margin-top: 0 !important;
      padding: 1.35rem 1.5rem !important;
      border: 1px solid #e8ecf1;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
    }

    .progress-stage-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 0.25rem;
    }

    .current-status-wrap {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }

    .current-status {
      font-weight: 700;
      font-size: 0.9375rem;
      letter-spacing: -0.02em;
    }

    .duration {
      font-size: 0.875rem;
      font-weight: 500;
      color: #94a3b8;
      font-variant-numeric: tabular-nums;
      min-width: 3rem;
    }

    .progress-track {
      position: relative;
      overflow: hidden;
      height: 32px;
      border-radius: 10px;
      background-color: #94a3b8;
    }

    .progress-bar-label {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      z-index: 1;
    }

    .progress-bar {
      box-shadow: none;
      padding: 0;
      margin-bottom: 2rem;
    }
  }

  /* 로딩 스피너 */
  .progress-loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #0094ff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1.2s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .container .contents-wrap .submit-info-container .info-wrap .label {
      flex-basis: 100%;
    }
  }
`;

export default S;
