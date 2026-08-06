import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import enUS from 'date-fns/locale/en-US';
import 'react-datepicker/dist/react-datepicker.css';
import S from './Filters.styled';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/useRedux';
import { setDateFilter } from '../../../stores/list/list.slice';
import { getDateString } from '../../../assets/module/module';
import { useI18n } from '../../../assets/i18n';

const DatePickerTab = ({ page }) => {
  const { language, tf } = useI18n();
  const dispatch = useAppDispatch();
  const [startDateObj, setStartDateObj] = useState(null);
  const [endDateObj, setEndDateObj] = useState(null);
  const { startDate, endDate } = useAppSelector((state) => state.listSlice);

  const dpLocale = language === 'en' ? enUS : ko;

  const handleChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDateObj(start);
    setEndDateObj(end);
    dispatch(
      setDateFilter({
        startDate: getDateString(start),
        endDate: getDateString(end),
      })
    );
  };

  const isNotificationPage =
    typeof page === 'string' && page.endsWith('Notification');

  return (
    <S.DatePickerContainer
      className={`date-picker-wrap ${isNotificationPage ? 'notification-date' : ''}`}
    >
      <DatePicker
        key={language}
        className={`date-picker ${startDate && endDate ? 'active' : ''}`}
        locale={dpLocale}
        dateFormat='yy. MM. dd'
        dateFormatCalendar='yyyy. MM'
        selectsRange
        isClearable
        fixedHeight
        showPreviousMonths
        showPopperArrow={false}
        monthsShown={2}
        popperPlacement={isNotificationPage ? 'bottom-end' : 'bottom-start'}
        selected={startDateObj}
        onChange={handleChangeDate}
        startDate={startDateObj}
        endDate={endDateObj}
        minDate={new Date(2022, 9, 1)}
        maxDate={new Date()}
        placeholderText={tf('조회 기간 선택','Select date range')}
        formatWeekDay={(nameOfDay) =>
          language === 'en'
            ? nameOfDay.slice(0, 1).toUpperCase()
            : nameOfDay.slice(0, 1)
        }
      />
    </S.DatePickerContainer>
  );
};

export default DatePickerTab;
