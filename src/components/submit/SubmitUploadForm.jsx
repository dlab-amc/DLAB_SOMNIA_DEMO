import React, { useCallback, useEffect, useRef, useState } from 'react';
import S from './SubmitUploadForm.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { Link } from 'react-router-dom';
import { listZipPathsFromArrayBuffer } from '../../utils/zipListPaths';
import {
  normalizeOutputVarList,
  formatValidationErrorDetail,
  resolveArchiveValidationMessage,
} from '../../utils/submitValidationMessages';
import {
  uploadFile,
  clearFiles,
  setValidationArchiveParams,
  setArchivePaths,
} from '../../stores/submit/submit.slice';
import {
  formatChannelLabelList,
  getInputChannelLabel,
  getOutputParameterLabel,
} from '../../assets/data/paramLabels';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import axios from 'axios';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import ProgressBar from '../common/ProgressBar';
import PrevNextBar from '../common/PrevNextBar';
import { useI18n } from '../../assets/i18n';
import { useSubmitPage } from '../../contexts/SubmitPageContext';
import { getLocalizedErrorMessage } from '../../assets/data/errorMessages';
import { isDemoMode } from '../../demo/isDemoMode';
import { createDemoZipFile } from '../../demo/autoFillSubmit';

/** 서버에서 받은 상대 경로 배열로 폴더/파일 트리 구조 생성 */
function buildPathTree(paths) {
  const root = { dirs: {}, files: [] };
  if (!Array.isArray(paths)) return root;
  for (const p of paths) {
    const parts = String(p).split('/').filter(Boolean);
    if (!parts.length) continue;
    let cur = root;
    for (let i = 0; i < parts.length; i++) {
      const seg = parts[i];
      if (i === parts.length - 1) {
        cur.files.push(seg);
      } else {
        if (!cur.dirs[seg]) cur.dirs[seg] = { dirs: {}, files: [] };
        cur = cur.dirs[seg];
      }
    }
  }
  return root;
}

function formatBytes(n) {
  const num = Number(n);
  if (!Number.isFinite(num) || num < 0) return '—';
  if (num < 1024) return `${Math.round(num)} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}

/** 폴더 / 파일 아이콘 */
function ZipTreeIcon({ type }) {
  if (type === 'dir') {
    return (
      <span className='zip-tree-icon dir' aria-hidden='true'>
        <svg viewBox='0 0 20 20' width='15' height='15' fill='none'>
          <path
            d='M2.5 5.5A1.5 1.5 0 0 1 4 4h4.2l1.3 1.5H16A1.5 1.5 0 0 1 17.5 7v7.5a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 14.5v-9Z'
            stroke='currentColor'
            strokeWidth='1.35'
            strokeLinejoin='round'
          />
        </svg>
      </span>
    );
  }
  return (
    <span className='zip-tree-icon file' aria-hidden='true'>
      <svg viewBox='0 0 20 20' width='15' height='15' fill='none'>
        <path
          d='M5.5 2.75h6.2L15.5 6.6v10.65a.85.85 0 0 1-.85.85H5.5a.85.85 0 0 1-.85-.85V3.6c0-.47.38-.85.85-.85Z'
          stroke='currentColor'
          strokeWidth='1.35'
          strokeLinejoin='round'
        />
        <path
          d='M11.5 2.9v3.4h3.5'
          stroke='currentColor'
          strokeWidth='1.35'
          strokeLinejoin='round'
        />
      </svg>
    </span>
  );
}

function ZipTree({ node, pathPrefix = '' }) {
  const dirNames = Object.keys(node.dirs).sort((a, b) => a.localeCompare(b));
  const files = [...node.files].sort((a, b) => a.localeCompare(b));
  const entries = [
    ...dirNames.map((d) => ({ kind: 'dir', name: d })),
    ...files.map((f) => ({ kind: 'file', name: f })),
  ];

  return (
    <>
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1;
        if (entry.kind === 'dir') {
          const sub = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
          return (
            <li
              key={`d:${sub}`}
              className={`zip-tree-node${isLast ? ' is-last' : ''}`}
            >
              <div className='zip-tree-row'>
                <span className='zip-tree-elbow' aria-hidden='true' />
                <ZipTreeIcon type='dir' />
                <span className='zip-tree-name dir'>{entry.name}</span>
              </div>
              <ul className='zip-tree-children'>
                <ZipTree node={node.dirs[entry.name]} pathPrefix={sub} />
              </ul>
            </li>
          );
        }
        const full = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
        return (
          <li
            key={`f:${full}`}
            className={`zip-tree-node${isLast ? ' is-last' : ''}`}
          >
            <div className='zip-tree-row'>
              <span className='zip-tree-elbow' aria-hidden='true' />
              <ZipTreeIcon type='file' />
              <span className='zip-tree-name'>{entry.name}</span>
            </div>
          </li>
        );
      })}
    </>
  );
}

const SubmitUploadForm = () => {
  const { tf } = useI18n();
  const { screenshotMode, paths, progressSteps } = useSubmitPage();
  const dispatch = useAppDispatch();
  const { submitTitle, submitDescription } = useAppSelector(
    (state) => state.submitSlice.info
  );
  const files = useAppSelector((state) => state.submitSlice.file.files);
  const archiveTree = useAppSelector(
    (state) => state.submitSlice.file.archivePaths || []
  );
  const availableParams = useAppSelector(
    (state) => state.submitSlice.paramData.availableParams
  );
  const availableInputParams = useAppSelector(
    (state) => state.submitSlice.paramData.availableInputParams
  );
  const token = useAppSelector((state) => state.userSlice.user.token);
  const [isGuideHover, setGuideHover] = useState(false);

  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const [isDisabledNext, setDisabledNext] = useState(true);
  /** 검증 실패 시 인라인 메시지 */
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);
  const lastDropAtRef = useRef(0);

  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;
  const demoAutoUploadRef = useRef(false);

  const handleDropArchive = useCallback(
    async (acceptedFiles) => {
      const zip = acceptedFiles.find((f) => f.name.toLowerCase().endsWith('.zip'));
      if (!zip) {
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('알림', 'Notice'),
            text: tf(
              'ZIP 파일만 업로드할 수 있습니다. (main.py, requirements.txt 및 기타 파일을 포함한 폴더를 압축)',
              'Only .zip files are accepted. Zip your project folder including main.py and requirements.txt.'
            ),
            isScrollable: false,
          })
        );
        return;
      }

      dispatch(clearFiles());
      dispatch(uploadFile([zip]));
      dispatch(setArchivePaths([]));
      setValidationError(null);

      dispatch(setLoading(true));
      try {
        // ZIP 검증 한 번에 처리: 경로 목록(paths) + main.py 규칙 (archive_preview 별도 호출 없음 → 404 방지)
        const validFormData = new FormData();
        validFormData.append('archive', zip);
        const validResponse = await axios.post(
          `${BACKEND_URL}/submit/validation`,
          validFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const serverPaths = validResponse.data?.data?.paths;
        let pathList = Array.isArray(serverPaths) ? serverPaths : [];
        if (!pathList.length && zip) {
          try {
            const buf = await zip.arrayBuffer();
            pathList = listZipPathsFromArrayBuffer(buf);
          } catch {
            pathList = [];
          }
        }
        dispatch(setArchivePaths(pathList));

        const body = validResponse.data ?? {};
        const data = body.data ?? {};
        const outputVarList = normalizeOutputVarList(
          data.output_var_list ?? data.outputVarList
        );
        const inputVarList = normalizeOutputVarList(
          data.input_var_list ?? data.inputVarList
        );
        const statusOk =
          body.status === 200 ||
          body.status === '200' ||
          Number(body.status) === 200;

        if (statusOk && outputVarList.length > 0) {
          dispatch(
            setValidationArchiveParams({
              input: inputVarList,
              output: outputVarList,
            })
          );
          setValidationError(null);
        } else {
          dispatch(setValidationArchiveParams({ input: [], output: [] }));
          const msg = resolveArchiveValidationMessage(body, tf);
          setValidationError(msg);
          dispatch(
            setVisibleModal({
              isVisible: true,
              title: tf('알림', 'Notice'),
              text: msg,
              isScrollable: false,
            })
          );
        }
      } catch (error) {
        console.error('ZIP 미리보기/검증 실패:', error);
        if (error.__authHandled || error.response?.status === 401) return;
        const resData = error.response?.data;
        let msg;
        if (resData && typeof resData === 'object' && resData.error && typeof resData.error === 'object') {
          msg = formatValidationErrorDetail(resData.error, tf);
        } else {
          const detail =
            resData?.detail ||
            resData?.error?.message ||
            error.message;
          msg =
            typeof detail === 'string'
              ? detail
              : tf(
                  '압축 처리 또는 검증에 실패했습니다. main.py·requirements.txt 구조를 확인해주세요.',
                  'Archive preview or validation failed. Check main.py and requirements.txt layout.'
                );
        }
        setValidationError(msg);
        dispatch(setValidationArchiveParams({ input: [], output: [] }));
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf('에러', 'Error'),
            text: msg,
            isScrollable: false,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
    [token, dispatch, BACKEND_URL, tf]
  );

  // Demo: auto-upload a placeholder zip + run mock validation
  useEffect(() => {
    if (!isDemoMode()) return;
    if (demoAutoUploadRef.current) return;
    if (!token) return;
    if (files.some((f) => f.name.toLowerCase().endsWith('.zip'))) return;
    if (!String(submitTitle ?? '').trim() || !String(submitDescription ?? '').trim()) {
      return;
    }
    demoAutoUploadRef.current = true;
    handleDropArchive([createDemoZipFile()]);
  }, [token, files, submitTitle, submitDescription, handleDropArchive]);

  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDropNative = useCallback(
    (e) => {
      preventDefaults(e);
      if (isLoading) return;
      const dt = e.dataTransfer;
      if (!dt?.files?.length) return;
      lastDropAtRef.current = Date.now();
      handleDropArchive(Array.from(dt.files));
    },
    [isLoading, handleDropArchive, preventDefaults]
  );

  const handleDropAreaClick = useCallback(() => {
    if (isLoading) return;
    if (Date.now() - lastDropAtRef.current < 500) return;
    fileInputRef.current?.click();
  }, [isLoading]);

  const handleFileInputChange = useCallback(
    (e) => {
      const fl = e.target.files;
      if (fl && fl.length) {
        handleDropArchive(Array.from(fl));
      }
      e.target.value = '';
    },
    [handleDropArchive]
  );

  const checkFilesValid = useCallback(() => {
    const titleOk = String(submitTitle ?? '').trim().length > 0;
    const descOk = String(submitDescription ?? '').trim().length > 0;
    const hasBasicInfo = titleOk && descOk;
    const zipCount = files.filter((f) =>
      f.name.toLowerCase().endsWith('.zip')
    ).length;
    const hasZip = zipCount >= 1;
    const validated =
      Array.isArray(availableParams) && availableParams.length > 0;
    return hasBasicInfo && hasZip && validated;
  }, [files, submitTitle, submitDescription, availableParams]);

  useEffect(() => {
    const valid = checkFilesValid();
    setDisabledNext(!valid);
  }, [checkFilesValid]);

  const handleClickDelete = () => {
    dispatch(clearFiles());
    setValidationError(null);
  };

  const guideLeaveTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (guideLeaveTimerRef.current) {
      clearTimeout(guideLeaveTimerRef.current);
      guideLeaveTimerRef.current = null;
    }
    setGuideHover(true);
  };

  const handleMouseLeave = () => {
    guideLeaveTimerRef.current = setTimeout(() => {
      setGuideHover(false);
      guideLeaveTimerRef.current = null;
    }, 150);
  };

  const titleOk = String(submitTitle ?? '').trim().length > 0;
  const descOk = String(submitDescription ?? '').trim().length > 0;
  const localizedValidationError = getLocalizedErrorMessage(validationError || '', tf);

  return (
    <S.Container $screenshot={screenshotMode}>
      <div className='submit-title'>
        <ProgressBar
          steps={progressSteps}
          currentStep={2}
          screenshot={screenshotMode}
        />
      </div>
      <div className='submit-header'>
        <div className='title-wrap'>
          <h2 className='submit-title'>{tf('2. 제출 파일 (ZIP)', '2. Submission (ZIP)')}</h2>
          <p className='submit-desc'>
            <span className='required'>*</span>{' '}
            {tf('는 필수 입력 필드입니다.', 'indicates a required field.')}
          </p>
        </div>
        <p className='submit-desc'>
          <Link className='guide-link' to='/submit/guide'>
            {tf('파일 업로드 가이드라인', 'File upload guidelines')}
          </Link>
          {tf('을 준수해주세요.', ' Please follow.')}
        </p>
      </div>
      <form
        className='submit-form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='input-wrap'>
          <label className='label' htmlFor='submissionZip'>
            <span className='required'>*</span>
            {tf('제출 압축 파일 (.zip)', 'Submission archive (.zip)')}
            <span
              className='guide-wrap'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className='guide'>?</span>
              {isGuideHover && (
                <span className='guide-tip' role='tooltip'>
                  {tf(
                    '압축을 풀었을 때 제출 루트에 main.py, requirements.txt가 있어야 합니다. 하위 폴더 하나만 있고 그 안에 두 파일이 있으면 서버가 자동으로 맞춥니다.',
                    'After extract, main.py and requirements.txt must be at the project root. If the zip contains a single top-level folder with those files, the server flattens it automatically.'
                  )}
                </span>
              )}
            </span>
          </label>
          <div
            className='drop-area'
            role='button'
            tabIndex={0}
            onClick={handleDropAreaClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDropAreaClick();
              }
            }}
            onDragEnter={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={handleDropNative}
          >
            <input
              ref={fileInputRef}
              id='submissionZip'
              className='input'
              type='file'
              accept='.zip,application/zip,application/x-zip-compressed'
              multiple={false}
              autoComplete='off'
              onChange={handleFileInputChange}
            />
            <p className='drop-desc'>
              {tf('클릭하여 ', 'Click to browse, or ')}
              <strong className='file-name'>.zip</strong>
              {tf(' 파일을 선택하거나, 이 영역에 끌어다 놓으세요.', ' file, or drag and drop a .zip here.')}
              <span className='drop-hint'>
                {tf(
                  '(ZIP만 가능)',
                  '(ZIP only)'
                )}
              </span>
            </p>
          </div>
        </div>
      </form>

      {files.length ? (
        <div className='uploaded-files'>
          <div className='uploaded-files-header'>
            <h3 className='uploaded-files-title'>{tf('업로드된 파일', 'Uploaded files')}</h3>
            <span className='total-file'>
              {files.length}
              {tf('개', ' File(s)')}
            </span>
          </div>
          {files.map((file, idx) => (
            <div
              className='file-wrap'
              key={`${file.name}-${file.size}-${file.lastModified ?? idx}`}
            >
              <div className='file-info-wrap'>
                <div className='file-title'>{file.name}</div>
                <div className='file-size'>{formatBytes(file.size)}</div>
              </div>
              <button
                type='button'
                className='delete-button'
                onClick={handleClickDelete}
              >
                {tf('삭제', 'Delete')}
              </button>
            </div>
          ))}

          {files.some((f) => f.name.toLowerCase().endsWith('.zip')) ? (
            <div className='zip-tree-section'>
              <div className='zip-tree-title'>
                {tf('압축 내부 파일 구조', 'Folder / file tree inside the .zip')}
              </div>
              <p className='zip-tree-hint'>
                {tf(
                  '서버에 압축 해제될 때 아래와 같은 경로 구조로 배치됩니다.',
                  'The server will extract your archive to match this layout.'
                )}
              </p>
              <div className='zip-tree-scroll'>
              {isLoading ? (
                <div className='zip-tree-loading'>
                  {tf('목록을 불러오는 중…', 'Loading archive contents…')}
                </div>
              ) : archiveTree.length > 0 ? (
                <ul className='zip-tree'>
                  <ZipTree node={buildPathTree(archiveTree)} />
                </ul>
              ) : (
                <div className='zip-tree-empty'>
                  {tf(
                    '경로 목록을 아직 받지 못했습니다. 검증이 끝난 뒤에도 비어 있으면 API(백엔드)를 최신으로 배포했는지 확인해 주세요.',
                    'No path list yet. If this stays empty after validation finishes, ensure the API server is updated.'
                  )}
                </div>
              )}
              </div>
              {availableParams.length > 0 && (
                <div className='validation-status ok'>
                  <div className='validation-status-line validation-status-primary'>
                    <span className='validation-ok-icon' aria-hidden>
                      <svg
                        viewBox='0 0 20 20'
                        width='18'
                        height='18'
                        focusable='false'
                        fill='none'
                      >
                        <circle cx='10' cy='10' r='9' fill='#fff' />
                        <path
                          d='M6.2 10.2 8.7 12.7 13.8 7.4'
                          stroke='currentColor'
                          strokeWidth='1.8'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span>{tf('검증 완료', 'Validation OK')}</span>
                  </div>
                  <div className='validation-status-meta'>
                    <div className='validation-status-line validation-status-detail'>
                      <span className='validation-detail-label'>
                        {tf('입력 파라미터', 'Input parameter(s)')}
                      </span>
                      <span className='validation-detail-value'>
                        {formatChannelLabelList(availableInputParams, getInputChannelLabel) ||
                          tf('(없음)', '(none)')}
                      </span>
                    </div>
                    <div className='validation-status-line validation-status-detail'>
                      <span className='validation-detail-label'>
                        {tf('출력 파라미터', 'Output parameter(s)')}
                      </span>
                      <span className='validation-detail-value'>
                        {formatChannelLabelList(availableParams, getOutputParameterLabel)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {validationError && (
                <div className='validation-status err'>
                  <div className='validation-status-line validation-status-primary'>
                    <span className='validation-err-icon' aria-hidden>
                      <svg
                        viewBox='0 0 20 20'
                        width='18'
                        height='18'
                        focusable='false'
                        fill='none'
                      >
                        <circle cx='10' cy='10' r='9' fill='#fff' />
                        <path
                          d='M10 6.2v5'
                          stroke='currentColor'
                          strokeWidth='1.8'
                          strokeLinecap='round'
                        />
                        <circle cx='10' cy='13.7' r='1' fill='currentColor' />
                      </svg>
                    </span>
                    <span>{tf('에러', 'Error')}</span>
                  </div>
                  <div className='validation-status-meta validation-status-multiline'>
                    {localizedValidationError.split('\n').map((line, i) => (
                      <div key={`ve:${i}`} className='validation-status-line validation-status-detail'>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {files.length === 0 && (
        <p className='next-blocked-hint'>
          {!titleOk || !descOk ? (
            <>
              {tf(
                '1단계에서 제출명과 제출 설명을 빈칸이 아닌 내용으로 채워야 ',
                'Enter a submission title and description in step 1 (not only spaces) before you can use '
              )}
              <strong className='next-blocked-hint__em'>
                {tf('다음', 'Next')}
              </strong>
              {tf(
                '으로 진행할 수 있습니다. 필요하면 이전 단계에서 수정해 주세요.',
                '. Return to the previous step if you need to edit.'
              )}
            </>
          ) : (
            <>
              {tf(
                'ZIP 파일을 업로드하면 서버에서 자동으로 검증합니다. 아래에 ',
                'After your ZIP upload, the server validates the archive. Continue when '
              )}
              <strong className='next-blocked-hint__em'>
                {tf('검증 완료', 'Validation OK')}
              </strong>
              {tf('와 ', ' and ')}
              <strong className='next-blocked-hint__em'>
                {tf(
                  '입력 채널 및 출력 파라미터',
                  'input channels and output parameters'
                )}
              </strong>
              {tf(
                ' 안내가 함께 표시되면 다음 단계로 진행할 수 있습니다.',
                ' appear below.'
              )}
            </>
          )}
        </p>
      )}
      <PrevNextBar
        prev={paths.details}
        prevText={tf('이전', 'Prev')}
        next={paths.parameters}
        nextText={tf('다음', 'Next')}
        nextDisabled={isDisabledNext}
      />

      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
    </S.Container>
  );
};

export default SubmitUploadForm;
