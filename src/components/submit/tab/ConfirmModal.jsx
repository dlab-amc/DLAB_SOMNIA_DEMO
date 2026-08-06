import React from "react";
import { Modal } from "@mui/material";
import S from "./ConfirmModal.styled";
import { getPresetLabelMap } from "../../../assets/data/noninferiorityText";
import { useI18n } from "../../../assets/i18n";

const ConfirmModal = ({
  open,
  message,
  onConfirm,
  onCancel,
  usedPreset,
  presetKey,
  samplingMode,
}) => {
  const { tf } = useI18n();
  const {
    Title,
    Description,
    PrimaryParam,
    Alpha,
    Power,
    Sigma,
    Delta,
    InputVars,
    OutputVars,
    Files,
    SampleSize,
    Subgroups,
    AnalysisAgeRange,
  } = message;

  const renderList = (items) => {
    if (!items) return null;
    const parts = items.split(", ");
    const visible = parts.slice(0, 3);
    const hiddenCount = parts.length - visible.length;

    return (
      <div className="value-list">
        {visible.map((item, i) => (
          <p className="value bullet" key={i}>
            {item}
          </p>
        ))}
        {hiddenCount > 0 && (
          <p className="value muted">
            {tf(`…외 ${hiddenCount}개`, `…and ${hiddenCount} more`)}
          </p>
        )}
      </div>
    );
  };

  const renderItem = (label, value, { highlight = false, muted = false } = {}) => {
    if (!value) return null;
    return (
      <div className={`modal-item${highlight ? " highlight" : ""}${muted ? " muted-item" : ""}`}>
        <p className="label">{label}</p>
        <p className={`value${muted ? " muted" : ""}`}>{value}</p>
      </div>
    );
  };

  return (
    <Modal className="submit-confirm-modal" open={open} onClose={onCancel}>
      <S.ModalContainer className="confirm-modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{tf("제출 확인", "Confirm Submission")}</h2>
          <p className="modal-desc">
            {tf(
              "아래 내용을 확인하고 제출해주세요.",
              "Please review the details below before submitting."
            )}
          </p>
        </div>

        <div className="modal-scroll">
          <div className="modal-content">
            <div className="modal-section">
              <p className="section-title">{tf("기본 정보", "Basic Info")}</p>
              {renderItem(tf("제목", "Title"), Title)}
              {renderItem(tf("설명", "Description"), Description)}
            </div>

            <div className="modal-section">
              <p className="section-title">
                {tf("파일 및 파라미터", "Files & Parameters")}
              </p>
              <div className="modal-item">
                <p className="label">{tf("입력 파라미터", "Input Parameters")}</p>
                {renderList(InputVars)}
              </div>
              <div className="modal-item">
                <p className="label">{tf("출력 파라미터", "Output Parameters")}</p>
                {renderList(OutputVars)}
              </div>
              <div className="modal-item">
                <p className="label">{tf("제출 파일", "Submitted Files")}</p>
                {renderList(Files)}
              </div>
            </div>

            <div className="modal-section">
              <p className="section-title">
                {tf("평가 기준 설정", "Evaluation Criteria")}
              </p>
              {renderItem(
                tf("분석 대상 연령대", "Target Age Range"),
                AnalysisAgeRange
              )}
              {renderItem(
                tf("서브그룹 분석 기준", "Subgroup Criteria"),
                Subgroups,
                {
                  muted:
                    Subgroups === "선택 안함" ||
                    Subgroups === "None" ||
                    Subgroups?.includes("해당 없음") ||
                    Subgroups?.includes("N/A"),
                }
              )}
            </div>

            {samplingMode !== "manual" && (
              <div className="modal-section">
                <p className="section-title">
                  {tf("비열등성 검정 설정", "Non-inferiority Settings")}
                </p>
                {renderItem(
                  tf("주 수면 분석 파라미터", "Primary Sleep Analysis Parameter"),
                  tf(
                    PrimaryParam,
                    PrimaryParam.replace("(기준값 사용)", "(Using default values)")
                  )
                )}
                <div className="modal-item">
                  <p className="label">
                    {tf("비열등성 검정 파라미터", "Non-inferiority Test Parameters")}
                  </p>
                  <div className="value-list param-grid">
                    <p className="value">Alpha: {Alpha}</p>
                    <p className="value">Power: {Power}</p>
                    <p className="value">Sigma: {Sigma}</p>
                    <p className="value">Delta: {Delta}</p>
                  </div>
                  <p className="value desc setting-method">
                    * {tf("설정 방식", "Setting method")}:{" "}
                    {usedPreset
                      ? `${tf("기준값", "Preset")} (${
                          getPresetLabelMap(tf)[presetKey] ||
                          tf("알 수 없음", "Unknown")
                        })`
                      : tf("사용자 정의값", "User defined")}
                  </p>
                </div>
              </div>
            )}

            <div className="modal-section sample-size-section">
              <p className="section-title">
                {tf("예상 샘플 수", "Estimated Sample Size")}
              </p>
              <div className="modal-item highlight sample-size-item">
                <p className="sample-size-value">
                  {(() => {
                    const raw = String(SampleSize || "");
                    const ko = raw.match(/^(\d+개)\s*(.*)$/);
                    if (ko) {
                      return (
                        <>
                          <span className="sample-size-num">{ko[1]}</span>
                          {ko[2] ? (
                            <span className="sample-size-rest"> {ko[2]}</span>
                          ) : null}
                        </>
                      );
                    }
                    const en = raw.match(/^(\d+)\s*(.*)$/);
                    if (en) {
                      return (
                        <>
                          <span className="sample-size-num">{en[1]}</span>
                          {en[2] ? (
                            <span className="sample-size-rest"> {en[2]}</span>
                          ) : null}
                        </>
                      );
                    }
                    return <span className="sample-size-num">{raw}</span>;
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-button-wrap">
          <button type="button" className="cancel-button" onClick={onCancel}>
            {tf("취소", "Cancel")}
          </button>
          <button type="button" className="confirm-button" onClick={onConfirm}>
            {tf("확인", "Confirm")}
          </button>
        </div>
      </S.ModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
