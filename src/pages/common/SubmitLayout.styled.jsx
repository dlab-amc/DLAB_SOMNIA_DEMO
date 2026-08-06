import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  display: flex;

  .contents {
    padding: 3rem;
    height: calc(100vh - 65px - 60px);
    width: 100%;
    overflow-y: auto;
  }
`;

export default S;
