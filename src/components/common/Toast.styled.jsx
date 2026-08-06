import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-radius: 10px;
  margin: 8px 0;
  min-width: 400px;
  max-width: 820px;
  background-color: #eff6ff;
  border: 1px solid #93c5fd;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14), 0 2px 6px rgba(11, 132, 223, 0.12);
  border-left: 4px solid #0b84df;

  position: fixed;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%)
    ${({ closing }) => (closing ? 'translateY(10px)' : 'translateY(0)')};
  opacity: ${({ closing }) => (closing ? 0 : 1)};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 9999;
  gap: 12px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #0b84df;

    svg {
      width: 16px;
      height: 16px;
    }

    svg path {
      fill: #fff;
    }
  }

  .text {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    background-color: transparent;
    padding: 4px;
    border-radius: 6px;

    &:hover {
      background-color: rgba(15, 23, 42, 0.06);
    }

    svg path {
      fill: #64748b;
    }
  }
`;

export default S;
