import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Step1 } from '../../assets/resource/icons/step1.svg';
import { ReactComponent as Step2 } from '../../assets/resource/icons/step2.svg';
import { ReactComponent as Step3 } from '../../assets/resource/icons/step3.svg';
import { ReactComponent as Download } from '../../assets/resource/icons/download.svg';
import S from './GuideContents.styled';
import CodeBlock from './CodeBlock';
import GuideMockSampleCriteria from './mocks/GuideMockSampleCriteria';
import GuideMockProgressExplain from './mocks/GuideMockProgressExplain';
import GuideMockSubmitDetail from './mocks/GuideMockSubmitDetail';
import GuideMockReport from './mocks/GuideMockReport';
import {
  CODE_1,
  CODE_2,
  CODE_3,
  getSubmitGuideToc,
  getSubmitRuntimeInfo,
} from '../../assets/data/guide';
import SubmitGuideSidebar from './SubmitGuideSidebar';
import { Link } from 'react-router-dom';
import ParamsTable from './ParamsTable';
import { useI18n } from '../../assets/i18n';
import {
  REPORT_ANALYSIS_METHOD_INTRO_KO,
  REPORT_ANALYSIS_METHOD_INTRO_EN,
  REPORT_SAMPLING_PROTOCOL_SUMMARY_KO,
  REPORT_SAMPLING_PROTOCOL_SUMMARY_EN,
  buildReportAdultProtocolKo,
  buildReportAdultProtocolEn,
  buildReportPediatricProtocolKo,
  buildReportPediatricProtocolEn,
  buildReportSampleSizeSectionKo,
  buildReportSampleSizeSectionEn,
} from '../../assets/data/ageCohort';

const guideListStyle = {
  paddingLeft: '20px',
  marginTop: '10px',
  color: '#666',
  listStylePosition: 'inside',
  textAlign: 'left',
  listStyle: 'none',
};

const SubmitGuideContents = () => {
  const { tf } = useI18n();
  const [showTopBtn, setShowTopBtn] = useState(false);

  // downloadCSV 함수 추가
  const downloadCSV = (fileType) => {
    const fileUrl = `/parameter/${fileType}_params.csv`;

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `${fileType}_params.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toc = getSubmitGuideToc(tf);
  const runtime = getSubmitRuntimeInfo();

  const scrollToTop = useCallback(() => {
    const landing = document.querySelector('.submit-guide-landing');
    const scrollParent = (() => {
      let parent = landing?.parentElement;
      while (parent) {
        const { overflowY } = window.getComputedStyle(parent);
        if (
          (overflowY === 'auto' ||
            overflowY === 'scroll' ||
            overflowY === 'overlay') &&
          parent.scrollHeight > parent.clientHeight
        ) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    })();

    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const landing = document.querySelector('.submit-guide-landing');
    let scrollTarget = window;
    let parent = landing?.parentElement;
    while (parent) {
      const { overflowY } = window.getComputedStyle(parent);
      if (
        (overflowY === 'auto' ||
          overflowY === 'scroll' ||
          overflowY === 'overlay') &&
        parent.scrollHeight > parent.clientHeight
      ) {
        scrollTarget = parent;
        break;
      }
      parent = parent.parentElement;
    }

    const onScroll = () => {
      const y =
        scrollTarget === window
          ? window.scrollY || document.documentElement.scrollTop
          : scrollTarget.scrollTop;
      setShowTopBtn(y > 320);
    };

    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scrollTarget.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <S.SubmitGuideLayout>
      <SubmitGuideSidebar toc={toc} />
      <div className="submit-guide-main">
    <S.Container className='submit-guide-container'>
      <section className='submit-guide-landing'>
        <h2 className='submit-guide-title'>{tf('제출 가이드','Submission Guide')}</h2>
        <div className='submit-guide-step-wrap'>
          <div className='submit-guide-step'>
            <div className='step-indicator'>1</div>
            <div
              className='step-wrap'
              onClick={() =>
                document
                  .getElementById('step1')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              <div className='step-icon'>
                <Step1 />
              </div>
              <h3 className='step-title'>{tf('정보 입력 및 파일 업로드','Enter Info & Upload Files')}</h3>
              <p className='step-desc'>
                {tf('분석에 필요한 정보를 입력하고, 파일 업로드 규칙에 따라 분석에 필요한 파일을 업로드합니다.','Enter your submission details and follow the upload rules to submit all required files for analysis.')} 
              </p>
            </div>
          </div>
          <div className='submit-guide-step'>
            <div className='step-indicator'>2</div>
            <div
              className='step-wrap'
              onClick={() =>
                document
                  .getElementById('step2')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              <div className='step-icon'>
                <Step2 />
              </div>
              <h3 className='step-title'>{tf('분석 진행 상태 확인','Monitor Analysis Progress')}</h3>
              <p className='step-desc'>
                {tf('파일 업로드 이후, 제출이 완료되면 분석 진행 상태를 실시간으로 확인합니다.','After uploading and completing submission,the analysis progress can be monitored in real time.')} 
              </p>
            </div>
          </div>
          <div className='submit-guide-step'>
            <div className='step-indicator'>3</div>
            <div
              className='step-wrap'
              onClick={() =>
                document
                  .getElementById('step3')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              <div className='step-icon'>
                <Step3 />
              </div>
              <h3 className='step-title'>{tf('성능 분석 리포트 확인','View Performance Report')}</h3>
              <p className='step-desc'>
                {tf('분석이 완료되면, 성능 분석 리포트를 통해 ','Once analysis is complete, the performance report')}
                {tf('알고리즘 평가 결과를','with evaluation results')} {tf('확인할 수 있습니다.','will be available.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className='section-break-line'></div>
      <section className='step-one-section' id='step1'>
        <h3 className='step-section-title'>{tf('1. 정보 입력 및 파일 업로드','1. Enter Info & Upload Files')}</h3>
        <div className='part-one' id='step1-1'>
          <h4 className='part-title'>{tf('(1) 기본 정보 입력','(1) Enter Basic Info')}</h4>
          <div className='part-step'>
            <div className='part-wrap current'>
              <div className='part-indicator'>1</div>
              <div className='part-text'>{tf('기본 정보 입력','Enter Basic Info')}</div>
            </div>
            <div className='part-wrap'>
              <div className='part-indicator'>2</div>
              <div className='part-text'>{tf('파일 업로드','Upload Files')}</div>
            </div>
            <div className='part-wrap'>
              <div className='part-indicator'>3</div>
              <div className='part-text'>{tf('평가 기준 설정','Set Evaluation Criteria')}</div>
            </div>
          </div>
          <p className='part-desc'>
            {tf('기본 정보 입력 페이지는 ','This page lets you enter ')}<strong>{tf('제출명','Submission Title')}</strong>{''}
            {tf('과 ','and ')}
            <strong>{tf('제출설명','Submission Description')}</strong>{tf('을 입력하는 페이지입니다.','.')}
            <br />
            {tf('여러 번 제출하고자 할 경우, 제출명을 반드시 구분하여 입력해야합니다.','If you submit multiple times, make sure to use different titles for each submission.')}
          </p>
        </div>
        <div className='part-two' id='step1-2'>
          <h4 className='part-title'>{tf('(2) 파일 업로드','(2) Upload Files')}</h4>
          <div className='part-step half'>
            <div className='part-wrap'>
              <div className='part-indicator fill'>1</div>
              <div className='part-text'>{tf('기본 정보 입력','Enter Basic Info')}</div>
            </div>
            <div className='part-wrap current'>
              <div className='part-indicator'>2</div>
              <div className='part-text'>{tf('파일 업로드','Upload Files')}</div>
            </div>
            <div className='part-wrap'>
              <div className='part-indicator'>3</div>
              <div className='part-text'>{tf('평가 기준 설정','Set Evaluation Criteria')}</div>
            </div>
          </div>
          <p className='part-desc'>
            {tf('제출에 필요한 파일을 업로드하는 페이지입니다.','Upload the necessary files for submission here.')} <br />
            {tf('필수 제출 파일에는 ','Required files include ')}<strong>main.py</strong>,{' '}
            <strong>requirements.txt</strong>{tf(' 파일이 있습니다.','.')}          
          </p>
          <div className='margin'></div>
          <div className='file-info-wrap' id='step1-2-main-py'>
            <strong className='file-info-title'>
              <span className='file-name one'>main.py</span>
              <span className='file-required'>{tf('* 필수','* Required')}</span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap'>
                <p className='line'>
                  {tf('이 파일은 사용자의 수면 분석 알고리즘을 포함하는 파일로, 시스템이 이를 호출하여 평가를 진행합니다.','This file contains your sleep analysis algorithm, which the system invokes to run the evaluation.')}
                </p>
                <p className='line'>
                  {tf('파일의 이름은 반드시 ','The file name must be ')}<strong className='bold'>main.py</strong>
                  {tf('로 제출하여야합니다.','.')}                
                </p>
                <p className='line'>
                  {tf('함수 내 사용되는 ','The ')}
                  <strong className='bold'>{tf('입력, 출력 파라미터','input and output parameters')}</strong>
                  {tf('는 반드시 아래에 참조되어있는 명칭으로 변경하여 제출하여야합니다.',' must use the names referenced below.')}
                </p>
              </div>
              <div className='line-wrap'>
                <div className='params-header'>
                  <p className='line'>{tf('입력 파라미터: Biosignal','Input Parameters: Biosignal')}</p>
                  <button
                    className='download-button'
                    onClick={() => downloadCSV('input')}
                  >
                    <span className='text'>{tf('파일 다운로드','Download File')}</span>
                    <span className='icon'>
                      <Download />
                    </span>
                  </button>
                </div>
                <ParamsTable type='input' />
              </div>
              <div className='line-wrap'>
                <div className='params-header'>
                  <p className='line'>
                    {tf('출력 파라미터: Sleep Analysis Parameter','Output Parameters: Sleep Analysis Parameters')}
                  </p>
                  <button
                    className='download-button'
                    onClick={() => downloadCSV('output')}
                  >
                    <span className='text'>{tf('파일 다운로드','Download File')}</span>
                    <span className='icon'>
                      <Download />
                    </span>
                  </button>
                </div>
                <ParamsTable type='output' />
              </div>
              <div className='line-wrap'>
                <p className='line'>
                  {tf(
                    '입력 파라미터는 위 표에 명시된 샘플링 레이트를 기준으로 제공됩니다. 각 파라미터는 Python ',
                    'Input parameters are provided according to the sampling rates listed in the tables above. Each parameter is passed as a Python '
                  )}
                  <code className='inline-code'>numpy.ndarray</code>
                  {tf(' ', ' ')}
                  <code className='inline-code'>(N,)</code>
                  {tf(
                    ' 형태의 1차원 배열로 전달됩니다.',
                    ' Each is a one-dimensional ndarray with that shape.'
                  )}
                </p>
              </div>
              <div className='line-wrap'>
                <p className='line'>
                  {tf('main.py 내에서 다른 파일에 접근할 때에는','When accessing other files from main.py, you must use')}
                  <strong className='bold'> {tf('상대 경로','relative paths')}</strong>
                  {tf('를 사용해야 합니다. 같은 디렉토리에 있는 파일을 로드하려면 아래와 같이 작성할 수 있습니다.','. For files in the same directory, you can write as follows:')}
                </p>
              </div>
              <CodeBlock code={CODE_1} />
              <div className='margin'></div>
              <div className='line-wrap'>
                <p className='line'>
                  {tf('main.py 내에서 마지막에는 반드시','At the end of main.py, you must include the')}
                  <strong className='bold'> {tf('아래와 같은 코드 블록','following code block')}</strong>
                  {tf('이 포함되어야 합니다.','.')}
                </p>
              </div>
              <CodeBlock code={CODE_2} />
            </div>
          </div>
          <div className='file-info-wrap' id='step1-2-requirements'>
            <strong className='file-info-title'>
              <span className='file-name two'>requirements.txt</span>
              <span className='file-required'>{tf('* 필수','* Required')}</span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap'>
                <p className='line'>
                  {tf('이 파일은 가상환경 내에서 필요한','This file is used to')}
                  <strong> {tf('라이브러리를 설치','install libraries')}</strong>
                  {tf('하는데 사용합니다.','. in your virtual environment.')}
                </p>
                <p className='line'>
                  {tf('라이브러리 설치 파일은 아래와 같이 작성할 수 있습니다.','You can write the installation file as follows:')}
                </p>
              </div>
              <CodeBlock code={CODE_3} />
            </div>
          </div>
          <div className='file-info-wrap' id='step1-2-other'>
            <strong className='file-info-title'>
              <span className='file-name three'>{tf('기타 파일','Other Files')}</span>
              <span className='file-required none'>{tf('(선택)','(Optional)')}</span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line'>
                  {tf('이 파일은 모델 가중치, 전처리 모듈 등 main.py 실행에 필요한 다양한 파일들입니다.','These are files required for running main.py, such as model weights or preprocessing modules.')}
                </p>
                <p className='line'>
                  {tf('main.py에서 ','From main.py, load them using ')}<strong>{tf('상대 경로','relative paths')}</strong>{tf('로 불러와야 합니다.','.')}
                </p>
              </div>
            </div>
          </div>
          <div className='file-info-wrap' id='step1-2-runtime'>
            <strong className='file-info-title'>
              <span className='file-name four'>
                {tf('제출 코드 실행 환경', 'Runtime Environment')}
              </span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line'>
                  {tf(
                    '제출한 알고리즘은 아래와 같은 환경에서 실행됩니다. 로컬 개발 시 가능한 한 동일한 버전을 맞추는 것을 권장합니다.',
                    'Submitted algorithms run in the following environment. For local development, matching these versions is recommended.'
                  )}
                </p>
                <p className='line'>
                  {tf('Python', 'Python')}:{' '}
                  <code className='inline-code'>{runtime.pythonVersion}</code>
                </p>
                <p className='line'>
                  {tf('CUDA', 'CUDA')}:{' '}
                  {runtime.cudaVersion ? (
                    <code className='inline-code'>{runtime.cudaVersion}</code>
                  ) : (
                    <span>
                      {tf(
                        '(배포·운영 환경에 따라 별도 공지)',
                        '(Version announced per deployment)'
                      )}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='part-three' id='step1-3'>
          <h4 className='part-title'>{tf('(3) 평가 기준 설정','(3) Set Evaluation Criteria')}</h4>
          <div className='part-step full'>
            <div className='part-wrap'>
              <div className='part-indicator fill'>1</div>
              <div className='part-text'>{tf('기본 정보 입력','Enter Basic Info')}</div>
            </div>
            <div className='part-wrap'>
              <div className='part-indicator fill'>2</div>
              <div className='part-text'>{tf('파일 업로드','Upload Files')}</div>
            </div>
            <div className='part-wrap current'>
              <div className='part-indicator'>3</div>
              <div className='part-text'>{tf('평가 기준 설정','Set Evaluation Criteria')}</div>
            </div>
          </div>

          <p className='part-desc'>
            {tf('평가 기준 설정 페이지는', 'The Set Evaluation Criteria page is where you enter')}
            <br />
            <strong>{tf('수면 분석 알고리즘의 성능 평가', 'performance evaluation of sleep analysis algorithms')}</strong>
            {tf('에 사용할', ', and specify')}
            <br />
            <strong>{tf('테스트 데이터 샘플링 기준 정보', 'test data sampling criteria')}</strong>
            {tf('를 입력하는 페이지입니다.', ' for evaluation.')}
            <br /><br />
            {tf('사용자는 원하는 ', 'Users select the desired ')}
            <strong>{tf('분석 대상 연령군', 'age group for analysis')}</strong>
            {tf('을 선택하고,', ',')}
            <br />
            <strong>{tf('샘플 수 계산 기준', 'sample size calculation criteria')}</strong>
            {tf('과 ', ' and ')}
            <strong>{tf('서브그룹 분석 기준', 'subgroup analysis criteria')}</strong>
            {tf('을 설정합니다.', '.')}
            <br /><br />
            {tf('테스트 데이터는 전체 데이터베이스에서 추출하며,', 'Test data is extracted from the entire database,')}
            <br />
            <strong>{tf('층화 무작위 추출(Stratified Random Sampling)', 'Stratified Random Sampling')}</strong>
            {tf('을 적용합니다.', ' is applied.')}
            <br /><br />
            {tf(
              '분석 결과는 샘플링된 전체 테스트 세트 기준으로 확인할 수 있으며,',
              'Analysis results can be viewed for the entire sampled test set,'
            )}
            <br />
            {tf('사용자가 설정한 ', 'and ')}
            <strong>{tf('서브그룹별 결과', 'results by user-defined subgroups')}</strong>
            {tf('도 함께 확인할 수 있습니다.', ' are also available.')}
            <br /><br />
            {tf('연구자는 연구 목적에 따라', 'According to study objectives, researchers may choose')}
            <br />
            <strong>{tf('자동 산출 모드', 'Auto Mode')}</strong>
            {tf(' 또는 ', ' or ')}
            <strong>{tf('사용자 지정 모드', 'Manual Mode')}</strong>
            {tf(' 중 하나를 선택하여', ' to determine')}
            <br />
            <strong>{tf('목표 표본 수(N)', 'the target sample size (N)')}</strong>
            {tf('를 결정할 수 있습니다.', '.')}
          </p>

          <div className='margin'></div>
          <div className='guide-note'>
            <p>
              {tf(
                REPORT_ANALYSIS_METHOD_INTRO_KO.split('\n')[0],
                REPORT_ANALYSIS_METHOD_INTRO_EN.split('\n')[0]
              )}
            </p>
            <p>
              {tf(
                REPORT_ANALYSIS_METHOD_INTRO_KO.split('\n')[1],
                REPORT_ANALYSIS_METHOD_INTRO_EN.split('\n').slice(1).join(' ')
              )}
            </p>
          </div>
          <div className='file-info-wrap' id='step1-3-protocol'>
            <strong className='file-info-title'>
              <span className='file-name one'>
                {tf('1. 테스트 데이터 샘플링 및 서브그룹 분석 프로토콜', '1. Test Data Sampling and Subgroup Analysis Protocol')}
              </span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line'>
                  {tf(REPORT_SAMPLING_PROTOCOL_SUMMARY_KO, REPORT_SAMPLING_PROTOCOL_SUMMARY_EN)}
                </p>
              </div>
            </div>
          </div>

          <div className='file-info-wrap'>
            <strong className='file-info-title'>
              <span className='file-name two'>
                {tf('1-1. 성인군', '1-1. Adult group')}
              </span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line' style={{ whiteSpace: 'pre-line' }}>
                  {tf(buildReportAdultProtocolKo(), buildReportAdultProtocolEn())}
                </p>
              </div>
            </div>
          </div>

          <div className='file-info-wrap'>
            <strong className='file-info-title'>
              <span className='file-name three'>
                {tf('1-2. 소아·청소년군', '1-2. Pediatric and adolescent group')}
              </span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line' style={{ whiteSpace: 'pre-line' }}>
                  {tf(buildReportPediatricProtocolKo(), buildReportPediatricProtocolEn())}
                </p>
              </div>
            </div>
          </div>

          <div className='file-info-wrap' id='step1-3-sample-size'>
            <strong className='file-info-title'>
              <span className='file-name four'>{tf('2. 테스트 데이터 샘플 수 산정 방법', '2. Test Data Sample Size Calculation Method')}</span>
            </strong>
            <div className='file-info-contents'>
              <div className='line-wrap no-margin'>
                <p className='line' style={{ whiteSpace: 'pre-line' }}>
                  {tf(buildReportSampleSizeSectionKo(), buildReportSampleSizeSectionEn())}
                </p>
              </div>

              <div className='margin' style={{ borderTop: '1px solid #eee', margin: '20px 0' }}></div>

              <p className='guide-subheading'>
                {tf('A. 비열등성 기반 자동 샘플링 (Auto Mode)', 'A. Auto (Non-inferiority based)')}
              </p>
              <div className='line-wrap no-margin'>
                <p className='line'>
                  {tf('비열등성 검정 프레임워크를 기반으로 통계적으로 유효한 최소 표본 수를 산출합니다.', 'Calculates the statistically valid minimum sample size based on a non-inferiority testing framework.')}
                </p>
                <p className='line'>
                   {tf('분석에 필요한 샘플 수는 아래의 수식을 통해 계산됩니다.', 'The required sample size is computed using the following formula:')}
                </p>
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                  <div style={{ padding: '20px 0', textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
                    <span style={{ verticalAlign: 'middle' }}>n = </span>
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center' }}>
                      <div style={{ padding: '0 10px', fontSize: '1.5rem' }}>(</div>
                    </span>
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center' }}>
                      <div style={{ borderBottom: '1px solid #333', padding: '0 5px' }}>
                        (Z<sub>1-α</sub> + Z<sub>1-β</sub>) · σ<sub>diff</sub>
                      </div>
                      <div style={{ padding: '0 5px' }}>Δ</div>
                    </span>
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center' }}>
                      <div style={{ padding: '0 10px', fontSize: '1.5rem' }}>)</div>
                    </span>
                    <sup style={{ fontSize: '0.9rem', verticalAlign: 'super' }}>2</sup>
                  </div>
                </div>
                <p className='line'>
                   {tf('사용자가 입력 가능한 항목은 다음과 같으며, 임상적 표준을 반영한 권장 프리셋을 참조하거나 개별 연구 목적에 맞춰 세부 수치를 직접 설정할 수 있습니다.', 'Users can set parameters using presets or custom values:')}
                </p>
                
                <ul style={{ paddingLeft: '20px', marginTop: '10px', color: '#666', listStylePosition: 'inside', textAlign: 'left', listStyle: 'none' }}>
                  <li className='line' style={{ marginBottom: '8px' }}>
                    {tf('기준 수면 분석 파라미터 (주 파라미터)', 'Primary Parameter')}: {tf('성능 평가의 기준이 될 하나의 파라미터를 선택합니다. 이 지표에 따라 σ와 Δ의 단위가 결정됩니다.', 'Select the core metric for evaluation, which determines the units for σ and Δ.')}
                  </li>
                  <li className='line' style={{ marginBottom: '8px' }}>
                    {tf('허용 오차 비율 (α, 유의수준)', 'Alpha (Significance Level)')}: {tf('차이가 우연인지 판단하는 기준으로 값이 작을수록 엄격합니다. (통상 0.025 또는 0.05)', 'Smaller values mean stricter judgment. (Typically 0.025 or 0.05)')}
                  </li>
                  <li className='line' style={{ marginBottom: '8px' }}>
                    {tf('평가 신뢰 수준 (1-β, 검정력)', 'Power')}: {tf('성능이 기준 이상일 때 이를 놓치지 않고 발견할 확률입니다. (통상 0.8 또는 0.9)', 'Probability of detecting performance above the threshold. (Typically 0.8 or 0.9)')}
                  </li>
                  <li className='line' style={{ marginBottom: '8px' }}>
                    {tf('오차 표준편차 (σ)', 'Sigma')}: {tf('예측값과 정답 간 차이의 표준편차로 값이 클수록 요구 샘플 수가 증가합니다.', 'Standard deviation of errors; larger values increase required sample size.')}
                  </li>
                  <li className='line' style={{ marginBottom: '0' }}>
                    {tf('허용 가능한 최대 오차 (Δ, 비열등성 마진)', 'Delta (Margin)')}: {tf('임상적으로 허용 가능한 최대 차이 범위입니다. (예: AHI 예측 시 Δ=5)', 'Maximum clinically acceptable difference. (e.g., Δ=5 for AHI)')}
                  </li>
                </ul>
                
              </div>

              {/* B. Manual Mode */}
              <p className='guide-subheading'>
                {tf('B. 직접 샘플 수 입력 (Manual Mode)', 'B. Manual Mode')}
              </p>
              <div className='line-wrap no-margin'>
                <p className='line'>
                  {tf('연구 설계나 특정 목적에 따라 분석에 필요한 목표 표본 수를 사용자가 직접 지정합니다.', 'Users manually specify the target sample size based on study design.')}
                </p>
              </div>
            </div>
          </div>

          <div className='margin'></div>
          <div className='part-image-wrap guide-ui-mock-wrap'>
            <GuideMockSampleCriteria />
          </div>
        </div>
      </section>
      <div className='section-break-line'></div>
      <section className='step-two-section' id='step2'>
        <h3 className='step-section-title'>{tf('2. 분석 진행 상태 확인','2. Monitor Analysis Progress')}</h3>
        <div className='line-wrap'>
          <p className='line plain'>
            {tf('파일 업로드가 완료되면 ','Once file uploads are complete, you can check ')}<strong className='bold'>{tf('분석 진행 ','analysis progress ')}</strong>
            {tf('상태를 실시간으로 확인할 수 있습니다.','in real time.')}
          </p>
          <p className='line plain'>
            <strong className='bold'>{tf(' 진행 상태 로그',' Progress logs')}</strong>{tf('는 아래와 같이 표시됩니다.',' are displayed as follows.')}
          </p>
        </div>
        <div className='part-image-wrap guide-ui-mock-wrap'>
          <GuideMockProgressExplain />
        </div>
      </section>
      <div className='section-break-line'></div>
      <section className='step-three-section' id='step3'>
        <h3 className='step-section-title'>{tf('3. 성능 분석 리포트 확인','3. View Performance Report')}</h3>
        <div className='line-wrap'>
          <p className='line'>
            {tf('분석이 완료되면, ','When analysis is complete, the ')}<strong className='bold'>{tf('분석 결과 버튼','View Result button')}</strong>
            {tf('이 활성화 됩니다.',' is enabled.')}
          </p>
          <p className='line'>
            {tf('분석 결과 버튼을 클릭하면','Clicking the result button moves to the ')}
            <strong className='bold'>{tf(' 리포트 페이지',' Report page')}</strong>{tf('로 이동하며 ',' and you can save as ')}
            <strong className='bold'>PDF</strong>{tf(' 형태로 파일을 저장할 수 있습니다.','.')}
          </p>
        </div>
        <div className='screen-image-wrap one guide-ui-mock-wrap'>
          <GuideMockSubmitDetail />
          <p className='image-desc'>[{tf('제출 상세보기','Submission detail')}]</p>
        </div>
        <div className='screen-image-wrap two guide-ui-mock-wrap'>
          <GuideMockReport />
          <p className='image-desc'>[{tf('성능 분석 리포트 페이지','Performance report page')}]</p>
        </div>
      </section>
      {/* Bottom Bar */}
      <S.BottomLinkBar>
        <div className='contents-wrap'>
          <Link to='/submit/details' className='bottom-link'>
            {tf('제출하기', 'Submit')}
          </Link>
        </div>
      </S.BottomLinkBar>
    </S.Container>
      </div>
      {showTopBtn && (
        <button
          type="button"
          className="guide-top-btn"
          onClick={scrollToTop}
          aria-label={tf('맨 위로', 'Back to top')}
          title={tf('맨 위로', 'Back to top')}
        >
          <span className="guide-top-arrow" aria-hidden="true">
            ▲
          </span>
          <span className="guide-top-label">TOP</span>
        </button>
      )}
    </S.SubmitGuideLayout>
  );
};

export default SubmitGuideContents;
