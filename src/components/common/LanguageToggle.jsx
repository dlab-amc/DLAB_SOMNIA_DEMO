import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import { toggleLanguage } from "../../stores/i18n/i18n.slice";
import { useI18n } from "../../assets/i18n";

const ToggleWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 0.75rem;
  overflow: visible;
  z-index: 220;

  @media (max-width: 1280px) {
    margin-left: 0.35rem;
  }

  @media (max-width: 1100px) {
    margin-left: 0;
  }

  .lang-tooltip {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    left: auto;
    z-index: 10050;
    transform: translateY(4px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    padding: 0.4rem 0.65rem;
    border-radius: 6px;
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
    white-space: nowrap;
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;

    &::before {
      content: '';
      position: absolute;
      right: 16px;
      left: auto;
      bottom: 100%;
      border: 5px solid transparent;
      border-bottom-color: #0f172a;
    }
  }

  /* hover만 표시 — click 후 focus 잔존으로 툴팁이 남지 않게 */
  &:hover .lang-tooltip,
  &:has(:focus-visible) .lang-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const Pill = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  padding: 5px 10px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Knob = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #0094ff;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: -0.01em;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const LanguageToggle = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((s) => s.i18nSlice.language);
  const { tf } = useI18n();
  const tooltipText =
    language === "en"
      ? tf("한국어로 변경", "Switch to Korean")
      : tf("영어로 변경", "Switch to English");

  return (
    <ToggleWrap>
      <Pill
        type="button"
        onClick={(e) => {
          dispatch(toggleLanguage());
          // 클릭 후 포커스 잔존으로 툴팁이 남지 않도록
          e.currentTarget.blur();
        }}
        aria-label={tooltipText}
      >
        <Knob>{language === "en" ? "EN" : "KO"}</Knob>
        <Label>
          {language === "en"
            ? tf("영어", "English")
            : tf("한국어", "Korean")}
        </Label>
      </Pill>
      <span className="lang-tooltip" role="tooltip">
        {tooltipText}
      </span>
    </ToggleWrap>
  );
};

export default LanguageToggle;
