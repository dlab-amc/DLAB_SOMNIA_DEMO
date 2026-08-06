import styled from 'styled-components';
const S = {};

S.Container = styled.div``;

S.MainContents = styled.div`
  width: 100%;
  height: calc(100vh - 65px);

  &.screenshot-page {
    padding: 0 0 1.5rem;
    height: auto;
    min-height: 100vh;
  }
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.18);
    border-radius: 99px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.28);
  }
`;

export default S;
