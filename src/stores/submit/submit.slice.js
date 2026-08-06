import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    submitTitle: "",
    submitDescription: "",
    selectedPower: "80",
  },
  file: {
    files: [],
    /** ZIP 내부 경로 목록 (업로드 단계 이탈 후에도 트리 유지) */
    archivePaths: [],
  },
  paramData: {
    // 주(primary) 파라미터: 백엔드에서 실제 분석 가능한 파라미터 리스트를 받아 선택
    primaryParameter: "",
    // 검정에 필요한 통계 파라미터들
    alpha: 0.05, // 유의수준
    power: 0.8, // (1−β), 예: power=0.8 → β=0.2
    sigma: "", // 표준편차
    delta: "", // 비열등성 마진
    availableParams: [],
    availableInputParams: [],
  },
};

export const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    changeInputField: (state, action) => {
      state.info[action.payload.name] = action.payload.value;
    },
    /* 제출 단계는 단일 ZIP만 사용. File 객체는 Set으로 중복 제거가 안 되므로 항상 payload로 교체 */
    uploadFile: (state, action) => {
      state.file.files =
        action.payload && action.payload.length > 0
          ? [...action.payload]
          : [];
    },
    removeFile: (state, action) => {
      state.file.files.splice(action.payload.index, 1);
      if (state.file.files.length === 0) {
        state.file.archivePaths = [];
      }
    },
    clearFiles: (state) => {
      state.file.files = [];
      state.file.archivePaths = [];
      state.paramData.availableParams = [];
      state.paramData.availableInputParams = [];
    },
    setArchivePaths: (state, action) => {
      state.file.archivePaths = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
    resetDatas: (state) => {
      state.info = {
        submitTitle: "",
        submitDescription: "",
        selectedPower: "80",
      };
      state.file = {
        files: [],
        archivePaths: [],
      };

      state.paramData = {
        primaryParameter: "",
        alpha: 0.05,
        power: 0.8,
        sigma: "",
        delta: "",
        availableParams: [],
        availableInputParams: [],
      };
    },

    // [신규] 3단계(비열등성 파라미터)에서 입력값을 업데이트하는 reducer
    paramChangeField: (state, action) => {
      // action.payload = { name: "alpha", value: "0.05" }
      state.paramData[action.payload.name] = action.payload.value;
    },

    // [신규] 서버(백엔드)로 파일 업로드 후, 실제 파일이 갖고 있는 파라미터 목록을 수신할 때 사용
    setAvailableParams: (state, action) => {
      // action.payload = ["PARAM_A", "PARAM_B", ...]
      state.paramData.availableParams = action.payload;
    },

    setValidationArchiveParams: (state, action) => {
      const { input = [], output = [] } = action.payload || {};
      state.paramData.availableInputParams = Array.isArray(input) ? input : [];
      state.paramData.availableParams = Array.isArray(output) ? output : [];
    },
  },
});

export const {
  changeInputField,
  uploadFile,
  resetDatas,
  removeFile,
  clearFiles,
  setArchivePaths,
  paramChangeField,
  setAvailableParams,
  setValidationArchiveParams,
} = submitSlice.actions;

export default submitSlice.reducer;
