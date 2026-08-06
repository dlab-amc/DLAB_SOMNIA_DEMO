import styled from "styled-components";
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .result-icon {
    margin-bottom: 2rem;
  }

  .result-title {
    font-size: 36px;
    margin-bottom: 5rem;
  }

  .result-desc {
    margin-bottom: 4em;
    .line {
      text-align: center;
      font-weight: 500;
      line-height: 160%;
    }

    .error {
      font-weight: 700;
    }
  }

  .login-button {
    background-color: #000;
    color: #fff;
    font-weight: 600;
    padding: 1rem 5rem;
    font-size: 18px;
  }
`;

S.Background = styled.div`
  /* background-color: #fafafa; */
`;

export default S;
