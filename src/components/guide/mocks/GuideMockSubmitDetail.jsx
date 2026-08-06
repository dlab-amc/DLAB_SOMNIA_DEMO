import React, { useState } from "react";
import S from "./GuideMock.styled";
import { useI18n } from "../../../assets/i18n";
import { ReactComponent as SubmitDoc } from "../../../assets/resource/icons/submit.svg";

const MOCK_DETAIL = {
  title: "test0",
  description: "test0",
  submitNum: "S250718027",
  submittedAt: "2025-07-18 17:47:07",
  files: [
    { name: "preprocessing.py", size: "0.451KB" },
    { name: "results_S250718027_fallback.json", size: "467.173KB" },
    { name: "bland_altman_plot_sleep_stage_5_bmi.png", size: "51.894KB" },
    { name: "requirements.txt", size: "0.163KB" },
    { name: "main.py", size: "1.394KB" },
  ],
};

const GuideMockSubmitDetail = () => {
  const { tf } = useI18n();
  const [showReportHint, setShowReportHint] = useState(false);

  return (
    <S.Frame>
      <div className="detail-outer">
        <S.DetailMock>
          <div className="detail-header">
            <button type="button" className="prev-button">
              {tf("목록 보기", "Back to List")}
            </button>
            <h3 className="detail-title">
              {tf("제출 상세보기", "Submission Detail")}
            </h3>
            <div className="result-wrap">
              <button
                type="button"
                className="result-button guide-highlight-btn"
                onClick={() => setShowReportHint(true)}
              >
                {tf("분석 결과", "Analysis Result")}
              </button>
            </div>
          </div>

          <div className="progress-card">
            <h4
              style={{
                margin: "0 0 0.75rem",
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
            >
              {tf("진행 로그", "Progress Log")}
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    padding: "0.2rem 0.55rem",
                    borderRadius: 6,
                    background: "#e8f4fd",
                    border: "1px solid #c5e3fa",
                    color: "#0b84df",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {tf("3단계", "Step 3")}
                </span>
                <span style={{ fontWeight: 600, color: "#334155" }}>
                  {tf("성능 평가", "Performance Evaluation")}
                </span>
              </div>
              <span style={{ color: "#4caf50", fontWeight: 700 }}>
                {tf("완료", "Completed")}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: 32,
                borderRadius: 10,
                background: "#94a3b8",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#4caf50",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  zIndex: 1,
                }}
              >
                3 / 3
              </div>
            </div>
          </div>

          <div className="info-card">
            {[
              [tf("제출명", "Title"), MOCK_DETAIL.title],
              [tf("제출 설명", "Description"), MOCK_DETAIL.description],
              [tf("제출 번호", "Submission No."), MOCK_DETAIL.submitNum],
              [tf("제출 일시", "Submitted At"), MOCK_DETAIL.submittedAt],
            ].map(([label, value]) => (
              <div className="info-row" key={label}>
                <span className="label">{label}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </div>

          <div className="files-card">
            <div className="files-head">
              <h4 className="files-title">
                {tf("제출 파일", "Submitted Files")}
              </h4>
              <span className="files-count">
                {MOCK_DETAIL.files.length}
                {tf("건", " Files")}
              </span>
            </div>
            {MOCK_DETAIL.files.map((file) => (
              <div className="file-row" key={file.name}>
                <span className="file-name">{file.name}</span>
                <div className="file-meta">
                  <span>{file.size}</span>
                  <button type="button" className="dl" aria-label="download">
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </S.DetailMock>

        {showReportHint && (
          <span className="report-hint" role="status">
            <SubmitDoc className="report-hint-svg" aria-hidden="true" />
            {tf("리포트", "Report")}
          </span>
        )}
      </div>
    </S.Frame>
  );
};

export default GuideMockSubmitDetail;
