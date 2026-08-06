import styled from 'styled-components';
const S = {};

/* n등분 컬럼에서 첫·마지막 원 중심 사이 = 전체 너비의 (n-1)/n, 시작점은 1/2n */
const trackLeftPct = (n) => (n > 0 ? (100 / (2 * n)).toFixed(6) : '0');
const trackWidthPct = (n) =>
  n > 1 ? (((n - 1) / n) * 100).toFixed(6) : '0';
const blueWidthPct = (n, ratio) =>
  n > 1 ? (ratio * ((n - 1) / n) * 100).toFixed(6) : '0';

S.StyledProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: ${(p) =>
    p.$screenshot
      ? 'min(480px, 88%)'
      : p.$wide
        ? 'min(720px, 100%)'
        : 'min(560px, 100%)'};
  margin: ${(p) =>
    p.$screenshot
      ? '1rem auto 1.1rem'
      : p.$wide
        ? '1.25rem auto 2.25rem'
        : '2rem auto'};
  padding: 0
    ${(p) =>
      p.$screenshot
        ? '0.25rem'
        : p.$wide
          ? 'clamp(0.75rem, 3vw, 1.5rem)'
          : 'clamp(0.5rem, 4vw, 1.25rem)'};
  box-sizing: border-box;
  position: relative;
  /* 원 세로 중앙 — wide 시 원이 더 큼 */
  --indicator-size: ${(p) =>
    p.$screenshot ? '2.1rem' : p.$wide ? '2.25rem' : '2rem'};
  --line-top: calc(
    ${(p) => (p.$screenshot ? '1.05rem' : p.$wide ? '1.125rem' : '1rem')} - 1.5px
  );

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 3px;
    border-radius: 3px;
    top: var(--line-top);
    pointer-events: none;
  }

  /* 회색 트랙: 첫 원 중심 ~ 마지막 원 중심 */
  &::before {
    z-index: 0;
    background-color: #e8e9ec;
    left: ${(p) => `${trackLeftPct(p.$stepCount)}%`};
    width: ${(p) => `${trackWidthPct(p.$stepCount)}%`};
  }

  /* 진행 파란선 (현재 단계 이전까지) */
  &::after {
    z-index: 1;
    background-color: #0094ff;
    left: ${(p) => `${trackLeftPct(p.$stepCount)}%`};
    width: ${(p) => `${blueWidthPct(p.$stepCount, p.$completedRatio)}%`};
    transition: width 0.25s ease;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    margin: ${(p) => (p.$wide ? '1rem auto 1.75rem' : '1.25rem auto')};
  }

  @media (max-width: 480px) {
    padding: 0 ${(p) => (p.$wide ? '0.5rem' : '0.35rem')};
    --indicator-size: ${(p) => (p.$wide ? '2rem' : '1.75rem')};
    --line-top: calc(${(p) => (p.$wide ? '1rem' : '0.875rem')} - 1.5px);
  }
`;

S.Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};

  .step-indicator {
    z-index: 2;
    width: var(--indicator-size, 2rem);
    height: var(--indicator-size, 2rem);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(p) =>
      p.$screenshot ? '1.125rem' : p.$wide ? '1.25rem' : '1.1875rem'};
    font-weight: 700;
    color: ${(props) => (props.$isActive ? '#fff' : '#555')};
    background-color: ${(props) => (props.$isActive ? '#0094FF' : '#ccc')};
    margin-bottom: ${(p) => (p.$wide ? '0.7rem' : '0.6rem')};

    &.done {
      background-color: #0094ff;
      color: #fff;

      svg {
        width: ${(p) => (p.$wide ? '15px' : '14px')};
        height: ${(p) => (p.$wide ? '15px' : '14px')};
      }
    }
  }

  .step-title {
    font-size: ${(p) =>
      p.$screenshot
        ? 'clamp(0.8125rem, 1.8vw, 0.9375rem)'
        : p.$wide
          ? 'clamp(0.8125rem, 2.8vw, 1rem)'
          : 'clamp(0.75rem, 2.5vw, 0.9375rem)'};
    color: ${(props) => (props.$isActive ? '#222' : '#666')};
    font-weight: ${(props) => (props.$isActive ? 700 : 500)};
    text-align: center;
    line-height: 1.35;
    max-width: 100%;
    padding: 0 4px;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: keep-all;
  }

  @media (max-width: 480px) {
    .step-indicator {
      font-size: ${(p) => (p.$wide ? '1.0625rem' : '1rem')};
      margin-bottom: ${(p) => (p.$wide ? '0.5rem' : '0.45rem')};

      &.done svg {
        width: ${(p) => (p.$wide ? '13px' : '12px')};
        height: ${(p) => (p.$wide ? '13px' : '12px')};
      }
    }
  }
`;

export default S;
