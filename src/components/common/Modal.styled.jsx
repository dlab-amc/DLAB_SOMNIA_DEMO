import styled from 'styled-components';
const S = {};

S.FullScreen = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  box-sizing: border-box;
  z-index: 11000;
`;

S.ModalContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.5rem 1.5rem 1.25rem;
  width: min(420px, 100%);
  max-width: 100%;
  background-color: #fff;
  white-space: pre-wrap;
  border-radius: 12px;
  border: 1px solid #e8ecf1;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.06) inset;

  .modal-title {
    text-align: center;
    margin: 0 0 0.85rem;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0f172a;
    white-space: wrap;
    line-height: 1.35;
  }

  .modal-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -0.01em;
    margin-bottom: 1.35rem;
    text-align: center;
    color: #475569;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    padding: 0 0.25rem;

    &.scroll {
      padding: 1rem;
      max-height: 320px;
      overflow-y: auto;
      background-color: #f8fafc;
      border: 1px solid #e8ecf1;
      border-radius: 8px;
      word-wrap: break-word;
      white-space: pre-wrap;
      text-align: left;
      color: #334155;
    }
  }

  .modal-close-button {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 42px;
    padding: 0.45rem 1rem;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    border-radius: 8px;
    border: 1px solid #0094ff;
    background-color: #0094ff;
    color: #fff;
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover {
      background-color: #0086e6;
      border-color: #0086e6;
    }
  }

  /* Notification Modal */
  &.notification {
    width: 700px;

    .modal-header {
      position: relative;
      .modal-title {
        margin-bottom: 2.5rem;
      }
    }

    .modal-contents-wrap {
      margin-bottom: 2rem;

      .modal-content {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;

        .label {
          font-weight: 600;
          width: 6rem;
        }
        .data {
          color: #333;
        }

        .textarea {
          width: 100%;
          height: 8rem;
          background-color: #eee;
          padding: 1rem;
          resize: none;
          font-size: 16px;
          white-space: pre-wrap;
          overflow-wrap: break-word;

          &:focus {
            outline: none;
            background-color: #f1f7ff;
          }
        }
      }
    }

    .buttons-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      button {
        cursor: pointer;
        padding: 0.8rem;
        font-size: 16px;
        font-weight: 600;
        width: 8rem;

        &:disabled {
          cursor: default;
          background-color: #ddd;
          border: 1px solid #ddd;
          color: #aaa;
        }
      }

      .modal-close-button {
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      }

      .send-button {
        background-color: #000;
        color: #fff;
        border: 1px solid #000;
      }
    }
  }

  /* User Info Modal */
  &.user {
    width: 600px;

    .info-table {
      width: 100%;
      margin-bottom: 1rem;
      border-collapse: collapse;
      border-spacing: 0;

      tr td {
        font-size: 14px;
        word-break: normal;
        text-align: center;
        padding: 0.6rem;
        border: 1px solid #dadada;
      }

      .key {
        background-color: #eee;
        font-weight: 600;
        width: 6rem;
      }
    }
  }
`;

export default S;
