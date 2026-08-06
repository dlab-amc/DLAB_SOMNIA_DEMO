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
  padding: 1.5rem 1.25rem 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`;

S.FormCard = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0;
  padding: clamp(1.85rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 2rem)
    clamp(2rem, 4vw, 2.65rem);
  background-color: #fff;
  border: 1px solid ${borderSoft};
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(15, 23, 42, 0.04);
  box-sizing: border-box;

  @media (min-width: 560px) {
    max-width: 32rem;
    padding: 2.35rem 2rem 2.65rem;
  }

  .contact-title {
    font-size: clamp(1.45rem, 3.5vw, 1.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${slate900};
    margin: 0 0 1.1rem;
    text-align: center;
  }

  .contact-desc {
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.65;
    color: ${slate600};
    margin: 0 0 2.25rem;
    text-align: center;
    letter-spacing: -0.01em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;

    label {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: ${slate700};
    }

    input,
    textarea {
      width: 100%;
      box-sizing: border-box;
      min-height: 48px;
      padding: 0.8rem 1rem;
      font-size: 15px;
      font-weight: 400;
      font-family: inherit;
      color: ${slate900};
      background-color: #fff;
      border: 1px solid ${border};
      border-radius: 8px;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;

      &::placeholder {
        color: #94a3b8;
        font-size: 15px;
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

    textarea {
      height: 160px;
      min-height: 160px;
      max-height: 160px;
      line-height: 1.55;
      resize: none;
      overflow-y: auto;
    }
  }

  .button-wrap {
    width: 100%;
    margin-top: 0.1rem;

    button {
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
`;

S.InfoCard = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 1.35rem 1.5rem;
  background-color: ${slate50};
  border: 1px solid ${borderSoft};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
  text-align: center;

  @media (min-width: 560px) {
    max-width: 32rem;
    padding: 1.5rem 1.75rem;
  }

  .info-row {
    margin-bottom: 1.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: ${slate500};
    margin: 0 0 0.45rem;
  }

  .info-value {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${slate700};
    margin: 0;
    word-break: keep-all;
  }

  a.info-value {
    color: ${point};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: ${pointHover};
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`;

export default S;
