import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  width: 100%;
  display: grid;
  /* 좌·우 동일 폭 → 네비가 헤더 정중앙에 오도록 */
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 1rem;
  box-sizing: border-box;
  height: 65px;
  min-height: 65px;
  max-height: 65px;
  padding: 0 1.5rem;
  background-color: #17171d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  /* 툴팁이 헤더 아래로 넘칠 수 있게 */
  overflow: visible;
  position: relative;
  z-index: 200;

  @media (max-width: 1280px) {
    column-gap: 0.65rem;
    padding: 0 1.1rem;
  }

  @media (max-width: 1100px) {
    column-gap: 0.5rem;
    padding: 0 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    column-gap: 0.4rem;
  }
`;

S.Title = styled.h1`
  flex-shrink: 0;
  margin: 0;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 0;
  }

  .header-logo {
    display: block;
    height: 2rem;
    width: auto;
    flex-shrink: 0;

    @media (max-width: 992px) {
      height: 1.65rem;
    }

    @media (max-width: 768px) {
      height: 1.5rem;
    }
  }

  .tag {
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    background-color: #0094ff;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    line-height: 1.2;
    flex-shrink: 0;
  }
`;

S.SlotStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  justify-self: start;
  min-width: 0;
`;

S.SlotCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  min-width: 0;

  .header-nav {
    display: flex;
    align-items: center;
    gap: 45px;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    justify-content: center;
    /* overflow 금지: 스크롤 컨테이너가 되면 드롭다운(세로로 튀어나옴)이 잘림 */

    .dropdown-wrap {
      position: relative;
    }

    /* 제출 하위 메뉴 — 유저 드롭다운과 동일한 패널 톤 */
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      min-width: 188px;
      padding: 6px;
      margin: 0;
      background: rgba(30, 32, 40, 0.98);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);

      /* 트리거와 패널 사이 빈틈에서 mouseLeave 되지 않도록 보이지 않는 호버 다리 */
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100%;
        height: 18px;
        pointer-events: auto;
      }

      .dropdown-item {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 14px;
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.92);
        background: transparent;
        border: none;
        border-radius: 6px;
        text-align: left;
        white-space: nowrap;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease;

        &:hover {
          background-color: #0094ff;
          color: #fff;
        }

        &:focus-visible {
          outline: 2px solid rgba(0, 148, 255, 0.45);
          outline-offset: -2px;
        }
      }
    }
  }

  @media (max-width: 1360px) {
    .header-nav {
      gap: 28px;
    }
  }

  @media (max-width: 1280px) {
    .header-nav {
      gap: 18px;

      a {
        padding: 0.5rem 0.55rem;
      }
    }
  }

  @media (max-width: 1200px) {
    .header-nav {
      gap: 12px;

      a {
        font-size: 15px;
        padding: 0.45rem 0.4rem;
      }
    }
  }

  @media (max-width: 1100px) {
    .header-nav {
      gap: 6px;

      a {
        font-size: 14px;
        padding: 0.4rem 0.3rem;
      }
    }
  }

  @media (max-width: 992px) {
    .header-nav {
      gap: 4px;

      a {
        font-size: 13px;
        padding: 0.35rem 0.28rem;
      }
    }
  }

  @media (max-width: 768px) {
    min-width: 0;

    .header-nav {
      margin: 0;
      padding: 0;
      gap: 2px;
      justify-content: center;
      flex-wrap: nowrap;
      min-width: 0;

      li {
        flex-shrink: 0;
      }

      a {
        font-size: 12px;
        padding: 0.4rem 0.35rem;
      }
    }
  }

  @media (max-width: 380px) {
    .header-nav {
      gap: 0;
    }
  }
`;

S.SlotEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  justify-self: end;
  gap: 10px;
  flex-wrap: nowrap;
  min-width: 0;
  max-width: 100%;
  overflow: visible;
  position: relative;
  z-index: 205;

  .lang-toggle {
    flex-shrink: 0;
  }

  .header-login {
    display: flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    overflow: visible;

    .login-wrap {
      display: flex;
      align-items: center;
      gap: 28px;
      min-width: 0;
      overflow: visible;
    }

    .hover-wrap {
      position: relative;
      cursor: pointer;
      min-width: 0;
      flex-shrink: 1;

      .user-id {
        display: flex;
        align-items: center;
        font-weight: 400;
        padding-left: 0.35rem;
        min-width: 0;
        max-width: 9.5rem;

        .id {
          font-weight: 700;
          display: block;
          min-width: 0;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &::after {
          content: '';
          display: inline-block;
          flex-shrink: 0;
          margin-left: 0.55rem;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 5px 0 5px;
          border-color: #ffffffaa transparent transparent transparent;
        }
      }

      .user-id-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        min-width: 188px;
        padding: 6px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        box-sizing: border-box;
        background: rgba(30, 32, 40, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);

        /* 유저명 ↔ 패널 사이 빈 공간: 여기만 지나도 메뉴가 닫히던 문제 보완 */
        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 100%;
          height: 26px;
          pointer-events: auto;
        }

        .dropdown-menu {
          cursor: pointer;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          padding: 10px 14px;
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          background: transparent;
          border: none;
          border-radius: 6px;
          white-space: nowrap;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease;

          &:hover {
            background-color: #0094ff;
            color: #fff;
          }

          &:hover svg path {
            fill: #fff;
          }

          &:focus-visible {
            outline: 2px solid rgba(0, 148, 255, 0.45);
            outline-offset: -2px;
          }
        }

        .logout-button .text {
          flex: 0 1 auto;
        }
      }
    }

    .icon-menus {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      flex-shrink: 0;
      overflow: visible;
      position: relative;
      z-index: 210;
    }

    .icon-tooltip-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: visible;

      .icon-tooltip {
        position: absolute;
        top: calc(100% + 10px);
        left: 50%;
        z-index: 10050;
        transform: translate(-50%, 4px);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        padding: 0.4rem 0.65rem;
        border-radius: 6px;
        background: #0f172a;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 1.2;
        white-space: nowrap;
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;

        &::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-bottom-color: #0f172a;
        }
      }

      /* hover만 표시 — click 후 남은 focus로 툴팁이 고착되지 않게 */
      &:hover .icon-tooltip,
      &:has(:focus-visible) .icon-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
      }

      /* 우측 끝 아이콘: 툴팁이 화면 밖으로 밀리지 않도록 */
      &:last-child .icon-tooltip {
        left: auto;
        right: 0;
        transform: translate(0, 4px);

        &::before {
          left: auto;
          right: 12px;
          transform: none;
        }
      }

      &:last-child:hover .icon-tooltip,
      &:last-child:has(:focus-visible) .icon-tooltip {
        transform: translate(0, 0);
      }
    }

    .non-login-wrap {
      .login-btn {
        display: block;
        padding: 0.45rem 1.35rem;
        background-color: #0094ff;
        color: #fff;
        font-weight: 600;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 148, 255, 0.28);
        transition: background-color 0.2s ease, box-shadow 0.2s ease;

        &:hover {
          background-color: #1da1ff;
          box-shadow: 0 4px 12px rgba(0, 148, 255, 0.35);
        }
      }
    }
  }

  .logout-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .icon {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 1360px) {
    gap: 8px;

    .header-login .login-wrap {
      gap: 20px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 7.5rem;
    }
  }

  @media (max-width: 1280px) {
    gap: 6px;

    .header-login .login-wrap {
      gap: 14px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 6.25rem;
      font-size: 14px;

      &::after {
        margin-left: 0.4rem;
      }
    }
  }

  @media (max-width: 1200px) {
    .header-login .login-wrap {
      gap: 10px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 5.25rem;
    }
  }

  @media (max-width: 1100px) {
    gap: 4px;

    .header-login .login-wrap {
      gap: 8px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 4.25rem;
      font-size: 13px;
      padding-left: 0;

      /* 호칭은 공간 부족 시 숨김 — 드롭다운 화살표는 유지 */
      span:not(.id) {
        display: none;
      }
    }
  }

  @media (max-width: 992px) {
    gap: 4px;

    .header-login .hover-wrap .user-id {
      max-width: 3.75rem;
    }
  }

  @media (max-width: 768px) {
    flex-shrink: 0;

    .header-login .login-wrap {
      gap: 6px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 3.25rem;
    }
  }

  @media (max-width: 380px) {
    .header-login .login-wrap {
      gap: 4px;
    }

    .header-login .hover-wrap .user-id {
      max-width: 2.75rem;
    }
  }
`;

S.FocusLink = styled(NavLink)`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  padding: 0.55rem 0.85rem;
  color: rgba(255, 255, 255, 0.78);
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.06);
  }

  &.active {
    color: #0094ff;

    svg path {
      fill: #0094ff;
    }
  }

  &.active:hover {
    background-color: rgba(0, 148, 255, 0.12);
  }

  svg {
    width: 1.65rem;
    height: 1.65rem;

    path {
      fill: currentColor;
    }
  }

  /* 우측 아이콘 메뉴: 아이콘 축소 + 패딩으로 클릭 영역 유지 */
  ${S.SlotEnd} .header-login .icon-menus & {
    padding: 0.48rem 0.58rem;
    min-width: 2.75rem;
    min-height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    @media (max-width: 992px) {
      min-width: 2.65rem;
      min-height: 2.65rem;
      padding: 0.4rem 0.5rem;

      svg {
        width: 1.1rem;
        height: 1.1rem;
      }
    }
  }

  .count {
    position: absolute;
    top: 15%;
    left: 100%;
    transform: translate(-50%, -50%);
    background-color: #ff0000;
    color: #fff;
    width: 1.3rem;
    height: 1.3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
  }

  /* 알림 아이콘: 배지를 벨에 붙임 (기본 .count의 left:100% 무효) */
  ${S.SlotEnd} .header-login .icon-menus & .count {
    top: 3px;
    right: 2px;
    left: auto;
    transform: none;
    width: 1.05rem;
    height: 1.05rem;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1;
  }
`;

export default S;
