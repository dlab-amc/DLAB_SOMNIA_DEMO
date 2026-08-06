/**
 * 백엔드에서 오는 한글 에러 메시지 → [한글, 영문] 매핑.
 * 프론트에서 모달/알림 표시 시 getLocalizedErrorMessage(message, tf) 로 사용.
 */
export const ERROR_MESSAGE_MAP = {
  // 로그인/인증
  "아이디 입력값이 유효하지 않습니다.": ["아이디 입력값이 유효하지 않습니다.", "The login ID is invalid."],
  "비밀번호 입력값이 유효하지 않습니다.": ["비밀번호 입력값이 유효하지 않습니다.", "The password is invalid."],
  "로그인 세션이 만료되었거나 유효하지 않습니다. 다시 로그인해 주세요.": [
    "로그인 세션이 만료되었거나 유효하지 않습니다. 다시 로그인해 주세요.",
    "Your login session has expired or is invalid. Please sign in again.",
  ],
  "세션이 만료되었거나 다른 기기에서 로그인되었습니다.": [
    "세션이 만료되었거나 다른 기기에서 로그인되었습니다.",
    "Your session has expired or you signed in on another device.",
  ],
  "로그인 유효기간이 만료되었습니다.": [
    "로그인 유효기간이 만료되었습니다.",
    "Your login session has expired.",
  ],
  "Token expired": ["토큰이 만료되었습니다. 다시 로그인해 주세요.", "Token expired. Please sign in again."],
  "Invalid token": ["유효하지 않은 토큰입니다. 다시 로그인해 주세요.", "Invalid token. Please sign in again."],
  Unauthorized: ["인증이 필요합니다. 다시 로그인해 주세요.", "Authorization required. Please sign in again."],
  "유저명 입력값이 유효하지 않습니다.": ["유저명 입력값이 유효하지 않습니다.", "The user name is invalid."],
  "전화번호 입력값이 유효하지 않습니다.": ["전화번호 입력값이 유효하지 않습니다.", "The phone number is invalid."],
  "이메일 입력값이 유효하지 않습니다.": ["이메일 입력값이 유효하지 않습니다.", "The email is invalid."],
  "새 비밀번호 입력값이 유효하지 않습니다.": ["새 비밀번호 입력값이 유효하지 않습니다.", "The new password is invalid."],
  "인증번호 입력값이 유효하지 않습니다.": ["인증번호 입력값이 유효하지 않습니다.", "The verification code is invalid."],
  "발신자 아이디 입력값이 유효하지 않습니다.": ["발신자 아이디 입력값이 유효하지 않습니다.", "The sender ID is invalid."],
  "수신자 아이디 입력값이 유효하지 않습니다.": ["수신자 아이디 입력값이 유효하지 않습니다.", "The recipient ID is invalid."],
  "가입 승인 여부 입력값이 유효하지 않습니다.": ["가입 승인 여부 입력값이 유효하지 않습니다.", "The approval status value is invalid."],
  "로그인 후 접근해주세요.": ["로그인 후 접근해주세요.", "Please log in to access."],
  "잘못된 접근입니다.": ["잘못된 접근입니다.", "Invalid access."],
  "비밀번호가 틀렸습니다.": ["비밀번호가 틀렸습니다.", "Incorrect password."],
  "인증번호가 틀렸습니다.": ["인증번호가 틀렸습니다.", "Incorrect verification code."],
  "존재하지 않는 아이디입니다.": ["존재하지 않는 아이디입니다.", "The login ID does not exist."],
  "해당 사용자가 없습니다.": ["해당 사용자가 없습니다.", "User not found."],
  "존재하지 않는 회원입니다.": ["존재하지 않는 회원입니다.", "Member not found."],
  "입력하신 아이디가 이미 등록되어 있습니다.": ["입력하신 아이디가 이미 등록되어 있습니다.", "This login ID is already registered."],
  "입력하신 전화번호가 이미 등록되어 있습니다.": ["입력하신 전화번호가 이미 등록되어 있습니다.", "This phone number is already registered."],
  "입력하신 이메일이 이미 등록되어 있습니다.": ["입력하신 이메일이 이미 등록되어 있습니다.", "This email is already registered."],
  "필수 입력 값인 이메일이 제공되지 않았습니다.": ["필수 입력 값인 이메일이 제공되지 않았습니다.", "Email is required."],
  "필수 입력 값인 아이디가 제공되지 않았습니다.": ["필수 입력 값인 아이디가 제공되지 않았습니다.", "Login ID is required."],
  "필수 입력 값인 전화번호가 제공되지 않았습니다.": ["필수 입력 값인 전화번호가 제공되지 않았습니다.", "Phone number is required."],
  "인증번호가 이미 발송되었습니다.": ["인증번호가 이미 발송되었습니다.", "Verification code has already been sent."],
  "인증번호 발송 텀을 확인하세요.": ["인증번호 발송 텀을 확인하세요.", "Please wait before requesting another code."],
  "해당 이메일에 대한 인증번호 정보가 없습니다.": ["해당 이메일에 대한 인증번호 정보가 없습니다.", "No verification data found for this email."],
  "해당하는 가입 대기자가 없습니다.": ["해당하는 가입 대기자가 없습니다.", "No pending registration found."],
  "사업자 등록증 파일 경로가 존재하지 않습니다.": ["사업자 등록증 파일 경로가 존재하지 않습니다.", "Business registration file path not found."],
  "존재하지 않는 파일입니다.": ["존재하지 않는 파일입니다.", "File not found."],
  "존재하지 않는 발송자입니다.": ["존재하지 않는 발송자입니다.", "Sender not found."],
  "존재하지 않는 수신자입니다.": ["존재하지 않는 수신자입니다.", "Recipient not found."],
  "메시지는 공백 제외 2자 이상, 100자 이하이어야 합니다.": ["메시지는 공백 제외 2자 이상, 100자 이하이어야 합니다.", "Message must be 2–100 characters (excluding spaces)."],

  // 제출/작업
  "해당 제출에 대한 로그가 없습니다.": ["해당 제출에 대한 로그가 없습니다.", "No log found for this submission."],
  "제출 정보를 찾을 수 없습니다.": ["제출 정보를 찾을 수 없습니다.", "Submission not found."],
  "제출 경로를 찾을 수 없습니다.": ["제출 경로를 찾을 수 없습니다.", "Submission path not found."],
  "main.py 파일에 필요한 코드 블록이 누락되었습니다. 코드를 확인해 주세요.": ["main.py 파일에 필요한 코드 블록이 누락되었습니다. 코드를 확인해 주세요.", "Required code block is missing in main.py. Please check your code."],

  // 목록/필터
  "sort는 asc, desc 중 하나여야 합니다.": ["sort는 asc, desc 중 하나여야 합니다.", "sort must be either asc or desc."],
  "filter는 진행중, 완료, 에러 중 최대 3개까지 선택 가능합니다.": ["filter는 진행중, 완료, 에러 중 최대 3개까지 선택 가능합니다.", "filter allows up to 3 values: in progress, completed, error."],
  "keyword는 공백 제외 2자 이상이어야 합니다.": ["keyword는 공백 제외 2자 이상이어야 합니다.", "keyword must be at least 2 characters (excluding spaces)."],
  "search와 keyword는 둘 다 입력되어야 합니다.": ["search와 keyword는 둘 다 입력되어야 합니다.", "Both search and keyword are required."],
  "날짜 형식은 YYYYMMDD 여야 합니다.": ["날짜 형식은 YYYYMMDD 여야 합니다.", "Date format must be YYYYMMDD."],
  "startdate는 enddate보다 앞서야 합니다.": ["startdate는 enddate보다 앞서야 합니다.", "startdate must be before enddate."],
  "startdate와 enddate는 둘 다 입력되어야 합니다.": ["startdate와 enddate는 둘 다 입력되어야 합니다.", "Both startdate and enddate are required."],

  // 기타
  "디렉토리 생성 중 오류 발생": ["디렉토리 생성 중 오류 발생", "Error occurred while creating directory."],
};

/**
 * 백엔드 에러 메시지를 현재 언어에 맞게 반환. tf(한글, 영문) 사용.
 * "[CODE] 한글메시지" 형태도 처리하여 메시지 부분만 번역.
 * @param {string} message - error.response?.data?.error?.message
 * @param {function} tf - (ko, en) => string
 * @returns {string}
 */
export function getLocalizedErrorMessage(message, tf) {
  if (!message || typeof message !== "string") return message || "";
  const trimmed = message.trim();
  if (!trimmed) return message;
  // Dynamic validation messages can include parameter names and multiple lines.
  // Translate line-by-line with regex so EN mode still works.
  const dynamicLinePairs = [
    [
      /^main\.py의 main\(\) 함수의 입출력 정보가 플랫폼 스키마와 일치하지 않습니다\.$/,
      () => "The input/output information for main() in main.py does not match the platform schema.",
    ],
    [
      /^main\.py의 main\(\) 함수 매개변수 이름이 플랫폼 스키마와 일치하지 않습니다\.$/,
      () => "The input/output information for main() in main.py does not match the platform schema.",
    ],
    [
      /^입력 파라미터에 허용되지 않은 이름:\s*(.+)$/,
      (m) => `Disallowed input parameter name(s): ${m[1]}`,
    ],
    [
      /^출력 파라미터에 허용되지 않은 이름:\s*(.+)$/,
      (m) => `Disallowed output parameter name(s): ${m[1]}`,
    ],
    [
      /^입력\(사용 생체신호\)에 허용되지 않은 이름:\s*(.+)$/,
      (m) => `Disallowed input parameter name(s): ${m[1]}`,
    ],
    [
      /^출력\(분석 수면 파라미터\)에 허용되지 않은 이름:\s*(.+)$/,
      (m) => `Disallowed output parameter name(s): ${m[1]}`,
    ],
  ];
  const dynamicTranslated = trimmed
    .split("\n")
    .map((line) => {
      const raw = line.trim();
      for (const [re, toEn] of dynamicLinePairs) {
        const match = raw.match(re);
        if (match) return tf(raw, toEn(match));
      }
      return line;
    })
    .join("\n");
  if (dynamicTranslated !== trimmed) {
    return dynamicTranslated;
  }
  // "[CODE] 한글메시지" 형태면 메시지 부분만 번역
  const prefixMatch = trimmed.match(/^\[([^\]]+)\]\s*(.+)$/);
  const toTranslate = prefixMatch ? prefixMatch[2].trim() : trimmed;
  const pair = ERROR_MESSAGE_MAP[toTranslate];
  const translated = pair ? tf(pair[0], pair[1]) : toTranslate;
  return prefixMatch ? `[${prefixMatch[1]}] ${translated}` : translated;
}
