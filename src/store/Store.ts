import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import articleSlice from './ArticleSlice';
import articlesSlice from './ArticlesSlice';
import userSlice from './userSlice';
import utilitySlice from './UtilitySlice';

const rootReducer = combineReducers({
  article: articleSlice,
  articles: articlesSlice,
  user: userSlice,
  utilities: utilitySlice,
});

const persistConfig = {
  key: 'MyBlog',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const Persistor = persistStore(Store);
