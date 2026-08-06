import { PLATFORM } from '../../config/platform';

const SITE = PLATFORM.siteName;
const URL = PLATFORM.siteUrl;

/**
 * 회원가입 약관 (데모/공개용 초안).
 * 운영 배포 전 기관 법무 확정본(한/영)으로 교체하세요.
 */
export const TERMS_INFO = [
  {
    id: 1,
    title: '서비스 이용약관',
    title_eng: 'Terms of Service',
    text:
      `제 1 장 총칙\n\n` +
      `제 1 조 (목적)\n` +
      `본 약관은 ${SITE}이 운영하는 웹 사이트(${URL})의 제반 서비스 이용조건 및 절차, 기타 필요한 사항을 규정합니다.\n\n` +
      `제 2 조 (용어의 정의)\n` +
      `① 회원: 본 약관에 동의하고 서비스 이용계약을 체결하여 계정을 부여받은 개인 또는 단체\n` +
      `② 서비스: ${SITE}이 제공하는 알고리즘 제출·평가 및 관련 기능\n\n` +
      `제 3 조 (약관의 게시와 개정)\n` +
      `운영자는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 서비스 화면에 공지합니다.\n\n` +
      `[데모 문구] 공개 Code Availability 스냅샷용 초안입니다. 실제 서비스 전에는 확정본으로 교체하세요.`,
    text_eng:
      `Chapter 1. General Provisions\n\n` +
      `Article 1 (Purpose)\n` +
      `These Terms set out the conditions and procedures for using services on the website (${URL}) operated by ${SITE}.\n\n` +
      `Article 2 (Definitions)\n` +
      `① Member: An individual or organization that agrees to these Terms and is granted an account.\n` +
      `② Service: Algorithm submission, evaluation, and related features provided by ${SITE}.\n\n` +
      `Article 3 (Publication and Amendment)\n` +
      `The operator may amend these Terms within applicable law and will post notice on the service.\n\n` +
      `[Demo text] Draft for the public Code Availability snapshot. Replace with the finalized legal text before production use.`,
  },
  {
    id: 2,
    title: '개인정보 처리방침',
    title_eng: 'Privacy Policy',
    text:
      `제 1 조 (수집 항목)\n` +
      `${SITE}은 회원가입 및 서비스 제공을 위해 아이디, 비밀번호, 이름, 연락처, 이메일, 소속/사업자 정보 등을 수집할 수 있습니다.\n\n` +
      `제 2 조 (이용 목적)\n` +
      `회원 식별, 제출물 처리, 문의 응대, 서비스 개선 및 보안 목적에 한해 이용합니다.\n\n` +
      `제 3 조 (보관 및 파기)\n` +
      `관련 법령 및 내부 정책에 따라 보관하며, 목적 달성 후 지체 없이 파기합니다.\n\n` +
      `[데모 문구] 공개용 초안입니다. 운영 전 개인정보처리방침 확정본으로 교체하세요.`,
    text_eng:
      `Article 1 (Collected Information)\n` +
      `${SITE} may collect account ID, password, name, phone, email, and organization/business information for registration and service delivery.\n\n` +
      `Article 2 (Purpose of Use)\n` +
      `Used only for member identification, submission processing, inquiry response, service improvement, and security.\n\n` +
      `Article 3 (Retention and Deletion)\n` +
      `Data is retained under applicable law and internal policy, then deleted without undue delay after the purpose is fulfilled.\n\n` +
      `[Demo text] Draft for public release. Replace with the finalized privacy policy before production use.`,
  },
  {
    id: 3,
    title: '연구·데이터 이용 안내 동의',
    title_eng: 'Research & Data Use Acknowledgement',
    text:
      `제 1 조 (공개 데이터)\n` +
      `본 공개 스냅샷의 평가 데이터는 NSRR 등 공개 코호트를 전제로 하며, ASAN/AMC 임상 데이터는 포함되지 않습니다.\n\n` +
      `제 2 조 (이용자 책임)\n` +
      `이용자는 각 데이터셋의 라이선스·이용 조건을 준수해야 하며, 별도 신청이 필요한 데이터는 스스로 확보해야 합니다.\n\n` +
      `제 3 조 (제출물)\n` +
      `제출한 코드·결과는 평가 목적에 한해 처리되며, 운영 정책에 따라 보관·삭제될 수 있습니다.\n\n` +
      `[데모 문구] 공개용 초안입니다. 기관 정책에 맞게 수정하세요.`,
    text_eng:
      `Article 1 (Open Data)\n` +
      `This public snapshot assumes open cohorts such as NSRR. ASAN/AMC clinical data is not included.\n\n` +
      `Article 2 (User Responsibility)\n` +
      `Users must comply with each dataset's license and access terms, and obtain data that requires separate application themselves.\n\n` +
      `Article 3 (Submissions)\n` +
      `Submitted code and results are processed for evaluation and may be retained or deleted under operator policy.\n\n` +
      `[Demo text] Draft for public release. Adjust to institutional policy.`,
  },
];

export const VALID_CHECK_REGEX = {
  userId: /^[A-Za-z0-9]{5,20}$/,
  userPassword: /^[A-Za-z0-9!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`|\\]{8,16}$/,
  userPasswordCheck: /^[A-Za-z0-9!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`|\\]{8,16}$/,
  userName: /^[가-힣A-Za-z]{2,20}$/,
  userTel: /^01[016789]\d{8}$/,
  userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  authNumber: /^\d{6}$/,
  companyName: /^[가-힣A-Za-z!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~]{2,50}$/,
  companyDepartment: /^[가-힣A-Za-z!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~]{2,50}$/,
  companyTel: /^\d{6,20}$/,
  organization: /^.{1,}$/, 
  businessNumber: /^01[016789]\d{10}$/,
 companyAddress: /.+/
};

export const UNIQUE_CHECK = {
  isIdUnique: {
    success: "사용 가능한 아이디 입니다.",
    failure: "이미 가입된 아이디 입니다.",
  },
  isIdUnique_eng: {
    success: "This ID is available.",
    failure: "This ID is already registered.",
  },
  isUserTelUnique: {
    success: "사용 가능한 전화번호 입니다.",
    failure: "이미 가입된 전화번호 입니다.",
  },
  isUserTelUnique_eng: {
    success: "This phone number is available.",
    failure: "This phone number is already registered.",
  },
  isAuthMailSent: {
    success: "인증번호가 발송되었습니다.",
    failure: "이미 가입된 이메일 주소 입니다.",
  },
  isAuthMailSent_eng: {
    success: "A verification code has been sent.",
    failure: "This email address is already registered.",
  },
  isAuthNumberCorrect: {
    success: "인증 완료되었습니다.",
    failure: "인증번호가 일치하지 않습니다.",
  },
  isAuthNumberCorrect_eng: {
    success: "Verification completed successfully.",
    failure: "Verification code does not match.",
  },
};

export const FIND_FORM_INFO = {
  id: {
    title: "아이디 찾기",
    title_eng: "Find ID",
    desc: "가입하신 정보(성명, 이메일 주소)를 입력해주세요.",
    desc_eng: "Please enter your registered information (name & email).",
    inputs: [
      {
        label: "성명",
        label_eng: "Name",
        placeholder: "성명 입력",
        placeholder_eng: "Enter your name",
        id: "findIdName",
        button: null,
      },
      {
        label: "이메일 주소",
        label_eng: "Email",
        placeholder: "이메일 주소 입력",
        placeholder_eng: "Enter your Email Address",
        id: "findIdEmail",
        button: null,
      },
    ],
    button: {
      text: "아이디 찾기",
      text_eng: "Find ID",
      clickFunc: "handleClickFindId",
    },
    links: [
      {
        text: "비밀번호 찾기",
        text_eng: "Find Password",
        path: "/find/password",
      },
      {
        text: "로그인하기",
        text_eng: "Login",
        path: "/login",
      },
    ],
  },
  password: {
    title: "비밀번호 찾기",
    title_eng: "Find Password",
    desc: "가입하신 정보(아이디, 이메일 주소)를 입력해주세요.",
    desc_eng: "Please enter your registered information (ID & email).",
    inputs: [
      {
        label: "아이디",
        label_eng: "ID",
        placeholder: "아이디 입력",
        placeholder_eng: "Enter your ID",
        id: "findPasswordId",
        button: null,
      },
      {
        label: "이메일 주소",
        label_eng: "Email",
        placeholder: "이메일 주소 입력",
        placeholder_eng: "Enter your Email Address",
        id: "findPasswordEmail",
        button: {
          text: "인증번호 전송",
          clickFunc: "handleClickAuthSend",
        },
      },
      {
        label: "인증번호",
        label_eng: "Verification Code",
        placeholder: "인증번호 입력",
        placeholder_eng: "Enter the verification code",
        id: "findPasswordAuth",
        button: {
          text: "인증번호 확인",
          clickFunc: "handleClickAuthCheck",
        },
      },
    ],
    button: {
      text: "비밀번호 찾기",
      text_eng: "Find Password",
      clickFunc: "handleClickFindPassword",
    },
    links: [
      {
        text: "아이디 찾기",
        text_eng: "Find ID",
        path: "/find/id",
      },
      {
        text: "로그인하기",
        text_eng: "Login",
        path: "/login",
      },
    ],
  },
};
