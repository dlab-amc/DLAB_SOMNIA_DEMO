import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 2rem 3rem 0.5rem;
  margin: 0 auto;

  .header-contents-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #666;
    padding-bottom: 0.5rem;
  }

  .header-button-wrap {
    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      border: 1px solid #999;
      padding: 0.6rem 1.2rem;
      font-size: 15px;
      font-weight: 600;
      border-radius: 2px;
      transition: all 0.15s ease-in;

      &:hover {
        background-color: #fafafa;
      }
    }
  }

  .header-title-wrap {
    .header-title {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }

  .notification-button-wrap {
    // temp
    width: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .notification-button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border: 1px solid #333;
      padding: 0.6rem 1rem;
      border-radius: 2px;
      transition: all 0.15s ease-in;

      &:hover {
        background-color: #fafafa;
      }

      .icon {
        display: flex;
        align-content: center;
        justify-content: center;
        svg {
          width: 16px;
          height: 16px;
          path {
            fill: #333;
          }
        }
        margin-right: 0.6rem;
      }
      .text {
        color: #333;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
`;

export default S;
