import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import S from "./SubmitParametersForm.styled";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  paramChangeField,
  resetDatas,
} from "../../stores/submit/submit.slice";
import {
  setLoading,
  setVisibleModal,
  setVisibleToast,
} from "../../stores/common/common.slice";
import axios from "axios";
import Loading from "../common/Loading";
import Modal from "../common/Modal";
import ConfirmModal from "./tab/ConfirmModal";
import ProgressBar from "../common/ProgressBar";
import { useSubmitPage } from "../../contexts/SubmitPageContext";
import predefinedParamSets from "../../assets/data/noninferiorityParams";
import NonInferiorityInfoModal from "./NonInferiorityInfoModal";
import PrevNextBar from "../common/PrevNextBar";
import { useI18n } from "../../assets/i18n";
import {
  normalizeOutputVarList,
  formatValidationErrorDetail,
  resolveArchiveValidationMessage,
} from "../../utils/submitValidationMessages";
import {
  PEDIATRIC_DEFAULT_SUBGROUPS,
  PEDIATRIC_BAND_OPTIONS,
  NO_SUBGROUP_LABEL_KO,
  NO_SUBGROUP_LABEL_EN,
  formatAnalysisAgeRange,
  normalizePediatricBandCounts,
  bandsFromRangeIndices,
  getDefaultPediatricBandRange,
  isPediatricRangeSelectable,
  isPediatricBandSelectable,
} from "../../assets/data/ageCohort";
import AgeCohortSection from "./parameters/AgeCohortSection";
import SampleCriteriaSection from "./parameters/SampleCriteriaSection";
import SubgroupSection from "./parameters/SubgroupSection";
import { isDemoMode } from "../../demo/isDemoMode";
import {
  DEMO_MANUAL_SAMPLE_SIZE,
  DEMO_SUBGROUPS,
} from "../../demo/autoFillSubmit";

const SubmitParametersForm = () => {
  const { tf } = useI18n();
  const { screenshotMode, paths, progressSteps } = useSubmitPage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { submitTitle, submitDescription } = useAppSelector(
    (state) => state.submitSlice.info
  );
  const files = useAppSelector((state) => state.submitSlice.file.files);
  const token = useAppSelector((state) => state.userSlice.user.token);

  // 비열등성 파라미터
  const { primaryParameter, alpha, power, sigma, delta, availableParams } =
    useAppSelector((state) => state.submitSlice.paramData);

  const { isLoading, isVisibleModal } = useAppSelector(
    (state) => state.commonSlice
  );
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(() => () => {});

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isPresetUsed, setIsPresetUsed] = useState(false);
  const [usedPresetKey, setUsedPresetKey] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // 연령군: adult(>18) | pediatric(≤18)
  const [ageCohort, setAgeCohort] = useState("adult");
  const [pediatricBandRange, setPediatricBandRange] = useState([0, 0]);
  const [pediatricBandCounts, setPediatricBandCounts] = useState(null);

  const pediatricBands = useMemo(
    () => bandsFromRangeIndices(pediatricBandRange[0], pediatricBandRange[1]),
    [pediatricBandRange]
  );

  const [isGuideHover, setGuideHover] = useState({
    sampling: false,
    pediatricBand: false,
    ageCohort: false,
  });
  const guideLeaveTimersRef = useRef({});

  const handleMouseEnter = (e) => {
    const key = e.currentTarget.dataset.guide;
    if (!key) return;
    const t = guideLeaveTimersRef.current[key];
    if (t) {
      clearTimeout(t);
      guideLeaveTimersRef.current[key] = null;
    }
    setGuideHover((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (e) => {
    const key = e.currentTarget.dataset.guide;
    if (!key) return;
    guideLeaveTimersRef.current[key] = setTimeout(() => {
      setGuideHover((prev) => ({ ...prev, [key]: false }));
      guideLeaveTimersRef.current[key] = null;
    }, 150);
  };

  // 샘플링 모드: auto(비열등성 기반) / manual(사용자 지정)
  // Demo defaults to manual + prefilled N so Submit is enabled immediately
  const [samplingMode, setSamplingMode] = useState(
    isDemoMode() ? "manual" : "auto"
  );
  const [manualSampleSize, setManualSampleSize] = useState(
    isDemoMode() ? DEMO_MANUAL_SAMPLE_SIZE : ""
  );
  const demoParamsFilledRef = useRef(false);

  const canonicalOrder = ["bmi", "severity", "race"];
  const getOrderedSubgroups = (arr) =>
    canonicalOrder.filter((k) => arr.map((v) => v.toLowerCase()).includes(k));

  const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

  // Demo: pre-select showcase subgroups (BMI / Severity / Race)
  useEffect(() => {
    if (!isDemoMode() || demoParamsFilledRef.current) return;
    demoParamsFilledRef.current = true;
    setSelectedSubgroups([...DEMO_SUBGROUPS]);
    setSamplingMode("manual");
    setManualSampleSize(DEMO_MANUAL_SAMPLE_SIZE);
  }, []);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const fetchPediatricBandCounts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/answers/pediatric_band_counts/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) {
          setPediatricBandCounts(
            normalizePediatricBandCounts(res.data?.data?.counts)
          );
        }
      } catch (error) {
        console.error("연령대별 데이터 건수 조회 실패:", error);
        if (!cancelled) {
          setPediatricBandCounts(normalizePediatricBandCounts({}));
        }
      }
    };
    fetchPediatricBandCounts();
    return () => {
      cancelled = true;
    };
  }, [token, BACKEND_URL]);

  useEffect(() => {
    if (!pediatricBandCounts || ageCohort !== "pediatric") return;
    setPediatricBandRange((prev) => {
      const [startIdx, endIdx] = prev;
      if (isPediatricRangeSelectable(pediatricBandCounts, startIdx, endIdx)) {
        return prev;
      }
      return getDefaultPediatricBandRange(pediatricBandCounts);
    });
  }, [pediatricBandCounts, ageCohort]);

  const handlePresetChange = (e) => {
    const value = e.target.value;
    setSelectedPreset(value);
    if (value !== "custom" && predefinedParamSets[value]) {
      handleApplyPreset(value);
    }
  };

  const handleApplyPreset = (presetKey) => {
    const preset = predefinedParamSets[presetKey];
    if (!preset) return;
    dispatch(paramChangeField({ name: "alpha", value: preset.alpha }));
    dispatch(paramChangeField({ name: "power", value: preset.power }));
    dispatch(paramChangeField({ name: "sigma", value: preset.sigma }));
    dispatch(paramChangeField({ name: "delta", value: preset.delta }));
    setIsInfoModalOpen(false);
    setIsPresetUsed(true);
    setUsedPresetKey(presetKey);

    setTimeout(() => {
      setDisabledSubmit(!checkParamsValid());
    }, 100);
  };

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    dispatch(paramChangeField({ name, value }));
  };

  const handleSubgroupToggle = (item) => {
    if (selectedSubgroups.includes(item)) {
      setSelectedSubgroups(selectedSubgroups.filter((i) => i !== item));
    } else {
      setSelectedSubgroups([...selectedSubgroups, item]);
    }
  };

  const handleNoSubgroupSelect = () => {
    setSelectedSubgroups([]);
  };

  const handleAgeCohortChange = (cohort) => {
    setAgeCohort(cohort);
    if (cohort === "pediatric") {
      setSelectedSubgroups([...PEDIATRIC_DEFAULT_SUBGROUPS]);
      if (pediatricBandCounts) {
        setPediatricBandRange(getDefaultPediatricBandRange(pediatricBandCounts));
      }
    } else {
      setPediatricBandRange([0, 0]);
      setSelectedSubgroups([]);
    }
  };

  const handlePediatricBandClick = (idx) => {
    const bandId = PEDIATRIC_BAND_OPTIONS[idx]?.id;
    if (!bandId || !isPediatricBandSelectable(pediatricBandCounts, bandId)) return;

    const [start, end] = pediatricBandRange;
    const inRange = idx >= start && idx <= end;

    if (inRange && start !== end) {
      setPediatricBandRange([idx, idx]);
      return;
    }
    if (start === end && start === idx) return;

    const newStart = Math.min(start, idx);
    const newEnd = Math.max(end, idx);
    if (isPediatricRangeSelectable(pediatricBandCounts, newStart, newEnd)) {
      setPediatricBandRange([newStart, newEnd]);
    } else {
      setPediatricBandRange([idx, idx]);
    }
  };

  const isAdultCohort = ageCohort === "adult";

  // 파일 / 파라미터 유효성 확인
  const checkParamsValid = useCallback(() => {
    if (!files || files.length === 0) return false;

    if (isAdultCohort) {
      // 서브그룹은 선택 사항
    } else {
      if (
        !isPediatricRangeSelectable(
          pediatricBandCounts,
          pediatricBandRange[0],
          pediatricBandRange[1]
        )
      ) {
        return false;
      }
    }

    if (samplingMode === "auto") {
      if (!primaryParameter || !alpha || !power || !sigma || !delta) return false;
    } else if (samplingMode === "manual") {
      const n = Number(manualSampleSize);
      if (!manualSampleSize || Number.isNaN(n) || n <= 0) return false;
    }

    return true;
  }, [
    primaryParameter,
    alpha,
    power,
    sigma,
    delta,
    selectedSubgroups,
    pediatricBandRange,
    pediatricBandCounts,
    ageCohort,
    isAdultCohort,
    samplingMode,
    manualSampleSize,
    files,
  ]);

  useEffect(() => {
    setDisabledSubmit(!checkParamsValid());
  }, [checkParamsValid]);

  const handleClickSubmit = () => {
    if (checkParamsValid()) {
      fetchSubmitAPI();
    }
  };

  /**
   * Submission flow and sample-size computation
   * --------------------------------------------------
   * AUTO 모드:
   *  1. `/answers/get_sample_size/` 로 비열등성 파라미터를 보내 target_sample_size 계산
   *  2. ConfirmModal에 "예상 샘플 수"로 표시
   *  3. `/submit` 에 files + metadata + target_sample_size 전송
   *
   * MANUAL 모드:
   *  1. 사용자가 입력한 manualSampleSize를 그대로 target_sample_size 로 사용
   *  2. 비열등성 파라미터는 샘플 수 계산에는 사용하지 않지만, 서버 스키마를 위해 그대로 전송
   */
  const fetchSubmitAPI = async () => {
    try {
      dispatch(setLoading(true));

      // ✅ 1. 샘플 수 결정 (AUTO: 백엔드 계산, MANUAL: 사용자 입력 사용)
      let sampleSize = null;
      if (samplingMode === "auto") {
        try {
          const sampleSizeResponse = await axios.post(
            `${BACKEND_URL}/answers/get_sample_size/`,
            {
              alpha: parseFloat(alpha),
              power: parseFloat(power),
              sigma: parseFloat(sigma),
              delta: parseFloat(delta),
              selected_subgroups: selectedSubgroups.map((sg) => sg.toLowerCase()),
              age_cohort: ageCohort,
              pediatric_age_bands: isAdultCohort ? null : pediatricBands,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          sampleSize = sampleSizeResponse.data?.data?.total_sample_size;
        } catch (error) {
          console.error("샘플 수 조회 실패:", error);
        }
      } else {
        // manual 모드: 사용자가 입력한 값 그대로 사용
        const n = Number(manualSampleSize);
        sampleSize = Number.isFinite(n) && n > 0 ? n : null;
      }

      // ✅ 2. Validation Check (ZIP: 서버에서 압축 해제 후 main.py 검증)
      const validFormData = new FormData();
      const zipFile = files.find((file) => file.name.toLowerCase().endsWith(".zip"));
      if (!zipFile) {
        dispatch(setLoading(false));
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf("알림", "Notice"),
            text: tf(
              "제출 ZIP이 없습니다. 업로드 단계에서 .zip 파일을 선택해주세요.",
              "No .zip submission file. Please select a .zip on the upload step."
            ),
            isScrollable: false,
          })
        );
        return;
      }
      validFormData.append("archive", zipFile);
      const validResponse = await axios.post(
        `${BACKEND_URL}/submit/validation`,
        validFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = validResponse.data ?? {};
      const data = body.data ?? {};
      const inputVarList = Array.isArray(data.input_var_list) ? data.input_var_list : [];
      const outputVarList = normalizeOutputVarList(data.output_var_list);

      // ✅ 3. 모달 메시지 준비 (샘플사이즈 포함)
      if (
        (body.status === 200 || body.status === "200" || Number(body.status) === 200) &&
        inputVarList.length > 0 &&
        outputVarList.length > 0
      ) {
        const confirmMessage = {
          Title: submitTitle,
          Description: submitDescription,
          InputVars: inputVarList.join(", "),
          OutputVars: outputVarList.join(", "),
          PrimaryParam: isPresetUsed
            ? `${primaryParameter} (기준값 사용)`
            : `${primaryParameter} (사용자 지정)`,
          Alpha: alpha,
          Power: power,
          Sigma: sigma,
          Delta: delta,
          Subgroups:
            selectedSubgroups.length > 0
              ? selectedSubgroups.join(", ")
              : tf(NO_SUBGROUP_LABEL_KO, NO_SUBGROUP_LABEL_EN),
          AnalysisAgeRange: formatAnalysisAgeRange(
            { ageCohort, pediatricBands },
            tf
          ),
          Files: files.map((file) => file.name).join(", "),
          SampleSize:
            sampleSize !== null
              ? samplingMode === "auto"
                ? tf(`${sampleSize}개 예상`, `${sampleSize} expected`)
                : tf(`${sampleSize}개 (직접 입력)`, `${sampleSize} (manual entry)`)
              : tf("조회 실패", "Unable to retrieve"),
        };

        setModalMessage(confirmMessage);
        setIsModalOpen(true);

        // ✅ 4. Submit Files
        setOnModalConfirm(() => async () => {
          dispatch(setLoading(true));
          setIsModalOpen(false);
          const submitFormdata = new FormData();
          submitFormdata.append("submit_title", submitTitle);
          submitFormdata.append("submit_description", submitDescription);
          files.forEach((file) => {
            submitFormdata.append("uploadedFiles", file);
          });
          submitFormdata.append("input_var_list", JSON.stringify(inputVarList));
          submitFormdata.append(
            "output_var_list",
            JSON.stringify(outputVarList)
          );
          submitFormdata.append(
            "selected_subgroups",
            JSON.stringify(
              isAdultCohort
                ? getOrderedSubgroups(selectedSubgroups)
                : selectedSubgroups.map((sg) => sg.toLowerCase())
            )
          );
          submitFormdata.append("age_cohort", ageCohort);
          if (!isAdultCohort) {
            submitFormdata.append(
              "pediatric_age_bands",
              JSON.stringify(pediatricBands)
            );
          }

          // ✅ sampling_mode 항상 전송
          submitFormdata.append("sampling_mode", samplingMode);

          // ✅ target_sample_size 추가 (AUTO: 계산값, MANUAL: 사용자 입력값)
          if (sampleSize !== null) {
            submitFormdata.append("target_sample_size", sampleSize);
          }

          // ✅ 비열등성 파라미터는 모드에 따라 다르게 전송
          if (samplingMode === "manual") {
            // 수동 모드: 서버에서 비열등성 파라미터를 무시하므로 빈 값으로 보냄
            submitFormdata.append("primary_parameter", "");
            submitFormdata.append("alpha", "");
            submitFormdata.append("power", "");
            submitFormdata.append("sigma", "");
            submitFormdata.append("delta", "");
            submitFormdata.append("used_preset", "false");
            submitFormdata.append("preset_key", "");
          } else {
            // 자동 모드: 기존 값 그대로 전송
            submitFormdata.append("primary_parameter", primaryParameter);
            submitFormdata.append("alpha", alpha);
            submitFormdata.append("power", power);
            submitFormdata.append("sigma", sigma);
            submitFormdata.append("delta", delta);
            submitFormdata.append("used_preset", isPresetUsed ? "true" : "false");
            submitFormdata.append("preset_key", usedPresetKey);
          }

          try {
            const submitResponse = await axios.post(
              `${BACKEND_URL}/submit`,
              submitFormdata,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const submitId = submitResponse.data.data.submit_id;
            const submitNum = submitResponse.data.data.submit_num;
            if (submitResponse.data.status === 200 && submitId && submitNum) {
              navigate(`/submit/${submitNum}`);
              dispatch(
                setVisibleToast({
                  isVisible: true,
                  text: tf(" 현재 데이터 전처리 진행 중입니다. 다소 시간이 소요될 수 있으니 잠시만 기다려 주세요.", "Data preprocessing is in progress. This may take some time, so please wait a moment."),
                })
              );
              dispatch(resetDatas());
            }
          } catch (error) {
            console.error(error);
            if (error.__authHandled || error.response?.status === 401) return;
            dispatch(
              setVisibleModal({
                isVisible: true,
                title: tf("에러", "Error"),
                text: error.response?.data?.error?.message || error.message || tf("제출 중 오류가 발생했습니다.", "An error occurred while submitting."),
                isScrollable: false,
              })
            );
          } finally {
            dispatch(setLoading(false));
          }
        });
      } else {
        dispatch(setLoading(false));
        dispatch(
          setVisibleModal({
            isVisible: true,
            title: tf("알림", "Notice"),
            text: resolveArchiveValidationMessage(body, tf),
            isScrollable: false,
          })
        );
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
      if (error.__authHandled || error.response?.status === 401) return;
      const resData = error.response?.data;
      let text;
      if (resData && typeof resData === "object" && resData.error && typeof resData.error === "object") {
        text = formatValidationErrorDetail(resData.error, tf);
      } else {
        const detail =
          resData?.detail ||
          resData?.error?.message ||
          error.message;
        text =
          typeof detail === "string"
            ? detail
            : tf(
                "압축 처리 또는 검증에 실패했습니다. main.py·requirements.txt 구조를 확인해주세요.",
                "Archive preview or validation failed. Check main.py and requirements.txt layout."
              );
      }
      dispatch(
        setVisibleModal({
          isVisible: true,
          title: tf("에러", "Error"),
          text,
          isScrollable: false,
        })
      );
    }
  };
  return (
    <S.Container $screenshot={screenshotMode}>
      <div className="submit-title">
        <ProgressBar
          steps={progressSteps}
          currentStep={3}
          screenshot={screenshotMode}
        />
      </div>
      <Box className="submit-header">
        <div className="title-wrap"> </div>
        <h2 className="submit-title-typo">{tf('3. 평가 기준 설정','3. Set Evaluation Criteria')}</h2>
      </Box>

      <AgeCohortSection
        tf={tf}
        ageCohort={ageCohort}
        isAdultCohort={isAdultCohort}
        pediatricBandRange={pediatricBandRange}
        pediatricBandCounts={pediatricBandCounts}
        onAgeCohortChange={handleAgeCohortChange}
        onPediatricBandClick={handlePediatricBandClick}
        isGuideHover={isGuideHover}
        onGuideEnter={handleMouseEnter}
        onGuideLeave={handleMouseLeave}
      />

      <SampleCriteriaSection
        tf={tf}
        samplingMode={samplingMode}
        setSamplingMode={setSamplingMode}
        manualSampleSize={manualSampleSize}
        setManualSampleSize={setManualSampleSize}
        selectedPreset={selectedPreset}
        handlePresetChange={handlePresetChange}
        primaryParameter={primaryParameter}
        alpha={alpha}
        power={power}
        sigma={sigma}
        delta={delta}
        availableParams={availableParams}
        handleParamChange={handleParamChange}
        isGuideOpen={isGuideOpen}
        setIsGuideOpen={setIsGuideOpen}
        isGuideHover={isGuideHover}
        onGuideEnter={handleMouseEnter}
        onGuideLeave={handleMouseLeave}
      />

      <SubgroupSection
        tf={tf}
        isAdultCohort={isAdultCohort}
        selectedSubgroups={selectedSubgroups}
        onNoSubgroupSelect={handleNoSubgroupSelect}
        onSubgroupToggle={handleSubgroupToggle}
      />

      <PrevNextBar
        prev={paths.upload}
        prevText={tf('이전','Prev')}
        next={handleClickSubmit}
        nextText={tf('제출하기','Submit')}
        nextDisabled={isDisabledSubmit}
      />

      {isLoading && <Loading />}
      {isVisibleModal && <Modal />}
      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          message={modalMessage}
          onConfirm={onModalConfirm}
          onCancel={() => setIsModalOpen(false)}
          usedPreset={isPresetUsed}
          presetKey={usedPresetKey}
          samplingMode={samplingMode}
        />
      )}

      <NonInferiorityInfoModal
        open={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSelectPreset={handleApplyPreset}
      />
    </S.Container>
  );
};

export default SubmitParametersForm;
