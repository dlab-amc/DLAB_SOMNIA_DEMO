import React from "react";
import S from "./GuideContents.styled";
import { useI18n } from "../../assets/i18n";
import { brandedName, datasetCountLabel } from "../../config/platform";

const ServiceOverviewContents = () => {
  const { language, tf } = useI18n();
  const countLabel = datasetCountLabel(language);
  const brand = brandedName();
  return (
    <S.Container className="service-overview-container">
      <section className="section" id="introduction">
        <h3 className="title">{tf('소개','Introduction')}</h3>
        <div className="about-wrap">
          <p className="about">
            {tf(
              `${brand}는 ${countLabel}의 수면다원검사와 임상정보로 구성된 데이터세트를 기반으로 개발된 프로그램입니다.`,
              `${brand} is built on ${countLabel} polysomnography tests and clinical datasets.`
            )}
          </p>
          <p className="about">
            {tf(
              '시뮬레이터 내 데이터 세트는 NSRR 등 공개 코호트 PSG 데이터를 활용하여 구축되었습니다. (ASAN/AMC 임상 데이터는 공개 스냅샷에 포함되지 않습니다.)',
              'Simulator datasets are built from open-cohort PSG data such as NSRR. (ASAN/AMC clinical data is not included in this public snapshot.)'
            )}
          </p>
          <p className="about">
            {tf('이 서비스는 대용량의 수면다원검사 데이터를 활용하여 개발된 알고리즘이나 모델을 제출하면, 시뮬레이터 내의 데이터를 통해 이를 검증하고 결과를 반환합니다.','When you submit an algorithm or model developed with large-scale PSG data, it is validated against simulator data and results are returned.')}
          </p>
          <p className="about">
            {tf('새로운 수면 분석 알고리즘이나 모델을 연구하고 개발하려는 연구자들에게 검증 환경을 제공합니다. 이러한 서비스를 통해 수면 연구 분야의 발전에 크게 기여할 것으로 기대합니다.','It provides a validation environment for researchers developing new sleep analysis algorithms or models, and is expected to contribute significantly to sleep research.')}
          </p>
          <p className="about">
            {tf('Data Agreement + 이 연구는 2023년 식품의약품안전처의 지원을 받아 수행된 연구입니다. (No. RS-2023-00215716)','Data Agreement +/ This work was supported by the Ministry of Food and Drug Safety, Republic of Korea (No. RS-2023-00215716).')}
          </p>
        </div>
      </section>
      <section id="parameter-description" className="section">
        <h3 className="title">{tf('파라미터 설명','Parameter Description')}</h3>
        <div className="about-wrap">
          <p className="about">
            {tf('입력은 EEG, ECG, ~ 등을 제공하고, 출력은 호흡, 등에 대해 평가됩니다.','Inputs may include EEG, ECG, etc., and outputs are evaluated for respiration and more.')}
          </p>
        </div>
      </section>
    </S.Container>
  );
};

export default ServiceOverviewContents;
