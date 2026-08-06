import styled from "styled-components";
const S = {};

S.Container = styled.div`
  display: flex;

  .guide-container {
    padding: 2rem 3rem;
    height: calc(100vh - 65px);
    width: 100%;
    overflow-y: scroll;

    .guide-header {
      display: flex;
      align-items: center;
      justify-content: end;
      margin-bottom: 1rem;

      .submit-button {
        cursor: pointer;
        background-color: #000;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        padding: 1rem 1.4rem;
      }
    }

    .guide-contents {
    }
  }
`;

export default S;
