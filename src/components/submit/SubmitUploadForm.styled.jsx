import styled from 'styled-components';
import { Card } from '@mui/material';
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

  > .submit-title {
    margin-bottom: 5rem;
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
    }

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

      a {
        text-decoration: underline;
        font-weight: 500;
      }

      .guide-link {
        color: #0094ff;
        font-weight: 600;
        transition: color 0.2s ease;

        &:hover {
          color: #1fa2ff;
        }
      }
    }
  }

  .submit-form {
    max-width: 1024px;
    width: 100%;
    margin-bottom: 4rem;
    .input-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      overflow: visible;

      .label {
        position: relative;
        width: 30%;
        overflow: visible;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.0625rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        line-height: 160%;
      }

      .drop-area {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 158px;
        cursor: pointer;
        padding: 0;
        border-radius: 12px;
        border: 1px dashed rgba(0, 148, 255, 0.28);
        background: linear-gradient(165deg, #fbfcfe 0%, #f3f6fb 55%, #eef3fa 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
        transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;

        /* 파일 선택은 숨김 input + 영역 클릭 / 네이티브 드래그앤드롭 */
        .input {
          display: none;
        }

        .drop-desc {
          position: relative;
          margin: 0;
          width: 100%;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #334155;
          text-align: center;
          line-height: 1.65;
          padding: 2rem 1.35rem 1.85rem;
          min-height: 140px;
          border: none;
          border-radius: inherit;

          &::before {
            content: '';
            display: block;
            width: 44px;
            height: 44px;
            margin: 0 auto 1rem;
            border-radius: 12px;
            background-color: rgba(0, 148, 255, 0.1);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230094ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='17 8 12 3 7 8'/%3E%3Cline x1='12' y1='3' x2='12' y2='15'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 22px 22px;
          }

          .file-name {
            display: inline-block;
            margin: 0 0.15em;
            padding: 0.12em 0.45em;
            font-weight: 700;
            font-size: 0.95em;
            color: #0094ff;
            background: rgba(0, 148, 255, 0.1);
            border-radius: 4px;
            vertical-align: baseline;
          }
        }

        .drop-hint {
          display: block;
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 0.65rem;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        &:hover,
        &:focus-within {
          border-color: rgba(0, 148, 255, 0.5);
          background: linear-gradient(165deg, #f8fbff 0%, #eef5fd 100%);
          box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
      }
    }
  }

  .uploaded-files {
    margin-bottom: 6rem;

    .uploaded-files-header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.65rem;
      padding-bottom: 0.85rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #e8ecf1;

      .uploaded-files-title {
        margin: 0;
        font-size: 1.1875rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #0f172a;
      }

      .total-file {
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 0.28rem 0.65rem;
        border-radius: 999px;
        background: rgba(0, 148, 255, 0.12);
        color: #0077cc;
      }
    }

    .file-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.15rem;
      margin-bottom: 0.75rem;
      background: #fff;
      border: 1px solid #e8ecf1;
      border-radius: 10px;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

      &:last-of-type {
        margin-bottom: 0;
      }

      .file-info-wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.65rem 1.25rem;
        flex: 1;
        min-width: 0;

        .file-title {
          font-weight: 700;
          font-size: 1rem;
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

      .delete-button {
        cursor: pointer;
        flex-shrink: 0;
        padding: 0.45rem 0.95rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        background: #fff;
        color: #475569;
        transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;

        &:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #b91c1c;
        }
      }
    }
  }

  .next-blocked-hint {
    max-width: 1024px;
    margin: 0 auto 1rem;
    padding: 0.85rem 1.1rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -0.01em;
    color: #64748b;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e8ecf1;
    border-left: 3px solid rgba(0, 148, 255, 0.35);
  }

  .next-blocked-hint__em {
    font-weight: 700;
    color: #0f172a;
  }

  .submit-button {
    display: flex;
    justify-content: space-between;

    button {
      cursor: pointer;
      display: block;
      text-align: center;
      background-color: #0094ff;
      color: #fff;
      font-size: 1.0625rem;
      font-weight: 600;
      padding: 1rem 3rem;
      border-radius: 4px;

      &:disabled {
        cursor: default;
        background-color: #ddd;
        color: #aaa;
      }

      &.prev-button {
        background-color: #fff;
        color: #666;
        border: 2px solid #666;
      }
    }
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

  .zip-tree-section {
    margin: 1.25rem 0 2rem;
    padding: 1.15rem 1.25rem;
    border: 1px solid #e5e7eb;
    border-left: 3px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
  }

  .zip-tree-scroll {
    max-height: min(50vh, 360px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .zip-tree-title {
    font-weight: 700;
    font-size: 1rem;
    margin: 0 0 0.4rem;
    letter-spacing: -0.02em;
    color: #111;
  }

  .zip-tree-hint {
    font-size: 0.875rem;
    color: #666;
    margin: 0 0 0.85rem;
    line-height: 1.5;
  }

  .zip-tree-loading,
  .zip-tree-empty {
    font-size: 0.875rem;
    color: #666;
    padding: 0.5rem 0.75rem;
    line-height: 1.5;
  }

  .zip-tree {
    margin: 0;
    padding: 0.65rem 1rem 0.65rem 1.65rem;
    list-style: none;
    font-family: inherit;
    font-size: 0.9375rem;
    line-height: 1.4;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background: #fff;
  }

  .zip-tree-node {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .zip-tree-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 1.75rem;
    padding: 0.15rem 0.35rem 0.15rem 0;
    word-break: break-all;
  }

  .zip-tree-elbow {
    position: absolute;
    left: -1.35rem;
    top: 0;
    width: 1.35rem;
    height: 100%;
    pointer-events: none;
  }

  .zip-tree-elbow::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50%;
    width: 1.5px;
    background: #c4c9d1;
  }

  .zip-tree-elbow::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 1rem;
    height: 1.5px;
    background: #c4c9d1;
    transform: translateY(-50%);
  }

  .zip-tree-node:not(.is-last) > .zip-tree-row > .zip-tree-elbow::before {
    bottom: 0;
  }

  .zip-tree-icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }

  .zip-tree-icon.dir {
    color: #5b6572;
  }

  .zip-tree-icon.file {
    color: #8a93a0;
  }

  .zip-tree-name {
    color: #222;
    font-weight: 500;
  }

  .zip-tree-name.dir {
    font-weight: 600;
    color: #111;
  }

  .zip-tree-children {
    position: relative;
    margin: 0;
    padding: 0 0 0 1.45rem;
    margin-left: 0.7rem;
    list-style: none;
    border-left: 1.5px solid #c4c9d1;
  }

  .zip-tree-node.is-last > .zip-tree-children {
    border-left-color: transparent;
  }

  .validation-status {
    margin-top: 1rem;
    font-size: 0.9375rem;
  }

  .validation-status.ok {
    padding: 0;
    border-radius: 10px;
    border: 1.5px solid #059669;
    background: linear-gradient(180deg, #f0fdf4 0%, #fff 48%);
    overflow: hidden;
  }

  .validation-status.ok .validation-status-primary {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    padding: 0.7rem 1rem;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: #fff;
    background: #059669;
  }

  .validation-status.ok .validation-ok-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #059669;
    flex-shrink: 0;
  }

  .validation-status.ok .validation-status-meta {
    padding: 0.75rem 1rem 0.85rem;
  }

  .validation-status.ok .validation-status-detail {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.65rem;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .validation-status.ok .validation-status-detail + .validation-status-detail {
    margin-top: 0.45rem;
  }

  .validation-status.ok .validation-detail-label {
    flex-shrink: 0;
    font-weight: 700;
    color: #166534;
  }

  .validation-status.ok .validation-detail-label::after {
    content: ':';
  }

  .validation-status.ok .validation-detail-value {
    font-weight: 500;
    color: #334155;
    word-break: break-word;
  }

  .validation-status.err {
    padding: 0;
    border-radius: 10px;
    border: 1.5px solid #c45c5c;
    background: linear-gradient(180deg, #faf5f5 0%, #fff 48%);
    overflow: hidden;
  }

  .validation-status.err .validation-status-primary {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    padding: 0.7rem 1rem;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: #fff;
    background: #9f1f1f;
  }

  .validation-status.err .validation-err-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9f1f1f;
    flex-shrink: 0;
  }

  .validation-status.err .validation-status-meta {
    padding: 0.75rem 1rem 0.85rem;
  }

  .validation-status.err .validation-status-detail {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.55;
    color: #7a1818;
  }

  .validation-status.err .validation-status-detail + .validation-status-detail {
    margin-top: 0.4rem;
  }

  .validation-status-multiline {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1rem;

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

      .drop-area {
        width: 100%;
      }
    }

    .uploaded-files .file-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.8rem 1rem;

      .file-info-wrap .file-title {
        width: 100%;
        max-width: 100%;
      }
    }

    .submit-button {
      flex-direction: column-reverse;
      gap: 0.75rem;

      button {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  ${submitScreenshotContainerStyles}
`;

S.StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export default S;
