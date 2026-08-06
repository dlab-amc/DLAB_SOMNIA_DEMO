import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 2rem 3rem 0.5rem;
  margin: 0 auto;

  .detail-contents-wrap {
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #fff !important;
  }

  tr th,
  tr td {
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 0.8rem 0.6rem;
    word-break: normal;
    text-align: center;

    &:first-child,
    &:last-child {
      border-left: none;
      border-right: none;
    }

    &.span-row {
      border-right: 1px solid #ddd;
    }
  }

  th {
    background-color: #eee;
    font-weight: 700;
  }

  td {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-info-wrap {
    margin-bottom: 5rem;
    .user-info-title {
      margin-bottom: 1rem;
      .title {
      }
    }

    .user-info-table {
      width: 70%;
      th {
        width: 15%;
      }
      td {
        width: 35%;
      }
    }
  }

  .submit-info-wrap {
    .submit-info-title {
      margin-bottom: 1rem;
      .title {
      }
    }

    .submit-info-table {
      width: 35%;
      th {
        width: 25%;
      }
    }
  }

  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      cursor: pointer;
      display: block;
      font-weight: 600;
      line-height: 1.6;
      padding: 0.6rem 1.4rem;
      font-size: 16px;
    }

    .reject-button {
      background-color: #fff;
      color: #c00000;
      border: 1px solid #c00000;
      border-radius: 2px;
    }

    .approve-button {
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
      border-radius: 2px;
    }
  }
`;

export default S;
