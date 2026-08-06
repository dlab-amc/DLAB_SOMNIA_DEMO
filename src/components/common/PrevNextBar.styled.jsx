import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  padding: ${(p) => (p.$screenshot ? '0.35rem 1rem' : '0.5rem 1rem')};
  min-height: ${(p) => (p.$screenshot ? '44px' : '54px')};
  display: flex;
  align-items: center;
  z-index: 20;
  box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.06);

  @media (min-width: 768px) {
    padding: ${(p) =>
      p.$screenshot ? '0.35rem 1.25rem' : '0.5rem 1.5rem'};
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
    min-width: ${(p) => (p.$screenshot ? '4.25rem' : '4.75rem')};
    padding: ${(p) =>
      p.$screenshot ? '0.3rem 0.85rem' : '0.45rem 1rem'};
    min-height: ${(p) => (p.$screenshot ? '34px' : '40px')};
    font-size: ${(p) => (p.$screenshot ? '1.0625rem' : '1rem')};
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

    &.next-button {
      background-color: #0094ff;
      color: #fff;
      border: 1px solid #0094ff;

      &:hover:not(:disabled) {
        background-color: #0086e6;
        border-color: #0086e6;
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
      background-color: #e2e8f0;
      border-color: #e2e8f0;
      color: #94a3b8;

      &:hover {
        background-color: #e2e8f0;
      }
    }
  }
`;

export default S;
