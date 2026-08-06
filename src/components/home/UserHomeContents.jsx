import React from 'react';
import S from './UserHomeContents.styled';
import { Link } from 'react-router-dom';
import { useI18n } from '../../assets/i18n';
import { PLATFORM } from '../../config/platform';

const UserHomeContents = () => {
  const { tf } = useI18n();
  return (
    <S.Background>
      <S.Container>
        <h1 className='main-title'>{PLATFORM.shortName}</h1>
        <p className='brand-expand'>{PLATFORM.fullName}</p>
        <p className='main-title-desc'>
          {tf('구축한 통합 데이터베이스를 기반으로','Based on our curated database')} <br />
          <strong className='point'>{tf('수면 분석 알고리즘의 유효성','Validity of sleep analysis algorithms')}</strong>
          {tf('을 평가받을 수 있습니다.',' can be evaluated.')}
        </p>
        <Link className='guide-button' to='/about'>
          {tf('자세히 알아보기','Learn more')}
        </Link>
      </S.Container>
    </S.Background>
  );
};

export default UserHomeContents;
