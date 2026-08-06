import React, { useEffect, useRef, useState } from 'react';
import S from './Filters.styled';
import { SEARCH_VALUE } from '../../../assets/data/data';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/useRedux';
import { selectSearchField } from '../../../stores/list/list.slice';
import { ReactComponent as Check } from '../../../assets/resource/icons/check.svg';
import { useI18n } from '../../../assets/i18n';

const SearchSelect = ({ page }) => {
  // page = task | user
  const { tf } = useI18n();
  const selectRef = useRef(null);
  const dispatch = useAppDispatch();
  const { searchField } = useAppSelector((state) => state.listSlice);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleClickButton = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickElement = (element) => {
    dispatch(selectSearchField(element));
    setDropdownVisible(false);
  };

  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <S.SearchSelectContainer ref={selectRef} className="search-select">
      <button
        className={`select-button ${isDropdownVisible && 'open'}`}
        onClick={handleClickButton}
      >
        <span className="text">{tf(searchField?.name, searchField?.name_eng)}</span>
      </button>
      {isDropdownVisible && (
        <ul className="select-dropdown">
          {SEARCH_VALUE[page].map((el) => (
            <li
              className={`select-element ${
                searchField.id === el.id && 'selected'
              }`}
              key={el.id}
              data-value={el.value}
              onClick={() => handleClickElement(el)}
            >
              {searchField.id === el.id && <Check className="check" />}
              {tf(el.name, el.name_eng)}
            </li>
          ))}
        </ul>
      )}
    </S.SearchSelectContainer>
  );
};

export default SearchSelect;
