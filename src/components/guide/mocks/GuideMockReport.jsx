import React, { useEffect, useState } from "react";
import S from "./GuideMock.styled";
import { useI18n } from "../../../assets/i18n";

const GuideMockReport = () => {
  const { tf } = useI18n();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return undefined;
    const t = setTimeout(() => setShowToast(false), 2600);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <S.Frame>
      <S.ReportMock>
        <div className="report-bar">
          <button type="button" className="bar-btn back">
            {tf("뒤로", "Back")}
          </button>
          <div className="page-nav">{"< 2 / 4 >"}</div>
          <button
            type="button"
            className="bar-btn save guide-highlight-btn"
            onClick={() => setShowToast(true)}
          >
            ↓ {tf("PDF 저장", "Save PDF")}
          </button>
          {showToast && (
            <div className="download-toast" role="status">
              <span className="toast-icon">PDF</span>
              <div>
                <div className="toast-name">report_name_example.pdf</div>
                <div className="toast-meta">
                  12.0KB • {tf("완료", "Complete")}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="report-body">
          <div className="paper">
            <div className="paper-head">
              <div className="logo-text">
                Digital Medicine Laboratory
                <br />@ AMC
              </div>
              <h3 className="paper-title">{tf("리포트", "Report")}</h3>
              <div className="meta-right">
                <div>
                  {tf("제출 번호", "Submission No.")}: S241031001
                </div>
                <div>
                  {tf("제출 일시", "Submission Date")}: 2024/10/31 10:05 AM
                </div>
                <div>
                  {tf("발급 일시", "Issue Date")}: 2024/10/31 10:17 AM
                </div>
              </div>
            </div>

            <p className="section-label">
              {tf("파라미터 결과", "Parameter Results")}
            </p>
            <p className="section-desc">
              {tf(
                "이 표는 MAE, RMSE, R, R², t-검정 P-value 등 주요 성능 지표 결과를 포함합니다.",
                "This table includes key metrics such as MAE, RMSE, R, R², and t-test P-value."
              )}
            </p>

            <table>
              <thead>
                <tr>
                  <th>{tf("지표", "Metric")}</th>
                  <th>BMI ≥ 30</th>
                  <th>BMI &lt; 30</th>
                  <th>AGE ≥ 18</th>
                  <th>AGE &lt; 18</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RMSE</td>
                  <td>12.481</td>
                  <td>10.204</td>
                  <td>11.392</td>
                  <td>9.845</td>
                </tr>
                <tr>
                  <td>R²</td>
                  <td>0.612</td>
                  <td>0.701</td>
                  <td>0.658</td>
                  <td>0.722</td>
                </tr>
                <tr>
                  <td>t-test</td>
                  <td>0.031*</td>
                  <td>0.142</td>
                  <td>0.048*</td>
                  <td>0.211</td>
                </tr>
              </tbody>
            </table>
            <p className="footnote">*: p &lt; 0.05</p>
          </div>
        </div>
      </S.ReportMock>
    </S.Frame>
  );
};

export default GuideMockReport;
