import React from "react";
import S from "./GuideMock.styled";
import { useI18n } from "../../../assets/i18n";

const GuideMockProgressExplain = () => {
  const { tf } = useI18n();

  const stages = [
    {
      className: "s1",
      title: tf("1) 데이터 전처리", "1) Data Preprocessing"),
      desc: tf("데이터 샘플링", "Data Sampling"),
    },
    {
      className: "s2",
      title: tf("2) 알고리즘 분석", "2) Algorithm Analysis"),
      desc: tf("제출 알고리즘 실행", "Run Submitted Algorithm"),
    },
    {
      className: "s3",
      title: tf("3) 성능 평가", "3) Performance Evaluation"),
      desc: tf(
        "알고리즘 평가 및 결과 리포트 생성",
        "Evaluate Algorithm, Generate Report"
      ),
    },
  ];

  const legends = [
    {
      tone: "progress",
      name: tf("진행중", "In Progress"),
      desc: tf(
        "알고리즘 분석(1-3단계) 진행중 상태",
        "Algorithm analysis (Steps 1–3) is in progress."
      ),
    },
    {
      tone: "done",
      name: tf("완료", "Completed"),
      desc: tf(
        "알고리즘 분석 및 성능 평가 완료 상태",
        "Algorithm analysis and evaluation are completed."
      ),
    },
    {
      tone: "error",
      name: tf("에러", "Error"),
      desc: tf(
        "분석 진행중에 에러가 발생하여 중단된 상태",
        "Error occurred and the process was stopped."
      ),
    },
  ];

  return (
    <S.Frame>
      <S.ProgressExplain>
        <div className="stage-flow">
          {stages.map((stage) => (
            <div key={stage.className} className={`stage-chip ${stage.className}`}>
              <p className="stage-title">{stage.title}</p>
              <p className="stage-desc">{stage.desc}</p>
            </div>
          ))}
        </div>

        <div className="progress-panel">
          <h4 className="panel-title">{tf("진행 로그", "Progress Log")}</h4>
          <div className="stage-row">
            <h5 className="step-title">
              <span className="step-badge">{tf("3단계", "Step 3")}</span>
              <span className="step-name guide-highlight">
                {tf("성능 평가", "Performance Evaluation")}
              </span>
            </h5>
            <span className="status-text guide-highlight">
              {tf("완료", "Completed")}
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" />
            <div className="progress-label">3 / 3</div>
          </div>
        </div>

        <div className="legend-list">
          {legends.map((item) => (
            <div className="legend-item" key={item.tone}>
              <span className={`dot ${item.tone}`} />
              <p>
                <span className="legend-name">{item.name}</span>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </S.ProgressExplain>
    </S.Frame>
  );
};

export default GuideMockProgressExplain;
