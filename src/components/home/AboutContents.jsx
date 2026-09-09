import S from './AboutContents.styled';
import { useI18n } from '../../assets/i18n';
import { PLATFORM, brandedName, datasetCountLabel } from '../../config/platform';

const lines = (items) =>
  items.flatMap((item, i) => (i === 0 ? [item] : [<br key={`br-${i}`} />, item]));

const AboutContents = () => {
  const { language, tf } = useI18n();
  const countLabel = datasetCountLabel(language);
  const brand = brandedName();
  const isEn = language === 'en';

  return (
    <S.Container>
      <h2 className='about-title'>{tf('소개','About')}</h2>
      <div className='about-introduction'>
        <p className='about-paragraph'>
          {lines(
            isEn
              ? [
                  <strong key='brand' className='point'>{brand}</strong>,
                  `is an algorithm evaluation platform built on an integrated database of ${countLabel} polysomnography and clinical datasets.`,
                ]
              : [
                  <strong key='brand' className='point'>{brand}는</strong>,
                  `${countLabel}의 수면다원검사 및 임상 데이터를 통합한 데이터베이스를 바탕으로 구축된 알고리즘 검증 플랫폼입니다.`,
                ]
          )}
        </p>

        <p className='about-paragraph'>
          {lines(
            isEn
              ? [
                  'When researchers submit their sleep analysis models or algorithms,',
                  'it analyzes performance using large-scale data and provides a detailed report.',
                ]
              : [
                  '연구자가 개발한 수면 분석 모델이나 알고리즘을 제출하면,',
                  '플랫폼 내 대규모 데이터를 통해 성능을 분석하고 그 결과를 리포트 형태로 제공합니다.',
                ]
          )}
        </p>

        <p className='about-paragraph'>
          {lines(
            isEn
              ? [
                  `${PLATFORM.shortName} aims to contribute to the advancement of sleep research`,
                  'by providing an objective validation environment for researchers.',
                ]
              : [
                  `${PLATFORM.shortName}는 연구자들에게 객관적인 검증 환경을 제공하여`,
                  '수면 연구의 질적 향상과 기술적 발전에 기여하고자 합니다.',
                ]
          )}
        </p>

        <p className='about-paragraph'>
          {lines(
            isEn
              ? [
                  `Demonstrate your research value with ${PLATFORM.shortName},`,
                  'the emerging standard for sleep research.',
                ]
              : [
                  `수면 연구의 표준을 제시하는 ${PLATFORM.shortName}에서`,
                  '여러분의 연구 가치를 증명해 보시기 바랍니다.',
                ]
          )}
        </p>
      </div>

      <div className='about-acknowledgement'>
        <p className='desc'>
          {lines(
            isEn
              ? [
                  'This work was supported by the Ministry of Food and Drug Safety,',
                  'Republic of Korea.',
                ]
              : [
                  '본 연구는 2023년 식품의약품안전처 지원을 받아 수행하였음.',
                ]
          )}
          <br />
          <span className='number'>(No. RS-2023-00215716).</span>
        </p>
      </div>
    </S.Container>
  );
};

export default AboutContents;
