import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/useRedux";
import S from "./Pagination.styled";
import { ReactComponent as Arrow } from "../../assets/resource/icons/expand.svg";
import { movePageIndex } from "../../stores/list/list.slice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPageIndex, totalPageIndex } = useAppSelector(
    (state) => state.listSlice
  );
  const [currentIndexSet, setCurrentIndexSet] = useState([1, 2, 3, 4, 5]);
  const [isPrevDisabled, setPrevDisabled] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    // Initialize IndexSet

    if (totalPageIndex < 5) {
      const indexedArr = new Array(totalPageIndex)
        .fill("")
        .map((_, index) => index + 1);
      setCurrentIndexSet(indexedArr);
    } else {
      setCurrentIndexSet([1, 2, 3, 4, 5]);
    }
  }, [totalPageIndex]);

  useEffect(() => {
    if (currentIndexSet[0] === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    if (currentIndexSet[currentIndexSet.length - 1] === totalPageIndex) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [currentPageIndex, currentIndexSet, totalPageIndex]);

  const handleClickIndex = (number) => {
    if (number > 0 && number <= totalPageIndex) {
      dispatch(movePageIndex(number));
    }
  };

  const handleClickNext = () => {
    const pageSetSize = currentIndexSet.length;
    const lastPageInCurrentSet = currentIndexSet[currentIndexSet.length - 1];

    if (lastPageInCurrentSet + pageSetSize <= totalPageIndex) {
      const nextArr = currentIndexSet.map((el) => el + pageSetSize);
      setCurrentIndexSet(nextArr);
      dispatch(movePageIndex(nextArr[0]));
    } else {
      const remainingPages = Array.from(
        { length: totalPageIndex - lastPageInCurrentSet },
        (_, i) => lastPageInCurrentSet + i + 1
      );
      setCurrentIndexSet(remainingPages);
      dispatch(movePageIndex(remainingPages[0]));
    }
  };

  const handleClickPrev = () => {
    const pageSetSize = 5;
    const firstPageInCurrentSet = currentIndexSet[0];

    if (firstPageInCurrentSet > 1) {
      const prevSetStart = Math.max(firstPageInCurrentSet - pageSetSize, 1);
      const prevArr = Array.from(
        { length: pageSetSize },
        (_, i) => prevSetStart + i
      ).filter((page) => page <= totalPageIndex);

      setCurrentIndexSet(prevArr);
      dispatch(movePageIndex(prevArr[prevArr.length - 1]));
    }
  };

  return (
    <S.Container>
      {currentIndexSet.length ? (
        <div className="page-button-wrap">
          <button
            className="prev-button"
            disabled={isPrevDisabled}
            onClick={handleClickPrev}
          >
            <Arrow />
          </button>
          {currentIndexSet.map((number) => (
            <button
              className={`page-button ${
                currentPageIndex === number && "current"
              }`}
              onClick={() => handleClickIndex(number)}
              key={number}
            >
              {number}
            </button>
          ))}
          <button
            className="next-button"
            disabled={isNextDisabled}
            onClick={handleClickNext}
          >
            <Arrow />
          </button>
        </div>
      ) : null}
    </S.Container>
  );
};

export default Pagination;
