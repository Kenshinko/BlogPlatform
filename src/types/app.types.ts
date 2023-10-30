export const enum FS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  REJECTED = 'rejected',
}

export type IArticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
};

export type IAuthor = {
  username: string;
  image: string;
  following: boolean;
};
