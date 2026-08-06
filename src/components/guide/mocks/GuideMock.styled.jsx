import styled, { keyframes } from "styled-components";

const pulseBorder = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 148, 255, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(0, 148, 255, 0.22);
  }
`;

const S = {};

S.Frame = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
  box-sizing: border-box;
  overflow: visible;

  .guide-highlight {
    border: 2px solid #0094ff !important;
    border-radius: 8px;
    animation: ${pulseBorder} 1.6s ease-in-out infinite;
  }

  .guide-highlight-btn {
    position: relative;
    border: 2px solid #38bdf8 !important;
    animation: ${pulseBorder} 1.6s ease-in-out infinite;
  }

  .detail-outer {
    position: relative;
    overflow: visible;
  }

  .report-hint {
    position: absolute;
    top: 1.35rem;
    left: calc(100% + 12px);
    z-index: 5;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    background: #e8f4fd;
    border: 1px solid #93c5fd;
    color: #0b84df;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);
    animation: reportHintIn 0.2s ease;

    .report-hint-svg {
      width: 14px;
      height: 18px;
      flex-shrink: 0;

      path {
        fill: #0b84df;
      }
    }
  }

  @keyframes reportHintIn {
    from {
      opacity: 0;
      transform: translateX(-6px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 900px) {
    .report-hint {
      top: auto;
      bottom: calc(100% + 8px);
      left: auto;
      right: 0;
    }
  }
`;

S.SampleCard = styled.div`
  border: 1px solid #e8ecf1;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
  padding: 1.25rem 1.35rem 1.4rem;
  overflow: visible;
  position: relative;

  .section-heading {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0 0 1rem;
  }

  .section-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    box-shadow: 0 0 0 3px #fff, 0 0 0 4px #e2e8f0;
  }

  .section-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }

  .mode-toggle {
    display: flex;
    gap: 0;
    padding: 4px;
    margin-bottom: 1.2rem;
    background: #f1f5f9;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    button {
      flex: 1;
      min-height: 48px;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      color: #64748b;
      transition: background 0.15s ease, color 0.15s ease;
    }

    button.is-active {
      background: #0094ff;
      color: #fff;
      box-shadow: 0 1px 4px rgba(0, 148, 255, 0.35);
    }
  }

  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem 1rem;
    margin-top: 0.75rem;
    overflow: visible;
    align-items: start;
  }

  .field-full {
    grid-column: 1 / -1;
  }

  .mock-field {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    overflow: visible;
  }

  .mock-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }

  .mock-control {
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
    padding: 0.55rem 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background: #fff;
    font-size: 13px;
    color: #0f172a;
    font-family: inherit;
    cursor: pointer;
    appearance: none;
    text-align: left;
    background-image: linear-gradient(45deg, transparent 50%, #64748b 50%),
      linear-gradient(135deg, #64748b 50%, transparent 50%);
    background-position: calc(100% - 16px) calc(50% - 3px),
      calc(100% - 11px) calc(50% - 3px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }

  input.mock-control {
    background-image: none;
    cursor: text;
  }

  input.mock-control:disabled {
    background: #f8fafc;
    color: #64748b;
    cursor: not-allowed;
  }

  .mock-control.guide-highlight {
    padding-right: 1.75rem;
  }

  .preset-panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 30;
    margin-top: 0;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.14);
    overflow: hidden;
    max-height: 240px;
    overflow-y: auto;
  }

  .preset-option {
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    background: #fff;
    padding: 0.7rem 0.9rem;
    cursor: pointer;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &.is-selected {
      background: #f0f9ff;
    }

    .opt-title {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.15rem;
    }

    .opt-meta {
      display: block;
      font-size: 11px;
      color: #64748b;
    }
  }

  @media (max-width: 640px) {
    .field-grid {
      grid-template-columns: 1fr;
    }
  }
`;

S.ProgressExplain = styled.div`
  .stage-flow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 2.25rem;
  }

  .stage-chip {
    position: relative;
    padding: 1rem 0.85rem;
    border-radius: 10px;
    color: #fff;
    min-height: 84px;

    &.s1 {
      background: #94a3b8;
    }
    &.s2 {
      background: #64748b;
    }
    &.s3 {
      background: #475569;
    }

    .stage-title {
      margin: 0 0 0.4rem;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .stage-desc {
      margin: 0;
      font-size: 13px;
      line-height: 1.45;
      opacity: 0.92;
    }
  }

  .progress-panel {
    border: 1px solid #e8ecf1;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
    padding: 1.2rem 1.35rem;
    margin-bottom: 2.25rem;
  }

  .panel-title {
    margin: 0 0 0.85rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }

  .stage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
    flex-wrap: wrap;
  }

  .step-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  .step-badge {
    display: inline-flex;
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    background: #e8f4fd;
    border: 1px solid #c5e3fa;
    color: #0b84df;
    font-size: 12px;
    font-weight: 700;
  }

  .step-name {
    font-size: 1rem;
    font-weight: 600;
    color: #334155;
    padding: 0.15rem 0.45rem;
    box-sizing: border-box;
  }

  .status-text {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: #4caf50;
    padding: 0.2rem 0.55rem;
    box-sizing: border-box;
  }

  .progress-track {
    position: relative;
    height: 32px;
    border-radius: 10px;
    background: #94a3b8;
    overflow: hidden;
  }

  .progress-fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    background: #4caf50;
  }

  .progress-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    z-index: 1;
  }

  .legend-list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 0.25rem 0.15rem;
  }

  .legend-item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 15px;
    color: #334155;
    line-height: 1.5;
  }

  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    margin-top: 0.35rem;
    flex-shrink: 0;

    &.progress {
      background: #2196f3;
    }
    &.done {
      background: #4caf50;
    }
    &.error {
      background: #f44336;
    }
  }

  .legend-name {
    font-weight: 700;
    margin-right: 0.35rem;
  }

  @media (max-width: 640px) {
    .stage-flow {
      grid-template-columns: 1fr;
    }
  }
`;

S.DetailMock = styled.div`
  border: 1px solid #e8ecf1;
  border-radius: 14px;
  background: #f8fafc;
  padding: 1.25rem 1.1rem 1.4rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);

  .detail-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    min-height: 42px;
  }

  .detail-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
  }

  .prev-button,
  .result-button {
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    padding: 0.45rem 0.9rem;
    cursor: pointer;
  }

  .prev-button {
    background: #fff;
    border: 1px solid #cbd5e1;
    color: #334155;
  }

  .result-button {
    background: #111827;
    border: 1px solid #111827;
    color: #fff;
  }

  .result-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .info-card,
  .files-card,
  .progress-card {
    background: #fff;
    border: 1px solid #e8ecf1;
    border-radius: 12px;
    padding: 1.1rem 1.2rem;
    margin-bottom: 0.9rem;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  }

  .info-row {
    display: grid;
    grid-template-columns: 7rem 1fr;
    gap: 0.5rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13px;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #64748b;
      font-weight: 600;
    }

    .value {
      color: #0f172a;
      font-weight: 500;
    }
  }

  .files-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.7rem;
  }

  .files-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .files-count {
    display: inline-flex;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: #e8f4fd;
    color: #0b84df;
    font-size: 12px;
    font-weight: 700;
  }

  .file-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.55rem 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13px;

    &:last-child {
      border-bottom: none;
    }

    .file-name {
      color: #0f172a;
      word-break: break-all;
    }

    .file-meta {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      color: #64748b;
      white-space: nowrap;
    }

    .dl {
      border: none;
      background: transparent;
      color: #64748b;
      cursor: pointer;
      font-size: 14px;
    }
  }
`;

S.ReportMock = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);

  .report-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    background: #17171d;
    color: #fff;
    padding: 0.7rem 0.9rem;
  }

  .bar-btn {
    border: none;
    border-radius: 8px;
    padding: 0.4rem 0.75rem;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .bar-btn.back {
    background: #475569;
    color: #fff;
  }

  .bar-btn.save {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: #0094ff;
    color: #fff;
  }

  .page-nav {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .download-toast {
    position: absolute;
    top: calc(100% + 10px);
    right: 12px;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 210px;
    padding: 0.65rem 0.8rem;
    border-radius: 10px;
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
    color: #fff;
  }

  .toast-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #ef4444;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
  }

  .toast-name {
    font-size: 12px;
    font-weight: 700;
  }

  .toast-meta {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 0.1rem;
  }

  .report-body {
    padding: 1.25rem 1.35rem 1.5rem;
    background: #f8fafc;
  }

  .paper {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.1rem 1.2rem 1.35rem;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }

  .paper-head {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0.75rem;
    align-items: start;
    margin-bottom: 1rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .logo-text {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    line-height: 1.35;
  }

  .paper-title {
    margin: 0;
    text-align: center;
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
  }

  .meta-right {
    text-align: right;
    font-size: 11px;
    color: #64748b;
    line-height: 1.55;
  }

  .section-label {
    margin: 0 0 0.35rem;
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }

  .section-desc {
    margin: 0 0 0.85rem;
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }

  th,
  td {
    border: 1px solid #e2e8f0;
    padding: 0.4rem 0.45rem;
    text-align: center;
  }

  th {
    background: #f8fafc;
    font-weight: 700;
    color: #334155;
  }

  td {
    color: #0f172a;
  }

  .footnote {
    margin: 0.55rem 0 0;
    font-size: 11px;
    color: #94a3b8;
  }
`;

export default S;
