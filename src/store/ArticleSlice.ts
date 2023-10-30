import { createAction, createSlice } from '@reduxjs/toolkit';

import { FS } from '../types/app.types';
import { IArticleResponce } from '../types/api.types';
import { fetchAnArticle } from '../services/RealWorld.api';

// State
const initialState: IArticleResponce = {
  status: FS.IDLE,
  error: null,
};

// Slices
const articlesSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnArticle.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(fetchAnArticle.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        state.article = action.payload.data.article;
      })
      .addCase(fetchAnArticle.rejected, (state, action) => {
        state.status = FS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
