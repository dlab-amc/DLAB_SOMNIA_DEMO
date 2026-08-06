import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userSlice from "./user/user.slice";
import submitSlice from "./submit/submit.slice";
import signupSlice from "./signup/signup.slice";
import listSlice from "./list/list.slice";
import commonSlice from "./common/common.slice";
import i18nSlice from "./i18n/i18n.slice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["userSlice", "i18nSlice"],
};

const rootReducer = combineReducers({
  userSlice,
  submitSlice,
  signupSlice,
  listSlice,
  commonSlice,
  i18nSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
