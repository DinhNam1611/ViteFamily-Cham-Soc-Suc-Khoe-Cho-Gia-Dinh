import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { MenuOutlined, PhoneOutlined, CloseOutlined } from '@ant-design/icons';
import { NAV_ITEMS, CONTACT_INFO } from '../../../data/constants';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>V</span>
          <span className={styles.logoText}>
            Vita<strong>Family</strong>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className={styles.cta}>
          <a href={`tel:${CONTACT_INFO.phone}`} className={styles.phone}>
            <PhoneOutlined />
            <span>{CONTACT_INFO.phone}</span>
          </a>
          <Button type="primary" size="large" className={styles.bookBtn}>
            Đặt lịch khám
          </Button>
        </div>

        {/* Mobile menu */}
        <button
          className={styles.menuBtn}
          onClick={() => setDrawerOpen(true)}
          aria-label="Mở menu"
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={280}
        closeIcon={<CloseOutlined />}
        title={
          <Link to="/" className={styles.logo} onClick={() => setDrawerOpen(false)}>
            <span className={styles.logoIcon}>V</span>
            <span className={styles.logoText}>
              Vita<strong>Family</strong>
            </span>
          </Link>
        }
      >
        <nav className={styles.drawerNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.drawerLink} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button type="primary" block size="large" className={styles.drawerBookBtn}>
            Đặt lịch khám
          </Button>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
