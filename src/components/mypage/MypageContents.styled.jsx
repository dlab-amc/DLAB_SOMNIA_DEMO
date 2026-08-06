import styled from 'styled-components';

const point = '#0094ff';
const pointHover = '#0086e6';
const border = '#e2e8f0';
const borderSoft = '#e8ecf1';
const slate900 = '#0f172a';
const slate700 = '#334155';
const slate600 = '#475569';
const slate500 = '#64748b';
const slate50 = '#f8fafc';

const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2.5rem 1.5rem 3.5rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 3rem 2rem 4rem;
  }

  .mypage-title {
    position: relative;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${slate900};
    margin: 0 0 2rem;

    @media (min-width: 768px) {
      font-size: 1.625rem;
      margin-bottom: 2.25rem;
    }
  }

  .container-header {
    padding-bottom: 0.65rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${border};
  }

  .container-title {
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${slate900};
    margin: 0;

    &.tab {
      margin-bottom: 0;
    }
  }
`;

S.UserInfoContainer = styled.div`
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    margin-bottom: 3.5rem;
  }

  .container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .button-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .message {
    font-size: 13px;
    color: ${slate500};
    margin-left: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .edit-button,
  .save-button,
  .cancel-button {
    cursor: pointer;
    font-size: 14px;
    padding: 0.5rem 1.15rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    border-radius: 8px;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease,
      box-shadow 0.15s ease;

    &:disabled {
      cursor: not-allowed;
      background-color: #f1f5f9;
      border: 1px solid ${border};
      color: #94a3b8;
      box-shadow: none;

      &:hover {
        background-color: #f1f5f9;
        border-color: ${border};
        color: #94a3b8;
      }
    }
  }

  .edit-button {
    background-color: #fff;
    border: 1px solid ${border};
    color: ${slate700};

    &:hover {
      border-color: ${point};
      color: ${point};
      background-color: rgba(0, 148, 255, 0.04);
    }
  }

  .cancel-button {
    background-color: #fff;
    border: 1px solid ${border};
    color: ${slate600};

    &:hover {
      background-color: ${slate50};
      border-color: #cbd5e1;
      color: ${slate700};
    }
  }

  .save-button {
    background-color: ${point};
    border: 1px solid ${point};
    color: #fff;

    &:hover:not(:disabled) {
      background-color: ${pointHover};
      border-color: ${pointHover};
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.22);
    }
  }

  .user-info-wrap {
    margin-top: 1rem;
    padding: 1.25rem 1.25rem 1.5rem;
    background-color: ${slate50};
    border: 1px solid ${borderSoft};
    border-radius: 12px;
    box-sizing: border-box;

    @media (min-width: 768px) {
      padding: 1.5rem 1.5rem 1.65rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.35rem 0;

      &:last-of-type {
        margin-bottom: 0;
      }

      .label {
        display: block;
        font-weight: 600;
        font-size: 14px;
        width: 7.5rem;
        flex-shrink: 0;
        color: ${slate500};
      }

      .data {
        color: ${slate700};
        font-size: 15px;
        word-break: break-word;
      }

      &.email {
        align-items: flex-start;

        .label {
          margin-top: 0.65rem;
        }
      }
    }
  }

  .change-button {
    display: inline-flex;
    align-items: center;
    margin-top: 1.25rem;
    font-weight: 600;
    font-size: 14px;
    color: ${point};
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: color 0.15s ease;

    &:hover {
      color: ${pointHover};
    }

    &:focus-visible {
      outline: 2px solid ${point};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }

  .input-form-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .input-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    .input {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      padding: 0.55rem 0.75rem;
      background-color: #fff;
      font-size: 14px;
      font-weight: 400;
      color: ${slate900};
      border: 1px solid ${border};
      border-radius: 8px;

      &::placeholder {
        color: #94a3b8;
      }

      &:focus {
        outline: none;
        border-color: ${point};
        box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
        background-color: #fff;
      }
    }

    .check-button {
      cursor: pointer;
      min-width: 6.5rem;
      font-size: 14px;
      padding: 0.55rem 0.85rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      border-radius: 8px;
      border: 1px solid ${slate700};
      background-color: ${slate700};
      color: #fff;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;

      &:hover:not(:disabled) {
        background-color: ${slate900};
        border-color: ${slate900};
      }

      &:disabled {
        cursor: not-allowed;
        background-color: #f1f5f9;
        border-color: ${border};
        color: #94a3b8;
      }
    }
  }
`;

S.SubmitContainer = styled.div`
  margin-bottom: 2.5rem;

  .submit-info-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    padding: 0.25rem;
    background-color: ${slate50};
    border: 1px solid ${borderSoft};
    border-radius: 12px;
    box-sizing: border-box;
    gap: 0;

    @media (min-width: 640px) {
      flex-wrap: nowrap;
    }

    .submit-info {
      flex: 1 1 100%;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      padding: 1.1rem 0.85rem;
      border-right: none;
      border-bottom: 1px solid ${border};

      @media (min-width: 640px) {
        flex: 1 1 0;
        border-bottom: none;
        border-right: 1px solid ${border};
        padding: 1.25rem 0.75rem;
      }

      &:last-child {
        border-bottom: none;
        border-right: none;

        .data {
          align-self: center;
        }
      }

      .label {
        margin-bottom: 0.65rem;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: -0.01em;
        color: ${slate500};
      }

      .data {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 0.15rem;

        .number {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: ${slate900};
          line-height: 1;

          @media (min-width: 768px) {
            font-size: 2rem;
          }
        }

        .unit {
          margin-bottom: 0.2rem;
          font-size: 14px;
          font-weight: 600;
          color: ${slate500};
        }
      }
    }

    .submit-button {
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: ${point};
      text-decoration: none;
      letter-spacing: -0.01em;
      transition: color 0.15s ease;

      svg {
        margin-left: 0;
        flex-shrink: 0;

        path {
          stroke: ${point};
          transition: stroke 0.15s ease;
        }
      }

      &:hover {
        color: ${pointHover};

        svg path {
          stroke: ${pointHover};
        }
      }

      &:focus-visible {
        outline: 2px solid ${point};
        outline-offset: 3px;
        border-radius: 6px;
      }
    }
  }
`;

S.Footer = styled.div`
  padding-top: 0.25rem;

  .quit-button {
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    font-size: 13px;
    color: ${slate500};
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: color 0.15s ease;

    &:hover {
      color: #64748b;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    &:focus-visible {
      outline: 2px solid ${slate500};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
`;

export default S;
