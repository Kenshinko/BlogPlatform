import { ConfigProvider } from 'antd';
import { useLocation } from 'react-router-dom';

import { ThemeComponentWrapper } from '../../types/app.types';

const ThemeProvider: React.FC<ThemeComponentWrapper> = ({ children }) => {
  const currentPage = useLocation();
  const isCreacteArticlePage =
    currentPage.pathname === '/new-article' || currentPage.pathname === '/articles/:slug/edit';

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            marginXS: 0,
          },
          Form: {
            verticalLabelPadding: '0px',
            itemMarginBottom: isCreacteArticlePage ? 20 : 12,
          },
          Pagination: {
            colorPrimary: '#fff',
            colorPrimaryHover: '#fff',
            itemActiveBg: '#1890ff',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
