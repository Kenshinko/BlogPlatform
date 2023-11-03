import { createSlice } from '@reduxjs/toolkit';

import { FS } from '../types/app.types';
import { IServerResponce } from '../types/api.types';
import { fetchArticles } from '../services/RealWorld.api';

// State
const initialState: IServerResponce = {
  articles: [],
  articlesCount: 0,
  status: FS.IDLE,
  error: null,
};

// Slices
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = FS.LOADING;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = FS.SUCCEEDED;
        state.articles = action.payload.data.articles;
        state.articlesCount = action.payload.data.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = FS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
