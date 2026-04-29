import { useLocation } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './AdminHeader.module.css';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Quản lý người dùng',
  '/doctors': 'Quản lý bác sĩ',
  '/hospitals': 'Quản lý bệnh viện',
  '/specialties': 'Quản lý chuyên khoa',
  '/appointments': 'Quản lý lịch hẹn',
  '/reviews': 'Quản lý đánh giá',
  '/notifications': 'Gửi thông báo',
  '/statistics': 'Thống kê & Báo cáo',
};

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminHeader = ({ collapsed, onToggle }: AdminHeaderProps) => {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? 'Admin';

  const userMenu: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.toggleBtn} onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <span className={styles.pageTitle}>{title}</span>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Thông báo">
          <BellOutlined />
          <span className={styles.notifDot} />
        </button>

        <div className={styles.divider} />

        <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={['click']}>
          <button className={styles.userBtn}>
            <div className={styles.userMeta}>
              <div className={styles.userName}>Admin</div>
              <div className={styles.userRole}>Quản trị viên</div>
            </div>
            <Avatar size={34} icon={<UserOutlined />} style={{ background: '#0077C8' }} />
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default AdminHeader;
