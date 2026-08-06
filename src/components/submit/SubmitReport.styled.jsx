import styled from "styled-components";

const S = {};

S.Container = styled.div`
  /* 전체 컨테이너 */
  .performance-report {
    max-width: 210mm; /* A4 폭 */
    margin: auto;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background: white;
    display: block;
    overflow: visible;
  }

  /* 테이블 전체에서 기본 선 제거 */
  .top-table,
  .top-table td {
    border: none;
    border-collapse: collapse;
  }

  /* 테이블 위, 아래 검은 선 추가 */
  .top-table {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 100%;
    margin-bottom: 10px;
  }

  /* 로고 이미지 */
  .logo-box {
    width: 5%;
    padding-right: 5px;
    vertical-align: middle;
  }

  .logo-box img {
    max-height: 30px;
  }

  .center-text {
    width: 30%;
    text-align: center;
    font-weight: bold;
    vertical-align: middle;
    font-size: 0.7rem;
  }

  .separator-cell {
    width: 1px;
    padding: 0 10px;
    vertical-align: middle;
  }

  /* 오른쪽 검은색 세로선 */
  .separator-line {
    border-left: 1px solid black;
    height: 60px;
  }

  /* 오른쪽 텍스트 부분 왼쪽에 검은 세로선 추가 */
  .right-text {
    font-size: 0.7rem;
    text-align: left;
    padding-left: 5px;
    border-left: 1px solid black !important;
  }

  .right-text p {
    margin: 0;
    line-height: 1.5;
  }

  /* 섹션 박스 */
  .section-box {
    max-width: 100vw;
    font-size: 0.875rem;
  }

  .parameter-title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .parameter-title h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-left: 20px;
    color: #333;
    text-transform: uppercase;
  }

  /* 표 테이블 */
  .evaluation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    border-top: 2px double black;
    border-bottom: 2px double black;
  }

  .evaluation-table thead th {
    border-bottom: 2px double black;
    text-align: center;
    padding: 8px;
    background-color: white;
  }

  .evaluation-table .group-header {
    border-bottom: 2px double black !important;
    background-color: white;
    text-align: center;
  }

  .evaluation-table tbody td {
    text-align: center;
    padding: 8px;
    border: none;
  }

  .evaluation-table th,
  .evaluation-table td {
    border: none !important;
    padding: 8px;
    text-align: center;
  }

  .evaluation-table .table-header-cell {
    border-bottom: 2px double black !important;
  }

  .bottom-border td {
    border-bottom: 2px double black !important;
  }

  .evaluation-table-results {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    border-top: 2px double black;
    border-bottom: 2px double black;
  }

  .evaluation-table-results thead th {
    border-bottom: 2px double black;
    text-align: center;
    padding: 8px;
    background-color: white;
  }

  .evaluation-table-results .table-header-cell {
    border-bottom: 2px double black;
  }

  .evaluation-table-results .group-header {
    border-bottom: 2px double black !important;
    background-color: white;
    text-align: center;
  }

  .evaluation-table-results th,
  .evaluation-table-results td {
    border: none !important;
    padding: 8px;
    text-align: center;
  }

  .group-header {
    text-align: center;
  }

  .note {
    font-size: 0.75rem;
    font-style: italic;
    margin-top: 8px;
  }

  .bland-altman-plots {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .bland-altman-plot {
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: 20px auto;
    display: block;
    object-fit: contain;
    image-rendering: auto;
  }

  .bland-altman-plot-title {
    text-align: left;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  .summary {
    margin-top: 16px;
    text-align: left;
  }

  .bold-header {
    font-weight: bold;
  }

  .divider {
    border-top: 1px solid black;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .section-divider {
    border-top: 1px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .bmi-age-units {
    text-align: right;
    margin-right: 10px;
    margin-bottom: 8px;
    font-size: 0.75rem;
    color: gray;
  }

  .button-container {
    margin-top: 16px;
    text-align: center;
  }

  .double-line {
    border: 0;
    border-top: 2px solid black;
    border-bottom: 1px solid black;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  hr {
    border: none;
    border-top: 1px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .group-header-border {
    border-bottom: 2px double black !important;
  }

  .a4-section {
    width: 100%;
    padding: 10mm;
    box-sizing: border-box;
    break-inside: avoid;
    overflow: hidden;
    background-color: white;
  }

  .a4-page {
    width: 210mm;
    height: 297mm;
    margin: 0 auto 20px;
    padding: 20mm;
    box-sizing: border-box;
    border: 1px solid #ddd;
    overflow: hidden;
    background-color: white;
  }

  .a4-page-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .a4-page:last-child {
    page-break-after: auto;
  }

  .page-break {
    display: block;
    height: 1px;
    margin: 20px 0;
    page-break-after: always;
  }

  @media print {
    .a4-page {
      box-shadow: none;
      margin: 0;
      padding: 15mm;
      page-break-after: always;
    }

    .a4-section {
      page-break-inside: avoid;
      margin-bottom: 0;
    }

    .performance-report {
      box-shadow: none;
      overflow: visible;
    }
  }

  @media screen {
    .a4-page {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
  }

  .a4-section:last-of-type {
    page-break-after: auto;
  }

  #contentRef {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    visibility: visible;
    opacity: 1 !important;
    z-index: auto;
    min-height: 297mm;
    overflow: visible !important;
  }
`;

export default S;
