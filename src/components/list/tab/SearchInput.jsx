import React from "react";
import S from "./Filters.styled";
import { ReactComponent as Search } from "../../../assets/resource/icons/search.svg";
import { useAppDispatch, useAppSelector } from "../../../assets/hooks/useRedux";
import {
  changeInputSearch,
  searchValues,
} from "../../../stores/list/list.slice";
import { useI18n } from "../../../assets/i18n";

const SearchInput = ({ page }) => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const { searchField, searchValue } = useAppSelector(
    (state) => state.listSlice
  );

  const handleChangeInput = (e) => {
    dispatch(changeInputSearch(e.target.value));
  };

  const handleSubmitSearchForm = (e) => {
    e.preventDefault();
    dispatch(
      searchValues({
        field: searchField,
        value: searchValue,
      })
    );
  };

  return (
    <S.SearchInputContainer className="search-input">
      <form className="search-form" onSubmit={handleSubmitSearchForm}>
        <div className="search-input-wrap">
          <input
            className="input"
            type="text"
            placeholder={page === "submit" ? tf("제출명 및 설명","Title or description") : tf("검색어 입력","Enter keyword")}
            value={searchValue}
            onChange={handleChangeInput}
          />
        </div>
        <div className="search-button-wrap">
          <button className="search-button">
            <Search />
          </button>
        </div>
      </form>
    </S.SearchInputContainer>
  );
};

export default SearchInput;
