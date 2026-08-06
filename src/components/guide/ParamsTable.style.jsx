import styled from 'styled-components';
const S = {};

S.Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  border-spacing: 0;

  th,
  td {
    padding: 8px 10px;
    text-align: center;
    font-weight: 500;
    font-size: 12px;
    word-break: break-word;
    white-space: normal;
  }

  th {
    font-weight: 600;
    &.rate {
      font-size: 11px;

      .unit {
        font-size: 10px;
        color: #999;
      }
    }
  }

  td {
    color: #333;
  }

  thead {
    tr {
      background-color: #eee;
      border-bottom: 1px solid #ccc;
    }
  }
  tr {
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }

  /* Column Width Fix */
  .name {
    width: 25%;
  }
  .definition {
    width: 40%;
  }
  .type {
    width: 15%;
  }
  .rate {
    width: 20%;
  }

  .toggle-row {
    user-select: none;
    -webkit-user-drag: none;
    align-items: center;
    background-color: #0094ff0d;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #a6daff75;
    }

    .close,
    .open {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
    }

    td {
      color: #46a6eb;
      font-size: 12px;
      font-weight: 600;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 12px;
        height: 12px;

        path {
          stroke: #46a6eb;
        }
      }

      &.close {
        transform: rotate(-90deg);
      }

      &.open {
        transform: rotate(90deg);
      }
    }
  }
`;

export default S;
