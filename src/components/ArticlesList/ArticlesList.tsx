import { useEffect } from 'react';
import { Space } from 'antd';

import Article from '../Pages/Article';
import { FS, IArticle } from '../../types/app.types';
import { fetchArticles } from '../../services/RealWorld.api';
import { useAppDispatch, useStateSelector } from '../../hooks';

import style from './ArticlesList.module.scss';

const ArticlesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, status, error } = useStateSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles({ limit: 5, offset: 0 }));
  }, []);

  const renderArticles = articles.map((article: IArticle) => {
    const slug = article.slug;

    return <Article key={slug} article={article} preview={true} />;
  });

  return (
    <Space className={style['articles-list']} direction="vertical">
      {renderArticles}
    </Space>
  );
};

export default ArticlesList;
