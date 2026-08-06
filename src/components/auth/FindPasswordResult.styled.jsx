import styled from "styled-components";
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem;

  .title {
    text-align: center;
    font-size: 32px;
    margin-bottom: 3rem;
  }

  .desc-wrap {
    font-weight: 500;
    text-align: center;
    line-height: 150%;
    margin-bottom: 5rem;
  }

  .password-form-wrap {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
    margin-bottom: 3rem;

    .password-form {
      margin-bottom: 3rem;
      .label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 1rem;

        .message {
          font-size: 14px;
          color: #aaa;
          margin-left: 2rem;
        }
      }
      .input {
        width: 100%;
        padding: 1rem;
        background-color: #fafafa;
        font-size: 16px;
        font-weight: 500;
        &:focus {
          background-color: #f1f7ff;
        }
      }
    }
  }

  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .change-button {
      width: 60%;
      cursor: pointer;
      font-size: 18px;
      padding: 1rem;
      background-color: #000;
      color: #fff;
      font-weight: 600;

      &:disabled {
        cursor: default;
        background-color: #ddd;
        color: #aaa;
      }
    }
  }
`;

export default S;
