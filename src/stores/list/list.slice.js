import { createSlice } from "@reduxjs/toolkit";
import { SORT_TYPE } from "../../assets/data/data";

const initialState = {
  currentPageList: [],
  totalListCount: 0,
  currentPageIndex: 1,
  totalPageIndex: 0,
  sort: SORT_TYPE.DESC,
  filter: "",
  startDate: null,
  endDate: null,
  searchField: null,
  searchValue: "",
  searchedValue: {
    field: null,
    value: "",
  },
  currentUserIndex: -1,
  userTopTabCount: [0, 0],
  taskTopTabCount: {
    total_count: 0,
    total_progress_count: 0,
  },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    fetchDataList: (state, action) => {
      state.currentPageList = action.payload.data;
      state.totalListCount = action.payload.count;
      state.totalPageIndex = action.payload.totalIndex;
    },
    movePageIndex: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    setDateFilter: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setStateFilter: (state, action) => {
      state.filter = action.payload;
    },
    selectSearchField: (state, action) => {
      state.searchField = action.payload;
    },
    changeInputSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    resetFilters: (state) => {
      state.sort = SORT_TYPE.DESC;
      state.filter = [];
      state.startDate = "";
      state.endDate = "";
      state.searchField = "";
      state.searchValue = "";
    },
    resetDatas: (state) => {
      state.currentPageList = [];
      state.totalListCount = 0;
      state.currentPageIndex = 1;
      state.totalPageIndex = 0;
      state.searchedValue = {
        field: null,
        value: "",
      };
    },
    searchValues: (state, action) => {
      state.searchedValue.field = action.payload.field;
      state.searchedValue.value = action.payload.value;
    },
    selectCurrentUser: (state, action) => {
      state.currentUserIndex = action.payload;
    },
    setUserTopTabCount: (state, action) => {
      state.userTopTabCount = action.payload;
    },
    setTaskTopTabCount: (state, action) => {
      state.taskTopTabCount = {
        total_count: action.payload.total_count || 0,
        total_progress_count: action.payload.total_progress_count || 0,
      };
    },
  },
});

export const {
  setCurrentPage,
  fetchDataList,
  movePageIndex,
  changeSort,
  setDateFilter,
  setStateFilter,
  selectSearchField,
  changeInputSearch,
  resetFilters,
  searchValues,
  resetDatas,
  selectCurrentUser,
  setUserTopTabCount,
  setTaskTopTabCount,
} = listSlice.actions;

export default listSlice.reducer;
