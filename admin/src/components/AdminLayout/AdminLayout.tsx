import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import AdminHeader from '../AdminHeader/AdminHeader';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar collapsed={collapsed} />
      <div className={`${styles.main} ${collapsed ? styles.collapsed : ''}`}>
        <AdminHeader collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
