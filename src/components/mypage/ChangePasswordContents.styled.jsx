import styled from 'styled-components';

const point = '#0094ff';
const border = '#e2e8f0';
const slate900 = '#0f172a';
const slate700 = '#334155';
const slate500 = '#64748b';

const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 3.25rem 1.35rem 7.5rem;

  @media (min-width: 768px) {
    padding: 4.25rem 2rem 8rem;
  }

  .title {
    text-align: center;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${slate900};
    margin: 0 0 2.75rem;
    width: 100%;
    max-width: 32rem;

    @media (min-width: 768px) {
      font-size: 1.75rem;
      margin-bottom: 3.25rem;
    }
  }

  .input-forms-wrap {
    width: 100%;
    max-width: 32rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 2.5rem;

    .input-form {
      width: 100%;
      margin-bottom: 2.25rem;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.4rem 0.85rem;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: -0.01em;
        color: ${slate700};
        margin-bottom: 0.65rem;

        .text {
          flex-shrink: 0;
        }

        .error {
          font-weight: 500;
          font-size: 13px;
          line-height: 1.5;
          color: ${slate500};
          flex: 1;
          min-width: 8rem;
        }
      }

      .input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        min-height: 48px;
        padding: 0.8rem 1rem;
        background-color: #fff;
        font-size: 15px;
        font-weight: 400;
        color: ${slate900};
        border: 1px solid ${border};
        border-radius: 10px;
        transition:
          border-color 0.15s ease,
          box-shadow 0.15s ease;

        &::placeholder {
          color: #94a3b8;
          font-size: 15px;
        }

        &:focus {
          outline: none;
          border-color: ${point};
          box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
        }
      }
    }
  }

  .buttons-wrap {
    display: none;
  }
`;

export default S;
