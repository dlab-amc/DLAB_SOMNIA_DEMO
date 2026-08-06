import React from 'react';
import S from './SelectMembershipType.styled';
import { ReactComponent as Icon1 } from '../../../assets/resource/icons/usertype1.svg';
import { ReactComponent as Icon2 } from '../../../assets/resource/icons/usertype2.svg';
import { useI18n } from '../../../assets/i18n';


const SelectMembershipType = ({ accountType, handleSelectUserType }) => {
  const { tf } = useI18n();
  return (
    <S.InfoBlock>
      <h3 className='form-title'>{tf('1. 회원 유형 선택', '1. Select Type')}</h3>
      <p className='description'>
        {tf('기업회원과 개인회원 중 회원 유형을 선택해주세요.', 'Please select your membership type: Business or Personal.')}
      </p>
      <S.MembershipContainer>
        {/* 기업회원 */}
        <S.MembershipCard
          className={accountType === 'business' ? 'active' : ''}
          onClick={() => handleSelectUserType('business')}
        >
          <div className='icon'>
            <Icon1 />
          </div>
          <h4 className='user-type-name'>{tf('기업회원', 'Business')}</h4>
          <p className='user-type-desc'>{tf('사업자등록번호가 있는 기업 관계자', 'For companies with a business registration number')}</p>
        </S.MembershipCard>

        {/* 개인회원 */}
        <S.MembershipCard
          className={accountType === 'personal' ? 'active' : ''}
          onClick={() => handleSelectUserType('personal')}
        >
          <div className='icon'>
            <Icon2 />
          </div>
          <h4 className='user-type-name'>{tf('개인회원', 'Personal')}</h4>
          <p className='user-type-desc'>{tf('사업자등록번호가 없는 개인', 'For individuals without a business registration number')}</p>
        </S.MembershipCard>
      </S.MembershipContainer>
    </S.InfoBlock>
  );
};

export default SelectMembershipType;
