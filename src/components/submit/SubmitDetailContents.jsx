import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import S from './SubmitDetailContents.styled';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { setLoading, setVisibleModal } from '../../stores/common/common.slice';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
import { ReactComponent as Download } from '../../assets/resource/icons/download.svg';
import Toast from '../common/Toast';
import { useI18n } from '../../assets/i18n';
import { formatDateTime } from '../../assets/module/module';
import { toLogKey, getLocalizedLogMessage, STAGES } from '../../assets/data/submit';
import {
  getStatusColor,
  getStatusLabel,
  isActiveSubmitStatus,
  resolveSubmitStatusCode,
  SUBMIT_STATUS_CODE,
} from '../../assets/data/submitStatus';
import { isAuthErrorHandled } from '../../utils/setupAxiosAuth';


function SubmitDetailContents() {
  const { tf, language } = useI18n();
  const dispatch = useAppDispatch();
  const { isLoading, isVisibleModal, isVisibleToast } = useAppSelector(
    (state) => state.commonSlice
  );
  const userToken = useAppSelector((state) => state.userSlice.user.token);
  const adminToken = useAppSelector((state) => state.userSlice.admin.token);
  const location = useLocation();
  const screenshotMode = location.pathname.startsWith('/screenshot');
  const authToken = location.pathname.startsWith('/admin') ? adminToken : userToken;
  const { submitNum } = useParams();
  const navigate = useNavigate();
  const authFailedRef = useRef(false);
  const authTokenRef = useRef(authToken);
  const tfRef = useRef(tf);

  const [submitDetail, setSubmitDetail] = useState(null);
  const [errorLogOpen, setErrorLogOpen] = useState(false);
  const [errorLogs, setErrorLogs] = useState([]);
  const [submitData, setSubmitData] = useState(null);
  const [durationTime, setDurationTime] = useState('00:00');

  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  authTokenRef.current = authToken;
  tfRef.current = tf;

  /** ---------------- Fetchers ---------------- **/
  useEffect(() => {
    if (!authToken || !submitNum) return undefined;

    authFailedRef.current = false;
    let cancelled = false;
    const authHeaders = () => ({
      Authorization: `Bearer ${authTokenRef.current}`,
    });

    const isAuthFailure = (error) => {
      if (error?.response?.status === 401 || isAuthErrorHandled(error)) {
        authFailedRef.current = true;
        return true;
      }
      return false;
    };

    const fetchSubmitDetail = async ({ showLoading = false, showError = false } = {}) => {
      if (!authTokenRef.current || authFailedRef.current || cancelled) return;
      try {
        if (showLoading) dispatch(setLoading(true));
        const isAdmin = window.location.pathname.startsWith('/admin');
        const endpoint = `${BACKEND_URL}/submit/submit_detail${
          isAdmin ? '/admin' : ''
        }/${submitNum}`;
        const response = await axios.get(endpoint, { headers: authHeaders() });
        if (cancelled) return;
        const jsonData = response.data;
        setSubmitDetail(jsonData);

        const failedLogs = (jsonData?.log_data?.status_log || []).filter(
          (log) => log.status === 'failed'
        );
        setErrorLogs(failedLogs);
      } catch (error) {
        if (cancelled || isAuthFailure(error)) return;
        if (showError) {
          dispatch(
            setVisibleModal({
              isVisible: true,
              title: tfRef.current('에러', 'Error'),
              text: tfRef.current(
                '제출 상세 정보를 불러오지 못했습니다.',
                'Failed to fetch submit details'
              ),
              isScrollable: false,
            })
          );
        }
      } finally {
        if (showLoading && !cancelled) dispatch(setLoading(false));
      }
    };

    const fetchSubmitData = async () => {
      if (!authTokenRef.current || authFailedRef.current || cancelled) return;
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${BACKEND_URL}/submit/submit_table/`, {
          headers: authHeaders(),
        });
        if (cancelled) return;
        const jsonData = response.data;
        const matched = jsonData.find((item) => item.submit_num === submitNum);
        if (!matched) {
          throw new Error(`No data found for submit_num: ${submitNum}`);
        }
        matched.files =
          matched.files?.filter((file) => file.name !== '__pycache__') || [];
        setSubmitData(matched);
      } catch (error) {
        if (cancelled || isAuthFailure(error)) return;
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tfRef.current('에러', 'Error'),
            text:
              error?.message ||
              tfRef.current(
                '제출 목록 정보를 불러오지 못했습니다.',
                'Failed to fetch submits data'
              ),
            isScrollable: false,
          })
        );
      } finally {
        if (!cancelled) dispatch(setLoading(false));
      }
    };

    fetchSubmitData();
    fetchSubmitDetail({ showLoading: true, showError: true });

    const interval = setInterval(() => {
      if (!authFailedRef.current && !cancelled) {
        // 폴링은 조용히 (로딩/에러 모달 반복 X)
        fetchSubmitDetail({ showLoading: false, showError: false });
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [BACKEND_URL, authToken, dispatch, submitNum]);

  /** ---------------- Elapsed Time ---------------- **/
  useEffect(() => {
    if (!submitData?.submit_time) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(submitData.submit_time).getTime();
      const diff = Math.max(0, Math.floor((now - start) / 1000));
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setDurationTime(
        h > 0
          ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(
              s
            ).padStart(2, '0')}`
          : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [submitData?.submit_time]);

  /** ---------------- Progress Calc (언어 불변) ---------------- **/
  const progressState = useMemo(() => {
    const logs = submitDetail?.log_data?.status_log || [];

    // 메시지 → 고정키 상태맵
    const keyStatus = new Map();
    logs.forEach((l) => {
      const k = toLogKey(l.message);
      if (k) keyStatus.set(k, l.status);
    });

    // 완료된 단계 수
    const doneCount = STAGES.filter((stg) =>
      stg.doneKeys.every((k) => keyStatus.get(k) === 'completed')
    ).length;

    const pct = Math.round((doneCount / STAGES.length) * 100);

    // 현재 단계명
    const idx = Math.min(doneCount, STAGES.length - 1);
    const stage = STAGES[idx];
    const stepLabel = language === 'en' ? stage.step_en : stage.step_ko;
    const stageName = language === 'en' ? stage.name_en : stage.name_ko;

    // 상태/색상 — 'skipped'는 파일 누락/채널 없음으로 스킵된 경우이므로 에러로 취급하지 않음
    const hasError = logs.some((l) => l.status === 'failed');
    const stopped =
      logs.some((l) => l.status === 'canceled') ||
      logs.some((l) => toLogKey(l.message) === 'JOB_STOPPED');
    const evalDone = logs.some(
      (l) => toLogKey(l.message) === 'USER_EVAL_DONE' && l.status === 'completed'
    );

    // API progress_status 우선, 없으면 status_log 기반 산출 (중단중 code 4 포함)
    const statusCode = resolveSubmitStatusCode(submitDetail?.progress_status, {
      hasError,
      stopped,
      stopping: false,
      pct,
    });
    const color = getStatusColor(statusCode);
    const status = getStatusLabel(statusCode, language);

    return {
      pct,
      doneCount,
      stepLabel,
      stageName,
      status,
      statusCode,
      color,
      hasError: statusCode === SUBMIT_STATUS_CODE.ERROR || hasError,
      evalDone,
    };
  }, [submitDetail, language]);

  /** ---------------- UI Piece: Progress Bar ---------------- **/
  const renderProgressBar = () => {
    const { pct, doneCount, stepLabel, stageName, status, statusCode, color } =
      progressState;

    const isRunning = isActiveSubmitStatus(statusCode);

    return (
      <Paper className="progress-bar progress-log-panel" elevation={0}>
        <h3 className="header-title">{tf('진행 로그', 'Progress Log')}</h3>

        <div className="header-wrap progress-stage-row">
          <h4 className="step-title">
            <span className="step-badge">{stepLabel}</span>
            <span className="step-name">{stageName}</span>
          </h4>

          <div className="current-status-wrap">
            {isRunning && <div className="progress-loading-spinner" />}
            <span className="current-status" style={{ color }}>
              {status}
            </span>
            {isRunning && (
              <span className="duration">{durationTime}</span>
            )}
          </div>
        </div>

        <Box
          className="total-bar progress-track"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            mt: 2,
          }}
        >
          <Box
            className="fill-bar"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${pct}%`,
              height: '100%',
              backgroundColor: color,
              transition: 'width 0.3s ease',
              borderRadius: 'inherit',
            }}
          />
          <Typography variant="body2" component="div" className="progress-bar-label">
            {doneCount} / {STAGES.length}
          </Typography>
        </Box>
      </Paper>
    );
  };

  /** ---------------- Navigation ---------------- **/
  const prevPage = () => {
    const path = window.location.pathname.startsWith('/admin')
      ? '/admin/task'
      : '/submit/list';
    navigate(path);
  };

  const handleViewAnalysisResult = () => {
    const path = window.location.pathname.startsWith('/admin')
      ? `/admin/submit/report/${submitNum}`
      : `/submit/report/${submitNum}`;
    navigate(path);
  };

  /** ---------------- Render ---------------- **/
  return (
    <S.Container $screenshot={screenshotMode}>
      <Box className="container">
        <div className="container-header-wrap">
          <h4 className="title">{tf('제출 상세보기', 'Submission Detail')}</h4>
          <div className="button-wrap">
            <button className="prev-button" onClick={prevPage}>
              {tf('목록 보기', 'Back to List')}
            </button>
            {!screenshotMode && errorLogs.length > 0 ? (
              <Button className="error-log-button" variant="contained" onClick={() => setErrorLogOpen(true)}>
                {tf('에러 로그', 'Error Log')}
              </Button>
            ) : null}
            {/* 마지막 단계 완료 여부: 키 기반으로 판별 */}
            {!screenshotMode && progressState.evalDone && !progressState.hasError ? (
              <Button className="result-button" variant="contained" onClick={handleViewAnalysisResult}>
                {tf('분석 결과', 'Analysis Result')}
              </Button>
            ) : null}
          </div>
        </div>

        <Box className="contents-wrap">
          {renderProgressBar()}

          {submitData ? (
            <div className="submit-info-container">
              <div className="info-wrap">
                <span className="label">{tf('제출명', 'Title')}</span>
                <span className="data">{submitData.submit_title}</span>
              </div>
              <div className="info-wrap">
                <span className="label">{tf('제출 설명', 'Description')}</span>
                <span className="data">{submitData.submit_description}</span>
              </div>
              <div className="info-wrap">
                <span className="label">{tf('제출 번호', 'Submission No.')}</span>
                <span className="data">{submitNum}</span>
              </div>
              <div className="info-wrap">
                <span className="label">{tf('제출 일시', 'Submitted At')}</span>
                <span className="data">{formatDateTime(submitData.submit_time)}</span>
              </div>
            </div>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {isLoading ? 'Loading submit data...' : 'No data available.'}
            </Typography>
          )}

          <div className="submit-file-container">
            <div className="file-title-wrap">
              <h4 className="file-title">{tf('제출 파일', 'Submitted Files')}</h4>
              <span className="total-count">
                {submitData?.files?.length}
                {tf('건', ' Files')}
              </span>
            </div>

            {submitData?.files?.length > 0 ? (
              submitData.files.map((file, index) => (
                <div key={index} className="file-info-wrap">
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      {(file.size / 1000).toLocaleString()}KB
                    </span>
                  </div>
                  <button
                    className="download-button"
                    onClick={async () => {
                      try {
                        const res = await axios.get(
                          `${BACKEND_URL}/submit/download/${submitData._id}/${submitNum}/${file.name}`,
                          {
                            headers: {
                              Authorization: `Bearer ${authTokenRef.current}`,
                            },
                            responseType: 'blob',
                          }
                        );
                        const blob = res.data;
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file.name);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        window.URL.revokeObjectURL(url);
                      } catch (error) {
                        if (
                          error?.response?.status === 401 ||
                          isAuthErrorHandled(error)
                        ) {
                          authFailedRef.current = true;
                          return;
                        }
                        dispatch(
                          setVisibleModal({
                            isVisible: true,
                            title: tf('에러', 'Error'),
                            text: tf('파일 다운로드에 실패하였습니다.', 'Failed to download file.'),
                            isScrollable: false,
                          })
                        );
                      }
                    }}
                  >
                    <Download />
                  </button>
                </div>
              ))
            ) : (
              <Typography className="no-files">
                No uploaded files available.
              </Typography>
            )}
          </div>
        </Box>

        {/* Error Log Modal */}
        <Dialog
          className="submit-error-modal"
          open={errorLogOpen}
          onClose={() => setErrorLogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="modal-title">
            {tf('에러 로그 상세', 'Error Log Details')}
          </DialogTitle>
          <DialogContent className="modal-content">
            {errorLogs.length > 0 ? (
              errorLogs.map((log, idx) => (
                <Box
                  className="error-log-wrap"
                  key={idx}
                  sx={{ p: 1, borderRadius: '4px', backgroundColor: '#ffebee', borderLeft: '5px solid #d32f2f' }}
                >
                  <Typography className="error-title" variant="body2" sx={{ fontWeight: 'bold' }}>
                    {getLocalizedLogMessage(log.message, tf)}
                  </Typography>
                  {log.error_detail && (
                    <Typography className="error-detail" variant="body2" color="error">
                      {log.error_detail}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Typography className="no-error-text" variant="body2">
                {tf('에러 로그가 없습니다.', 'No error logs.')}
              </Typography>
            )}
          </DialogContent>
          <DialogActions className="modal-button-wrap">
            <button className="close-button" onClick={() => setErrorLogOpen(false)}>
              {tf('닫기', 'Close')}
            </button>
          </DialogActions>
        </Dialog>
      </Box>

      {isVisibleModal && <Modal />}
      {isLoading && <Loading />}
      {isVisibleToast && <Toast />}
    </S.Container>
  );
}

export default SubmitDetailContents;
