import { useNavigate } from 'react-router-dom';
import S from './PrevNextBar.styled';
import { useSubmitPage } from '../../contexts/SubmitPageContext';

const PrevNextBar = ({
  next,
  prev,
  nextText,
  prevText,
  nextDisabled,
  prevDisabled,
}) => {
  const { screenshotMode } = useSubmitPage();
  const navigate = useNavigate();
  const handleClickButton = (link) => {
    navigate(link);
  };
  if (screenshotMode) return null;
  return (
    <S.Container $screenshot={screenshotMode}>
      <div className='button-wrap'>
        {prev ? (
          <button
            className='prev-button'
            onClick={() => handleClickButton(prev)}
            disabled={prevDisabled}
          >
            {prevText}
          </button>
        ) : (
          <div className='blank'></div>
        )}
        {next ? (
          typeof next === 'string' ? (
            <button
              className='next-button'
              onClick={() => handleClickButton(next)}
              disabled={nextDisabled}
            >
              {nextText}
            </button>
          ) : (
            <button
              className='next-button point'
              onClick={next}
              disabled={nextDisabled}
            >
              {nextText}
            </button>
          )
        ) : (
          <div className='blank'></div>
        )}
      </div>
    </S.Container>
  );
};

export default PrevNextBar;
