import { Text } from "@react-pdf/renderer";

// PDF에 들어가는 상세 설명
export const getNonInferiorityPresetLabels = (tf) => ({
  accuracy: tf(
    "수면 단계 분류 정확도 (Accuracy ≥ 85%)",
    "Sleep Stage Classification Accuracy (Accuracy ≥ 85%)"
  ),
  ahi: tf(
    "무호흡저호흡지수(AHI) 상관 분석 (r ≥ 0.90)",
    "Apnea-Hypopnea Index (AHI) Correlation Analysis (r ≥ 0.90)"
  ),
  tst: tf(
    "총 수면 시간(TST) 차이 허용 범위 (Δ ≤ 30분)",
    "Total Sleep Time (TST) Difference Allowable Range (Δ ≤ 30 min)"
  ),
  se: tf(
    "수면 효율(SE) 차이 허용 범위 (Δ ≤ 5%)",
    "Sleep Efficiency (SE) Difference Allowable Range (Δ ≤ 5%)"
  ),
});

/**
 * PDF 주 파라미터(Primary) 표기 — 입력·출력 지표명은 영어로 통일 (요청 정보의 표시명과 동일 계열).
 * tf는 시그니처 호환용이며, 알려진 키에는 사용하지 않음.
 */
const PRIMARY_PARAMETER_LABEL_EN = {
  sleep_stage_5: "Sleep Staging (5-class)",
  sleep_stage_3: "Sleep Staging (3-class)",
  ahi: "Apnea-Hypopnea Index (AHI)",
  arousal_index: "Arousal Index",
  osa_severity: "OSA Severity",
  accuracy: "Sleep stage classification accuracy (Accuracy ≥ 85%)",
  tst: "Total sleep time (TST) difference allowable range (Δ ≤ 30 min)",
  se: "Sleep efficiency (SE) difference allowable range (Δ ≤ 5%)",
};

/** 주 파라미터 키(accuracy, ahi, … 또는 sleep_stage_5 등) → PDF용 라벨 (영문 고정) */
export const getPrimaryParameterLabel = (key, _tf) => {
  if (!key) return "N/A";
  if (PRIMARY_PARAMETER_LABEL_EN[key]) return PRIMARY_PARAMETER_LABEL_EN[key];
  return key;
};

// PDF에 표시되는 문장 생성기
// sampling_mode === "manual" 이면 비열등성 파라미터를 사용하지 않으므로 null 반환
export const getNonInferiorityDescription = (usedPreset, presetKey, styles, tf, samplingMode) => {
  if (samplingMode && String(samplingMode).toLowerCase() === "manual") {
    return null;
  }

  const isPresetUsed = (() => {
    if (typeof usedPreset === "boolean") return usedPreset;
    if (typeof usedPreset === "string") {
      return usedPreset.trim().toLowerCase() === "true";
    }
    return false;
  })();

  if (isPresetUsed) {
    // 플랫폼 예시 preset 문장은 주 파라미터(Primary)·수치 블록과 중복되어 혼동을 줄이기 위해 생략
    return null;
  } else {
    return (
      <Text>
        {tf(
          "* 비열등성 검정 파라미터는 ",
          "* Non-inferiority test parameter is set based on "
        )}
        <Text style={styles.bold}>
          {tf("사용자가 직접 입력한 값", "user-specified values")}
        </Text>
        {tf(
          "을 기준으로 데이터 수를 산정하였습니다.",
          ", and the required number of data samples was calculated accordingly."
        )}
      </Text>
    );
  }
};

// ConfirmModal 등에 표시되는 preset 이름
export const getPresetLabelMap = (tf) => ({
  accuracy: tf("Accuracy ≥ 85%", "Accuracy ≥ 85%"),
  ahi: tf("AHI correlation ≥ 0.90", "AHI correlation ≥ 0.90"),
  tst: tf("TST difference ≤ 30 min", "TST difference ≤ 30 min"),
  se: tf("Sleep Efficiency difference ≤ 5%", "Sleep Efficiency difference ≤ 5%"),
});
