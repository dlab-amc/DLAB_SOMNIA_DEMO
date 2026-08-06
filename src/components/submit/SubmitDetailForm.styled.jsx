import styled from 'styled-components';
import { submitScreenshotContainerStyles } from './submitScreenshotStyles';

const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  /* Common  */
  .required {
    color: #0094ff;
    font-size: 0.9375rem;
  }

  /* 프로그레스바 영역: 컨테이너 바로 아래 래퍼만 */
  > .submit-title {
    margin-bottom: 6rem;
    padding-top: 1.5rem;
    margin-top: 0.25rem;
  }

  .submit-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eceef0;

    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .submit-title {
        margin: 0 0 1rem;
        font-size: 1.375rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: #0f172a;
        line-height: 1.35;
      }

      .submit-desc {
        font-size: 0.9375rem;
        margin-bottom: 1rem;
      }
    }
  }

  .submit-form {
    max-width: 1024px;
    width: 100%;
    margin-bottom: 8rem;
    .input-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      overflow: visible;

      .label {
        position: relative;
        width: 35%;
        overflow: visible;
        font-size: 1.0625rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        line-height: 160%;
        display: flex;
        align-items: center;
        gap: 8px;
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
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.35;
        background-color: rgba(24, 26, 32, 0.96);
        color: #fff;
        padding: 0.45rem 0.75rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
        white-space: nowrap;
        pointer-events: none;

        /* 아이콘과 툴팁 사이 빈틈에서 호버가 끊기지 않도록 히트 영역 연장 */
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

      .input {
        width: 100%;
        background-color: #f4f5f6;
        padding: 1rem;
        font-size: 1.0625rem;
        border-radius: 8px;
        border: 1px solid transparent;
        transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus {
          outline: none;
          background-color: #fff;
          border-color: rgba(0, 148, 255, 0.35);
          box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.1);
        }
      }
      .textarea {
        width: 100%;
        height: 6rem;
        background-color: #f4f5f6;
        padding: 1rem;
        resize: none;
        font-size: 1.0625rem;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        border-radius: 8px;
        border: 1px solid transparent;
        transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus {
          outline: none;
          background-color: #fff;
          border-color: rgba(0, 148, 255, 0.35);
          box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.1);
        }
      }
      .combobox {
        font-size: 1.0625rem;
        font-weight: 600;
        padding: 1rem 2rem;
        border: 2px solid #eee;
        border-radius: 10px;

        .option {
          font-size: 1.0625rem;
          padding: 1rem;
        }
      }
    }
  }

  .submit-button {
    display: flex;
    justify-content: end;
    .next-button {
      cursor: pointer;
      display: block;
      text-align: center;
      background-color: #0094ff;
      color: #fff;
      font-size: 1.0625rem;
      font-weight: 600;
      padding: 1rem 3rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 148, 255, 0.2);
      transition: background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

      &:hover:not(:disabled) {
        background-color: #1da1ff;
        box-shadow: 0 4px 14px rgba(0, 148, 255, 0.28);
      }

      &:disabled {
        cursor: default;
        background-color: #ddd;
        color: #aaa;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;

    > .submit-title {
      margin-bottom: 3rem;
      padding-top: 1.25rem;
    }

    .submit-header .title-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }

    .submit-form .input-wrap {
      flex-direction: column;
      align-items: stretch;
      gap: 0.65rem;
      margin-bottom: 2rem;

      .label {
        width: 100%;
      }
    }

    .submit-button {
      justify-content: stretch;
      padding: 0 0.25rem;

      .next-button {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  ${submitScreenshotContainerStyles}
`;

export default S;
