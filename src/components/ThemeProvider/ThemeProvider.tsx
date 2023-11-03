import { ConfigProvider } from 'antd';

import { ThemeComponentWrapper } from '../../types/app.types';

const ThemeProvider: React.FC<ThemeComponentWrapper> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            verticalLabelPadding: '0px',
            itemMarginBottom: 12,
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
