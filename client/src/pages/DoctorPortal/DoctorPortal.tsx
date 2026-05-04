import { Button, Result } from 'antd';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DoctorPortal.module.css';

const DoctorPortal = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.page}>
      <Result
        icon={<MedicineBoxOutlined className={styles.icon} />}
        title={`Xin chào, ${user?.fullName ?? 'Bác sĩ'}!`}
        subTitle="Cổng thông tin bác sĩ đang được xây dựng. Vui lòng quay lại sau."
        extra={[
          <Button key="home" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Đăng xuất
          </Button>,
        ]}
      />
    </div>
  );
};

export default DoctorPortal;
