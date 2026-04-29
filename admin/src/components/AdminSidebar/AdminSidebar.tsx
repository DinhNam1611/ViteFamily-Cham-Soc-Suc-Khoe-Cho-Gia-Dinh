import { Link, useLocation } from 'react-router-dom';
import { Avatar } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  BankOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  StarOutlined,
  BellOutlined,
  BarChartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import styles from './AdminSidebar.module.css';

interface MenuItem {
  key: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface MenuSection {
  sectionLabel: string;
  items: MenuItem[];
}

const menu: MenuSection[] = [
  {
    sectionLabel: 'Tổng quan',
    items: [
      { key: 'dashboard', path: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
    ],
  },
  {
    sectionLabel: 'Quản lý',
    items: [
      { key: 'users', path: '/users', label: 'Người dùng', icon: <UserOutlined /> },
      { key: 'doctors', path: '/doctors', label: 'Bác sĩ', icon: <MedicineBoxOutlined /> },
      { key: 'hospitals', path: '/hospitals', label: 'Bệnh viện', icon: <BankOutlined /> },
      { key: 'specialties', path: '/specialties', label: 'Chuyên khoa', icon: <AppstoreOutlined /> },
    ],
  },
  {
    sectionLabel: 'Vận hành',
    items: [
      { key: 'appointments', path: '/appointments', label: 'Lịch hẹn', icon: <CalendarOutlined /> },
      { key: 'reviews', path: '/reviews', label: 'Đánh giá', icon: <StarOutlined /> },
      { key: 'notifications', path: '/notifications', label: 'Thông báo', icon: <BellOutlined /> },
    ],
  },
  {
    sectionLabel: 'Phân tích',
    items: [
      { key: 'statistics', path: '/statistics', label: 'Thống kê & Báo cáo', icon: <BarChartOutlined /> },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
}

const AdminSidebar = ({ collapsed }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logoArea}>
        <HeartOutlined className={styles.logoIcon} />
        {!collapsed && (
          <div>
            <span className={styles.logoText}>VitaFamily</span>
            <span className={styles.adminBadge}>Admin Portal</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {menu.map((section, si) => (
          <div key={section.sectionLabel}>
            {si > 0 && <div className={styles.divider} />}
            {!collapsed && <div className={styles.sectionLabel}>{section.sectionLabel}</div>}
            {section.items.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ''}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className={styles.menuLabel}>{item.label}</span>
                    {item.badge != null && <span className={styles.badge}>{item.badge}</span>}
                  </>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className={styles.userArea}>
        <Avatar size={34} icon={<UserOutlined />} style={{ background: '#0077C8', flexShrink: 0 }} />
        {!collapsed && (
          <div className={styles.userMeta}>
            <div className={styles.userName}>Admin</div>
            <div className={styles.userRole}>Quản trị viên</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
