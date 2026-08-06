export const USER_TYPE = {
  USER: "user",
  ADMIN: "admin",
};

export const USER_ACCOUNT_TYPE = {
  BUSINESS: "business",
  PERSONAL: "personal",
};

export const SORT_TYPE = {
  ASC: "asc",
  DESC: "desc",
};

export const SIDE_MENUS = {
  guide: [
    {
      title: "Service Overview",
      path: "/guide/service",
    },
    {
      title: "Submit",
      path: "/guide/submit",
    },
    {
      title: "Status & Results",
      path: "/guide/result",
    },
  ],
  submit: [
    {
      title: "제출 가이드",
      path: "/submit/guide",
    },
    {
      title: "기본 정보 입력",
      path: "/submit/details",
    },
    {
      title: "파일 업로드",
      path: "/submit/upload",
    },
  ],
};

export const SEARCH_VALUE = {
  task: [
    { id: 1, name: "제출명", name_eng: "Title", value: "submitTitle" },
    { id: 2, name: "제출 번호", name_eng: "Number", value: "submitNumber" },
    { id: 3, name: "유저 ID", name_eng: "User ID", value: "userId" },
  ],
  user: [
    { id: 1, name: "유저명", name_eng: "Name", value: "userName" },
    { id: 2, name: "유저 ID", name_eng: "User ID", value: "userId" },
    { id: 3, name: "전화번호", name_eng: "Phone", value: "userTel" },
    { id: 4, name: "이메일", name_eng: "Email", value: "userEmail" },
  ],
  pending: [
    { id: 1, name: "유저명", name_eng: "Name", value: "userName" },
    { id: 2, name: "유저 ID", name_eng: "User ID", value: "userId" },
    { id: 3, name: "전화번호", name_eng: "Phone", value: "userTel" },
    { id: 4, name: "이메일", name_eng: "Email", value: "userEmail" },
  ],
  progress: [
    { id: 1, name: "제출명", name_eng: "Title", value: "submitTitle" },
    { id: 2, name: "제출 번호", name_eng: "Number", value: "submitNumber" },
    { id: 3, name: "유저 ID", name_eng: "User ID", value: "userId" },
  ],
};

export const LIST_PAGES_INFO = {
  submit: {
    title: "제출 리스트",
    title_eng: "Submit List",
    filters: { sorting: true, status: true, date: true, search: true },
    path: "/submit/list",
    headers: [
      { text: "등록 번호", text_eng: "Registration No.", className: "submit-number" },
      { text: "제출명", text_eng: "Submission Title", className: "submit-title" },
      { text: "제출 설명", text_eng: "Submission Description", className: "submit-description" },
      { text: "업로드 날짜", text_eng: "Upload Date", className: "submit-date" },
      { text: "상태", text_eng: "Status", className: "submit-status" },
    ],
  },
  user: {
    title: "회원 리스트",
    title_eng: "User List",
    filters: { select: "user", search: true },
    path: "/user/list",
    headers: [
      { text: "유저 ID", text_eng: "User ID", className: "user-id" },
      { text: "회원 구분", text_eng: "Type", className: "user-type" },
      { text: "유저명", text_eng: "Name", className: "user-name" },
      { text: "전화번호", text_eng: "Phone", className: "user-phone-number" },
      { text: "제출 상태", text_eng: "Status", className: "user-submit-detail" },
      { text: "제출 건수", text_eng: "Submissions", className: "user-submit" },
      { text: "회원 등급", text_eng: "Grade", className: "user-grade" },
    ],
  },
  pending: {
    title: "회원 리스트",
    title_eng: "User List",
    filters: { sorting: true, search: true },
    path: "/user/list/pending", // API 엔드포인트
    headers: [
      { text: "유저 ID", text_eng: "User ID", className: "user-id" },
      { text: "회원 구분", text_eng: "Type", className: "user-type" },
      { text: "유저명", text_eng: "Name", className: "user-name" },
      { text: "전화번호", text_eng: "Phone", className: "user-phone-number" },
      { text: "이메일", text_eng: "Email", className: "user-email" },
      { text: "가입 일시", text_eng: "Joined At", className: "user-request-date" },
      { text: "상세보기", text_eng: "Detail", className: "detail-button" },
    ],
  },
  task: {
    title: "작업 리스트",
    title_eng: "Task List",
    filters: {
      sorting: true,
      status: true,
      date: true,
      select: "task",
      search: true,
    },
    path: "/submit/list/admin",
    headers: [
      { text: "등록 번호", text_eng: "Registration No.", className: "submit-number" },
      { text: "제출명", text_eng: "Submission Title", className: "submit-title" },
      { text: "제출 설명", text_eng: "Submission Description", className: "submit-description" },
      { text: "유저 ID", text_eng: "User ID", className: "user-id" },
      { text: "업로드 날짜", text_eng: "Date", className: "submit-date" },
      { text: "상태", text_eng: "Status", className: "submit-status" },
    ],
  },
  progress: {
    title: "진행 중 작업",
    title_eng: "Ongoing Task List",
    filters: { sorting: true, status: true, date: true, search: true },
    path: "/submit/list/admin/progress",
    headers: [
      { text: "등록 번호", text_eng: "No.", className: "submit-number" },
      { text: "유저 ID", text_eng: "User ID", className: "user-id" },
      { text: "제출명", text_eng: "Submission Title", className: "submit-title" },
      { text: "업로드 날짜", text_eng: "Date", className: "submit-date" },
      { text: "상태", text_eng: "Status", className: "submit-status" },
      { text: "상태 변경", text_eng: "Action", className: "submit-action" },
    ],
  },
  userNotification: {
    title: "알림",
    title_eng: "Notifications",
    filters: { sorting: true, date: true },
    path: "/notification/user",
    readPath: "/notification/user/read", // 읽음 처리 API
    headers: [
      { text: "알림 내용", text_eng: "Notification Content", className: "notification-text" },
      { text: "발송 일시", text_eng: "Sent Time", className: "sent-time" },
      // { text: "읽음 상태", text_eng: "Read Status", className: "notification-status" },
    ],
  },
  adminNotification: {
    title: "알림",
    title_eng: "Notifications",
    filters: { sorting: true, date: true },
    path: "/notification/admin",
    readPath: "/notification/admin/read", // 읽음 처리 API
    headers: [
      { text: "알림 내용", text_eng: "Notification Content", className: "notification-text" },
      { text: "발송 일시", text_eng: "Sent Time", className: "sent-time" },
      // { text: "읽음 상태", className: "notification-status" },
    ],
  },

  adminTotalNotification: {
    title: "알림 발송 기록",
    title_eng: "Notification History",
    filters: { sorting: true, date: true },
    path: "/notification/admin/all",
    headers: [
      { text: "발신 구분", text_eng: "From", className: "from-type" },
      { text: "수신자 구분", text_eng: "To Type", className: "to-type" },
      { text: "수신자 ID", text_eng: "To ID", className: "to-id" },
      { text: "알림 내용", text_eng: "Message", className: "notification-text" },
      { text: "발송 일시", text_eng: "Sent At", className: "sent-time" },
    ],
  },
};

export const NOTIFICATION_STATUS_NAME = {
  0: "읽지 않음",
  1: "읽음",
};

export const USER_ACCOUNT_TYPE_STRING = {
  personal: "개인",
  business: "기업",
};

/** @deprecated submitStatus.js 를 직접 import 하세요 */
export {
  SUBMIT_STATUS_NAME,
  SUBMIT_STATUS_NAME_ENG,
  SUBMIT_STATUS_COLORS,
  SUBMIT_STATUS_COLOR_BY_KO,
} from "./submitStatus";

export const USER_GRADE_STRING = {
  Free: "무료 회원",
  Basic: "Basic 회원",
  Preminum: "Premium 회원",
};

export const PROGRESS_STATUS_MESSAGE = {
  0: "1. 데이터 전처리 진행 중",
  1: "2. 사용자 모델 실행 중",
  2: "3. 성능 분석 완료",
  3: "관리자에 의해 작업이 중단되었습니다"
};

export const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB"];

export const FILE_DOWNLOAD_BASE_URL = `${process.env.REACT_APP_ENDPOINT_URL}/files/download`;

export const TOP_TAB_CONFIG = {
  user: [
    { id: "user", name: "전체" },
    { id: "pending", name: "가입 대기" },
  ],
  adminTask: [
    { id: "task", name: "전체" },
    { id: "progress", name: "진행 중" },
  ],
};