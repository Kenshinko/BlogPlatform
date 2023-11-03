// import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Pagination } from 'antd';
const { Header, Footer } = Layout;

import UserPanel from '../UserPanel';
import UserForm from '../Pages/UserForm';
import ArticlesList from '../ArticlesList';
import Article from '../Pages/Article';
import { toggleOnArticle, togglePagination } from '../../store/UtilitySlice';
import { fetchArticles } from '../../services/RealWorld.api';
import { useAppDispatch, useStateSelector } from '../../hooks';

import style from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const articlesCount = useStateSelector((state) => state.articles.articlesCount);
  const isArticlesList = useStateSelector((state) => state.utilities.isArticlesList);

  const handleClick = () => {
    dispatch(toggleOnArticle(true));
    dispatch(togglePagination(true));
  };

  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(actionLogIn());
  //   }
  // }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={style['header']}>
        <div className={style['header__wrap']}>
          <Link to={'/articles'}>
            <h1 className={style['header__title']} onClick={handleClick}>
              Realworld Blog
            </h1>
          </Link>
          <UserPanel />
        </div>
      </Header>

      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article preview={false} />} />
        {/* Вход с систему */}
        <Route path="/sign-in" element={<UserForm />} />
        {/* Регистрация */}
        <Route path="/sign-up" element={<UserForm />} />
        {/* Редактирование профиля */}
        <Route path="/profile" element={<UserForm />} />
      </Routes>

      <Footer className={style['footer']}>
        {isArticlesList && (
          <Pagination
            defaultCurrent={1}
            pageSize={5}
            total={articlesCount || 1}
            showSizeChanger={false}
            onChange={(page) => dispatch(fetchArticles({ limit: 5, offset: 5 * (page - 1) }))}
          />
        )}
      </Footer>
    </Layout>
  );
};

export default App;
