import React from "react";
import S from "./GuideContents.styled";
import { useI18n } from "../../assets/i18n";

function ResultGuideContents() {
  const { tf } = useI18n();
  return (
    <S.Container className="result-guide-container">
      <section className="section" id="status">
        <h3 className="title">{tf('분석 상태 확인','Check Analysis Status')}</h3>
        <div className="about-wrap">
          <p className="about">
            {tf('제출이 완료되면, 표에서 사용자가 제출한 항목을 클릭하여 알고리즘/모델의 분석 진행 상황을 확인할 수 있습니다.','When submission is complete, click your item in the table to check the analysis progress of your algorithm/model.')}
          </p>
          <p className="about">
            {tf('분석 진행 상태는 총 4단계로 구성되어 있으며, 각 단계에서의 세부 로그를 확인할 수 있습니다.','Analysis progress consists of 4 stages, and detailed logs for each stage can be viewed.')}
          </p>
          <p className="main-title">{tf('□ 분석 진행 상태 단계','□ Analysis Progress Stages')}</p>
          <p className="sub-title">{tf('1) 테스트 시작','1) Start Test')}</p>
          <p className="indent">{tf('1-1) 제출 파일 확인','1-1) Verify submitted files')}</p>
          <p className="indent">{tf('1-2) 입력·출력 파라미터 확인','1-2) Verify input/output parameters')}</p>
          <p className="sub-title">{tf('2) 데이터 준비','2) Prepare Data')}</p>
          <p className="indent">{tf('2-1) 데이터 샘플링','2-1) Data sampling')}</p>
          <p className="indent">{tf('2-2) EDF 데이터 전처리','2-2) EDF data preprocessing')}</p>
          <p className="sub-title">{tf('3) 사용자 알고리즘 수행','3) Run user algorithm')}</p>
          <p className="sub-title">{tf('4) 성능 분석','4) Performance analysis')}</p>

          <p className="about">
            {tf('에러 발생 시 "View Error Log" 버튼이 출력되며, 성능 분석이 완료되면 "View Analysis Result" 버튼이 화면에 출력됩니다.','If an error occurs, a "View Error Log" button appears; once performance analysis completes, a "View Analysis Result" button is shown.')}
          </p>
        </div>
      </section>
      <section className="section" id="results">
        <h3 className="title">{tf('성능 결과 확인','Check Performance Results')}</h3>
        <div className="about-wrap">
          <p className="about">
            {tf('"View Analysis Result" 버튼을 누르면, 분석 결과를 확인할 수 있습니다.','Press "View Analysis Result" to view the analysis results.')}
          </p>
          <p className="main-title">{tf('□ 리포트 포함 내용','□ Contents of the report')}</p>
          <p className="about">{tf('1) 제출 시간','1) Submission time')}</p>
          <p className="about">{tf('2) 리포트 생성 시간','2) Report generation time')}</p>
          <p className="about">{tf('3) 사용된 샘플 수','3) Number of samples used')}</p>
          <p className="about">{tf('4) 알고리즘/모델 정보','4) Algorithm/Model information')}</p>
          <p className="about">{tf('5) 수면 분석 파라미터 분석 결과','5) Sleep analysis parameter results')}</p>
        </div>
      </section>
    </S.Container>
  );
}

export default ResultGuideContents;
