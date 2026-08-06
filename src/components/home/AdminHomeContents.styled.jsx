import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;

  .main-title {
    font-size: 36px;
    margin-bottom: 2rem;
  }

  .main-title-desc {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4rem;

    .user-id {
      font-weight: 700;
    }
  }

  .task-counts-wrap {
    display: flex;
    gap: 2rem;

    .count-wrap {
      padding: 2rem;
      width: 25%;
      max-width: 320px;
      background-color: #fff;
      color: #333;
      border: 2px solid #333;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .label {
        margin-bottom: 2.5rem;
        font-weight: 600;
        font-size: 18px;
      }

      .data {
        font-weight: 500;
        .number {
          font-size: 36px;
          font-weight: 700;
        }
      }

      &.total {
        background-color: #333;
        color: #fff;
        transition: all 0.15s ease-in;

        &:hover {
          background-color: #444;
        }
      }
    }
  }
`;

export default S;
