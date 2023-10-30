import { IArticle } from './app.types';

export type IArticlesListProps = {
  articles: IArticle[];
};

export type IArticleProps = {
  key?: string;
  article?: IArticle;
  preview: boolean;
};
