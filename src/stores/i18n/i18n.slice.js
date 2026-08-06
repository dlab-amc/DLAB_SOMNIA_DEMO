import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload === "en" ? "en" : "ko";
    },
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ko" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;


