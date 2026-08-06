import S from './AboutContents.styled';
import { useI18n } from '../../assets/i18n';
import { PLATFORM, brandedName, datasetCountLabel } from '../../config/platform';

const AboutContents = () => {
  const { language, tf } = useI18n();
  const countLabel = datasetCountLabel(language);
  const brand = brandedName();
  return (
    <S.Container>
      <h2 className='about-title'>{tf('소개','About')}</h2>
      <div className='about-introduction'>   
        <div className='about-paragraph'>
          <p className='line'>
            <strong className='point'>
              {brand}
            </strong>
            {tf('는', ' is an algorithm evaluation platform')}
          </p>
          <p className='line'>
            {tf(
              `${countLabel}의 수면다원검사 및 임상 데이터를 통합한`,
              'built on an integrated database'
            )}
          </p>
          <p className='line'>
            {tf(
              '데이터베이스를 바탕으로 구축된 알고리즘 검증 플랫폼입니다.',
              `of ${countLabel} polysomnography and clinical datasets.`
            )}
          </p>
        </div>

        <div className='about-paragraph'>
          <p className='line'>
            {tf('연구자가 개발한 수면 분석 모델이나 알고리즘을 제출하면,', 'When researchers submit their sleep analysis models or algorithms,')}
          </p>
          <p className='line'>
            {tf('플랫폼 내 대규모 데이터를 통해 성능을 분석하고 그 결과를 리포트 형태로 제공합니다.', 'it analyzes performance using large-scale data and provides a detailed report.')}
          </p>
        </div>

        <div className='about-paragraph'>
          <p className='line'>
            {tf(
              `${PLATFORM.shortName}는 연구자들에게 객관적인 검증 환경을 제공하여`,
              `${PLATFORM.shortName} aims to contribute to the advancement of sleep research`
            )}
          </p>
          <p className='line'>
            {tf('수면 연구의 질적 향상과 기술적 발전에 기여하고자 합니다.', 'by providing an objective validation environment for researchers.')}
          </p>
        </div>
        <div className='about-paragraph'>
          <p className='line'>
            {tf(
              `수면 연구의 표준을 제시하는 ${PLATFORM.shortName}에서 여러분의 연구 가치를 증명해 보시기 바랍니다.`,
              `Demonstrate your research value with ${PLATFORM.shortName}, the emerging standard for sleep research.`
            )}
          </p>
        </div>
      </div>

      <div className='about-acknowledgement'>
        <div className='desc-wrap'>
          <p className='desc'>
            {tf('본 연구는 2023년 식품의약품안전처 지원을 받아 수행하였음.','This work was supported by the Ministry of Food and Drug Safety, Republic of Korea. ')}
          </p>
          <span className='number'>(No. RS-2023-00215716).</span>
        </div>
      </div>
    </S.Container>
  );
};

export default AboutContents;
