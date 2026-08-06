import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    isLogined: false,
    userId: '',
    token: '',
    loginTimestamp: null,
    notificationCount: 0,
  },
  admin: {
    isLogined: false,
    userId: '',
    token: '',
    loginTimestamp: null,
    notificationCount: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user.isLogined = true;
      state.user.userId = action.payload.userId;
      state.user.token = action.payload.token;
      state.user.loginTimestamp = new Date().toISOString();
    },
    adminLogin: (state, action) => {
      state.admin.isLogined = true;
      state.admin.userId = action.payload.userId;
      state.admin.token = action.payload.token;
      state.admin.loginTimestamp = new Date().toISOString();
    },
    userLogout: (state) => {
      state.user.isLogined = false;
      state.user.userId = '';
      state.user.token = '';
      state.user.loginTimestamp = null;
    },
    adminLogout: (state) => {
      state.admin.isLogined = false;
      state.admin.userId = '';
      state.admin.token = '';
      state.admin.loginTimestamp = null;
    },
    getNotificationCount: (state, action) => {
      state[action.payload.type].notificationCount = action.payload.count;
    },
  },
});

export const {
  getNotificationCount,
  userLogin,
  adminLogin,
  userLogout,
  adminLogout,
} = userSlice.actions;

export default userSlice.reducer;
