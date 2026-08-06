import styled from 'styled-components';

const S = {};

S.ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(680px, 92vw);
  max-height: 88vh;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.18);
  padding: 28px 0 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8edf3;
  box-sizing: border-box;

  .modal-header {
    flex-shrink: 0;
    margin: 0 30px 14px;
  }

  .modal-title {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.3;
    font-weight: 700;
    color: #111827;
    text-align: center;
  }

  .modal-desc {
    margin: 8px 0 0;
    font-size: 0.9375rem;
    color: #64748b;
    line-height: 1.5;
    text-align: center;
  }

  .modal-scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 22px 4px 30px;
    margin-right: 4px;

    /* 스크롤바를 콘텐츠 안쪽에 */
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      margin: 4px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 4px;
    padding-bottom: 12px;
  }

  .modal-section {
    background: #f8fafc;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 14px 16px 12px;
  }

  .sample-size-section {
    background: #f4f8ff;
    border-color: #d8e6f8;
    margin-bottom: 8px;
  }

  .section-title {
    margin: 0 0 12px;
    padding: 0 0 10px;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #475569;
  }

  .modal-item {
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: 148px 1fr;
    align-items: start;
    gap: 8px 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &.highlight {
      margin-top: 0;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0;
      grid-template-columns: 1fr;
    }

    &.muted-item .value.muted {
      color: #94a3b8;
    }

    .label {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: #64748b;
      font-weight: 600;
    }

    .value {
      margin: 0;
      line-height: 1.5;
      color: #1e293b;
      word-break: break-word;
    }

    .value.bullet {
      position: relative;
      padding-left: 0;
    }

    .value.muted {
      color: #94a3b8;
      font-size: 0.875rem;
    }

    .value.desc,
    .value.desc.setting-method {
      grid-column: 2;
      width: 100%;
      margin: 6px 0 0;
      padding: 0;
      text-align: left;
      justify-self: stretch;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.5;
      color: #94a3b8;
    }
  }

  .sample-size-item {
    display: block;
  }

  .sample-size-value {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.35;
  }

  .sample-size-num {
    color: #0b84df;
  }

  .sample-size-rest {
    color: #94a3b8;
    font-weight: 600;
    font-size: 1rem;
  }

  .value-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .param-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 12px;
  }

  .divider {
    margin: 2px 0;
    border-top: 1px solid #e2e8f0;
  }

  .modal-button-wrap {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 0;
    padding: 16px 30px 24px;
    border-top: 1px solid #eef2f6;
    background: #fff;
  }

  .cancel-button,
  .confirm-button {
    min-width: 96px;
    height: 42px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    background: #fff;
    font-weight: 600;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .cancel-button:hover {
    background: #f8fafc;
  }

  .confirm-button {
    background: #0b84df;
    border-color: #0b84df;
    color: #fff;
  }

  .confirm-button:hover {
    background: #0972c2;
    border-color: #0972c2;
  }

  @media (max-width: 560px) {
    .modal-header {
      margin: 0 18px 12px;
    }

    .modal-scroll {
      padding: 0 12px 4px 18px;
    }

    .modal-button-wrap {
      padding: 14px 18px 18px;
    }

    .modal-item {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .modal-item .value.desc,
    .modal-item .value.desc.setting-method {
      grid-column: 1;
    }

    .param-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default S;
