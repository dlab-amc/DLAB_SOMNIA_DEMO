// ReportDocument.jsx
import React from "react";
import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import { getReportInfo } from "../../assets/data/report";
import {
  getNonInferiorityDescription,
  getPrimaryParameterLabel,
} from "../../assets/data/noninferiorityText";
import {
  getInputChannelLabel,
  getOutputParameterLabelForReport,
} from "../../assets/data/paramLabels";
import styles from "./ReportDocument.styled";
import {
  formatAnalysisAgeRangeFromExtra,
  getPediatricReportPerfKeys,
  pediatricReportRangeLabel,
  pediatricCombinedRangeKey,
  RACE_SUBGROUP_VALUES,
  RACE_DISPLAY_NAMES,
} from "../../assets/data/ageCohort";

Font.register({
  family: "NotoSans",
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/fonts/NotoSansCJKkr-Regular.otf`,
      fontWeight: "normal",
    },
    {
      src: `${process.env.PUBLIC_URL}/fonts/NotoSansCJKkr-Bold.otf`,
      fontWeight: "bold",
    },
  ],
});

// ✅ 그룹 이름 MAP
const VALUES_MAP = {
  bmi: ["obese", "not_obese"],
  age: ["adult", "child"],
  race: RACE_SUBGROUP_VALUES,
  severity: ["normal", "mild", "moderate", "severe"],
};

const buildGroupPairs = (selectedSubgroups) =>
  (selectedSubgroups || []).flatMap((subgroup) => {
    const sgKey = String(subgroup).toLowerCase();
    return (VALUES_MAP[sgKey] || []).map((value) => ({ subgroup: sgKey, value }));
  });

const SUBGROUP_SECTION_LABELS = {
  bmi: "BMI",
  severity: "OSA Severity",
  race: "Race",
  age: "Age",
};

const METRIC_SHORT_LABELS = {
  "Overall Percent Agreement (Accuracy)": "OPA",
  "PPA (Sensitivity)": "PPA",
  "NPA (Specificity)": "NPA",
  RMSE: "RMSE",
  "R²": "R²",
  "Slope (95% CI)": "Slope",
  "T-test": "T-test",
};

/** 5단계: Wake, N1–N3, REM / 3단계: Wake, NREM, REM */
const getSleepStageLabels = (stageKey) =>
  stageKey === "sleep_stage_3"
    ? ["Wake", "NREM", "REM"]
    : ["Wake", "N1", "N2", "N3", "REM"];

const formatOptionalNumber = (v, digits = 4) => {
  if (v === null || v === undefined || v === "") return "N/A";
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(digits) : "N/A";
};

/** 단계별 지표: 민감도(PPA)의 보수, 1 − PPA */
const stageErrorRateFromPpa = (ppa) =>
  Number.isFinite(ppa) ? 1 - ppa : null;

const renderNonInferiorityNumericDetails = (extraInfo, tf) => {
  const mode = String(extraInfo.sampling_mode || "auto").toLowerCase();
  if (mode === "manual") {
    return (
      <View style={{ marginTop: 4 }}>
        <Text style={styles.detailItemLabel}>
          {tf("직접 지정한 목표 표본 수 (N):", "Target sample size (N):")}
        </Text>
        <Text style={styles.detailItemText}>
          {extraInfo.target_sample_size != null && extraInfo.target_sample_size !== ""
            ? String(extraInfo.target_sample_size)
            : "N/A"}
        </Text>
      </View>
    );
  }

  const alpha = extraInfo.alpha;
  const power = extraInfo.power;
  const sigma = extraInfo.sigma;
  const delta = extraInfo.delta;
  const primary = extraInfo.primary_parameter;
  const hasNumeric = [alpha, power, sigma, delta].some(
    (x) => x !== null && x !== undefined && x !== "" && Number.isFinite(Number(x))
  );

  if (!hasNumeric && !primary) return null;

  return (
    <View style={{ marginTop: 4 }}>
      <Text style={[styles.detailItemLabel, { marginBottom: 4 }]}>
        {tf(
          "비열등성 검정에 사용된 수치:",
          "Non-inferiority test values:"
        )}
      </Text>
      <View style={styles.detailItemText}>
        <Text>
          {tf("유의수준 (α)", "Significance level (α)")}: {formatOptionalNumber(alpha, 4)}
        </Text>
        <Text>
          {tf("검정력 (1−β)", "Power (1−β)")}: {formatOptionalNumber(power, 4)}
        </Text>
        <Text>
          {tf("오차 표준편차 (σ)", "SD of error (σ)")}: {formatOptionalNumber(sigma, 4)}
        </Text>
        <Text>
          {tf("비열등성 마진 (Δ)", "Non-inferiority margin (Δ)")}:{" "}
          {formatOptionalNumber(delta, 4)}
        </Text>
      </View>
      {primary ? (
        <Text style={[styles.detailItemText, { marginTop: 4 }]}>
          {tf("주 파라미터 (Primary)", "Primary parameter")}:{" "}
          <Text style={styles.bold}>{getPrimaryParameterLabel(primary, tf)}</Text>
        </Text>
      ) : null}
    </View>
  );
};

// Format the date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatSlopeOrIntercept = (value, ci, p_value) => {
  const slope =
    value !== null && value !== undefined && !isNaN(value)
      ? value.toFixed(3)
      : "N/A";
  const ciLower =
    ci && ci[0] !== null && ci[0] !== undefined && !isNaN(ci[0])
      ? ci[0].toFixed(3)
      : "N/A";
  const ciUpper =
    ci && ci[1] !== null && ci[1] !== undefined && !isNaN(ci[1])
      ? ci[1].toFixed(3)
      : "N/A";

  if (p_value === null || p_value === undefined) {
    return `${slope} (N/A, ${ciLower} - ${ciUpper})`;
  }

  let star = "";
  if (p_value < 0.001) star = "***";
  else if (p_value < 0.01) star = "**";
  else if (p_value < 0.05) star = "*";

  return `${slope} ${star} (${ciLower} - ${ciUpper})`;
};

// Format t-test
const formatTTest = (ttestValue) => {
  if (ttestValue === null || ttestValue === undefined || isNaN(ttestValue)) {
    return "N/A";
  }
  let star = "";
  if (ttestValue < 0.001) star = "***";
  else if (ttestValue < 0.01) star = "**";
  else if (ttestValue < 0.05) star = "*";
  return `${ttestValue.toFixed(3)}${star}`;
};

const groupDisplayNames = {
  obese: "BMI ≥ 25",
  not_obese: "BMI < 25",
  unknown: "Unknown",
  adult: "Age > 18",
  child: "Age ≤ 18",
  ...RACE_DISPLAY_NAMES,
  normal: "Normal",
  mild: "Mild",
  moderate: "Moderate",
  severe: "Severe",
};

const isPediatricCohort = (extraInfo) => {
  const cohort = String(extraInfo?.age_cohort || "adult").toLowerCase();
  if (cohort === "pediatric" || cohort === "child") return true;
  return Array.isArray(extraInfo?.pediatric_age_bands) && extraInfo.pediatric_age_bands.length > 0;
};

const getReadableInputNames = (arr) =>
  arr?.length ? arr.map(getInputChannelLabel).join(", ") : "N/A";

const getReadableOutputNames = (arr) =>
  arr?.length ? arr.map(getOutputParameterLabelForReport).join(", ") : "N/A";

// helper: check if stats object has any non-zero meaningful value
const hasValidStats = (group) => {
  if (!group) return false;
  if (group.n && group.n > 0) return true;
  return Object.values(group).some((v) => typeof v === "number" && v > 0);
};

const toNumberOrNull = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const getFallbackOverallStats = (extraInfo) => {
  if (hasValidStats(extraInfo?.overall)) return extraInfo.overall;

  const pediatricBands = extraInfo?.pediatric_age_bands;
  const pediatricKeySet =
    Array.isArray(pediatricBands) && pediatricBands.length
      ? (() => {
          const combined = `pediatric_${pediatricCombinedRangeKey(pediatricBands)}`;
          if (hasValidStats(extraInfo?.[combined])) return [combined];
          return pediatricBands.map((b) => `pediatric_${b}`);
        })()
      : null;

  const keys = [
    ...(pediatricKeySet ? [pediatricKeySet] : []),
    ["bmi_obese", "bmi_not_obese"],
    ["age_adult", "age_child"],
    ["severity_normal", "severity_mild", "severity_moderate", "severity_severe"],
    ["race_white", "race_black", "race_asian", "race_other"],
  ];

  for (const keySet of keys) {
    const groups = keySet
      .map((k) => extraInfo?.[k])
      .filter((g) => hasValidStats(g) && Number(g?.n) > 0);
    if (!groups.length) continue;

    const n = groups.reduce((sum, g) => sum + (Number(g.n) || 0), 0);
    if (!n) continue;

    const ageMean =
      groups.reduce((sum, g) => sum + (Number(g.n) || 0) * (toNumberOrNull(g.age_mean) ?? 0), 0) /
      n;
    const bmiMean =
      groups.reduce((sum, g) => sum + (Number(g.n) || 0) * (toNumberOrNull(g.bmi_mean) ?? 0), 0) /
      n;

    const male = groups.reduce((sum, g) => sum + (Number(g.sex_counts?.Male) || 0), 0);
    const female = groups.reduce((sum, g) => sum + (Number(g.sex_counts?.Female) || 0), 0);

    return {
      n,
      age_mean: Number.isFinite(ageMean) ? ageMean.toFixed(2) : "N/A",
      age_std: "N/A",
      bmi_mean: Number.isFinite(bmiMean) ? bmiMean.toFixed(2) : "N/A",
      bmi_std: "N/A",
      sex_counts: { Male: male, Female: female },
    };
  }

  return null;
};

const renderPediatricSampleCharacteristics = (extraInfo, tf) => (
  <>
    <Text style={styles.subtitle}>[{tf("전체", "Overall")}]</Text>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
        <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
        <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
        <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
        <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
      </View>
      {renderSampleRowByGroup(
        getFallbackOverallStats(extraInfo),
        tf("전체", "Overall")
      )}
    </View>
  </>
);

const renderSampleRow = (prefix, displayName, extraInfo) => {
  const group = extraInfo[prefix];
  if (!hasValidStats(group)) return null; // ✅ 데이터 없으면 행 숨김

  const male = group.sex_counts?.Male || 0;
  const female = group.sex_counts?.Female || 0;
  const total = group.n || 0;

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{displayName}</Text>
      <Text style={styles.tableCell}>{total}</Text>
      <Text style={styles.tableCell}>
        {group.age_mean ?? "N/A"} ± {group.age_std ?? "N/A"}
      </Text>
      <Text style={styles.tableCell}>
        {group.bmi_mean ?? "N/A"} ± {group.bmi_std ?? "N/A"}
      </Text>
      <Text style={styles.tableCell}>
        {total
          ? `${male} (${((male / total) * 100).toFixed(1)}%) / ${female} (${(
              (female / total) * 100
            ).toFixed(1)}%)`
          : "N/A"}
      </Text>
    </View>
  );
};

const renderSampleRowByGroup = (group, displayName) => {
  if (!hasValidStats(group)) return null;
  const male = group.sex_counts?.Male || 0;
  const female = group.sex_counts?.Female || 0;
  const total = group.n || 0;
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{displayName}</Text>
      <Text style={styles.tableCell}>{total}</Text>
      <Text style={styles.tableCell}>
        {group.age_mean ?? "N/A"} ± {group.age_std ?? "N/A"}
      </Text>
      <Text style={styles.tableCell}>
        {group.bmi_mean ?? "N/A"} ± {group.bmi_std ?? "N/A"}
      </Text>
      <Text style={styles.tableCell}>
        {total
          ? `${male} (${((male / total) * 100).toFixed(1)}%) / ${female} (${(
              (female / total) * 100
            ).toFixed(1)}%)`
          : "N/A"}
      </Text>
    </View>
  );
};

/**
 * 🔑 샘플링 커버리지 테이블: Subgroup | Total | Used | Percent Used
 */
const renderSamplingCoverageTable = (title, counts, used, groupKey) => {
  const subgroups = VALUES_MAP[groupKey] || [];
  const filteredKeys = subgroups.filter((k) => counts[k] !== undefined);
  if (filteredKeys.length === 0) return null;

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[styles.subtitle, { marginBottom: 5, fontSize: 10 }]}>
        {title} (Sampling Coverage)
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, { fontSize: 8 }]}>Subgroup</Text>
          <Text style={[styles.tableHeader, { fontSize: 8 }]}>Total</Text>
          <Text style={[styles.tableHeader, { fontSize: 8 }]}>Used</Text>
          <Text style={[styles.tableHeader, { fontSize: 8 }]}>
            Percent Used
          </Text>
        </View>
        {filteredKeys.map((key) => {
          const total = counts[key] || 0;
          const usedKey = `${groupKey}_${key}`;
          const usedEntry = used?.[usedKey];
          const usedCount =
            typeof usedEntry === "number"
              ? usedEntry
              : usedEntry?.n || 0;
          const percent = total > 0 ? (usedCount / total) * 100 : 0;
          return (
            <View key={key} style={styles.tableRow}>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {groupDisplayNames[key] || key}
              </Text>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>{total}</Text>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {usedCount}
              </Text>
              <Text style={[styles.tableCell, { fontSize: 8 }]}>
                {percent.toFixed(1)}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const renderPageHeader = (extraInfo, tf) => {
  const samplingMode = extraInfo.sampling_mode || "auto";
  const samplingModeText = samplingMode === "auto" 
    ? tf("자동", "Auto") 
    : tf("수동", "Manual");
  
  return (
    <View style={styles.header} fixed>
      <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/logo/new_logo.jpg`} />
      <Text style={styles.title}>
        {tf("SOMNIA 성능 평가 보고서", "SOMNIA Performance Report")}
      </Text>
      <View style={styles.rightText}>
        <Text>
          {tf("제출 번호", "Submission No.")} : {extraInfo.submit_num || "N/A"}
        </Text>
        <Text>
          {tf("제출 일시", "Submission Date")} : {formatDate(extraInfo.submit_time)}
        </Text>
        <Text>
          {tf("샘플링 방식", "Sampling Mode")} : {samplingModeText}
        </Text>
      </View>
    </View>
  );
};

const WrappedPage = ({ extraInfo, tf, children, wrap = true, ...rest }) => (
  <Page size="A4" style={styles.page} wrap={wrap} {...rest}>
    {renderPageHeader(extraInfo, tf)}
    {children}
  </Page>
);

const getBlandAltmanPlotPages = (imageSrcMap, parameter, tf) => {
  const specs = [
    {
      mapKey: "overall_plot",
      label: tf("전체 코호트", "Overall (full cohort)"),
    },
    {
      mapKey: "bmi_plot",
      label: tf("BMI (비만 vs 비비만)", "BMI (obese vs non-obese)"),
    },
    {
      mapKey: "age_plot",
      label: tf("연령 (성인 vs 소아)", "Age (adult vs child)"),
    },
    {
      mapKey: "severity_plot",
      label: tf("OSA Severity (층별)", "OSA Severity (by stratum)"),
    },
    {
      mapKey: "race_plot",
      label: tf("Race (층별)", "Race (by stratum)"),
    },
  ];

  return specs
    .map(({ mapKey, label }) => {
      const url = imageSrcMap?.[mapKey]?.[parameter];
      if (!url) return null;
      return { id: mapKey, label, url };
    })
    .filter(Boolean);
};

const renderSingleBlandAltmanPage = (parameter, plot, tf) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>
      Bland-Altman — {getOutputParameterLabelForReport(parameter)}
    </Text>
    <Text style={{ fontSize: 9, color: "#444", marginBottom: 10 }}>{plot.label}</Text>
    <Image
      src={plot.url}
      style={{
        width: "100%",
        height: 520,
      }}
    />
  </View>
);

const renderPediatricBandClassificationPDF = (
  performanceResults,
  stageKey,
  extraInfo,
  tf
) => {
  const pediatric = performanceResults.pediatric || {};
  const bands = getPediatricReportPerfKeys(extraInfo, pediatric);
  const stages = getSleepStageLabels(stageKey);
  if (!bands.length) return null;

  return bands.map((band) => {
    const metrics = pediatric[band] || {};
    const rangeLabel = pediatricReportRangeLabel(band, extraInfo, tf);
    const matrix = metrics[`${stageKey}_calculate_confusion_matrix`];
    if (!matrix || !matrix.some((row) => row.some((v) => v > 0))) return null;
    const opa = metrics[`${stageKey}_overall_accuracy`];
    const kappa = metrics[`${stageKey}_kappa`];
    const overallErr = Number.isFinite(opa) ? 1 - opa : null;
    return (
      <View key={`pediatric_${band}_${stageKey}`} style={styles.section} wrap={false}>
        <Text style={[styles.sectionTitle, { marginBottom: 10, marginTop: 20 }]}>
          {getOutputParameterLabelForReport(stageKey)}
          {"\n"}
          <Text style={styles.subTitleDetail}>
            [{rangeLabel} — {tf("분류 성능", "Classification performance")}]
          </Text>
        </Text>
        <View style={{ marginBottom: 10 }}>
          <Text>
            <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
            {Number.isFinite(opa) ? opa.toFixed(3) : "N/A"}
            {"  ·  "}
            <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
            {overallErr != null ? overallErr.toFixed(3) : "N/A"}
            {"  ·  "}
            <Text style={styles.bold}>Kappa:</Text>{" "}
            {Number.isFinite(kappa) ? kappa.toFixed(3) : "N/A"}
          </Text>
        </View>
        <View style={{ border: "1px solid black" }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Stage</Text>
            </View>
            {["PPA", "NPA", "1 − PPA"].map((label, idx) => (
              <View
                key={idx}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: idx < 2 ? "1px solid black" : undefined,
                  borderBottom: "1px solid black",
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{label}</Text>
              </View>
            ))}
          </View>
          {stages.map((stage, index) => {
            const ppa = metrics[`${stageKey}_class_${index}_sensitivity`];
            const npa = metrics[`${stageKey}_class_${index}_specificity`];
            const err = stageErrorRateFromPpa(ppa);
            return (
              <View key={stage} style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid black",
                    paddingVertical: 6,
                  }}
                >
                  <Text>{stage}</Text>
                </View>
                {[ppa, npa, err].map((val, idx) => (
                  <View
                    key={idx}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: idx < 2 ? "1px solid black" : undefined,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>
                      {val != null && Number.isFinite(val) ? val.toFixed(3) : "N/A"}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </View>
    );
  });
};

const renderPediatricConfusionMatricesPDF = (
  performanceResults,
  stageKey,
  extraInfo,
  tf
) => {
  const pediatric = performanceResults.pediatric || {};
  const bands = getPediatricReportPerfKeys(extraInfo, pediatric);
  const stages = getSleepStageLabels(stageKey);
  const cellSize = 45;
  if (!bands.length) return null;

  return bands
    .map((band) => {
      const metrics = pediatric[band] || {};
      const rangeLabel = pediatricReportRangeLabel(band, extraInfo, tf);
      const matrix = metrics[`${stageKey}_calculate_confusion_matrix`];
      if (!matrix || !matrix.some((row) => row.some((v) => v > 0))) return null;
      const opa = metrics[`${stageKey}_overall_accuracy`];
      const kappa = metrics[`${stageKey}_kappa`];
      return (
        <View key={`pediatric_cm_${band}_${stageKey}`} style={styles.section} wrap={false}>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
            Confusion Matrix for {getOutputParameterLabelForReport(stageKey)}
            {"\n"}
            <Text style={styles.groupLabel}>{rangeLabel}</Text>
          </Text>
          <View style={{ marginBottom: 10 }}>
            <Text>
              <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
              {Number.isFinite(opa) ? opa.toFixed(3) : "N/A"}
            </Text>
            <Text>
              <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
              {Number.isFinite(opa) ? (1 - opa).toFixed(3) : "N/A"}
            </Text>
            <Text>
              <Text style={styles.bold}>Kappa:</Text>{" "}
              {Number.isFinite(kappa) ? kappa.toFixed(3) : "N/A"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.centeredPredictionLabel}>Prediction</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={styles.verticalLabelWrapper}>
                <Text style={styles.verticalLabelRotated}>Label</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.emptyCornerCell} />
                  {stages.map((stage) => (
                    <View key={`ped-${band}-col-${stage}`} style={styles.headerCell}>
                      <Text style={styles.headerCellText}>{stage}</Text>
                    </View>
                  ))}
                </View>
                {matrix.map((row, rowIdx) => {
                  const rowSum = row.reduce((sum, v) => sum + (v || 0), 0);
                  return (
                    <View key={`ped-${band}-row-${rowIdx}`} style={{ flexDirection: "row" }}>
                      <View style={styles.headerCell}>
                        <Text style={styles.headerCellText}>{stages[rowIdx]}</Text>
                      </View>
                      {row.map((val, colIdx) => {
                        const percent = rowSum > 0 ? val / rowSum : 0;
                        const bgColor = getHeatmapColor(percent);
                        const textColor = getHeatmapTextColor(percent);
                        return (
                          <View
                            key={`ped-${band}-cell-${rowIdx}-${colIdx}`}
                            style={{
                              ...styles.heatmapCell,
                              backgroundColor: bgColor,
                              width: cellSize,
                              height: cellSize,
                            }}
                          >
                            <Text style={{ ...styles.cellValue, color: textColor }}>{val}</Text>
                            <Text
                              style={{
                                ...styles.cellPercent,
                                color: textColor,
                                opacity: textColor === "#FFFFFF" ? 0.9 : 0.75,
                              }}
                            >
                              {(percent * 100).toFixed(2)}%
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          {renderConfusionMatrixLegend()}
        </View>
      );
    })
    .filter(Boolean);
};

const REGRESSION_METRIC_HEADERS = ["RMSE", "R²", "Slope (95% CI)", "T-test"];

const hasRegressionMetrics = (data, parameter) =>
  !!data &&
  Object.keys(data).length > 0 &&
  (data[`${parameter}_rmse`] != null ||
    data[`${parameter}_r2`] != null ||
    data[`${parameter}_deming_regression`] != null);

const getOrderedSubgroupLevels = (subgroupKey, subgroupData) => {
  const known = VALUES_MAP[subgroupKey] || [];
  const present = Object.keys(subgroupData || {});
  const ordered = known.filter((level) => present.includes(level));
  present.forEach((level) => {
    if (!ordered.includes(level)) ordered.push(level);
  });
  return ordered;
};

const renderRegressionRow = (key, label, data, parameter) => {
  const slopeObj = data[`${parameter}_deming_regression`];
  const rmse = data[`${parameter}_rmse`];
  const r2 = data[`${parameter}_r2`];
  const ttest = data[`${parameter}_ttest`];
  return (
    <View
      key={key}
      style={{
        flexDirection: "row",
        borderTop: "1px solid black",
        minHeight: 25,
      }}
    >
      <View
        style={{
          flex: 3.5,
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
        }}
      >
        <Text>{label}</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
        }}
      >
        <Text>
          {rmse != null && Number.isFinite(rmse) ? rmse.toFixed(3) : "N/A"}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
        }}
      >
        <Text>
          {r2 != null && Number.isFinite(r2) ? r2.toFixed(3) : "N/A"}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
        }}
      >
        <Text>
          {formatSlopeOrIntercept(
            slopeObj?.slope,
            slopeObj?.ci_slope,
            slopeObj?.p_slope
          )}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{formatTTest(ttest)}</Text>
      </View>
    </View>
  );
};

const renderRegressionTable = (tableKey, sectionTitle, rows, parameter) => {
  if (!rows.length) return null;

  return (
    <View key={tableKey} style={[styles.section, { marginTop: 8 }]}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        {sectionTitle}
      </Text>
      <View style={{ border: "1px solid black" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 3.5,
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid black",
              paddingVertical: 8,
              borderBottom: "1px solid black",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Subgroup</Text>
          </View>
          {REGRESSION_METRIC_HEADERS.map((label, idx) => (
            <View
              key={label}
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
                borderRight: idx < REGRESSION_METRIC_HEADERS.length - 1 ? "1px solid black" : undefined,
                borderBottom: "1px solid black",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {METRIC_SHORT_LABELS[label] || label}
              </Text>
            </View>
          ))}
        </View>
        {rows.map(({ key, label, data }) =>
          renderRegressionRow(key, label, data, parameter)
        )}
      </View>
    </View>
  );
};

const SUBGROUP_PERF_KEYS = ["bmi", "severity", "race", "age"];

const getRegressionPerfBucket = (performanceResults, extraInfo, bucketKey) => {
  if (bucketKey === "overall") {
    return (
      performanceResults?.overall ||
      extraInfo?.performance_result_overall ||
      {}
    );
  }
  return (
    performanceResults?.[bucketKey] ||
    extraInfo?.[`performance_result_${bucketKey}`] ||
    {}
  );
};

const getRegressionSelectedSubgroups = (extraInfo, performanceResults) => {
  const fromExtra = extraInfo?.selected_subgroups;
  if (Array.isArray(fromExtra) && fromExtra.length > 0) {
    return fromExtra.map((sg) => String(sg).toLowerCase());
  }
  return SUBGROUP_PERF_KEYS.filter((key) => {
    const bucket = getRegressionPerfBucket(performanceResults, extraInfo, key);
    return bucket && Object.keys(bucket).length > 0;
  });
};

const buildRegressionReportSections = (extraInfo, performanceResults) => {
  if (!extraInfo?.output_user_parameters?.length) {
    return [];
  }

  const selectedSubgroups = getRegressionSelectedSubgroups(
    extraInfo,
    performanceResults
  );
  const overallData = getRegressionPerfBucket(
    performanceResults,
    extraInfo,
    "overall"
  );

  return extraInfo.output_user_parameters.flatMap((parameter) => {
    const paramLabel = getOutputParameterLabelForReport(parameter);
    const sections = [];

    if (hasRegressionMetrics(overallData, parameter)) {
      sections.push({
        id: `${parameter}-overall`,
        content: renderRegressionTable(
          `${parameter}-overall`,
          `${paramLabel} — Overall`,
          [{ key: "overall", label: "Overall", data: overallData }],
          parameter
        ),
      });
    }

    selectedSubgroups.forEach((sgKey) => {
      const sgData = getRegressionPerfBucket(
        performanceResults,
        extraInfo,
        sgKey
      );
      const sectionLabel = SUBGROUP_SECTION_LABELS[sgKey] || sgKey;
      const rows = getOrderedSubgroupLevels(sgKey, sgData)
        .map((level) => {
          const data = sgData[level] || {};
          if (!hasRegressionMetrics(data, parameter)) return null;
          return {
            key: `${sgKey}_${level}`,
            label: groupDisplayNames[level] || level,
            data,
          };
        })
        .filter(Boolean);

      const table = renderRegressionTable(
        `${parameter}-${sgKey}`,
        `${paramLabel} — ${sectionLabel}`,
        rows,
        parameter
      );
      if (table) {
        sections.push({
          id: `${parameter}-${sgKey}`,
          content: table,
        });
      }
    });

    return sections;
  });
};

// Render Regression Results: Overall + subgroup별 표 (BMI / Severity / Race)
const renderRegressionResultsPDF = (extraInfo, performanceResults) => {
  const sections = buildRegressionReportSections(extraInfo, performanceResults);
  if (!sections.length) {
    if (!performanceResults || Object.keys(performanceResults).length === 0) {
      return <Text>No regression results available.</Text>;
    }
    return <Text>No user parameters available for regression results.</Text>;
  }
  return sections;
};

/** 전체 데이터셋 분류 표 — OPA, error rate (1−OPA), Kappa + 단계별 PPA, NPA, 1−PPA */
const renderOverallClassificationMetricsPDF = (performanceResults, stageKey, tf) => {
  const overall = performanceResults.overall || {};
  const matrix = overall[`${stageKey}_calculate_confusion_matrix`];
  if (!matrix || matrix.length === 0) return null;
  if (!matrix.some((row) => row.some((v) => v > 0))) return null;

  const stages = getSleepStageLabels(stageKey);
  const opa = overall[`${stageKey}_overall_accuracy`];
  const kappa = overall[`${stageKey}_kappa`];
  const overallErr = Number.isFinite(opa) ? 1 - opa : null;

  return (
    <View key={`${stageKey}_overall_metrics`} style={styles.section} wrap={false}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        {getOutputParameterLabelForReport(stageKey)}
        {"\n"}
        <Text style={styles.subTitleDetail}>
          [{tf("전체 데이터셋", "Full dataset")} — {tf("분류 성능", "Classification performance")}]
        </Text>
      </Text>

      <View style={{ marginBottom: 10 }}>
        <Text>
          <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
          {Number.isFinite(opa) ? opa.toFixed(3) : "N/A"}
          {"  ·  "}
          <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
          {overallErr != null ? overallErr.toFixed(3) : "N/A"}
          {"  ·  "}
          <Text style={styles.bold}>Kappa:</Text>{" "}
          {Number.isFinite(kappa) ? kappa.toFixed(3) : "N/A"}
        </Text>
      </View>

      <View style={{ border: "1px solid black" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Stage</Text>
          </View>
          {["PPA", "NPA", "1 − PPA"].map((label, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRight: idx < 2 ? "1px solid black" : undefined,
                borderBottom: "1px solid black",
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{label}</Text>
            </View>
          ))}
        </View>

        {stages.map((stage, index) => {
          const ppa = overall[`${stageKey}_class_${index}_sensitivity`];
          const npa = overall[`${stageKey}_class_${index}_specificity`];
          const err = stageErrorRateFromPpa(ppa);
          return (
            <View key={stage} style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  paddingVertical: 6,
                }}
              >
                <Text>{stage}</Text>
              </View>
              {[ppa, npa, err].map((val, idx) => (
                <View
                  key={idx}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: idx < 2 ? "1px solid black" : undefined,
                    paddingVertical: 6,
                  }}
                >
                  <Text>
                    {val != null && Number.isFinite(val) ? val.toFixed(3) : "N/A"}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const renderClassificationMetricsPDF = (extraInfo, performanceResults, stageKey, tf) => {
  const stages = getSleepStageLabels(stageKey);

  const selectedSubgroups = extraInfo.selected_subgroups || [];
  const groupPairs = buildGroupPairs(selectedSubgroups);

  return groupPairs
    .filter((pair) => {
      const metrics = performanceResults[pair.subgroup]?.[pair.value];
      return !!metrics && Object.keys(metrics).length > 0;
    })
    .map((pair) => {
      const grp = performanceResults[pair.subgroup]?.[pair.value] || {};
      const opa = grp[`${stageKey}_overall_accuracy`];
      const kappa = grp[`${stageKey}_kappa`];
      const overallErr = Number.isFinite(opa) ? 1 - opa : null;
      const sectionLabel = SUBGROUP_SECTION_LABELS[pair.subgroup] || pair.subgroup;

      return (
        <View key={`${stageKey}_${pair.subgroup}_${pair.value}`} style={styles.section} wrap={false}>
          <Text style={[styles.sectionTitle, { marginBottom: 10, marginTop: 20 }]}>
            {getOutputParameterLabelForReport(stageKey)}
            {"\n"}
            <Text style={styles.subTitleDetail}>
              [{sectionLabel} - {groupDisplayNames[pair.value]}]
            </Text>
          </Text>

          <View style={{ marginBottom: 10 }}>
            <Text>
              <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
              {Number.isFinite(opa) ? opa.toFixed(3) : "N/A"}
              {"  ·  "}
              <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
              {overallErr != null ? overallErr.toFixed(3) : "N/A"}
              {"  ·  "}
              <Text style={styles.bold}>Kappa:</Text>{" "}
              {Number.isFinite(kappa) ? kappa.toFixed(3) : "N/A"}
            </Text>
          </View>

          <View style={{ border: "1px solid black" }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Stage</Text>
              </View>
              {["PPA", "NPA", "1 − PPA"].map((label, idx) => (
                <View
                  key={idx}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: idx < 2 ? "1px solid black" : undefined,
                    borderBottom: "1px solid black",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{label}</Text>
                </View>
              ))}
            </View>

            {stages.map((stage, index) => {
              const ppa = grp[`${stageKey}_class_${index}_sensitivity`];
              const npa = grp[`${stageKey}_class_${index}_specificity`];
              const err = stageErrorRateFromPpa(ppa);
              return (
                <View key={stage} style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{stage}</Text>
                  </View>
                  {[ppa, npa, err].map((val, idx) => (
                    <View
                      key={idx}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRight: idx < 2 ? "1px solid black" : undefined,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>
                        {val != null && Number.isFinite(val) ? val.toFixed(3) : "N/A"}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        </View>
      );
    });
};

const isSubItemNumber = (number) => /^\d+-\d+/.test(String(number || ""));

const renderFormattedBody = (text, bodyStyle) => {
  if (!text) return null;
  const lines = String(text).split("\n");

  return (
    <View style={bodyStyle}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <View key={`gap-${index}`} style={{ height: 5 }} />;
        }
        const isBullet = trimmed.startsWith("- ");
        return (
          <Text
            key={`line-${index}`}
            style={isBullet ? styles.infoBulletText : styles.infoItemText}
          >
            {line}
          </Text>
        );
      })}
    </View>
  );
};

const renderInfoSection = (section) => (
  <View style={styles.sectionBox} wrap>
    <Text style={styles.sectionTitle}>{section.title}</Text>
    {section.intro ? (
      <View style={styles.infoSectionIntro}>
        {renderFormattedBody(section.intro, { marginLeft: 0 })}
      </View>
    ) : null}
    {section.items.map((item, index) => {
      const isSubItem = isSubItemNumber(item.number);
      const hasHeading = Boolean(item.number || item.title);
      const headingStyle = isSubItem ? styles.infoSubItemHeading : styles.infoItemHeading;
      const bodyStyle = isSubItem ? styles.infoSubItemBody : styles.infoItemBody;
      const headingText = [item.number, item.title].filter(Boolean).join(" ");

      return (
        <View key={index} style={styles.infoItemBlock} wrap>
          {hasHeading ? (
            <Text style={headingStyle}>{headingText}</Text>
          ) : null}
          {renderFormattedBody(item.description, hasHeading ? bodyStyle : styles.infoItemBody)}
        </View>
      );
    })}
    {section.note ? (
      <View style={styles.infoItemBody}>{renderFormattedBody(section.note, { marginLeft: 0 })}</View>
    ) : null}
  </View>
);

const getHeatmapColor = (value) => {
  // 저값(오분류/희소셀)은 흰색 계열로 강하게 분리
  if (value <= 0.05) return "#FFFFFF";
  if (value <= 0.15) return "#F7FBFF";
  if (value <= 0.30) return "#DEEBF7";
  if (value <= 0.50) return "#9ECAE1";
  if (value <= 0.70) return "#4292C6";
  if (value <= 0.85) return "#2171B5";
  return "#084594";
};

const getHeatmapTextColor = (value) => (value >= 0.7 ? "#FFFFFF" : "#111111");

const renderConfusionMatrixLegend = () => {
  const levels = [
    { label: "0–5%", color: "#FFFFFF" },
    { label: "6–15%", color: "#F7FBFF" },
    { label: "16–30%", color: "#DEEBF7" },
    { label: "31–50%", color: "#9ECAE1" },
    { label: "51–70%", color: "#4292C6" },
    { label: "71–85%", color: "#2171B5" },
    { label: "86–100%", color: "#084594" },
  ];

  return (
    <View style={{ marginTop: 10, marginBottom: 20 }}>
      <Text style={[styles.bold, { marginBottom: 4 }]}>
        Confusion Matrix Cell Color Legend
      </Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {levels.map((level, idx) => (
          <View key={idx} style={{ flexDirection: "row", alignItems: "flex-start", marginRight: 10 }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: level.color,
                marginRight: 4,
                border: "1px solid #000",
              }}
            />
            <Text>{level.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const renderConfusionMatricesPDF = (extraInfo, performanceResults, stageKey, tf) => {
  const stages = getSleepStageLabels(stageKey);

  const selectedSubgroups = extraInfo.selected_subgroups || [];
  const groupPairs = buildGroupPairs(selectedSubgroups);

  const cellSize = 45;

  return groupPairs
    .filter((pair) => {
      const matrix =
        performanceResults[pair.subgroup]?.[pair.value]?.[
          `${stageKey}_calculate_confusion_matrix`
        ];
      return !!matrix && matrix.length > 0;
    })
    .map((pair) => (
      <View key={`${stageKey}_${pair.subgroup}_${pair.value}`} style={styles.section} wrap={false}>
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
          Confusion Matrix for {getOutputParameterLabelForReport(stageKey)}
          {"\n"}
          <Text style={styles.groupLabel}>
            {`${SUBGROUP_SECTION_LABELS[pair.subgroup] || pair.subgroup} - ${groupDisplayNames[pair.value]}`}
          </Text>
        </Text>

        {/* OPA / Error rate (1−OPA) / Kappa */}
        <View style={{ marginBottom: 10 }}>
          <Text>
            <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
            {(() => {
              const o = performanceResults[pair.subgroup]?.[pair.value]?.[
                `${stageKey}_overall_accuracy`
              ];
              return Number.isFinite(o) ? o.toFixed(3) : "N/A";
            })()}
          </Text>
          <Text>
            <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
            {(() => {
              const o = performanceResults[pair.subgroup]?.[pair.value]?.[
                `${stageKey}_overall_accuracy`
              ];
              return Number.isFinite(o) ? (1 - o).toFixed(3) : "N/A";
            })()}
          </Text>
          <Text>
            <Text style={styles.bold}>Kappa:</Text>{" "}
            {performanceResults[pair.subgroup]?.[pair.value]?.[
              `${stageKey}_kappa`
            ]?.toFixed(3) || "N/A"}
          </Text>
        </View>

        {/* Matrix */}
        <View style={{ alignItems: "flex-start" }}>
          <Text style={styles.centeredPredictionLabel}>Prediction</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={styles.verticalLabelWrapper}>
              <Text style={styles.verticalLabelRotated}>Label</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.emptyCornerCell} />
                {stages.map((stage) => (
                  <View key={`col-${stage}`} style={styles.headerCell}>
                    <Text style={styles.headerCellText}>{stage}</Text>
                  </View>
                ))}
              </View>
              {performanceResults[pair.subgroup]?.[pair.value]?.[
                `${stageKey}_calculate_confusion_matrix`
              ]?.map((row, rowIdx) => {
                const rowSum = row.reduce((sum, v) => sum + (v || 0), 0);
                return (
                  <View key={`row-${rowIdx}`} style={{ flexDirection: "row" }}>
                    <View style={styles.headerCell}>
                      <Text style={styles.headerCellText}>{stages[rowIdx]}</Text>
                    </View>
                    {row.map((val, colIdx) => {
                      const percent = rowSum > 0 ? val / rowSum : 0;
                      const bgColor = getHeatmapColor(percent);
                      const textColor = getHeatmapTextColor(percent);
                      return (
                        <View
                          key={`cell-${rowIdx}-${colIdx}`}
                          style={{
                            ...styles.heatmapCell,
                            backgroundColor: bgColor,
                            width: cellSize,
                            height: cellSize,
                          }}
                        >
                          <Text style={{ ...styles.cellValue, color: textColor }}>{val}</Text>
                          <Text
                            style={{
                              ...styles.cellPercent,
                              color: textColor,
                              opacity: textColor === "#FFFFFF" ? 0.9 : 0.75,
                            }}
                          >
                            {(percent * 100).toFixed(2)}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        {renderConfusionMatrixLegend()}
      </View>
    ));
};

// 전체(서브그룹 미분류) Confusion Matrix 섹션
const renderOverallConfusionMatrixPDF = (performanceResults, stageKey, tf) => {
  const stages = getSleepStageLabels(stageKey);
  const cellSize = 45;

  const overall = performanceResults.overall || {};
  const matrix = overall[`${stageKey}_calculate_confusion_matrix`];

  if (!matrix || matrix.length === 0) return null;
  const hasAny = matrix.some((row) => row.some((v) => v > 0));
  if (!hasAny) return null;

  const opa = overall[`${stageKey}_overall_accuracy`];
  const kappa = overall[`${stageKey}_kappa`];

  return (
    <View key={`${stageKey}_overall`} style={styles.section} wrap={false}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        Confusion Matrix for {getOutputParameterLabelForReport(stageKey)}
        {"\n"}
        <Text style={styles.groupLabel}>Overall (All Samples)</Text>
      </Text>

      {/* OPA / Error rate (1−OPA) / Kappa */}
      <View style={{ marginBottom: 10 }}>
        <Text>
          <Text style={styles.bold}>Overall Percent Agreement (OPA):</Text>{" "}
          {Number.isFinite(opa) ? opa.toFixed(3) : "N/A"}
        </Text>
        <Text>
          <Text style={styles.bold}>Error rate (1 − OPA):</Text>{" "}
          {Number.isFinite(opa) ? (1 - opa).toFixed(3) : "N/A"}
        </Text>
        <Text>
          <Text style={styles.bold}>Kappa:</Text>{" "}
          {Number.isFinite(kappa) ? kappa.toFixed(3) : "N/A"}
        </Text>
      </View>

      {/* Matrix */}
      <View style={{ alignItems: "flex-start" }}>
        <Text style={styles.centeredPredictionLabel}>Prediction</Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <View style={styles.verticalLabelWrapper}>
            <Text style={styles.verticalLabelRotated}>Label</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.emptyCornerCell} />
              {stages.map((stage) => (
                <View key={`overall-col-${stage}`} style={styles.headerCell}>
                  <Text style={styles.headerCellText}>{stage}</Text>
                </View>
              ))}
            </View>
            {matrix.map((row, rowIdx) => {
              const rowSum = row.reduce((sum, v) => sum + (v || 0), 0);
              return (
                <View key={`overall-row-${rowIdx}`} style={{ flexDirection: "row" }}>
                  <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>{stages[rowIdx]}</Text>
                  </View>
                  {row.map((val, colIdx) => {
                    const percent = rowSum > 0 ? val / rowSum : 0;
                    const bgColor = getHeatmapColor(percent);
                    const textColor = getHeatmapTextColor(percent);
                    return (
                      <View
                        key={`overall-cell-${rowIdx}-${colIdx}`}
                        style={{
                          ...styles.heatmapCell,
                          backgroundColor: bgColor,
                          width: cellSize,
                          height: cellSize,
                        }}
                      >
                        <Text style={{ ...styles.cellValue, color: textColor }}>{val}</Text>
                        <Text
                          style={{
                            ...styles.cellPercent,
                            color: textColor,
                            opacity: textColor === "#FFFFFF" ? 0.9 : 0.75,
                          }}
                        >
                          {(percent * 100).toFixed(2)}%
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {renderConfusionMatrixLegend()}
    </View>
  );
};

// ✅ PDF Component (Redux 훅 사용 금지)
const ReportDocument = ({
  extraInfo,
  performanceResults,
  imageSrcMap,
  tf = (ko, en) => (en ?? ko), // 기본 i18n: 영문 우선
}) => {
  const hasSleepStage5 = extraInfo?.output_user_parameters?.includes("sleep_stage_5");
  const hasSleepStage3 = extraInfo?.output_user_parameters?.includes("sleep_stage_3");
  const pediatric = isPediatricCohort(extraInfo);
  const reportInfo = getReportInfo(tf);
  const regressionSections =
    !hasSleepStage5 && !hasSleepStage3
      ? buildRegressionReportSections(extraInfo, performanceResults)
      : [];

  return (
    <Document>
      <WrappedPage extraInfo={extraInfo} tf={tf}>
        {renderInfoSection(reportInfo.analysisPurpose)}
        {renderInfoSection(reportInfo.analysisMethod)}
        {renderInfoSection(reportInfo.dataset)}
        {renderInfoSection(reportInfo.notes)}
      </WrappedPage>

      <WrappedPage extraInfo={extraInfo} tf={tf}>
        {/* Submission Details */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>{tf("제출 번호", "Submission No.")}</Text>
          <Text>{extraInfo.submit_num || "N/A"}</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>{tf("제출명", "Submission Name")}</Text>
          <Text>{extraInfo.submit_title || "N/A"}</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>
            {tf("고객명 / 기관", "Client Name / Organization")}
          </Text>
          <Text>
            {extraInfo.client_name || "N/A"} / {extraInfo.client_organization || "N/A"}
          </Text>
        </View>

        {/* Request Details */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>{tf("요청 정보", "Request Details")}</Text>

          <View style={styles.detailItemBlock}>
            <Text style={styles.detailItemLabel}>
              {tf("사용 생체신호 (입력):", "Input signals:")}
            </Text>
            <Text style={styles.detailItemText}>
              {getReadableInputNames(extraInfo.input_user_parameters)}
            </Text>
          </View>

          <View style={styles.detailItemBlock}>
            <Text style={styles.detailItemLabel}>
              {tf("분석 수면 파라미터 (출력):", "Output parameters:")}
            </Text>
            <Text style={styles.detailItemText}>
              {getReadableOutputNames(extraInfo.output_user_parameters)}
              {(() => {
                const descs =
                  reportInfo.outputParameterCalculation.items
                    ?.map((item) => (item && item.description ? String(item.description).trim() : ""))
                    .filter(Boolean) ?? [];
                if (!descs.length) return null;
                return `\n${descs.join("\n")}`;
              })()}
            </Text>
          </View>

          <View style={styles.detailItemBlock}>
            <Text style={styles.detailItemLabel}>
              {tf("분석 대상 연령대:", "Target age range:")}
            </Text>
            <Text style={styles.detailItemText}>
              {formatAnalysisAgeRangeFromExtra(extraInfo, tf)}
            </Text>
          </View>

          <View style={[styles.detailItemBlock, { marginBottom: 0 }]}>
            <Text style={styles.detailItemLabel}>
              {tf("제출 설명:", "Submit Description:")}
            </Text>
            <Text style={styles.detailItemText}>
              {(() => {
                const s = extraInfo.submit_description;
                if (s == null || String(s).trim() === "") return "N/A";
                return String(s).trim();
              })()}
            </Text>
          </View>

          {extraInfo.sampling_mode !== "manual" &&
            getNonInferiorityDescription(
              extraInfo.used_preset,
              extraInfo.preset_key,
              styles,
              tf,
              extraInfo.sampling_mode
            )}
          {renderNonInferiorityNumericDetails(extraInfo, tf)}
        </View>

        {/* Sample Characteristics */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>{tf("표본 특성", "Sample Characteristics")}</Text>

          <View style={{ marginBottom: 12 }}>
            <Text>
              <Text style={styles.bold}>{tf("전체 표본 수 (N)", "Total sample size (N)")}:</Text>{" "}
              {extraInfo.sampled_n != null && extraInfo.sampled_n !== ""
                ? String(extraInfo.sampled_n)
                : "N/A"}
            </Text>
            {extraInfo.target_sample_size != null && extraInfo.target_sample_size !== "" ? (
              <Text style={{ marginTop: 4 }}>
                <Text style={styles.bold}>{tf("목표 표본 수", "Target sample size")}:</Text>{" "}
                {String(extraInfo.target_sample_size)}
              </Text>
            ) : null}
          </View>

          {pediatric ? (
            <>
              {renderPediatricSampleCharacteristics(extraInfo, tf)}
              {extraInfo?.selected_subgroups?.some(
                (g) => g.toLowerCase() === "severity"
              ) && (
                <>
                  <Text style={[styles.subtitle, { marginTop: 5 }]}>
                    [{tf("OSA Severity 그룹", "OSA Severity Group")}]
                  </Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
                      <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
                      <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
                      <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
                      <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
                    </View>
                    {(VALUES_MAP.severity || []).map((value) =>
                      renderSampleRow(
                        `severity_${value}`,
                        groupDisplayNames[value],
                        extraInfo
                      )
                    )}
                  </View>
                </>
              )}
            </>
          ) : (
            <>
          <Text style={styles.subtitle}>[{tf("전체", "Overall")}]</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
              <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
              <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
              <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
              <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
            </View>
            {renderSampleRowByGroup(
              getFallbackOverallStats(extraInfo),
              tf("전체", "Overall")
            )}
          </View>

          {/* BMI Group */}
          {extraInfo?.selected_subgroups?.some((g) => g.toLowerCase() === "bmi") && (
            <>
              <Text style={styles.subtitle}>[{tf("BMI 그룹", "BMI Group")}]</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
                  <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
                  <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
                  <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
                  <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
                </View>
                {renderSampleRow("bmi_obese", "BMI ≥ 25", extraInfo)}
                {renderSampleRow("bmi_not_obese", "BMI < 25", extraInfo)}
              </View>
            </>
          )}

          {/* AGE Group */}
          {extraInfo?.selected_subgroups?.some((g) => g.toLowerCase() === "age") && (
            <>
              <Text style={[styles.subtitle, { marginTop: 5 }]}>[{tf("연령 그룹", "AGE Group")}]</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
                  <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
                  <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
                  <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
                  <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
                </View>
                {renderSampleRow("age_adult", groupDisplayNames.adult, extraInfo)}
                {renderSampleRow("age_child", groupDisplayNames.child, extraInfo)}
              </View>
            </>
          )}

          {/* 동적 서브그룹 테이블 */}
          {extraInfo?.selected_subgroups
            ?.filter((g) => !["bmi", "age"].includes(g.toLowerCase()))
            .map((group) => {
              const groupKey = group.toLowerCase();
              const categories = VALUES_MAP[groupKey] || [];
              return (
                <React.Fragment key={groupKey}>
                  <Text style={[styles.subtitle, { marginTop: 5 }]}>
                    [{group} {tf("그룹", "Group")}]
                  </Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>{tf("그룹", "Group")}</Text>
                      <Text style={styles.tableHeader}>{tf("표본 수", "Sample Size")}</Text>
                      <Text style={styles.tableHeader}>{tf("나이 (세)", "Age (yrs)")}</Text>
                      <Text style={styles.tableHeader}>{tf("BMI (kg/m²)", "BMI (kg/m²)")}</Text>
                      <Text style={styles.tableHeader}>{tf("성별 (남/여)", "Sex (M/F)")}</Text>
                    </View>
                    {categories.map((value) =>
                      renderSampleRow(
                        `${groupKey}_${value}`,
                        groupDisplayNames[value],
                        extraInfo
                      )
                    )}
                  </View>
                </React.Fragment>
              );
            })}
            </>
          )}
        </View>
      </WrappedPage>

      {(!pediatric ||
        extraInfo?.selected_subgroups?.some((g) => g.toLowerCase() === "severity")) && (
      <WrappedPage extraInfo={extraInfo} tf={tf}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Detailed Sampling Ratio</Text>

          {!pediatric && extraInfo?.race_count &&
            renderSamplingCoverageTable(
              "Race Coverage",
              extraInfo.race_count,
              extraInfo,
              "race"
            )}

          {extraInfo?.osa_severity_count &&
            renderSamplingCoverageTable(
              "OSA Severity Coverage",
              extraInfo.osa_severity_count,
              extraInfo,
              "severity"
            )}
        </View>
      </WrappedPage>
      )}

      {/* sleep_stage_5 — 전체(Overall) 결과를 서브그룹보다 먼저 */}
      {hasSleepStage5 && (
        <>
          {!pediatric && (
            <WrappedPage extraInfo={extraInfo} tf={tf}>
              {renderOverallClassificationMetricsPDF(performanceResults, "sleep_stage_5", tf)}
              {renderOverallConfusionMatrixPDF(performanceResults, "sleep_stage_5", tf)}
            </WrappedPage>
          )}
          {pediatric ? (
            <>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderPediatricBandClassificationPDF(
                  performanceResults,
                  "sleep_stage_5",
                  extraInfo,
                  tf
                )}
              </WrappedPage>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderPediatricConfusionMatricesPDF(
                  performanceResults,
                  "sleep_stage_5",
                  extraInfo,
                  tf
                )}
              </WrappedPage>
              {extraInfo?.selected_subgroups?.some(
                (g) => g.toLowerCase() === "severity"
              ) && (
                <>
                  <WrappedPage extraInfo={extraInfo} tf={tf}>
                    {renderClassificationMetricsPDF(
                      extraInfo,
                      performanceResults,
                      "sleep_stage_5",
                      tf
                    )}
                  </WrappedPage>
                  <WrappedPage extraInfo={extraInfo} tf={tf}>
                    {renderConfusionMatricesPDF(
                      extraInfo,
                      performanceResults,
                      "sleep_stage_5",
                      tf
                    )}
                  </WrappedPage>
                </>
              )}
            </>
          ) : (
            <>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderClassificationMetricsPDF(extraInfo, performanceResults, "sleep_stage_5", tf)}
              </WrappedPage>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderConfusionMatricesPDF(extraInfo, performanceResults, "sleep_stage_5", tf)}
              </WrappedPage>
            </>
          )}
        </>
      )}

      {/* sleep_stage_3 */}
      {hasSleepStage3 && (
        <>
          {!pediatric && (
            <WrappedPage extraInfo={extraInfo} tf={tf}>
              {renderOverallClassificationMetricsPDF(performanceResults, "sleep_stage_3", tf)}
              {renderOverallConfusionMatrixPDF(performanceResults, "sleep_stage_3", tf)}
            </WrappedPage>
          )}
          {pediatric ? (
            <>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderPediatricBandClassificationPDF(
                  performanceResults,
                  "sleep_stage_3",
                  extraInfo,
                  tf
                )}
              </WrappedPage>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderPediatricConfusionMatricesPDF(
                  performanceResults,
                  "sleep_stage_3",
                  extraInfo,
                  tf
                )}
              </WrappedPage>
              {extraInfo?.selected_subgroups?.some(
                (g) => g.toLowerCase() === "severity"
              ) && (
                <>
                  <WrappedPage extraInfo={extraInfo} tf={tf}>
                    {renderClassificationMetricsPDF(
                      extraInfo,
                      performanceResults,
                      "sleep_stage_3",
                      tf
                    )}
                  </WrappedPage>
                  <WrappedPage extraInfo={extraInfo} tf={tf}>
                    {renderConfusionMatricesPDF(
                      extraInfo,
                      performanceResults,
                      "sleep_stage_3",
                      tf
                    )}
                  </WrappedPage>
                </>
              )}
            </>
          ) : (
            <>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderClassificationMetricsPDF(extraInfo, performanceResults, "sleep_stage_3", tf)}
              </WrappedPage>
              <WrappedPage extraInfo={extraInfo} tf={tf}>
                {renderConfusionMatricesPDF(extraInfo, performanceResults, "sleep_stage_3", tf)}
              </WrappedPage>
            </>
          )}
        </>
      )}

      {/* 회귀 결과 (둘 다 없을 때) */}
      {!hasSleepStage5 && !hasSleepStage3 && (
        <>
          {regressionSections.length > 0 ? (
            regressionSections.map(({ id, content }, index) => (
              <WrappedPage
                key={`regression-${id}`}
                extraInfo={extraInfo}
                tf={tf}
                wrap={false}
              >
                <Text style={{ fontSize: 8, color: "#666", marginBottom: 6 }}>
                  {tf(
                    `회귀 성능 표 ${index + 1} / ${regressionSections.length}`,
                    `Regression table ${index + 1} of ${regressionSections.length}`
                  )}
                </Text>
                {content}
              </WrappedPage>
            ))
          ) : (
            <WrappedPage extraInfo={extraInfo} tf={tf}>
              <Text>No regression results available.</Text>
            </WrappedPage>
          )}
          {(extraInfo?.output_user_parameters || []).flatMap((parameter) =>
            getBlandAltmanPlotPages(imageSrcMap, parameter, tf).map((plot) => (
              <WrappedPage
                key={`regression-ba-${parameter}-${plot.id}`}
                extraInfo={extraInfo}
                tf={tf}
                wrap={false}
              >
                {renderSingleBlandAltmanPage(parameter, plot, tf)}
              </WrappedPage>
            ))
          )}
        </>
      )}
    </Document>
  );
};

export default ReportDocument;
