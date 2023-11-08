import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { HeartOutlined, HeartFilled, DotChartOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Popconfirm, Skeleton, Space, Tag, Typography } from 'antd';
const { Paragraph } = Typography;

import { FS, IAuthor, US } from '../../../types/app.types';
import { IArticleProps } from '../../../types/props.types';
import {
  addFavorite,
  deleteArticle,
  fetchAnArticle,
  removeFavorite,
} from '../../../services/RealWorld.api';
import { toggleArticlePreview, togglePagination } from '../../../store/UtilitySlice';
import { useAppDispatch, useStateSelector } from '../../../hooks';
import { capitalizeWords } from '../../../utilities';
import sidestyle from '../../UserPanel/UserPanel.module.scss';

import style from './Article.module.scss';

const Article: React.FC<IArticleProps> = ({ article, preview }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useLocation();
  const {
    article: fullArticle,
    status: articleStatus,
    error,
  } = useStateSelector((state) => state.articles);
  const currentUser = useStateSelector((state) => state.user.user.username);
  const userStatus = useStateSelector((state) => state.user.userStatus);
  const isPreview = useStateSelector((state) => state.utilities.isPreview);
  const pageNumber = useStateSelector((state) => state.utilities.currentPage);
  const listStatus: FS = useStateSelector((state) => state.articles.status);
  //@ts-ignore
  const isArticlePage = currentPage.pathname !== '/articles' || currentPage.pathname !== '/';

  // Получаем id статьи, из адресной строки, пропсов или в крайнем случае из стора
  let { slug } = useParams();
  if (!slug) slug = article?.slug || fullArticle?.slug;

  const articleData = article || fullArticle;
  let title,
    favorited = false,
    favoritesCount,
    tagList: string[] | undefined,
    description,
    createdAt: string | number | Date = 0,
    updatedAt: string | number | Date = 0,
    author: IAuthor | undefined,
    body: string | undefined;
  let username, image;

  if (articleData) {
    ({
      title,
      favorited,
      favoritesCount,
      tagList,
      description,
      createdAt,
      updatedAt,
      author,
      body,
    } = articleData);
    ({ username, image } = author);
  }

  const renderTags = tagList?.map((tag: string) => {
    return <Tag key={nanoid()}>{tag}</Tag>;
  });

  const handleDeleteArticle = () => {
    if (slug) {
      dispatch(deleteArticle(slug));
      dispatch(toggleArticlePreview(true));
      navigate('/articles');
    }
  };

  const handleEditArticle = () => {
    if (slug) navigate(`/articles/${slug}/edit`);
  };

  const handleToggleFavorite = () => {
    if (favorited && slug) {
      dispatch(removeFavorite(slug));
    }

    if (!favorited && slug) {
      dispatch(addFavorite(slug));
    }
  };

  const cardPlaceholder = (
    <Card
      className={!isPreview ? `${style['article']} ${style['fullview']}` : style['article']}
      bodyStyle={{ padding: 0 }}
    >
      <div className={style['article__preview']}>
        <div className={style['article__main-info']}>
          <Skeleton.Button active style={{ width: 350, height: 16 }} />
          <Space className={style['article__tags']}>
            <Skeleton.Button active style={{ width: 35, height: 16 }} />
            <Skeleton.Button active style={{ width: 35, height: 16 }} />
            <Skeleton.Button active style={{ width: 35, height: 16 }} />
          </Space>
        </div>
        <div className={style['article__side-info']}>
          <div className={style['article__about']}>
            <Skeleton.Button active style={{ width: 170, height: 16 }} />
            <Skeleton.Button active style={{ width: 170, height: 16 }} />
          </div>
          <Skeleton.Node active style={{ width: 45, height: 45 }}>
            <DotChartOutlined style={{ fontSize: 30, color: '#bfbfbf' }} />
          </Skeleton.Node>
        </div>
      </div>
      <div style={{ marginTop: 5 }}>
        <Skeleton.Button active style={{ width: 600, height: 16 }} />
        <Skeleton.Button active style={{ width: 600, height: 16 }} />
      </div>

      {!isPreview ? (
        <div style={{ marginTop: 25 }}>
          <Skeleton.Button active style={{ width: 908, height: 16 }} />
          <Skeleton.Button active style={{ width: 908, height: 16 }} />
          <Skeleton.Button active style={{ width: 466, height: 16 }} />
        </div>
      ) : null}
    </Card>
  );

  const card = (
    <Card
      className={!isPreview ? `${style['article']} ${style['fullview']}` : style['article']}
      bodyStyle={{ padding: 0 }}
    >
      <div className={style['article__preview']}>
        <div className={style['article__main-info']}>
          <Space>
            <Link
              to={`/articles/${slug}`}
              onClick={() => {
                if (slug && isPreview) {
                  dispatch(toggleArticlePreview(false));
                  dispatch(togglePagination(false));
                  dispatch(fetchAnArticle(slug));
                }
              }}
            >
              <h3 className={style['article__title']}>{title}</h3>
            </Link>
            <button className={style['article__fav-btn']} onClick={handleToggleFavorite}>
              {favorited ? (
                <HeartFilled className={style['article__fav']} />
              ) : (
                <HeartOutlined />
              )}
            </button>
            <span>{favoritesCount}</span>
          </Space>
          <Space className={style['article__tags']}>
            {tagList && tagList?.length > 0 ? renderTags : <div style={{ height: 22 }}></div>}
          </Space>
          <Paragraph className={style['article__prev-text']} ellipsis={{ rows: 2 }}>
            {description}
          </Paragraph>
        </div>
        <div className={style['article__pos']}>
          <div className={style['article__side-info']}>
            <div className={style['article__about']}>
              <span className={style['article__author']}>
                {username && capitalizeWords(username)}
              </span>
              <span className={style['article__publish-date']}>
                {createdAt === updatedAt
                  ? format(new Date(createdAt), 'MMMM d, yyyy')
                  : format(new Date(updatedAt), 'MMMM d, yyyy')}
              </span>
            </div>
            <Avatar size={45} src={image} />
          </div>
          {author && userStatus === US.AUTH && !isPreview && currentUser === username && (
            <div className={style['article__btns-field']}>
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDeleteArticle}
              >
                <Button className={style['article__btn']} danger ghost>
                  Delete
                </Button>
              </Popconfirm>
              <Button
                className={`${style['article__btn']} ${sidestyle['active']}`}
                onClick={handleEditArticle}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* @ts-ignore */}
      {!isPreview ? <Markdown className={style['article__body']}>{body}</Markdown> : null}
    </Card>
  );

  // useEffect(() => {
  //   if (isArticlePage) {
  //     dispatch(toggleArticlePreview(false));
  //     dispatch(togglePagination(false));
  //   }
  // }, [isArticlePage, preview]);

  return (
    <>{articleStatus === FS.LOADING || listStatus === FS.LOADING ? cardPlaceholder : card}</>
  );
};

export default Article;
