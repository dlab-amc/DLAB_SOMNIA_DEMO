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
  min-height: calc(100vh - 65px);
  height: auto;
  margin: 0 auto;
  padding: clamp(2.75rem, 7vw, 4.5rem) 1.35rem clamp(4rem, 10vw, 6rem);
  box-sizing: border-box;

  .point {
    color: ${point};
    font-weight: 700;
  }

  .bold {
    color: ${slate900};
    font-weight: 700;
  }

  .about-title {
    font-size: clamp(1.5rem, 4vw, 1.875rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${slate900};
    line-height: 1.35;
    margin: 0 0 clamp(2.25rem, 6vw, 3.5rem);
    text-align: center;
  }

  .about-introduction {
    color: ${slate700};
    margin: 0 auto clamp(3rem, 8vw, 5rem);
    max-width: 40rem;

    .about-paragraph {
      font-size: clamp(15px, 2.6vw, 17px);
      line-height: 1.65;
      font-weight: 500;
      margin-bottom: 1.75rem;
      text-align: center;
      letter-spacing: -0.01em;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .about-acknowledgement {
    text-align: center;
    color: ${slate500};
    padding-bottom: 2rem;

    .desc-wrap {
      margin: 0 auto;
      width: 100%;
      max-width: 36rem;
      padding: 1.35rem 1.5rem;
      background-color: ${slate50};
      border: 1px solid ${borderSoft};
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
      box-sizing: border-box;
    }

    .desc {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.6;
      color: ${slate600};
      word-break: break-word;
      white-space: pre-line;
      margin: 0;
    }

    .number {
      display: inline-block;
      margin-top: 0.35rem;
      font-size: 13px;
      font-weight: 500;
      color: ${slate500};
    }
  }
`;

export default S;
