import React, { useEffect, useState } from 'react';
import S from '../SignUpForm.styled';
import { ReactComponent as Expand } from '../../../assets/resource/icons/expand.svg';
import { useAppDispatch, useAppSelector } from '../../../assets/hooks/useRedux';
import {
  changeTermInput,
  checkAllTermInput,
} from '../../../stores/signup/signup.slice';
import { setVisibleModal } from '../../../stores/common/common.slice';
import { TERMS_INFO } from '../../../assets/data/signup';
import { ReactComponent as Check } from '../../../assets/resource/icons/check.svg';
import { useI18n } from '../../../assets/i18n';

const TermFormTab = () => {
  const { tf } = useI18n();
  const dispatch = useAppDispatch();
  const termsChecked = useAppSelector(
    (state) => state.signupSlice.terms.isChecked
  );
  const [allChecked, setAllChecked] = useState(false);

  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setAllChecked((prev) => !prev);
    dispatch(checkAllTermInput(checked));
  };

  const handleChangeInput = (e) => {
    const { value, checked } = e.target;
    dispatch(
      changeTermInput({
        index: value,
        boolean: checked,
      })
    );
  };

  useEffect(() => {
    if (termsChecked[0] && termsChecked[1] && termsChecked[2]) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [termsChecked]);

  const handleClickDetailButton = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    dispatch(
      setVisibleModal({
        isVisible: true,
        title: tf(TERMS_INFO[index].title, TERMS_INFO[index].title_eng),
        text: tf(TERMS_INFO[index].text, TERMS_INFO[index].text_eng),
        isScrollable: true,
      })
    );
  };

  return (
    <S.TermBlock>
      <h2 className='form-title'>{tf('2. 약관 동의', '2. Agree Terms')}</h2>
      <div className='term-form'>
        <div className='check-wrap total'>
          <input
            type='checkbox'
            name='terms'
            id='total'
            onChange={handleCheckAll}
            checked={allChecked}
          />
          <label htmlFor='total' className='checkbox'>
            {allChecked && <Check />}
          </label>
          <label htmlFor='total' className='label'>
            {tf('전체 동의', 'Agree to All')}
          </label>
        </div>
        <div className='check-wrap'>
          <div className='labels'>
            <input
              type='checkbox'
              name='terms'
              id='first'
              value={0}
              onChange={handleChangeInput}
              checked={termsChecked[0]}
            />
            <label htmlFor='first' className='checkbox'>
              {termsChecked[0] && <Check />}
            </label>
            <label htmlFor='first' className='label'>
              {tf(`[필수] ${TERMS_INFO[0].title}`, `[Required] ${TERMS_INFO[0].title_eng}`)}
            </label>
          </div>
          <button
            className='detail-button'
            onClick={handleClickDetailButton}
            data-index={0}
          >
            <span>{tf('상세보기', 'View Details')}</span>
            <Expand />
          </button>
        </div>
        <div className='check-wrap'>
          <div className='labels'>
            <input
              type='checkbox'
              name='second'
              id='second'
              value={1}
              onChange={handleChangeInput}
              checked={termsChecked[1]}
            />
            <label htmlFor='second' className='checkbox'>
              {termsChecked[1] && <Check />}
            </label>
            <label htmlFor='second' className='label'>
              {tf(`[필수] ${TERMS_INFO[1].title}`, `[Required] ${TERMS_INFO[1].title_eng}`)}
            </label>
          </div>
          <button
            className='detail-button'
            onClick={handleClickDetailButton}
            data-index={1}
          >
            <span>{tf('상세보기', 'View Details')}</span>
            <Expand />
          </button>
        </div>
        <div className='check-wrap'>
          <div className='labels'>
            <input
              type='checkbox'
              name='third'
              id='third'
              value={2}
              onChange={handleChangeInput}
              checked={termsChecked[2]}
            />
            <label htmlFor='third' className='checkbox'>
              {termsChecked[2] && <Check />}
            </label>
            <label htmlFor='third' className='label'>
              {tf(`[필수] ${TERMS_INFO[2].title}`, `[Required] ${TERMS_INFO[2].title_eng}`)}
            </label>
          </div>

          <button
            className='detail-button'
            onClick={handleClickDetailButton}
            data-index={2}
          >
            <span>{tf('상세보기', 'View Details')}</span>
            <Expand />
          </button>
        </div>
      </div>
    </S.TermBlock>
  );
};

export default TermFormTab;
