import React from "react";
import S from "./Filters.styled";
import { useAppDispatch, useAppSelector } from "../../../assets/hooks/useRedux";
import { SORT_TYPE } from "../../../assets/data/data";
import { ReactComponent as Desc } from "../../../assets/resource/icons/desc.svg";
import { ReactComponent as Asc } from "../../../assets/resource/icons/asc.svg";
import { changeSort } from "../../../stores/list/list.slice";
import { useI18n } from "../../../assets/i18n";

const SortFilter = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.listSlice.sort);

  const handleClickButton = (sortType) => {
    if (!sortType) return;
    dispatch(changeSort(sortType));
  };

  return (
    <S.SortFilterContainer className="sort-filter">
      {sort === SORT_TYPE.DESC ? (
        <button
          className="sort-button"
          onClick={() => handleClickButton(SORT_TYPE.ASC)}
        >
          <Desc />
          <span className="text">{tf('최신순','Newest')}</span>
        </button>
      ) : (
        <button
          className="sort-button"
          onClick={() => handleClickButton(SORT_TYPE.DESC)}
        >
          <Asc />
          <span className="text">{tf('등록순','Oldest')}</span>
        </button>
      )}
    </S.SortFilterContainer>
  );
};

export default SortFilter;
