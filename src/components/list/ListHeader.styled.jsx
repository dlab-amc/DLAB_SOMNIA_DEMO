import styled from 'styled-components';
const S = {};

S.Container = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 3rem 3rem 0;

  .list-header-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.65rem;
    padding-bottom: 0.8rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;

    &.user-page {
      border-bottom: none;
      padding-bottom: 0;
    }

    .list-header-title {
      font-size: 24px;
      margin: 0;
    }

    .total-count {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 0.28rem 0.65rem;
      border-radius: 999px;
      background: rgba(0, 148, 255, 0.12);
      color: #0077cc;
    }
  }

  .list-filters-wrap {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 0.65rem;

    .left-side-wrap {
      display: flex;
      align-items: center;
    }

    .right-side-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;

      .search-wrap {
        display: flex;
        gap: 5px;
        align-items: center;
      }
    }

    &.submit {
      justify-content: space-between;
      .right-side-wrap {
        gap: 1rem;
      }
    }

    &.task {
      justify-content: space-between;
      .right-side-wrap {
        gap: 4rem;
      }
    }

    &.user {
      justify-content: end;
    }
  }
`;

export default S;
