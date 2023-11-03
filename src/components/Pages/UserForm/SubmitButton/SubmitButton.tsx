import { Button } from 'antd';

import { IFormButton } from '../../../../types/app.types';
import style from '../UserForm.module.scss';

const SubmitButton: React.FC<IFormButton> = ({ actionText, enable, watch }) => {
  return (
    <Button
      className={style['user-form__submit-btn']}
      block
      type="primary"
      htmlType="submit"
      disabled={enable ? false : watch!('agreement') === false}
    >
      {actionText}
    </Button>
  );
};

export default SubmitButton;
