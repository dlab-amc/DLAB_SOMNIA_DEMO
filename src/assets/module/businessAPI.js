import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_ENDPOINT_URL;

/**
 * 사업자등록번호 상태 조회 — 백엔드 프록시(`/check/business`)만 호출한다.
 * 키는 서버 env(BUSINESS_API_KEY)에만 두고, 미설정 시 서버가 skipped 응답을 준다.
 */
export const checkBusinessNumber = async (businessNumber) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/check/business`, {
      business_number: String(businessNumber),
    });
    const data = response.data?.data || {};
    return {
      isValid: Boolean(data.is_valid),
      statusMessage: data.status_message || "",
      skipped: Boolean(data.skipped),
    };
  } catch (error) {
    throw new Error("사업자등록번호 확인에 실패했습니다.");
  }
};
