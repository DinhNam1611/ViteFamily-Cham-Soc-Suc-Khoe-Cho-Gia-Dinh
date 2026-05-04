import { useLocation } from 'react-router-dom';
import { Avatar, Badge, Dropdown, Input } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './AdminHeader.module.css';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'Quản lý người dùng',
  '/admin/doctors': 'Quản lý bác sĩ',
  '/admin/hospitals': 'Quản lý bệnh viện',
  '/admin/specialties': 'Quản lý chuyên khoa',
  '/admin/appointments': 'Quản lý lịch hẹn',
  '/admin/reviews': 'Quản lý đánh giá',
  '/admin/notifications': 'Gửi thông báo',
  '/admin/statistics': 'Thống kê & Báo cáo',
};

const breadcrumbMap: Record<string, string[]> = {
  '/admin': ['Trang chủ', 'Dashboard'],
  '/admin/users': ['Trang chủ', 'Quản lý', 'Người dùng'],
  '/admin/doctors': ['Trang chủ', 'Quản lý', 'Bác sĩ'],
  '/admin/hospitals': ['Trang chủ', 'Quản lý', 'Bệnh viện'],
  '/admin/specialties': ['Trang chủ', 'Quản lý', 'Chuyên khoa'],
  '/admin/appointments': ['Trang chủ', 'Vận hành', 'Lịch hẹn'],
  '/admin/reviews': ['Trang chủ', 'Vận hành', 'Đánh giá'],
  '/admin/notifications': ['Trang chủ', 'Vận hành', 'Thông báo'],
  '/admin/statistics': ['Trang chủ', 'Báo cáo', 'Thống kê'],
};

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminHeader = ({ collapsed, onToggle }: AdminHeaderProps) => {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? 'Admin';
  const breadcrumbs = breadcrumbMap[location.pathname] ?? ['Trang chủ'];

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
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <div className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
                <span className={i === breadcrumbs.length - 1 ? styles.breadcrumbActive : styles.breadcrumbItem}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchWrapper}>
          <Input
            prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
            placeholder="Tìm kiếm..."
            className={styles.searchInput}
            size="middle"
          />
        </div>

        <Badge count={3} size="small" offset={[-2, 2]}>
          <button className={styles.iconBtn} aria-label="Tin nhắn">
            <MailOutlined />
          </button>
        </Badge>

        <Badge count={5} size="small" offset={[-2, 2]}>
          <button className={styles.iconBtn} aria-label="Thông báo">
            <BellOutlined />
          </button>
        </Badge>

        <div className={styles.divider} />

        <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={['click']}>
          <button className={styles.userBtn}>
            <Avatar size={36} icon={<UserOutlined />} style={{ background: '#4e73df' }} />
            <div className={styles.userMeta}>
              <div className={styles.userName}>Admin</div>
              <div className={styles.userRole}>Quản trị viên</div>
            </div>
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default AdminHeader;
