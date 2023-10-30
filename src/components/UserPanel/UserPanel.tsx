import { Button, Space, Avatar } from 'antd';

import style from './UserPanel.module.scss';

const isLoggedIn = false;

const userPanel = isLoggedIn ? (
  <>
    <Button>Create article</Button>
    <Space>
      <h2>UserName</h2>
      <Avatar
        size={45}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </Space>
    <Button>Log Out</Button>
  </>
) : null;

const UserPanel: React.FC = () => {
  return (
    <Space className={style['user-panel']}>
      {userPanel}
      <Button className={`${style['user-panel__btn']} ${style['inactive']}`}>Sign In</Button>
      <Button className={style['user-panel__btn']}>Sign Up</Button>
    </Space>
  );
};

export default UserPanel;
