import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  searchQuery: '',
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { setSelectedCategory, setSearchQuery, toggleSidebar, closeSidebar } = uiSlice.actions;
export const selectSelectedCategory = (state) => state.ui.selectedCategory;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export default uiSlice.reducer;