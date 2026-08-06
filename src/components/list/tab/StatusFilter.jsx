import React, { useEffect, useRef, useState } from "react";
import S from "./Filters.styled";
import { useAppDispatch } from "../../../assets/hooks/useRedux";
import { setStateFilter } from "../../../stores/list/list.slice";
import { ReactComponent as Check } from "../../../assets/resource/icons/check.svg";
import { useI18n } from "../../../assets/i18n";
import { SUBMIT_STATUS_FILTER_OPTIONS } from "../../../assets/data/submitStatus";

const initialChecked = () => ({
  total: true,
  ...Object.fromEntries(
    SUBMIT_STATUS_FILTER_OPTIONS.map((opt) => [opt.key, false])
  ),
});

const StatusFilter = () => {
  const { tf } = useI18n();
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isFilterActive, setFilterActive] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFilterChecked, setFilterChecked] = useState(initialChecked);

  const handleClickButton = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleChangeInput = (e) => {
    const { name, checked } = e.target;

    const currentChecked = Object.values(isFilterChecked).filter(Boolean).length;
    if (currentChecked === 1 && !checked) return;

    if (name === "total") {
      setFilterChecked(initialChecked());
    } else {
      setFilterChecked((prev) => ({
        ...prev,
        [name]: checked,
        total: false,
      }));
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  useEffect(() => {
    const selectedCodes = SUBMIT_STATUS_FILTER_OPTIONS.filter(
      (opt) => isFilterChecked[opt.key]
    ).map((opt) => opt.code);

    if (selectedCodes.length === 0) {
      setFilterActive(false);
      dispatch(setStateFilter(""));
    } else {
      setFilterActive(true);
      // 백엔드: filter 문자열의 각 자리가 progress_status 코드
      dispatch(setStateFilter(selectedCodes.join("")));
    }
  }, [isFilterChecked, dispatch]);

  const activeCount = Object.values(isFilterChecked).filter(Boolean).length;

  return (
    <S.StatusFilterContainer ref={dropdownRef} className="status-filter">
      <button
        className={`status-button ${isDropdownVisible && "open"} ${
          isFilterActive && "active"
        }`}
        onClick={handleClickButton}
      >
        <span className="text">
          {tf("필터", "Filter")}
          {isFilterActive && ` (${activeCount})`}
        </span>
      </button>
      {isDropdownVisible && (
        <div className="dropdown-wrap">
          <div className="status-wrap">
            <input
              className="input"
              type="checkbox"
              name="total"
              id="totalStatus"
              checked={isFilterChecked.total}
              onChange={handleChangeInput}
            />
            <label className="checkbox" htmlFor="totalStatus">
              {isFilterChecked.total && <Check />}
            </label>
            <label className="label" htmlFor="totalStatus">
              {tf("전체", "All")}
            </label>
          </div>
          {SUBMIT_STATUS_FILTER_OPTIONS.map((opt) => {
            const id = `${opt.key}Status`;
            return (
              <div className="status-wrap" key={opt.key}>
                <input
                  className="input"
                  type="checkbox"
                  name={opt.key}
                  id={id}
                  checked={!!isFilterChecked[opt.key]}
                  onChange={handleChangeInput}
                />
                <label className="checkbox" htmlFor={id}>
                  {isFilterChecked[opt.key] && <Check />}
                </label>
                <label className="label" htmlFor={id}>
                  {tf(opt.ko, opt.en)}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </S.StatusFilterContainer>
  );
};

export default StatusFilter;
