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
    margin-bottom: 4rem;
  }

  .desc {
    font-weight: 500;
    text-align: center;
    margin-bottom: 6rem;
  }

  .find-id-result {
    display: flex;
    flex-direction: column;
    align-items: center;

    .id-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      padding: 2rem;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-bottom: 5rem;

      .id {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 2rem;
      }

      .created-date {
        font-weight: 500;
        color: #aaa;
      }
    }

    .buttons-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      padding: 2rem;

      .login-button {
        cursor: pointer;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        background-color: #000;
        color: #fff;
        padding: 1rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      .password-button {
        cursor: pointer;
        color: #aaa;
        font-weight: 600;
      }
    }
  }
`;

export default S;
