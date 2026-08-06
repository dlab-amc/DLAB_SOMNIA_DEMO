import styled from 'styled-components';
const S = {};

S.Background = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  background-color: #f9fafb;
  box-sizing: border-box;
`;

S.Container = styled.div`
  position: relative;
  background-color: transparent;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: clamp(1.75rem, 4vw, 2.5rem) 1.25rem calc(5.5rem + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;

  .header-wrap {
    width: 100%;
    max-width: 760px;
    margin: 0 auto 2.25rem;
    display: flex;
    justify-content: center;
  }

  .signup-title {
    font-size: clamp(1.5rem, 4vw, 1.875rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    margin: 0 0 0.25rem;
    text-align: center;
  }

  .form-title {
    text-align: center;
    font-size: clamp(1.0625rem, 2.5vw, 1.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 1.75rem;
  }
`;

S.TermBlock = styled.div`
  width: 100%;
  max-width: 36rem;
  margin: 0 auto 2rem;
  padding: 0 0.25rem;
  box-sizing: border-box;

  .check-wrap {
    display: flex;
    gap: 0.85rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;

    .labels {
      display: flex;
      gap: 0.85rem;
    }

    &.total {
      padding-bottom: 1.25rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid #e2e8f0;
      justify-content: flex-start;

      .label {
        font-weight: 600;
        color: #334155;
      }
    }
  }

  input {
    display: none;

    & + .checkbox {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.375rem;
      height: 1.375rem;
      background-color: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }

    &:checked + .checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0094ff;
      border-color: #0094ff;
    }

    &:focus-visible + .checkbox {
      outline: 2px solid #0094ff;
      outline-offset: 2px;
    }
  }

  .label {
    font-size: 15px;
    font-weight: 500;
    color: #334155;
    line-height: 1.45;
  }

  .detail-button {
    cursor: pointer;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    border: none;
    padding: 0.25rem 0.35rem;
    border-radius: 6px;
    transition:
      color 0.15s ease,
      background-color 0.15s ease;

    svg path {
      stroke: #64748b;
      transition: stroke 0.15s ease;
    }

    &:hover {
      color: #0094ff;
      background-color: rgba(0, 148, 255, 0.06);

      svg path {
        stroke: #0094ff;
      }
    }
  }
`;

S.InfoBlock = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 0.25rem 2rem;
  box-sizing: border-box;

  .input-wrap {
    margin-bottom: 1.75rem;
  }

  .input-label {
    display: flex;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 14px;
    color: #334155;
    align-items: center;
    justify-content: space-between;
  }

  .text {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    .required {
      color: #0094ff;
      font-size: 14px;
    }

    .selected {
      color: #94a3b8;
      font-size: 13px;
    }
  }

  .input {
    width: 100%;
    box-sizing: border-box;
    min-height: 48px;
    background-color: #fff;
    padding: 0.7rem 0.9rem;
    font-size: 15px;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      outline: none;
      border-color: #0094ff;
      box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
    }
  }

  .inputs {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-wrap: nowrap;
  }

  /* 입력 + 버튼 한 줄: input의 width:100%가 버튼을 밀어내 wrap 되는 것 방지 */
  .inputs > .input {
    flex: 1 1 0%;
    min-width: 0;
    width: auto;
    max-width: 100%;
  }

  .form-button {
    flex-shrink: 0;
    cursor: pointer;
    background-color: #334155;
    color: #fff;
    padding: 0.55rem 1rem;
    min-height: 48px;
    width: auto;
    min-width: 6.5rem;
    font-size: 14px;
    font-weight: 600;
    margin-left: 0;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
    border-radius: 8px;
    border: 1px solid #334155;

    &:disabled {
      cursor: not-allowed;
      background-color: #f1f5f9;
      border-color: #e2e8f0;
      color: #94a3b8;

      &:hover {
        background-color: #f1f5f9;
        border-color: #e2e8f0;
      }
    }

    &:hover:not(:disabled) {
      background-color: #0f172a;
      border-color: #0f172a;
    }
  }

  .error {
    margin-left: 0.5rem;
    font-weight: 500;
    font-size: 13px;
    color: #64748b;
  }

  .check {
    margin-left: 0.5rem;
    font-weight: 500;
    font-size: 13px;
    color: #475569;
  }

  .type-form {
    align-items: center;
    margin-right: 2rem;
    display: inline-flex;
    align-items: center;

    input {
      appearance: none;
      border: 2px solid #cbd5e1;
      border-radius: 50%;
      width: 1.35rem;
      height: 1.35rem;

      &:checked {
        border: 0.45em solid #0094ff;
      }
    }

    .radio-label {
      font-weight: 600;
      margin-left: 0.5rem;
      color: #334155;
    }
  }

  .file-upload-container {
    position: relative;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .upload-area {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border 0.2s ease;
  }

  .upload-area.active {
    border-color: #0094ff;
    background-color: rgba(0, 148, 255, 0.06);
  }

  .upload-button {
    background: #fff;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    cursor: pointer;

    &:hover {
      border-color: #0094ff;
      color: #0094ff;
    }
  }

  .upload-placeholder {
    color: #64748b;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .file-name {
    font-size: 14px;
    font-weight: 500;
    color: #334155;
  }

  .file-size {
    font-size: 12px;
    color: #64748b;
  }

  .remove-file {
    background: transparent;
    border: none;
    font-size: 16px;
    color: #dc2626;
    cursor: pointer;
  }
`;

S.BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 20;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  min-height: 54px;
  display: flex;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.06);

  @media (min-width: 768px) {
    padding: 0.5rem 1.5rem;
  }

  .button-wrap {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .blank {
    min-width: 1px;
    flex: 0 0 auto;
  }

  button {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 4.75rem;
    min-height: 40px;
    padding: 0.45rem 1rem;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    border-radius: 8px;
    line-height: 1.2;
    white-space: nowrap;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;

    &.prev-button {
      background-color: #fff;
      color: #475569;
      border: 1px solid #cbd5e1;

      &:hover:not(:disabled) {
        background-color: #f8fafc;
        border-color: #94a3b8;
        color: #334155;
      }
    }

    &.next-button,
    &.sign-up-button {
      background-color: #0094ff;
      color: #fff;
      border: 1px solid #0094ff;

      &:hover:not(:disabled) {
        background-color: #0086e6;
        border-color: #0086e6;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.22);
      }

      &:disabled {
        cursor: not-allowed;
        background-color: #e2e8f0;
        border-color: #e2e8f0;
        color: #94a3b8;

        &:hover {
          background-color: #e2e8f0;
        }
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

S.StepButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    cursor: default;
    background-color: #aaa;
    color: #666;
  }
`;

S.PopupButtons = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 1rem; /* 버튼 간 간격 추가 */
  margin-top: 1.5rem;

  .popup-button {
    padding: 0.75rem 1.5rem; /* 버튼 크기 조정 */
    font-size: 16px; /* 글자 크기 */
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.save {
      background-color: #0094ff;
      color: #fff;
      border: 1px solid #0094ff;

      &:hover {
        background-color: #0086e6;
        border-color: #0086e6;
      }
    }

    &.cancel {
      background-color: #fff;
      color: #334155;
      border: 1px solid #e2e8f0;

      &:hover {
        background-color: #f8fafc;
        border-color: #cbd5e1;
      }
    }
  }
`;

export default S;
