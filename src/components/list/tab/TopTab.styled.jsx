import styled from "styled-components";
const S = {};

S.Container = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-top: 16px;
  margin-bottom: 16px;

  .tab-button {
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: #666;

    .count-text {
      font-size: 14px;
      font-weight: 400;
      margin-left: 0.3rem;
    }
  }

  .tab-button.active {
    color: #007bff;
    border-bottom: 2px solid #007bff;
    font-weight: 700;

    .count-text {
      font-weight: 600;
    }
  }
`;

export default S;
