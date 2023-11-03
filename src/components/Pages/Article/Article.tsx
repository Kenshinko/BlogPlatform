import { useEffect } from 'react';
import { Avatar, Card, Skeleton, Space, Tag, Typography } from 'antd';
const { Paragraph } = Typography;
import { HeartOutlined, HeartFilled, DotChartOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import { FS } from '../../../types/app.types';
import { IArticleProps } from '../../../types/props.types';
import { fetchAnArticle } from '../../../services/RealWorld.api';
import { toggleOnArticle, togglePagination } from '../../../store/UtilitySlice';
import { useAppDispatch, useStateSelector } from '../../../hooks';
import { capitalizeWords } from '../../../utilities';

import style from './Article.module.scss';

const Article: React.FC<IArticleProps> = ({ article }) => {
  const dispatch = useAppDispatch();
  const {
    article: fullArticle,
    status: articleStatus,
    error,
  } = useStateSelector((state) => state.article);
  const isPreview = useStateSelector((state) => state.utilities.isPreview);
  const listStatus: FS = useStateSelector((state) => state.articles.status);

  // Получаем id статьи, из адресной строки, пропсов или в крайнем случае из стора
  let { slug } = useParams();
  if (!slug) slug = article?.slug || fullArticle?.slug;

  useEffect(() => {
    // Обновляем страницу одной статьи
    if (articleStatus === FS.IDLE && listStatus !== FS.SUCCEEDED) {
      dispatch(toggleOnArticle(false));
      dispatch(togglePagination(false));
      if (slug) {
        dispatch(fetchAnArticle(slug));
      }
    }
  }, [articleStatus, listStatus, slug, dispatch]);

  const articleData = article || fullArticle;
  let title, favorited, favoritesCount, tagList, description, createdAt: string, author, body;
  let username, image;

  if (articleData) {
    ({ title, favorited, favoritesCount, tagList, description, createdAt, author, body } =
      articleData);
    ({ username, image } = author);
  }

  const renderTags = tagList?.map((tag: string) => {
    return <Tag key={nanoid()}>{tag}</Tag>;
  });

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
                  dispatch(toggleOnArticle(false));
                  dispatch(togglePagination(false));
                  dispatch(fetchAnArticle(slug));
                }
              }}
            >
              <h3 className={style['article__title']}>{title}</h3>
            </Link>
            {favorited ? <HeartFilled className={style['article__fav']} /> : <HeartOutlined />}
            <span>{favoritesCount}</span>
          </Space>
          <Space className={style['article__tags']}>{renderTags}</Space>
          <Paragraph className={style['article__prev-text']} ellipsis={{ rows: 2 }}>
            {description}
          </Paragraph>
        </div>
        <div className={style['article__side-info']}>
          <div className={style['article__about']}>
            <span className={style['article__author']}>
              {username && capitalizeWords(username)}
            </span>
            <span className={style['article__publish-date']}>
              {createdAt! ? format(new Date(createdAt), 'MMMM d, yyyy') : null}
            </span>
          </div>
          <Avatar size={45} src={image} />
        </div>
      </div>
      {!isPreview ? <Markdown className={style['article__body']}>{body}</Markdown> : null}
    </Card>
  );

  return (
    <>{articleStatus === FS.LOADING || listStatus === FS.LOADING ? cardPlaceholder : card}</>
  );
};

export default Article;
