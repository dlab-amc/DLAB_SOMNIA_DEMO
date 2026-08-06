import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  .page-button-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
      cursor: pointer;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      font-weight: 500;
      color: #aaa;

      &:hover {
        color: #555;
      }
    }

    .page-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;

      &.current {
        background-color: #0094ff;
        color: #fff;
      }
    }

    .prev-button,
    .next-button {
      &:hover {
        svg path {
          stroke: #555;
        }
      }

      &:disabled {
        cursor: default;
        svg path {
          stroke: #ddd;
        }
      }
    }
    .prev-button {
      transform: scaleX(-1);
    }
  }
`;

export default S;
