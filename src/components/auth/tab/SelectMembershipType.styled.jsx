import styled from 'styled-components';

const S = {};

S.InfoBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .form-title {
    font-size: 24px;
    margin-bottom: 2rem;
  }

  .description {
    margin-bottom: 2rem;
    font-size: 16px;
    color: #555;
  }
`;

S.MembershipContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
`;

S.MembershipCard = styled.div`
  border: 1px solid #e2e8f0;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  width: calc(50% - 2rem);
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);

    svg path {
      fill: #64748b;
    }
  }

  .user-type-name {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
  }

  .user-type-desc {
    white-space: wrap;
    word-break: break-word;
    font-size: 14px;
    line-height: 1.55;
    color: #64748b;
  }

  .icon {
    margin-bottom: 0.4rem;
  }

  &.active {
    border: 2px solid #0094ff;
    background-color: rgba(0, 148, 255, 0.06);
    box-shadow: 0 0 0 1px rgba(0, 148, 255, 0.15);

    svg path {
      fill: #0094ff;
    }
  }
`;

export default S;
