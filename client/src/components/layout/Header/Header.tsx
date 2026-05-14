import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Avatar, Dropdown, Tooltip, message } from 'antd';
import type { MenuProps } from 'antd';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import {
  MenuOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
  CloseOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  ExperimentOutlined,
  FileSearchOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  MedicineBoxOutlined,
  ScanOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { NAV_ITEMS, CONTACT_INFO, SPECIALTY_GROUPS, PATIENT_GUIDE_DROPDOWN, SERVICES_DROPDOWN, NEWS_CATEGORIES } from '../../../data/constants';
import { useAuth } from '../../../context/AuthContext';
import styles from './Header.module.css';

const GUIDE_ICON_MAP: Record<string, React.ReactNode> = {
  medicine: <MedicineBoxOutlined />,
  home: <HomeOutlined />,
  'credit-card': <CreditCardOutlined />,
  star: <StarOutlined />,
  team: <TeamOutlined />,
};

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  medicine: <MedicineBoxOutlined />,
  experiment: <ExperimentOutlined />,
  scan: <ScanOutlined />,
  video: <VideoCameraOutlined />,
  home: <HomeOutlined />,
  heart: <HeartOutlined />,
  safety: <SafetyOutlined />,
};

const contactDropdown = [
  { label: 'Đặt lịch khám', path: '/contact/dat-lich-kham', icon: <CalendarOutlined /> },
  { label: 'Hỏi chuyên gia', path: '/contact/hoi-chuyen-gia', icon: <QuestionCircleOutlined /> },
  { label: 'Làm việc tại VF', path: '/contact/lam-viec-tai-vf', icon: <TeamOutlined /> },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [mobileSpecialtyOpen, setMobileSpecialtyOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [mobileGuideOpen, setMobileGuideOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);
  const guideDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<InputRef>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setContactOpen(false);
      if (specialtyDropdownRef.current && !specialtyDropdownRef.current.contains(e.target as Node)) setSpecialtyOpen(false);
      if (guideDropdownRef.current && !guideDropdownRef.current.contains(e.target as Node)) setGuideOpen(false);
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(e.target as Node)) setNewsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) { setSearchOpen(false); setSearchQuery(''); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [searchOpen]);

  const isContactActive = location.pathname.startsWith('/contact');
  const isSpecialtyActive = location.pathname.startsWith('/specialties');
  const isGuideActive = location.pathname.startsWith('/help');
  const isServicesActive = location.pathname.startsWith('/services');
  const isNewsActive = location.pathname.startsWith('/news');

  const handleLogout = () => {
    logout();
    message.success('Đã đăng xuất');
    navigate('/');
    setDrawerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLabResults = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/ket-qua-xet-nghiem' } } });
    } else {
      navigate('/ket-qua-xet-nghiem');
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'info',
      label: (
        <div className={styles.userMenuInfo}>
          <span className={styles.userMenuName}>{user?.fullName}</span>
          <span className={styles.userMenuEmail}>{user?.email}</span>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    { key: 'profile', icon: <UserOutlined />, label: 'Hồ sơ của tôi', onClick: () => navigate('/profile') },
    { key: 'family', icon: <TeamOutlined />, label: 'Hồ sơ gia đình', onClick: () => navigate('/ho-so-gia-dinh') },
    { key: 'lab', icon: <ExperimentOutlined />, label: 'Kết quả xét nghiệm', onClick: () => navigate('/ket-qua-xet-nghiem') },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true, onClick: handleLogout },
  ];

  const renderNavItems = () => NAV_ITEMS.map((item) => {
    if (item.id === 'specialties') return (
      <div key={item.path} className={styles.dropdownWrapper} ref={specialtyDropdownRef}
        onMouseEnter={() => setSpecialtyOpen(true)} onMouseLeave={() => setSpecialtyOpen(false)}>
        <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isSpecialtyActive ? styles.active : ''}`}
          onClick={() => setSpecialtyOpen((v) => !v)} aria-expanded={specialtyOpen}>
          {item.label}
          <DownOutlined className={`${styles.dropdownArrow} ${specialtyOpen ? styles.arrowOpen : ''}`} />
        </button>
        {specialtyOpen && (
          <div className={styles.megaDropdown}>
            <div className={styles.megaDropdownInner}>
              {SPECIALTY_GROUPS.map((group) => (
                <div key={group.path} className={styles.megaGroup}>
                  <Link to={group.path} className={styles.megaGroupTitle} onClick={() => setSpecialtyOpen(false)}>{group.label}</Link>
                  {group.items.map((sp) => (
                    <Link key={sp.path} to={sp.path} className={styles.megaItem} onClick={() => setSpecialtyOpen(false)}>{sp.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    if (item.id === 'guide') return (
      <div key={item.path} className={styles.dropdownWrapper} ref={guideDropdownRef}
        onMouseEnter={() => setGuideOpen(true)} onMouseLeave={() => setGuideOpen(false)}>
        <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isGuideActive ? styles.active : ''}`}
          onClick={() => setGuideOpen((v) => !v)}>
          {item.label}
          <DownOutlined className={`${styles.dropdownArrow} ${guideOpen ? styles.arrowOpen : ''}`} />
        </button>
        {guideOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {PATIENT_GUIDE_DROPDOWN.map((sub) => (
                <Link key={sub.path} to={sub.path}
                  className={`${styles.dropdownItem} ${(location.pathname + location.search) === sub.path ? styles.dropdownItemActive : ''}`}
                  onClick={() => setGuideOpen(false)}>
                  <span className={styles.dropdownIcon}>{GUIDE_ICON_MAP[sub.icon]}</span>{sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    if (item.id === 'services') return (
      <div key={item.path} className={styles.dropdownWrapper} ref={servicesDropdownRef}
        onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
        <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isServicesActive ? styles.active : ''}`}
          onClick={() => { navigate(item.path); setServicesOpen(false); }}>
          {item.label}
          <span
            className={styles.dropdownArrowBtn}
            onClick={(e) => { e.stopPropagation(); setServicesOpen((v) => !v); }}
            aria-label="Mở menu dịch vụ"
          >
            <DownOutlined className={`${styles.dropdownArrow} ${servicesOpen ? styles.arrowOpen : ''}`} />
          </span>
        </button>
        {servicesOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {SERVICES_DROPDOWN.map((sub) => (
                <Link key={sub.path} to={sub.path}
                  className={`${styles.dropdownItem} ${(location.pathname + location.search) === sub.path ? styles.dropdownItemActive : ''}`}
                  onClick={() => setServicesOpen(false)}>
                  <span className={styles.dropdownIcon}>{SERVICE_ICON_MAP[sub.icon]}</span>{sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    if (item.id === 'news') return (
      <div key={item.path} className={styles.dropdownWrapper} ref={newsDropdownRef}
        onMouseEnter={() => setNewsOpen(true)} onMouseLeave={() => setNewsOpen(false)}>
        <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isNewsActive ? styles.active : ''}`}
          onClick={() => setNewsOpen((v) => !v)}>
          {item.label}
          <DownOutlined className={`${styles.dropdownArrow} ${newsOpen ? styles.arrowOpen : ''}`} />
        </button>
        {newsOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {NEWS_CATEGORIES.map((cat) => (
                <Link key={cat.slug} to={cat.path}
                  className={`${styles.dropdownItem} ${location.search.includes(cat.slug) && isNewsActive ? styles.dropdownItemActive : ''}`}
                  onClick={() => setNewsOpen(false)}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    if (item.id === 'contact') return (
      <div key={item.path} className={styles.dropdownWrapper} ref={dropdownRef}
        onMouseEnter={() => setContactOpen(true)} onMouseLeave={() => setContactOpen(false)}>
        <button className={`${styles.navLink} ${styles.dropdownTrigger} ${isContactActive ? styles.active : ''}`}
          onClick={() => setContactOpen((v) => !v)}>
          {item.label}
          <DownOutlined className={`${styles.dropdownArrow} ${contactOpen ? styles.arrowOpen : ''}`} />
        </button>
        {contactOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {contactDropdown.map((sub) => (
                <Link key={sub.path} to={sub.path}
                  className={`${styles.dropdownItem} ${location.pathname === sub.path ? styles.dropdownItemActive : ''}`}
                  onClick={() => setContactOpen(false)}>
                  <span className={styles.dropdownIcon}>{sub.icon}</span>{sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <Link key={item.path} to={item.path}
        className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}>
        {item.label}
      </Link>
    );
  });

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>

      {/* ── Topbar ── */}
      <div className={styles.topbar}>
        <div className={`${styles.container} ${styles.topbarInner}`}>
          <div className={styles.topbarContact}>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className={styles.topbarItem}
            >
              <EnvironmentOutlined />
              <span>123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
            </a>
            <span className={styles.topbarSep}>|</span>
            <a href={`tel:${CONTACT_INFO.phone}`} className={styles.topbarItem}>
              <PhoneOutlined />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <span className={styles.topbarSep}>|</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className={styles.topbarItem}>
              <MailOutlined />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          <div className={styles.topbarSocial}>
            <a href="#" className={styles.socialBtn} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Twitter / X">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Navbar (floating pill) ── */}
      <div className={styles.navbarOuter}>
        <div className={styles.navbar}>

            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
                </svg>
              </span>
              <span className={styles.logoText}>Vita<strong>Family</strong></span>
            </Link>

            {/* Search overlay mode */}
            {searchOpen ? (
              <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <Input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm bác sĩ, dịch vụ, chuyên khoa..."
                  className={styles.searchInput}
                  prefix={<SearchOutlined className={styles.searchPrefixIcon} />}
                  variant="filled"
                />
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  aria-label="Đóng tìm kiếm"
                >
                  <CloseOutlined />
                </button>
              </form>
            ) : (
              <>
                {/* Nav links (desktop) */}
                <nav className={styles.navArea}>
                  {renderNavItems()}
                </nav>

                {/* Right actions */}
                <div className={styles.actions}>
                  <Tooltip title="Kết quả xét nghiệm" placement="bottom">
                    <button className={styles.iconBtn} onClick={handleLabResults} aria-label="Kết quả xét nghiệm">
                      <FileSearchOutlined />
                    </button>
                  </Tooltip>
                  <Tooltip title="Tìm kiếm" placement="bottom">
                    <button className={styles.iconBtn} onClick={() => setSearchOpen(true)} aria-label="Tìm kiếm">
                      <SearchOutlined />
                    </button>
                  </Tooltip>

                  {isAuthenticated ? (
                    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                      <button className={styles.userBtn} aria-label="Tài khoản">
                        <Avatar size={34} src={user?.avatar} icon={!user?.avatar && <UserOutlined />} className={styles.avatar} />
                        <span className={styles.userName}>{user?.fullName?.split(' ').pop()}</span>
                        <DownOutlined className={styles.userArrow} />
                      </button>
                    </Dropdown>
                  ) : (
                    <div className={styles.authBtns}>
                      <Button className={styles.loginBtn} onClick={() => navigate('/login')}>Đăng nhập</Button>
                      <Button type="primary" className={styles.bookBtn}>
                        <Link to="/contact/dat-lich-kham">Đặt lịch</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile hamburger */}
            <button className={styles.menuBtn} onClick={() => setDrawerOpen(true)} aria-label="Mở menu">
              <MenuOutlined />
            </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={288}
        closeIcon={<CloseOutlined />}
        title={
          <Link to="/" className={styles.logo} onClick={() => setDrawerOpen(false)}>
            <span className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
              </svg>
            </span>
            <span className={styles.logoText}>Vita<strong>Family</strong></span>
          </Link>
        }
      >
        <nav className={styles.drawerNav}>
          {isAuthenticated && (
            <div className={styles.drawerUser}>
              <Avatar size={44} src={user?.avatar} icon={!user?.avatar && <UserOutlined />} className={styles.avatar} />
              <div className={styles.drawerUserInfo}>
                <span className={styles.drawerUserName}>{user?.fullName}</span>
                <span className={styles.drawerUserEmail}>{user?.email}</span>
              </div>
            </div>
          )}

          <a href={`tel:${CONTACT_INFO.phone}`} className={styles.drawerHotline}>
            <PhoneOutlined /> {CONTACT_INFO.phone}
          </a>

          {NAV_ITEMS.map((item) =>
            item.id === 'specialties' ? (
              <div key={item.path}>
                <button className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isSpecialtyActive ? styles.active : ''}`}
                  onClick={() => setMobileSpecialtyOpen((v) => !v)}>
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileSpecialtyOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileSpecialtyOpen && (
                  <div className={styles.drawerSubMenu}>
                    {SPECIALTY_GROUPS.map((group) => (
                      <Link key={group.path} to={group.path}
                        className={`${styles.drawerSubLink} ${location.pathname.startsWith(group.path) ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}>{group.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'guide' ? (
              <div key={item.path}>
                <button className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isGuideActive ? styles.active : ''}`}
                  onClick={() => setMobileGuideOpen((v) => !v)}>
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileGuideOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileGuideOpen && (
                  <div className={styles.drawerSubMenu}>
                    {PATIENT_GUIDE_DROPDOWN.map((sub) => (
                      <Link key={sub.path} to={sub.path}
                        className={`${styles.drawerSubLink} ${location.pathname === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}>
                        <span className={styles.dropdownIcon}>{GUIDE_ICON_MAP[sub.icon]}</span>{sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'services' ? (
              <div key={item.path}>
                <div className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isServicesActive ? styles.active : ''}`}>
                  <span
                    className={styles.drawerLinkLabel}
                    onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                  >
                    {item.label}
                  </span>
                  <button
                    className={styles.drawerArrowBtn}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-label="Mở submenu dịch vụ"
                  >
                    <DownOutlined className={`${styles.dropdownArrow} ${mobileServicesOpen ? styles.arrowOpen : ''}`} />
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div className={styles.drawerSubMenu}>
                    {SERVICES_DROPDOWN.map((sub) => (
                      <Link key={sub.path} to={sub.path}
                        className={`${styles.drawerSubLink} ${(location.pathname + location.search) === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}>
                        <span className={styles.dropdownIcon}>{SERVICE_ICON_MAP[sub.icon]}</span>{sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'news' ? (
              <div key={item.path}>
                <button className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isNewsActive ? styles.active : ''}`}
                  onClick={() => setMobileNewsOpen((v) => !v)}>
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileNewsOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileNewsOpen && (
                  <div className={styles.drawerSubMenu}>
                    {NEWS_CATEGORIES.map((cat) => (
                      <Link key={cat.slug} to={cat.path}
                        className={`${styles.drawerSubLink} ${location.search.includes(cat.slug) && isNewsActive ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}>{cat.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'contact' ? (
              <div key={item.path}>
                <button className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isContactActive ? styles.active : ''}`}
                  onClick={() => setMobileContactOpen((v) => !v)}>
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileContactOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileContactOpen && (
                  <div className={styles.drawerSubMenu}>
                    {contactDropdown.map((sub) => (
                      <Link key={sub.path} to={sub.path}
                        className={`${styles.drawerSubLink} ${location.pathname === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}>
                        <span className={styles.dropdownIcon}>{sub.icon}</span>{sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.path} to={item.path}
                className={`${styles.drawerLink} ${location.pathname === item.path ? styles.active : ''}`}
                onClick={() => setDrawerOpen(false)}>
                {item.label}
              </Link>
            )
          )}

          {isAuthenticated && (
            <>
              <button className={styles.drawerFeatureBtn} onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
                <UserOutlined className={styles.drawerFeatureIcon} /> Hồ sơ của tôi
              </button>
              <button className={styles.drawerFeatureBtn} onClick={() => { navigate('/ho-so-gia-dinh'); setDrawerOpen(false); }}>
                <TeamOutlined className={styles.drawerFeatureIcon} /> Hồ sơ gia đình
              </button>
            </>
          )}
          <button className={styles.drawerFeatureBtn} onClick={() => { handleLabResults(); setDrawerOpen(false); }}>
            <FileSearchOutlined className={styles.drawerFeatureIcon} /> Kết quả xét nghiệm
          </button>

          <div className={styles.drawerDivider} />

          {isAuthenticated ? (
            <Button block danger icon={<LogoutOutlined />} className={styles.drawerLogoutBtn} onClick={handleLogout}>
              Đăng xuất
            </Button>
          ) : (
            <>
              <Button block className={styles.drawerLoginBtn} onClick={() => { navigate('/login'); setDrawerOpen(false); }}>Đăng nhập</Button>
              <Button type="primary" block className={styles.drawerBookBtn} onClick={() => { navigate('/register'); setDrawerOpen(false); }}>Đăng ký</Button>
            </>
          )}
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
