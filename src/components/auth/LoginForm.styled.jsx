import styled from 'styled-components';

const point = '#0094ff';
const pointHover = '#0086e6';
const border = '#e2e8f0';
const borderSoft = '#e8ecf1';
const slate900 = '#0f172a';
const slate700 = '#334155';
const slate600 = '#475569';
const slate500 = '#64748b';

const S = {};

S.Background = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  background-color: #f9fafb;
  box-sizing: border-box;
`;

S.Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: calc(100vh - 65px);
  padding: 1.5rem 1.25rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 100%;
    max-width: 22rem;
    margin: 0;
    padding: 2rem 1.5rem 2.35rem;
    background-color: #fff;
    border: 1px solid ${borderSoft};
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;

    @media (min-width: 480px) {
      max-width: 24rem;
      padding: 2.25rem 1.75rem 2.5rem;
    }

    .login-title {
      text-align: center;
      font-size: clamp(1.375rem, 3.5vw, 1.625rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      margin: 0 0 2rem;
      color: ${slate900};
    }

    .login-label {
      width: 100%;
      display: block;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -0.01em;
      color: ${slate700};
      margin-bottom: 0.5rem;
    }

    .id,
    .password {
      width: 100%;
      display: block;
      box-sizing: border-box;
      padding: 0.75rem 0.9rem;
      font-size: 15px;
      font-weight: 400;
      color: ${slate900};
      background-color: #fff;
      border: 1px solid ${border};
      border-radius: 8px;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;

      &::placeholder {
        color: #94a3b8;
      }

      &:hover {
        border-color: #cbd5e1;
      }

      &:focus {
        outline: none;
        border-color: ${point};
        box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
      }
    }

    .id {
      margin-bottom: 1.65rem;
    }

    .password {
      margin-bottom: 0.25rem;
    }

    .find-links {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0 1.65rem;
      padding: 0.5rem 0;

      a {
        flex: 1;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        padding: 0.4rem 0.5rem;
        color: ${slate500};
        text-decoration: none;
        letter-spacing: -0.01em;
        transition: color 0.15s ease;

        &:first-child {
          border-right: 1px solid ${border};
        }

        &:hover {
          color: ${point};
        }
      }
    }

    .button {
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      box-sizing: border-box;
      min-height: 48px;
      padding: 0.7rem 1.15rem;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 0.75rem;
      border-radius: 8px;
      text-decoration: none;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        color 0.15s ease;

      &.login {
        border: 1px solid ${point};
        background-color: ${point};
        color: #fff;

        &:hover:not(:disabled) {
          background-color: ${pointHover};
          border-color: ${pointHover};
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
            border-color: #e2e8f0;
          }
        }
      }

      &.signup {
        margin-bottom: 0;
        background-color: #fff;
        color: ${slate700};
        border: 1px solid ${border};

        &:hover {
          border-color: ${point};
          color: ${point};
          background-color: rgba(0, 148, 255, 0.04);
        }
      }
    }
  }

  .margin {
    margin-bottom: 1.25rem;
  }
`;

export default S;
