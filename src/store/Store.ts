import { combineReducers, configureStore } from '@reduxjs/toolkit';

import articleSlice from './ArticleSlice';
import articlesSlice from './ArticlesSlice';
import utilitySlice from './UtilitySlice';

const rootReducer = combineReducers({
  article: articleSlice,
  articles: articlesSlice,
  utilities: utilitySlice,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['async/fetchArticles/fulfilled', 'async/fetchAnArticle/fulfilled'],
      },
    }),
});
