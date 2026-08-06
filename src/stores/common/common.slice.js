import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isVisibleModal: false,
  isVisibleNotificationModal: false,
  isVisibleUserInfoModal: false,
  isVisibleToast: false,
  toastInfo: {
    type: 'default',
    text: '',
  },
  modalInfo: {
    title: '',
    text: '',
    isScrollable: false,
  },
  notificationModalInfo: {
    userId: '',
    userName: '',
    textArea: '',
  },
  userInfoModalIndex: -1,
  isEditedMode: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVisibleModal: (state, action) => {
      state.isVisibleModal = action.payload.isVisible;
      state.modalInfo.title = action.payload.title;
      state.modalInfo.text = action.payload.text;
      state.modalInfo.isScrollable = action.payload.isScrollable;
    },
    setVisibleToast: (state, action) => {
      state.isVisibleToast = action.payload.isVisible;
      state.toastInfo.text = action.payload.text;
    },
    toggleEditedMode: (state, action) => {
      state.isEditedMode = action.payload;
    },
    setVisibleNotificationModal: (state, action) => {
      state.isVisibleNotificationModal = action.payload.isVisible;
      state.notificationModalInfo.userId = action.payload.userId;
      state.notificationModalInfo.userName = action.payload.userName;
    },
    setVisibleUserInfoModal: (state, action) => {
      state.isVisibleUserInfoModal = action.payload.isVisible;
      state.userInfoModalIndex = action.payload.index;
    },
    changeNotificationText: (state, action) => {
      state.notificationModalInfo.textArea = action.payload;
    },
  },
});

export const {
  setLoading,
  setVisibleModal,
  toggleEditedMode,
  setVisibleNotificationModal,
  changeNotificationText,
  setVisibleUserInfoModal,
  setVisibleToast,
} = commonSlice.actions;

export default commonSlice.reducer;
