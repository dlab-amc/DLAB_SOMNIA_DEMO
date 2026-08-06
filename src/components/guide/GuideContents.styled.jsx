import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) 1.25rem;
  min-height: calc(100vh - 65px);
  height: auto;
  box-sizing: border-box;

  &.submit-guide-container {
    padding-bottom: calc(clamp(3rem, 8vw, 6rem) + 5rem);

    [id^='step'] {
      scroll-margin-top: calc(65px + 1.25rem);
    }
  }

  //   Common
  section {
    margin-bottom: 13rem;
  }

  img {
    user-select: none;
    -webkit-user-drag: none;
  }

  .section-break-line {
    margin: 0 auto;
    width: 68px;
    height: 2px;
    background-color: #999;
    margin-bottom: 15rem;
  }

  .submit-guide-landing {
    .submit-guide-title {
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #0f172a;
      text-align: center;
      margin-bottom: clamp(3rem, 8vw, 5rem);
    }

    .submit-guide-step-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      &::before {
        // step 구분선
        content: '';
        position: absolute;
        top: 1.5rem;
        left: 0;
        transform: translateY(-50%);
        background-color: #e2e8f0;
        width: 100%;
        max-width: 1024px;
        height: 4px;
        border-radius: 999px;
      }
    }

    .submit-guide-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      .step-indicator {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0f172a;
        color: #fff;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 1rem;
        box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e2e8f0;

        &::before {
          // dashed-line
          content: '';
          position: absolute;
          top: 3rem;
          left: 50%;
          width: 1rem;
          height: 2rem;
          background-color: transparent;
          border-left: 2px dashed #94a3b8;
        }
      }

      .step-wrap {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: clamp(260px, 30%, 320px);
        height: 300px;
        padding: 1.4rem;
        background-color: #0f172a;
        color: #fff;
        border-radius: 12px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
        transition:
          background-color 0.2s ease,
          border-color 0.2s ease,
          box-shadow 0.2s ease;

        &:hover {
          background-color: #0094ff;
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 14px 36px rgba(0, 148, 255, 0.28);
        }

        .step-icon {
          margin-bottom: 1.8rem;
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          white-space: normal;
          word-break: keep-all;
          overflow-wrap: break-word;
        }

        .step-desc {
          text-align: center;
          font-weight: 400;
          font-size: 15px;
          color: rgba(248, 250, 252, 0.82);
          line-height: 1.5;
          white-space: normal;
          word-break: keep-all;
          overflow-wrap: break-word;
        }
      }
    }
  }

  // Common
  .bold {
    font-weight: 700;
  }

  .step-section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 5rem;
  }

  .line {
    font-size: 17px;
    font-weight: 500;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .inline-code {
    font-family: ui-monospace, 'Cascadia Code', 'Consolas', monospace;
    font-size: 0.92em;
    font-weight: 600;
    background: #f1f3f4;
    padding: 0.12em 0.4em;
    border-radius: 4px;
  }

  .margin {
    margin-bottom: 4rem;
  }

  .part-desc {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.6;

    .line {
      margin-bottom: 1.8rem;
    }
  }

  /* 가이드 보조 안내 (되돌리기: 이 블록 + SubmitGuideContents .guide-note / .guide-subheading) */
  .guide-note {
    text-align: center;
    margin: 0 0 3.5rem;

    p {
      margin: 0 0 0.45rem;
      font-size: 17px;
      font-weight: 500;
      line-height: 1.6;
      color: inherit;
      word-break: break-word;
      overflow-wrap: break-word;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .guide-subheading {
    font-size: 16px;
    font-weight: 700;
    color: #334155;
    text-align: left;
    padding-left: 0;
    margin: 1.25rem 0 0.75rem;
  }

  .part-image-wrap {
    padding: 2rem;
    img {
      width: 85%;
    }
    .image-small {
      width: 75%;
    }
  }

  .guide-ui-mock-wrap {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    padding: 1rem 0 0;
    box-sizing: border-box;
    overflow: visible;
  }

  .step-one-section {
    margin-bottom: 8rem;

    .part-one,
    .part-two,
    .part-three {
      margin: 0 auto;
      text-align: center;
      margin-bottom: 10rem;
    }

    .part-title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 4rem;
    }

    .margin {
      margin-bottom: 4rem;
    }

  .part-step {
    position: relative;
    margin: 0 auto;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5rem;

    &::before {
      content: '';
      position: absolute;
      top: 1.2rem;
      left: 0.6rem;
      right: 0;
      margin: 0 auto;
      background-color: #999;
      height: 6px;
      width: 90%;
      z-index: 1;
    }

    &.half::after {
      content: '';
      position: absolute;
      top: 1.2rem;
      left: 0.6rem;
      background-color: #0094ff;
      width: 50%; 
      height: 6px;
      z-index: 1;
    }

    &.full::after {
      content: '';
      position: absolute;
      top: 1.2rem;
      left: 0.6rem;
      background-color: #0094ff;
      width: 90%;
      height: 6px;
      z-index: 1;
    }

    .part-wrap {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;

      .part-indicator {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #c9c9c9;
        color: #5f5f5f;
        margin-bottom: 0.8rem;

        &.fill {
          background-color: #0094ff;
          color: #fff;
        }
      }

      .part-text {
        position: absolute;
        top: 3.2rem;
        font-size: 16px;
        font-weight: 400;
        color: #666;
        white-space: nowrap;
      }

      &.current {
        .part-indicator {
          background-color: #0094ff;
          color: #fff;
        }

        .part-text {
          font-weight: 700;
          color: #000;
        }
      }
    }
  }

    .file-info-wrap {
      width: 600px;
      margin: 0 auto;
      margin-bottom: 6rem;

      .file-info-title {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        margin-bottom: 2rem;

        .file-name {
          display: inline-flex;
          align-items: center;
          color: #000;
          font-size: 20px;
          font-weight: 700;
          border-radius: 6px;
          margin-right: 1rem;
          max-width: 100%;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
          hyphens: auto;

          &.one::before {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 4px;
            content: '1';
            color: #fff;
            background-color: #000;
            font-weight: 500;
            font-size: 16px;
            margin-right: 0.5rem;
          }

          &.two::before {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 4px;
            content: '2';
            color: #fff;
            background-color: #000;
            font-weight: 500;
            font-size: 16px;
            margin-right: 0.5rem;
          }
          &.three::before {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 4px;
            content: '3';
            color: #fff;
            background-color: #000;
            font-weight: 500;
            font-size: 16px;
            margin-right: 0.5rem;
          }

          &.four::before {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 4px;
            content: '4';
            color: #fff;
            background-color: #000;
            font-weight: 500;
            font-size: 16px;
            margin-right: 0.5rem;
          }
        }

        .file-required {
          color: #0094ff;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;

          &.none {
            color: #aaa;
          }
        }
      }

      .file-info-contents {
        width: 100%;
        padding: 1.8rem 1.5rem;
        background-color: #fafafa;
        border: 1px solid #ccc;
        border-radius: 12px;

        .line-wrap {
          margin-bottom: 3rem;
          .line {
            margin-bottom: 1rem;
            text-align: left;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.6;

            &::before {
              content: '• ';
              color: #333;
              font-weight: 700;
            }
          }

          &.no-margin {
            margin-bottom: 0;

            .line:last-child {
              margin-bottom: 0;
            }
          }
        }

        .params-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;

          .line {
            margin-bottom: 0;
          }
        }

        .download-button {
          cursor: pointer;
          background-color: #0094ff;
          color: #fff;
          padding: 10px 14px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: background-color 0.2s ease;
          gap: 6px;

          &:hover {
            background-color: #1ca1ff;
          }

          .text {
            font-size: 14px;
            font-weight: 600;
          }
          .icon {
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }

  .step-two-section {
    text-align: center;
    .line-wrap {
      line-height: 1.6;
      margin-bottom: 8rem;
    }

    .log-figure {
      margin: 0 auto;
      width: 450px;
      margin-bottom: 15rem;
      .log-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;

        .log-label {
          font-size: 16px;
          font-weight: 700;
        }
        .log-data {
          font-size: 14px;
          .log-step {
            position: relative;
            color: #aaa;
            font-weight: 500;
            margin-right: 1rem;

            &::after {
              content: '진행 단계 (총 3단계)';
              color: #616161;
              position: absolute;
              bottom: 100%;
              left: 50%;
              font-size: 13px;
              font-weight: 500;
              transform: translate(-50%, -0.5rem);
            }

            &:before {
              width: 100%;
              height: 1rem;
              content: '';
              background-color: #0195ff25;
              position: absolute;
              border-bottom: 2px dashed #0094ff;
            }
          }

          .log-status {
            position: relative;
            color: #0094ff;
            font-weight: 700;

            &::after {
              content: '진행 상태';
              color: #616161;
              position: absolute;
              bottom: 2px;
              left: 150%;
              font-size: 13px;
              font-weight: 500;
            }

            &:before {
              width: 100%;
              height: 1rem;
              content: '';
              background-color: #0195ff25;
              position: absolute;
              border-bottom: 2px dashed #0094ff;
            }
          }
        }
      }

      .log-bar {
        position: relative;
        background-color: #e5e5e5;
        border-radius: 4px;
        .current {
          width: 30%;
          background-color: #0094ff;
          padding: 0.5rem 0;
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.1em;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          content: '진행 단계 및 진행 상태바';
          color: #616161;
          position: absolute;
          bottom: -90%;
          left: 5px;
          font-size: 13px;
          font-weight: 500;
          border-top: 2px dashed #0094ff;
          padding-top: 0.8rem;
        }
      }
    }

    // Common

    .progress-step-wrap,
    .progress-status-wrap {
      text-align: left;
      width: 600px;
      margin: 0 auto;
      margin-bottom: 10rem;

      .wrap-title {
        display: inline-block;
        font-size: 20px;
        font-weight: 600;
        background-color: #000;
        color: #fff;
        padding: 0.6rem 1.4rem;
        border-radius: 6px;
        margin-bottom: 1.5rem;
      }

      .desc-wrap {
        padding: 1.8rem 1.5rem;
        background-color: #fafafa;
        border: 1px solid #ccc;
        border-radius: 12px;

        dl {
          font-size: 16px;
          font-weight: 500;
          display: flex;
          gap: 2px;
          margin-bottom: 2px;

          &:last-child {
            margin-bottom: 0;
          }

          .keyword {
            padding: 0.8rem 1.2rem;
            width: 30%;
            background-color: #333;
            color: #fff;
            text-align: center;
            font-weight: 600;

            &.progress {
              background-color: #0094ff;
            }
            &.done {
              background-color: #8bc34a;
            }
            &.error {
              background-color: #c60000;
            }
          }

          .desc {
            width: 70%;
            padding: 0.8rem 1.2rem;
            background-color: #fff;
            color: #444;
          }
        }
      }
    }
  }

  .step-three-section {
    position: relative;
    text-align: center;
    padding-bottom: 6rem;

    .line-wrap {
      margin-bottom: 8rem;
      line-height: 1.6;
    }

    .screen-image-wrap {
      margin-bottom: 8rem;

      .image {
        width: 80%;
        margin: 0 auto;
        margin-bottom: 2rem;
      }
      .image-desc {
        font-size: 17px;
        font-weight: 600;
        text-align: center;
        margin-top: 1rem;
      }

      &.guide-ui-mock-wrap {
        max-width: 820px;
        overflow: visible;
        padding-right: 5.5rem;
      }
    }
  }
`;

S.FloatingNav = styled.aside`
  z-index: 10;
  position: fixed;
  top: 15%;
  right: 5%;
  width: min(36vw, 280px);
  padding: 1rem 0.85rem;
  background-color: #fff;
  color: #475569;
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.04);

  .link {
    cursor: pointer;
    display: block;
    margin-bottom: 0.25rem;
    padding: 0.55rem 0.65rem;
    border-radius: 8px;
    border-left: 3px solid transparent;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: -0.01em;
    color: #64748b;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
    hyphens: auto;
    transition:
      background-color 0.22s ease,
      color 0.22s ease,
      border-left-color 0.22s ease,
      font-weight 0.15s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: #334155;
      background-color: #f8fafc;
    }

    &.active {
      color: #0f172a;
      font-weight: 700;
      background-color: rgba(0, 148, 255, 0.1);
      border-left-color: #0094ff;

      &:hover {
        color: #0f172a;
        background-color: rgba(0, 148, 255, 0.12);
      }
    }
  }

  @media (max-width: 1200px) {
    right: 2%;
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: 88px;
    right: 2%;
    padding: 0.85rem 0.65rem;
    width: min(70vw, 300px);

    .link {
      font-size: 13px;
      padding: 0.5rem 0.55rem;
    }
  }
`;

/* 제출 가이드 좌측 목차 (롤백: ROLLBACK-SUBMIT-GUIDE-SIDEBAR.md) */
S.SubmitGuideLayout = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  .submit-guide-main {
    width: 100%;
    min-width: 0;
  }

  .guide-top-btn {
    position: fixed;
    right: 1.1rem;
    bottom: 4.6rem;
    z-index: 30;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    min-width: 42px;
    height: 42px;
    padding: 0.3rem 0.45rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.1);
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    .guide-top-arrow {
      font-size: 9px;
      line-height: 1;
      color: inherit;
    }

    .guide-top-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.02em;
      line-height: 1;
    }

    &:hover {
      background: #eaf5ff;
      border-color: #93c5fd;
      color: #0b84df;
    }
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem;
    gap: 0;

    .guide-top-btn {
      right: 0.85rem;
      bottom: 4.4rem;
      min-width: 38px;
      height: 38px;

      .guide-top-arrow {
        font-size: 8px;
      }

      .guide-top-label {
        font-size: 9px;
      }
    }
  }
`;

S.SubmitGuideSidebar = styled.aside`
  position: fixed;
  top: calc(65px + 1.1rem);
  left: 0.65rem;
  z-index: 20;
  flex-shrink: 0;
  width: 268px;
  max-height: calc(100vh - 65px - 2.2rem);
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  transition: width 0.2s ease;

  &.is-collapsed {
    width: 42px;
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.7rem 0.75rem;
    border: none;
    border-bottom: 1px solid #eee;
    background: #fff;
    color: #222;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;

    &:hover {
      background: #fafafa;
    }
  }

  &.is-collapsed .sidebar-toggle {
    justify-content: center;
    padding: 0.7rem 0.35rem;
    border-bottom: none;
  }

  .toggle-icon {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    width: 15px;
    height: 12px;
    flex-shrink: 0;

    span {
      display: block;
      height: 1.5px;
      background: #555;
    }
  }

  .toggle-label {
    white-space: nowrap;
  }

  .sidebar-nav {
    overflow-y: auto;
    padding: 0.65rem 0.5rem 0.9rem;
    scrollbar-width: thin;
    scrollbar-color: #ddd transparent;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 3px;
    }
  }

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-list.depth-1,
  .toc-list.depth-2 {
    margin: 0.2rem 0 0.55rem;
  }

  .toc-item {
    margin: 0 0 0.15rem;
  }

  .toc-list.depth-0 > .toc-item {
    margin-bottom: 0.55rem;
    padding-bottom: 0.55rem;
    border-bottom: 1px solid #ececec;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  .toc-link {
    display: flex;
    align-items: flex-start;
    gap: 0.4rem;
    width: 100%;
    text-align: left;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 5px;
    font-family: inherit;
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: #555;
    padding: 0.45rem 0.55rem;

    &:hover {
      background: #f5f5f5;
      color: #222;
    }

    &.active {
      color: #0b84df;
      font-weight: 600;
      background: #eaf5ff;
    }

    .toc-text {
      flex: 1;
      min-width: 0;
      word-break: keep-all;
      overflow-wrap: break-word;
    }

    .caret {
      flex-shrink: 0;
      width: 0;
      height: 0;
      margin-top: 0.4rem;
      margin-left: auto;
      border-style: solid;
      border-width: 5px 4px 0 4px;
      border-color: #888 transparent transparent transparent;
      transition: transform 0.15s ease;

      &.open {
        transform: rotate(180deg);
      }
    }

    &.depth-0 {
      margin-top: 0.15rem;
      padding: 0.55rem 0.55rem;
      font-size: 14.5px;
      font-weight: 700;
      color: #1a1a1a;

      &.active {
        font-weight: 700;
        color: #0b84df;
        background: #eaf5ff;
      }

      &.is-expandable {
        align-items: center;
      }

      .caret {
        margin-top: 0;
      }
    }

    &.depth-1 {
      padding: 0.42rem 0.55rem 0.42rem 0.85rem;
      font-size: 13.5px;
      font-weight: 600;
      color: #444;
    }

    &.depth-2 {
      padding: 0.38rem 0.55rem 0.38rem 1.45rem;
      font-size: 13px;
      font-weight: 400;
      color: #777;

      &.active {
        color: #0b84df;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 1280px) {
    left: 0.4rem;
    width: 250px;
  }

  @media (max-width: 1100px) {
    width: 230px;
  }

  @media (max-width: 960px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    max-height: none;
    margin: 0.75rem 0 0.5rem;
    z-index: 1;

    &.is-collapsed {
      width: 100%;

      .sidebar-toggle {
        justify-content: flex-start;
        padding: 0.7rem 0.85rem;
        border-bottom: 1px solid #eee;
      }
    }
  }
`;

S.CodeBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  .block {
    text-align: left;
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) rgba(0, 0, 0, 0.2);

    padding: 3rem 1rem 1rem !important;
    border-radius: 10px !important;
    background-color: #3f3f3f !important;
    color: #fff !important;
    font-size: 12px !important;
    line-height: 1.55 !important;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.22);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 4px;
    }

    code.hljs {
      display: block !important;
      box-sizing: border-box !important;
      width: max-content !important;
      min-width: 100% !important;
      max-width: none !important;
      font-size: 12px !important;
      line-height: 1.55 !important;
    }

    code span {
      white-space: pre;
      word-break: normal;
      overflow-wrap: normal;
      line-height: 1.55;
      font-size: inherit !important;
    }

    /* Highlighter - custom style */
    .hljs-keyword {
      color: #ff659c !important;
    }
    .hljs-title {
      color: #73dfa5 !important;
    }
    .hljs-string {
      color: #1ac8ff !important;
    }
    .hljs-params,
    .hljs-literal,
    .hljs-built_in {
      color: #dfd473 !important;
    }
    .hljs-comment {
      color: #999 !important;
    }
  }

  /* Header Wrap */
  .header-wrap {
    width: 100%;
    padding: 0.8rem 1.2rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .dot-wrap {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #666;
        aspect-ratio: 1;
      }
    }

    .copy-button {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 4.75rem;
      padding: 0.28rem 0.7rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.92);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.3;
      transition: background-color 0.15s ease, border-color 0.15s ease,
        color 0.15s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(26, 200, 255, 0.5);
        color: #7adfff;
      }

      &.is-copied {
        cursor: default;
        background: rgba(115, 223, 165, 0.16);
        border-color: rgba(115, 223, 165, 0.55);
        color: #73dfa5;

        &:hover {
          background: rgba(115, 223, 165, 0.16);
          border-color: rgba(115, 223, 165, 0.55);
          color: #73dfa5;
        }
      }
    }
  }

  @media (max-width: 768px) {
    section {
      margin-bottom: 8rem;
    }

    .submit-guide-landing {
      .submit-guide-title {
        font-size: clamp(22px, 5vw, 36px);
        margin-bottom: 3rem;
      }

      .submit-guide-step-wrap {
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem 1rem;
      }
    }
  }
`;

S.BottomLinkBar = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 54px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.06);

  @media (min-width: 768px) {
    padding: 0.5rem 1.5rem;
  }

  .contents-wrap {
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  a.bottom-link {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: 0.45rem 1.15rem;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-decoration: none;
    border-radius: 8px;
    border: 1px solid #0094ff;
    background-color: #0094ff;
    color: #fff;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;

    &:hover {
      background-color: #0086e6;
      border-color: #0086e6;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.22);
    }
  }

  @media (max-width: 480px) {
    a.bottom-link {
      width: 100%;
      max-width: 100%;
      padding: 0.55rem 1rem;
      font-size: 15px;
    }
  }
`;

export default S;
