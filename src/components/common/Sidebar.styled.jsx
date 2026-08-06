import styled from "styled-components";
const S = {};

S.Container = styled.div`
  width: 20%;
  padding: 2rem;
  background-color: #eee;
  height: calc(100vh - 65px);

  .sidebar-title {
    font-size: 26px;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
    padding: 0.5rem 0;
  }

  .menus-wrap {
    .menu {
      .link {
        /* text-align: center; */
        display: block;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.01em;
        line-height: 160%;
        padding: 1rem 0;
        color: #333;
        margin-bottom: 1rem;

        &:hover {
          color: #000;
        }

        &.active {
          color: #0094ff;
        }

        &.disabled {
          cursor: default;
          color: #ddd;
          pointer-events: none;
        }
      }
    }
  }
`;

export default S;
