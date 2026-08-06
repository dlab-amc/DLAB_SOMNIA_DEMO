import styled from 'styled-components';
import userHomeBg from '../../assets/resource/images/user_home_bg1.webp';

const S = {};

S.Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  margin: 0 auto;
  min-height: calc(100vh - 65px);
  height: auto;
  padding: 2.5rem 1.25rem 3rem;
  text-align: center;
  box-sizing: border-box;

  .point {
    color: #fff;
    font-weight: 700;
  }

  .main-title {
    color: #fafafa;
    font-family: var(--font-science-gothic);
    font-weight: 500;
    font-size: clamp(1.5rem, 5vw + 0.5rem, 60px);
    letter-spacing: 0.02em;
    line-height: 1.32;
    margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
    max-width: 100%;
    padding: 0 0.25rem;
    overflow-wrap: anywhere;
    word-break: keep-all;
    white-space: normal;
  }

  .brand-expand {
    color: #c8c8d0;
    font-size: clamp(12px, 2.2vw, 16px);
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.45;
    margin-bottom: clamp(1.5rem, 4vw, 3rem);
    max-width: 40rem;
    padding: 0 0.5rem;
  }

  .main-title-desc {
    color: #b4b4bc;
    font-size: clamp(14px, 2.8vw, 20px);
    font-weight: 500;
    letter-spacing: -0.015em;
    line-height: 1.65;
    margin-bottom: clamp(3rem, 10vw, 6rem);
    max-width: 36rem;
    padding: 0 0.25rem;
    white-space: normal;
  }

  .guide-button {
    font-size: clamp(15px, 2.5vw, 18px);
    padding: 0.9rem clamp(2rem, 12vw, 6rem);
    font-weight: 600;
    color: #fff;
    background-color: #0094ff;
    border-radius: 8px;
    max-width: 100%;
    box-sizing: border-box;
    box-shadow: 0 4px 18px rgba(0, 148, 255, 0.28);
    transition: background-color 0.2s var(--ease-out, ease),
      box-shadow 0.2s var(--ease-out, ease);

    &:hover {
      background-color: #1da1ff;
      box-shadow: 0 6px 22px rgba(0, 148, 255, 0.38);
    }
  }
`;

S.Background = styled.div`
  width: 100%;
  background-color: #17171d;
  background-image: linear-gradient(
      180deg,
      rgba(15, 17, 22, 0.68) 0%,
      rgba(23, 23, 29, 0.55) 45%,
      rgba(15, 17, 22, 0.75) 100%
    ),
    url(${userHomeBg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default S;
