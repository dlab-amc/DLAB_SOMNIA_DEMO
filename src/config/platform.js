/**
 * 플랫폼 브랜딩·소개 문구 단일 설정.
 * 이름/데이터셋 규모 변경 시 이 파일 + public/index.html 을 함께 맞출 것.
 *
 * shortName — 헤더·좁은 공간
 * fullName — 약어 풀이 (SOMNIA 뒤 설명)
 * brandedName — 표지·소개 등 여유가 있을 때 (SOMNIA: …)
 */
export const PLATFORM = {
  shortName: 'SOMNIA',
  fullName:
    'Sleep-device Oriented Model-based Nonclinical In-silico Assessment',
  /** UI 소개 문구용 근사 건수 (실제 N≈29,173) */
  datasetCountApprox: 30000,
  contactEmail:
    process.env.REACT_APP_CONTACT_EMAIL || 'dlab.amc@gmail.com',
  contactAddressKo:
    process.env.REACT_APP_CONTACT_ADDRESS_KO ||
    '서울 송파구 올림픽로43길 88 서울아산병원 아산생명과학연구원',
  contactAddressEn:
    process.env.REACT_APP_CONTACT_ADDRESS_EN ||
    'Asan Institute for Life Sciences, 88 Olympic-ro 43-gil, Songpa-gu, Seoul, 05505, Republic of Korea',
  siteName: process.env.REACT_APP_SITE_NAME || 'SOMNIA',
  siteUrl: process.env.REACT_APP_SITE_URL || 'https://example.com',
};

/** short + full — 공간이 충분할 때만 사용 */
export const brandedName = () =>
  `${PLATFORM.shortName}: ${PLATFORM.fullName}`;

const formatCount = (n) => n.toLocaleString('en-US');

/** ko: "약 30,000건" / en: "approximately 30,000" */
export const datasetCountLabel = (lang) =>
  lang === 'en'
    ? `approximately ${formatCount(PLATFORM.datasetCountApprox)}`
    : `약 ${formatCount(PLATFORM.datasetCountApprox)}건`;
