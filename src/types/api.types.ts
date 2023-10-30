import { FS, IArticle } from './app.types';

export type IServerResponce = {
  articles: IArticle[];
  articlesCount: number;
  status: FS;
  error?: string | null;
};

export type IArticleResponce = {
  article?: IArticle;
  status: FS;
  error?: string | null;
};
