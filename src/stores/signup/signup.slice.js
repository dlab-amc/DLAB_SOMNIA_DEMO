import { createSlice } from "@reduxjs/toolkit";
import { USER_ACCOUNT_TYPE } from "../../assets/data/data";

const initialState = {
  terms: {
    isChecked: [false, false, false],
  },
  info: {
    userId: "",
    userPassword: "",
    userPasswordCheck: "",
    accountType: USER_ACCOUNT_TYPE.BUSINESS,
    userName: "",
    organization: "", 
    userTel: "",
    userEmail: "",
    authNumber: "",
    companyName: "",
    companyDepartment: "",
    companyTel: "",
    businessNumber: "",
    companyAddress: "",
    businessFile: null, // 업로드된 파일


    userIdChecked: false,
    userPasswordChecked: false,
    userNameChecked: false,
    userTelChecked: false,
    userEmailChecked: false,
    authNumberChecked: false,
    companyNameChecked: false,
    companyDepartmentChecked: false,
    companyTelChecked: false,
    isPasswordCorrect: false,

    isIdUnique: false,
    isUserTelUnique: false,
    isAuthMailSent: false,
    isAuthNumberCorrect: false,

    isIdUniqueMessage: "",
    isUserTelUniqueMessage: "",
    isAuthMailSentMessage: "",
    isAuthNumberCorrectMessage: "",

    resultErrorMessage: "",
  },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    changeInputField: (state, action) => {
      // userId, userPassword, userPasswordCheck, userName, userTel, userEmail, companyName, companyDepartment, companyTel
      state.info[action.payload.name] = action.payload.value;
    },
    inputFieldCheck: (state, action) => {
      // isIdChecked, isPasswordChecked, isIdUnique, isPasswordCorrect, isNameChecked, isUserTelChecked, isUserEmailChecked, isUserTelUnique, isAuthMailSent, isAuthNumberChecked
      state.info[action.payload.name] = action.payload.boolean;
    },
    selectAccountType: (state, action) => {
      state.info.accountType = action.payload;
    },
    changeTermInput: (state, action) => {
      state.terms.isChecked[action.payload.index] = action.payload.boolean;
    },
    checkAllTermInput: (state, action) => {
      state.terms.isChecked = action.payload
        ? [true, true, true]
        : [false, false, false];
    },
    viewCheckMessage: (state, action) => {
      state.info[`${action.payload.name}Message`] = action.payload.message;
    },
    clearAll: (state) => {
      state.terms = initialState.terms;
      state.info = initialState.info;
    },
    setSignUpErrorMessage: (state, action) => {
      state.resultErrorMessage = action.payload;
    },
  },
});

export const {
  changeInputField,
  inputFieldCheck,
  selectAccountType,
  changeTermInput,
  checkAllTermInput,
  viewCheckMessage,
  clearAll,
  setSignUpErrorMessage,
} = signupSlice.actions;

export default signupSlice.reducer;
