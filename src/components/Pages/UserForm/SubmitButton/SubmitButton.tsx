import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';

import { IFormButton } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const SubmitButton: React.FC<IFormButton> = ({ actionText, enable, watch }) => {
  const navigate = useNavigate();
  const currentPage = useLocation();

  return (
    <Button
      className={`${style['user-form__button']} ${style['submitBtn']}`}
      block={currentPage.pathname !== '/new-article'}
      type="primary"
      htmlType="submit"
      disabled={enable ? false : watch!('agreement') === false}
    >
      {actionText}
    </Button>
  );
};

export default SubmitButton;
