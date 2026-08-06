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

S.PageShell = styled.div`
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
`;

S.FormCard = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0;
  padding: clamp(1.85rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 2rem) clamp(2rem, 4vw, 2.65rem);
  background-color: #fff;
  border: 1px solid ${borderSoft};
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04);
  box-sizing: border-box;

  @media (min-width: 560px) {
    max-width: 32rem;
    padding: 2.35rem 2rem 2.65rem;
  }

  .find-title {
    font-size: clamp(1.45rem, 3.5vw, 1.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${slate900};
    margin: 0 0 1.1rem;
    text-align: center;
  }

  .find-desc {
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.65;
    color: ${slate600};
    margin: 0 0 2.25rem;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .inputs-wrap {
    width: 100%;
    margin-bottom: 1.85rem;

    .input-wrap {
      width: 100%;
      margin-bottom: 1.75rem;
      box-sizing: border-box;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.4rem 0.85rem;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: -0.01em;
        color: ${slate700};
        margin-bottom: 0.55rem;

        .message {
          font-size: 13px;
          font-weight: 500;
          color: ${slate500};
          flex: 1;
          min-width: 8rem;
          line-height: 1.45;
        }
      }

      .inputs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        align-items: stretch;

        .input {
          flex: 1;
          min-width: 0;
          min-height: 48px;
          box-sizing: border-box;
          padding: 0.8rem 1rem;
          background-color: #fff;
          font-size: 15px;
          font-weight: 400;
          color: ${slate900};
          border: 1px solid ${border};
          border-radius: 8px;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;

          &::placeholder {
            color: #94a3b8;
            font-size: 15px;
          }

          &:disabled {
            background-color: #f1f5f9;
            color: #94a3b8;

            &::placeholder {
              color: #cbd5e1;
            }
          }

          &:focus:not(:disabled) {
            outline: none;
            border-color: ${point};
            box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
          }
        }

        .input-button {
          cursor: pointer;
          flex-shrink: 0;
          align-self: stretch;
          min-width: 7.25rem;
          min-height: 48px;
          padding: 0 1rem;
          background-color: ${slate700};
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          border: 1px solid ${slate700};
          border-radius: 8px;
          transition:
            background-color 0.15s ease,
            border-color 0.15s ease;

          &:disabled {
            cursor: not-allowed;
            background-color: #f1f5f9;
            border-color: ${border};
            color: #94a3b8;

            &:hover {
              background-color: #f1f5f9;
              border-color: ${border};
            }
          }

          &:hover:not(:disabled) {
            background-color: ${slate900};
            border-color: ${slate900};
          }
        }
      }
    }
  }

  .find-button-wrap {
    width: 100%;
    margin-bottom: 1.35rem;

    .find-button {
      cursor: pointer;
      display: block;
      width: 100%;
      box-sizing: border-box;
      min-height: 50px;
      padding: 0.75rem 1.15rem;
      background-color: ${point};
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.01em;
      border: 1px solid ${point};
      border-radius: 8px;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;

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
  }

  .footer-link-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.35rem;

    .link {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-height: 44px;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -0.01em;
      color: ${slate500};
      text-decoration: none;
      transition: color 0.15s ease;

      &:first-child {
        border-right: 1px solid ${border};
      }

      &:hover {
        color: ${point};
      }
    }
  }
`;

export default S;
