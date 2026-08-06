import styled from 'styled-components';
import calendar from '../../../assets/resource/icons/calendar.svg';
import expand from '../../../assets/resource/icons/expand.svg';

const S = {};

const point = '#0094ff';
const pointSoft = 'rgba(0, 148, 255, 0.12)';
const border = '#e2e8f0';
const borderStrong = '#cbd5e1';
const text = '#334155';
const textMuted = '#64748b';

S.SortFilterContainer = styled.div`
  margin-right: 1rem;

  .sort-button {
    cursor: pointer;
    box-sizing: border-box;
    background-color: #fafbfc;
    color: ${text};
    border: 1px solid ${borderStrong};
    border-radius: 8px;
    padding: 0.5rem 0.85rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    font-family: inherit;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease,
      box-shadow 0.15s ease;

    .text {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: -0.02em;
    }

    svg {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
    }

    svg path {
      fill: currentColor;
    }

    &:hover {
      background-color: #fff;
      border-color: ${point};
      color: #0f172a;
      box-shadow: 0 0 0 1px rgba(0, 148, 255, 0.12);
    }

    &:focus-visible {
      outline: 2px solid rgba(0, 148, 255, 0.45);
      outline-offset: 2px;
    }
  }
`;

S.StatusFilterContainer = styled.div`
  position: relative;
  margin-right: 0;

  .status-button {
    cursor: pointer;
    box-sizing: border-box;
    background-color: #fafbfc;
    color: ${textMuted};
    border: 1px solid ${borderStrong};
    border-radius: 8px;
    padding: 0.5rem 0.95rem;
    font-family: inherit;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease,
      box-shadow 0.15s ease;

    .text {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: -0.02em;
    }

    &.open {
      color: ${text};
      border-color: ${point};
      background-color: #fff;
      box-shadow: 0 0 0 1px rgba(0, 148, 255, 0.15);
    }

    &.active:not(.open) {
      color: #0f172a;
      border-color: ${borderStrong};
      background-color: ${pointSoft};
    }

    &:hover {
      border-color: ${point};
      color: #0f172a;
    }

    &:focus-visible {
      outline: 2px solid rgba(0, 148, 255, 0.45);
      outline-offset: 2px;
    }
  }

  .dropdown-wrap {
    z-index: 120;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem 0.85rem;
    width: 17.5rem;
    max-width: min(17.5rem, calc(100vw - 2rem));
    background-color: #fff;
    padding: 0.85rem 1rem;
    border: 1px solid ${border};
    border-radius: 10px;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);

    .status-wrap {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      min-width: 0;

      .input {
        display: none;

        &:checked + .checkbox {
          background-color: ${point};
          border-color: ${point};
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .checkbox {
        cursor: pointer;
        flex-shrink: 0;
        display: inline-flex;
        width: 1.125rem;
        height: 1.125rem;
        background-color: #fff;
        border: 1px solid ${borderStrong};
        border-radius: 4px;
        transition: background-color 0.12s ease, border-color 0.12s ease;
      }

      .checkbox svg {
        width: 10px;
        height: 8px;
      }

      .label {
        font-weight: 600;
        font-size: 13px;
        color: ${text};
        letter-spacing: -0.02em;
        cursor: pointer;
      }
    }
  }
`;

S.DatePickerContainer = styled.div`
  position: relative;
  margin-right: 0;

  .react-datepicker-wrapper {
    position: relative;
    display: block;
  }

  .date-picker {
    width: 100%;
    min-width: 200px;
    max-width: 260px;
    box-sizing: border-box;
    display: block;
    border: 1px solid ${borderStrong};
    padding: 0.5rem 0.85rem 0.5rem 2.5rem;
    border-radius: 8px;
    font-size: 13px;
    letter-spacing: -0.02em;
    font-weight: 600;
    font-family: inherit;
    color: ${text};
    background-color: #fafbfc;
    transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;

    &::placeholder {
      color: #94a3b8;
      font-weight: 500;
    }

    &:hover {
      background-color: #fff;
      border-color: ${point};
    }

    &:focus {
      outline: none;
      border-color: ${point};
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.12);
    }

    &.active {
      border-color: ${point};
      background-color: #fff;
    }
  }

  .react-datepicker__input-container {
    position: relative;

    &::before {
      position: absolute;
      top: 50%;
      left: 0.75rem;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 1rem;
      height: 1rem;
      background-image: url(${calendar});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.75;
      pointer-events: none;
      z-index: 1;
    }
  }

  .react-datepicker-popper {
    z-index: 120 !important;
  }

  .react-datepicker {
    font-family: inherit !important;
    font-size: 0.8125rem !important;
    border: 1px solid ${border} !important;
    border-radius: 12px !important;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12) !important;
    overflow: hidden;
  }

  .react-datepicker__header {
    background-color: #f8fafc !important;
    border-bottom: 1px solid ${border} !important;
  }

  .react-datepicker__navigation {
    top: 8px !important;
    width: 22px !important;
    height: 22px !important;
  }

  .react-datepicker__navigation--previous {
    left: 4px !important;
  }

  .react-datepicker__navigation--next {
    right: 4px !important;
  }

  .react-datepicker__navigation-icon {
    font-size: 12px !important;
    top: 0 !important;
  }

  .react-datepicker__navigation .react-datepicker__navigation-icon::before {
    border-width: 2px 2px 0 0 !important;
    width: 6px !important;
    height: 6px !important;
    top: 5px !important;
  }

  .react-datepicker__navigation-icon--next::before {
    left: -5px !important;
  }

  .react-datepicker__navigation-icon--previous::before {
    right: -5px !important;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #475569 !important;
    font-weight: 600 !important;
  }

  .react-datepicker__header,
  .react-datepicker__month {
    padding: 10px 8px !important;
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0 !important;
    border-top-left-radius: 10px !important;
  }

  .react-datepicker__month-container:last-child .react-datepicker__header {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 10px !important;
  }

  .react-datepicker__day:hover:not([aria-disabled='true']):not(.react-datepicker__day--disabled) {
    background-color: rgba(0, 148, 255, 0.12) !important;
    border-radius: 6px !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${point} !important;
    color: #fff !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
  }

  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: ${pointSoft} !important;
    color: #0f172a !important;
  }

  .react-datepicker__day--keyboard-selected:not(.react-datepicker__day--in-range):not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end) {
    background-color: rgba(0, 148, 255, 0.22) !important;
    color: #0f172a !important;
  }

  .react-datepicker__close-icon {
    padding-right: 10px !important;
  }

  .react-datepicker__close-icon::after {
    background-color: transparent !important;
    color: ${textMuted} !important;
    font-size: 1.25rem !important;
    line-height: 1 !important;
    padding: 0 !important;
  }

  &.notification-date {
    margin-right: 0;
  }
`;

S.SearchSelectContainer = styled.div`
  z-index: 3;
  position: relative;
  margin-right: 1rem;

  .select-button {
    position: relative;
    width: 6rem;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #fafbfc;
    color: ${text};
    border: 1px solid ${borderStrong};
    border-radius: 8px;
    padding: 0.5rem 1.1rem;
    font-family: inherit;
    transition: border-color 0.15s ease, background-color 0.15s ease;

    .text {
      font-weight: 600;
      font-size: 13px;
      margin-left: -1rem;
      letter-spacing: -0.02em;
    }

    &.open {
      border-color: ${point};
      background-color: #fff;
      box-shadow: 0 0 0 1px rgba(0, 148, 255, 0.12);

      &::after {
        transform: scale(0.9) translateY(-50%) rotate(270deg);
      }
    }

    &:hover {
      border-color: ${point};
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: scale(0.9) translateY(-50%) rotate(90deg);
      width: 1.2rem;
      height: 1rem;
      background-image: url(${expand});
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .select-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background-color: #fff;
    color: ${text};
    border: 1px solid ${border};
    border-radius: 8px;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.1);
    overflow: hidden;
    min-width: 100%;

    .select-element {
      position: relative;
      cursor: pointer;
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      padding: 0.55rem 1.5rem;
      border-bottom: 1px solid ${border};
      transition: background-color 0.12s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: ${pointSoft};
      }

      &.selected {
        cursor: default;
        background-color: ${point};
        color: #fff;
        font-weight: 700;
      }

      .check {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        path {
          stroke: #fff;
        }
      }
    }
  }
`;

S.SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  max-width: 22rem;

  .search-form {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${borderStrong};
    border-radius: 8px;
    background-color: #fafbfc;
    overflow: hidden;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

    &:focus-within {
      border-color: ${point};
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(0, 148, 255, 0.1);
    }
  }

  .search-input-wrap {
    flex: 1;
    min-width: 0;

    .input {
      width: 100%;
      min-width: 10rem;
      max-width: 18rem;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      color: ${text};
      font-weight: 600;
      font-size: 13px;
      letter-spacing: -0.02em;
      padding: 0.5rem 0.65rem;
      padding-right: 2.25rem;
      font-family: inherit;

      &::placeholder {
        color: #94a3b8;
        font-weight: 500;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .search-button-wrap {
    position: absolute;
    top: 50%;
    right: 0.35rem;
    transform: translateY(-50%);

    .search-button {
      cursor: pointer;
      padding: 0.35rem;
      border: none;
      border-radius: 6px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${pointSoft};
      }

      svg {
        width: 1rem;
        height: 1rem;

        path {
          fill: ${textMuted};
        }
      }

      &:hover svg path {
        fill: ${point};
      }
    }
  }
`;

export default S;
