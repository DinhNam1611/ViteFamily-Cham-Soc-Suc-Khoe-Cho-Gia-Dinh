import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Forbidden.module.css';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
