import React, { useMemo, useState } from "react";
import S from "./GuideMock.styled";
import predefinedParamSets from "../../../assets/data/noninferiorityParams";
import { useI18n } from "../../../assets/i18n";

const MOCK_PRIMARY_PARAMS = [
  {
    key: "sleep_stage_5",
    label_ko: "Sleep Staging (5-class)",
    label_en: "Sleep Staging (5-class)",
  },
  {
    key: "ahi",
    label_ko: "AHI",
    label_en: "AHI",
  },
  {
    key: "tst",
    label_ko: "TST",
    label_en: "TST",
  },
  {
    key: "se",
    label_ko: "SE",
    label_en: "SE",
  },
];

const GuideMockSampleCriteria = () => {
  const { tf } = useI18n();
  const [samplingMode, setSamplingMode] = useState("auto");
  const [selectedPreset, setSelectedPreset] = useState("accuracy");
  const [primaryParameter, setPrimaryParameter] = useState("sleep_stage_5");
  const [openPreset, setOpenPreset] = useState(false);
  const [openPrimary, setOpenPrimary] = useState(false);
  const [manualSampleSize, setManualSampleSize] = useState("64");
  const [values, setValues] = useState({
    alpha: predefinedParamSets.accuracy.alpha,
    power: predefinedParamSets.accuracy.power,
    sigma: predefinedParamSets.accuracy.sigma,
    delta: predefinedParamSets.accuracy.delta,
  });

  const presetEntries = useMemo(
    () => Object.entries(predefinedParamSets),
    []
  );

  const applyPreset = (key) => {
    setSelectedPreset(key);
    setOpenPreset(false);
    if (key !== "custom" && predefinedParamSets[key]) {
      const p = predefinedParamSets[key];
      setValues({
        alpha: p.alpha,
        power: p.power,
        sigma: p.sigma,
        delta: p.delta,
      });
    }
  };

  const presetLabel = (() => {
    if (selectedPreset === "custom") return tf("직접 입력", "Custom input");
    const p = predefinedParamSets[selectedPreset];
    if (!p) return `-- ${tf("기준값 선택", "Select Preset")} --`;
    return `${tf(p.label, p.label_eng)} (α=${p.alpha}, β=${p.power}, σ=${p.sigma}, Δ=${p.delta})`;
  })();

  const selectedPrimary = MOCK_PRIMARY_PARAMS.find(
    (p) => p.key === primaryParameter
  );

  return (
    <S.Frame>
      <S.SampleCard>
        <div className="section-heading">
          <span className="section-num">2</span>
          <h4 className="section-title">
            {tf("샘플 수 계산 기준", "Sample Size Criteria")}
          </h4>
        </div>

        <div className="mode-toggle" role="group">
          <button
            type="button"
            className={samplingMode === "auto" ? "is-active" : ""}
            onClick={() => setSamplingMode("auto")}
          >
            {tf("비열등성 기반 자동 샘플링", "Auto (non-inferiority based)")}
          </button>
          <button
            type="button"
            className={samplingMode === "manual" ? "is-active" : ""}
            onClick={() => setSamplingMode("manual")}
          >
            {tf("직접 샘플 수 입력", "Manual sample size")}
          </button>
        </div>

        {samplingMode === "manual" ? (
          <div className="mock-field field-full">
            <label className="mock-label">
              * {tf("원하는 샘플 수", "Desired sample size")}
            </label>
            <input
              className="mock-control"
              value={manualSampleSize}
              onChange={(e) =>
                setManualSampleSize(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>
        ) : (
          <>
            <div className="mock-field field-full">
              <label className="mock-label">
                * {tf("기준값 선택", "Select Preset")}
              </label>
              <button
                type="button"
                className="mock-control guide-highlight"
                onClick={() => {
                  setOpenPreset((v) => !v);
                  setOpenPrimary(false);
                }}
              >
                {presetLabel}
              </button>
              {openPreset && (
                <div className="preset-panel">
                  {presetEntries.map(([key, val]) => (
                    <button
                      type="button"
                      key={key}
                      className={`preset-option${
                        selectedPreset === key ? " is-selected" : ""
                      }`}
                      onClick={() => applyPreset(key)}
                    >
                      <span className="opt-title">
                        {tf(val.label, val.label_eng)}
                      </span>
                      <span className="opt-meta">
                        α={val.alpha}, β={val.power}, σ={val.sigma}, Δ=
                        {val.delta}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`preset-option${
                      selectedPreset === "custom" ? " is-selected" : ""
                    }`}
                    onClick={() => applyPreset("custom")}
                  >
                    <span className="opt-title">
                      {tf("직접 입력", "Custom input")}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="field-grid">
              <div className="mock-field">
                <label className="mock-label">
                  * {tf("주 파라미터", "Primary Parameter")}
                </label>
                <button
                  type="button"
                  className="mock-control guide-highlight"
                  onClick={() => {
                    setOpenPrimary((v) => !v);
                    setOpenPreset(false);
                  }}
                >
                  {selectedPrimary
                    ? tf(selectedPrimary.label_ko, selectedPrimary.label_en)
                    : tf("-- 선택 --", "-- Select --")}
                </button>
                {openPrimary && (
                  <div className="preset-panel">
                    <button
                      type="button"
                      className="preset-option"
                      onClick={() => {
                        setPrimaryParameter("");
                        setOpenPrimary(false);
                      }}
                    >
                      <span className="opt-title">
                        {tf("-- 선택 --", "-- Select --")}
                      </span>
                    </button>
                    {MOCK_PRIMARY_PARAMS.map((p) => (
                      <button
                        type="button"
                        key={p.key}
                        className={`preset-option${
                          primaryParameter === p.key ? " is-selected" : ""
                        }`}
                        onClick={() => {
                          setPrimaryParameter(p.key);
                          setOpenPrimary(false);
                        }}
                      >
                        <span className="opt-title">
                          {tf(p.label_ko, p.label_en)}
                        </span>
                        <span className="opt-meta">{p.key}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mock-field">
                <label className="mock-label">
                  * {tf("허용 오차 비율 (α)", "Error tolerance ratio (α)")}
                </label>
                <input
                  className="mock-control"
                  type="number"
                  value={values.alpha}
                  disabled={selectedPreset !== "custom"}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, alpha: e.target.value }))
                  }
                />
              </div>

              <div className="mock-field">
                <label className="mock-label">
                  * {tf("평가 신뢰 수준 (1 - β)", "Confidence level (1 - β)")}
                </label>
                <input
                  className="mock-control"
                  type="number"
                  value={values.power}
                  disabled={selectedPreset !== "custom"}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, power: e.target.value }))
                  }
                />
              </div>

              <div className="mock-field">
                <label className="mock-label">
                  * {tf("오차 표준편차 (σ)", "Error standard deviation (σ)")}
                </label>
                <input
                  className="mock-control"
                  type="number"
                  value={values.sigma}
                  disabled={selectedPreset !== "custom"}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, sigma: e.target.value }))
                  }
                />
              </div>

              <div className="mock-field">
                <label className="mock-label">
                  *{" "}
                  {tf(
                    "허용 가능한 최대 오차 (Δ)",
                    "Maximum allowable error (Δ)"
                  )}
                </label>
                <input
                  className="mock-control"
                  type="number"
                  value={values.delta}
                  disabled={selectedPreset !== "custom"}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, delta: e.target.value }))
                  }
                />
              </div>
            </div>
          </>
        )}
      </S.SampleCard>
    </S.Frame>
  );
};

export default GuideMockSampleCriteria;
