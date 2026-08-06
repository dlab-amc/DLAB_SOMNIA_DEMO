import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 3rem 2rem;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  .list-table-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: calc(100vh - 65px - 300px);
    min-width: 0;
    max-width: 100%;
    overflow: visible;

    .list-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #fff !important;
    }

    tr th,
    tr td {
      border: 1px solid #ddd;
      font-size: 14px;
      /* overflow: hidden; */
      padding: 0.6rem;
      word-break: normal;
      text-align: center;

      &:first-child,
      &:last-child {
        border-left: none;
        border-right: none;
      }
    }

    /* 제출 리스트: fixed 레이아웃 — 번호/날짜/상태는 고정, 제목·설명만 줄어듦 */
    &.submit {
      overflow-x: hidden;
      min-width: 0;

      .list-table {
        table-layout: fixed;
        width: 100%;
      }

      tr th,
      tr td {
        font-size: 13px;
        padding: 0.55rem 0.5rem;
        box-sizing: border-box;
      }

      /* 고정폭 컬럼: 화면 밖으로 밀리지 않도록 rem 고정 */
      .submit-number {
        width: 9rem;
        padding-left: 0.75rem;
        padding-right: 0.5rem;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .submit-title {
        width: 22%;
        text-align: left;
        overflow: hidden;
        padding-left: 0.75rem;
        padding-right: 0.5rem;
      }

      .submit-description {
        width: auto; /* 남은 폭 */
        text-align: left;
        overflow: hidden;
        padding-left: 0.75rem;
        padding-right: 0.5rem;
      }

      .submit-date {
        width: 10.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
        overflow: hidden;
      }

      .submit-status {
        width: 7.75rem; /* In Progress / Completed 한 줄 */
        max-width: 7.75rem;
        padding-left: 0.4rem;
        padding-right: 0.5rem;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
      }

      .status-text {
        display: inline-flex;
        width: auto;
        min-width: 0;
        max-width: 100%;
        font-size: 12px;
        padding: 0.35rem 0.5rem;
        white-space: nowrap;
        box-sizing: border-box;
      }

      .cell-tooltip-wrap {
        position: relative;
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;

        .cell-ellipsis-text {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &.is-title .cell-ellipsis-text {
          text-decoration: underline;
          font-weight: 600;
        }

        .cell-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          z-index: 10050;
          transform: translateY(4px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          max-width: min(28rem, 70vw);
          padding: 0.35rem 0.55rem;
          border-radius: 6px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.4;
          text-align: left;
          white-space: normal;
          word-break: break-word;
          transition: opacity 0.15s ease, transform 0.15s ease,
            visibility 0.15s ease;

          &::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 16px;
            border: 5px solid transparent;
            border-top-color: #0f172a;
          }
        }

        &.is-truncated:hover .cell-tooltip,
        &.is-truncated:has(:focus-visible) .cell-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }

      tbody tr {
        position: relative;
      }
    }

    tbody tr {
      cursor: pointer;
      &:hover {
        background-color: #f1f7ff;
      }
    }

    .list-table-header {
      background-color: #eee;
      font-weight: 700;
    }

    .notification-row {
      cursor: default;
      &:hover {
        background-color: #fff;
      }
    }

    .submit-number,
    .submit-title,
    .user-id {
      cursor: pointer;
      font-weight: 600;
    }

    td.submit-title {
      text-decoration: underline;
    }

    td.user-id.task {
      text-decoration: underline;

      &:hover {
        // Temp
        color: #0066ff;
      }
    }

    .submit-status,
    .user-notification {
      padding: 0.4rem 0.6rem;
    }

    .status-text {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: auto;
      min-width: 4.75rem;
      max-width: 8.25rem;
      font-size: 12px;
      font-weight: 600;
      padding: 0.4rem 0.65rem;
      border-radius: 4px;
      text-align: center;
      letter-spacing: -0.02em;
      line-height: 1.25;
      white-space: nowrap;
      word-break: keep-all;
    }

    /* SUBMIT_STATUS_COLORS (submitStatus.js) 와 동일 */
    [data-color='-1'] {
      background-color: #757575; /* 대기중 */
      color: #fff;
    }
    [data-color='1'] {
      background-color: #2196f3; /* 진행중 */
      color: #fff;
    }
    [data-color='2'] {
      background-color: #4caf50; /* 완료 */
      color: #fff;
    }
    [data-color='3'] {
      background-color: #ff9800; /* 중단됨 */
      color: #fff;
    }
    [data-color='4'] {
      background-color: #ff9800; /* 중단중 */
      color: #fff;
    }
    [data-color='0'] {
      background-color: #f44336; /* 에러 */
      color: #fff;
    }

    .submit-status {
      position: relative;
    }

    .guide-icon {
      cursor: pointer;
      display: inline-block;
      border: 1px solid #aaa;
      color: #aaa;
      font-size: 12px;
      font-weight: 400;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-left: 0.4rem;

      &:hover + .guide-dropdown {
        display: block;
      }
    }

    .guide-dropdown {
      display: none;
      z-index: 10;
      position: absolute;
      top: 90%;
      left: 30%;
      transform: translateX(-50%);
      background-color: #fff;
      border: 2px solid #ddd;
      padding: 1rem;

      .status-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        &:nth-child(1) .status-color {
          background-color: #2196f3; /* 진행중 */
        }
        &:nth-child(2) .status-color {
          background-color: #4caf50; /* 완료 */
        }
        &:nth-child(3) {
          margin-bottom: 0;
          .status-color {
            background-color: #f44336; /* 에러 */
          }
        }

        .status-color {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.3rem;
        }

        .status-name {
          font-weight: 700;
          margin-right: 0.6rem;
        }

        .status-description {
          color: #666;
          font-weight: 400;
        }
      }
    }

    /* Column Width Fix - task 등 (submit 페이지는 &.submit 에서 단독 정의) */
    &:not(.submit) {
      .submit-number {
        width: 15%;
      }
      .submit-title {
        width: 20%;
      }
      .submit-description {
        width: 25%;
      }
      .submit-date {
        width: 20%;
      }
      .submit-status {
        width: 10%;
        white-space: nowrap;
        text-align: center;
      }
    }

    /* Column Width Fix - 2. User */
    .user-id {
      width: 13%;
    }
    .user-type {
      width: 7%;
    }
    .user-name {
      width: 10%;
    }
    .user-phone-number {
      width: 20%;
    }
    .user-submit-detail {
      width: 25%;
    }
    .user-submit {
      width: 10%;
    }

    /* Column Width Fix - 3. Setting */
    .from-type {
      width: 10%;
    }
    .to-type {
      width: 10%;
    }
    .to-id {
      width: 15%;
    }
    .notification-text {
      width: 65%;
      line-height: 160%;
      white-space: normal;
      margin: 0 auto;
    }
  }

  .no-data-wrap {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: #aaa;
    width: 100%;

    .no-data-text {
      cursor: default;
      border: none;
      width: 100%;
      height: 60vh;

      &:hover {
        background-color: #fff;
      }

      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .notification-button-wrap {
    padding: 0.2rem 0.6rem !important;
  }

  .notification-button {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    font-weight: 600;
    padding: 0.5rem 1rem;
  }

  .read-status {
    color: gray;
  }

  .read-status.unread {
    font-weight: bold;
    color: red;
  }
`;

S.NotificationContainer = styled.div`
  .notification-wrap {
    padding: 1.2rem 2rem;
    font-weight: 500;
    border-bottom: 1px solid #999;

    .sent-date {
      color: #999;
      margin-bottom: 1rem;
    }

    .sent-text {
      white-space: 'pre-line';
      line-height: 160%;
    }

    &:first-child {
      border-top: 1px solid #999;
    }
  }
`;

S.Button = styled.button`
  cursor: pointer;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &[data-button-color='stop'] {
    background-color: #ff0000; /* 정지 버튼 색상 */
    color: #fff;

    &:hover {
      background-color: #cc0000;
    }
  }

  &[data-button-color='restart'] {
    background-color: #007bff; /* 다시 시작 버튼 색상 */
    color: #fff;

    &:hover {
      background-color: #0056b3;
    }
  }

  &[data-button-color='delete'] {
    background-color: #6c757d; /* 삭제 버튼 색상 */
    color: #fff;

    &:hover {
      background-color: #5a6268;
    }
  }

  &[data-button-color='stopping'] {
    background-color: #ffa500;
    color: #fff;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export default S;
