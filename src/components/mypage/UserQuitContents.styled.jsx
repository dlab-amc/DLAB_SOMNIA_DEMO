import styled from 'styled-components';

const point = '#0094ff';
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
    margin: 0 0 2.25rem;

    @media (min-width: 768px) {
      font-size: 1.75rem;
      margin-bottom: 2.75rem;
    }
  }

  .quit-contents-wrap {
    padding: 1.5rem 1.35rem 1.75rem;
    background-color: ${slate50};
    border: 1px solid ${borderSoft};
    border-radius: 12px;
    box-sizing: border-box;

    @media (min-width: 768px) {
      padding: 1.75rem 1.75rem 2rem;
    }

    .quit-contents-title {
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: ${slate900};
      padding-bottom: 0.75rem;
      margin: 0 0 1.25rem;
      border-bottom: 1px solid ${border};
    }

    .quit-contents-desc {
      font-weight: 500;
      font-size: 15px;
      line-height: 1.55;
      color: ${slate600};
      margin-bottom: 1.5rem;
    }

    .quit-warning-text {
      .about-wrap {
        position: relative;
        margin-bottom: 1rem;
        background-color: #fef2f2;
        padding: 1rem 1rem 1rem 1.1rem;
        border: 1px solid #fecaca;
        border-radius: 10px;
        border-left: 4px solid #dc2626;

        .about {
          color: ${slate700};
          font-weight: 500;
          line-height: 1.65;
          font-size: 14px;
          margin: 0 0 0.5rem;

          &:last-child {
            margin-bottom: 0;
          }

          .bold {
            color: #b91c1c;
            font-weight: 700;
          }
        }
      }

      .about-list {
        margin: 0 0 1.5rem;
        padding: 0;
        list-style: none;

        .about-element {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.45rem;
          line-height: 1.55;
          font-size: 14px;
          color: ${slate600};

          &::before {
            content: '–';
            flex-shrink: 0;
            color: ${slate500};
            font-weight: 600;
          }
        }
      }
    }

    .quit-form-wrap {
      margin-bottom: 0;

      .quit-agree-form {
        margin-bottom: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;

        .input {
          display: none;

          &:checked + .checkbox {
            background-color: ${point};
            border-color: ${point};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &:focus-visible + .checkbox {
            outline: 2px solid ${point};
            outline-offset: 2px;
          }
        }

        .checkbox {
          cursor: pointer;
          display: inline-flex;
          flex-shrink: 0;
          width: 1.375rem;
          height: 1.375rem;
          margin-top: 0.1rem;
          background-color: #fff;
          border: 1px solid ${border};
          border-radius: 6px;
          transition:
            border-color 0.15s ease,
            background-color 0.15s ease;

          svg {
            width: 0.85rem;
            height: 0.85rem;

            path {
              stroke: #fff;
            }
          }
        }

        .label {
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          line-height: 1.55;
          letter-spacing: -0.01em;
          color: ${slate700};
        }
      }

      .password-form {
        .desc {
          font-weight: 500;
          font-size: 15px;
          color: ${slate600};
          margin-bottom: 0.75rem;
        }

        .input {
          width: 100%;
          max-width: 32rem;
          box-sizing: border-box;
          background-color: #fff;
          min-height: 48px;
          padding: 0.8rem 1rem;
          font-size: 15px;
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
  }
`;

export default S;
