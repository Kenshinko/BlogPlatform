import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// State
const initialState: { isArticlesList: boolean; isPreview: boolean } = {
  isArticlesList: true,
  isPreview: true,
};

// Slices
const utilitySlice = createSlice({
  name: 'utilities',
  initialState,
  reducers: {
    togglePagination(state, action: PayloadAction<boolean>) {
      state.isArticlesList = action.payload;
    },
    toggleOnArticle(state, action: PayloadAction<boolean>) {
      state.isPreview = action.payload;
    },
  },
});

export default utilitySlice.reducer;
export const { togglePagination, toggleOnArticle } = utilitySlice.actions;
