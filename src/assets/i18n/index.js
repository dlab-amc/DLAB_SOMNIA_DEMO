import { useAppSelector } from "../../assets/hooks/useRedux";

const dictionary = {
  ko: {
    home: "홈",
    about: "소개",
    submit: "제출",
    submitGuide: "제출 가이드",
    submitFiles: "파일 업로드",
    contact: "문의",
    mypage: "마이페이지",
    logout: "로그아웃",
    login: "로그인",
    admin: "관리자",
    error: "에러",
    userHonorific: "님",
    notification: "알림",
    submitList: "제출 리스트",
  },
  en: {
    home: "Home",
    about: "About",
    submit: "Submit",
    submitGuide: "Submission Guide",
    submitFiles: "Upload Files",
    contact: "Contact",
    mypage: "My Page",
    logout: "Logout",
    login: "Login",
    admin: "Admin",
    error: "Error",
    userHonorific: " ",
    notification: "Notifications",
    submitList: "Submission List",
  },
};

export const tByLang = (lang, key) => {
  const table = dictionary[lang] || dictionary.ko;
  return table[key] || key;
};

export const useI18n = () => { 
  const language = useAppSelector((s) => s.i18nSlice.language);
  const t = (key) => tByLang(language, key);
  const tf = (koText, enText) => (language === "en" ? enText : koText);
  return { language, t, tf };
};


