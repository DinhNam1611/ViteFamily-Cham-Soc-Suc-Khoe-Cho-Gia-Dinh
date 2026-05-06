import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Avatar, Dropdown, Tooltip, message } from 'antd';
import type { MenuProps } from 'antd';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import {
  MenuOutlined,
  PhoneOutlined,
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
      if (specialtyDropdownRef.current && !specialtyDropdownRef.current.contains(e.target as Node)) {
        setSpecialtyOpen(false);
      }
      if (guideDropdownRef.current && !guideDropdownRef.current.contains(e.target as Node)) {
        setGuideOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(e.target as Node)) {
        setNewsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
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
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ của tôi',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'family',
      icon: <TeamOutlined />,
      label: 'Hồ sơ gia đình',
      onClick: () => navigate('/ho-so-gia-dinh'),
    },
    {
      key: 'lab',
      icon: <ExperimentOutlined />,
      label: 'Kết quả xét nghiệm',
      onClick: () => navigate('/ket-qua-xet-nghiem'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>

      {/* ── Tầng 1: Topbar ─────────────────────────────────────── */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>V</span>
            <span className={styles.logoText}>
              Vita<strong>Family</strong>
            </span>
          </Link>

          {/* Hotline — ẩn trên mobile */}
          <a href={`tel:${CONTACT_INFO.phone}`} className={styles.hotline}>
            <span className={styles.hotlineIcon}><PhoneOutlined /></span>
            <div className={styles.hotlineText}>
              <span className={styles.hotlineLabel}>Đường dây nóng</span>
              <span className={styles.hotlineNumber}>{CONTACT_INFO.phone}</span>
            </div>
          </a>

          {/* Actions bên phải */}
          <div className={styles.topbarRight}>
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
                {/* Icon: Kết quả xét nghiệm */}
                <Tooltip title="Kết quả xét nghiệm" placement="bottom">
                  <button
                    className={styles.iconBtn}
                    onClick={handleLabResults}
                    aria-label="Kết quả xét nghiệm"
                  >
                    <FileSearchOutlined />
                  </button>
                </Tooltip>

                {/* Icon: Tìm kiếm */}
                <Tooltip title="Tìm kiếm" placement="bottom">
                  <button
                    className={styles.iconBtn}
                    onClick={() => setSearchOpen(true)}
                    aria-label="Tìm kiếm"
                  >
                    <SearchOutlined />
                  </button>
                </Tooltip>

                {/* Auth */}
                {isAuthenticated ? (
                  <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                    <button className={styles.userBtn} aria-label="Tài khoản">
                      <Avatar
                        size={42}
                        src={user?.avatar}
                        icon={!user?.avatar && <UserOutlined />}
                        className={styles.avatar}
                      />
                      <span className={styles.userName}>{user?.fullName?.split(' ').pop()}</span>
                      <DownOutlined className={styles.userArrow} />
                    </button>
                  </Dropdown>
                ) : (
                  <div className={styles.authBtns}>
                    <Button
                      className={styles.loginBtn}
                      onClick={() => navigate('/login')}
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      type="primary"
                      className={styles.registerBtn}
                      onClick={() => navigate('/register')}
                    >
                      Đăng ký
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Hamburger — chỉ mobile */}
            <button
              className={styles.menuBtn}
              onClick={() => setDrawerOpen(true)}
              aria-label="Mở menu"
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* ── Tầng 2: Navbar ─────────────────────────────────────── */}
      <nav className={styles.navbar}>
        <div className={`container ${styles.navInner}`}>
          {NAV_ITEMS.map((item) =>
            item.id === 'specialties' ? (
              <div
                key={item.path}
                className={styles.dropdownWrapper}
                ref={specialtyDropdownRef}
                onMouseEnter={() => setSpecialtyOpen(true)}
                onMouseLeave={() => setSpecialtyOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isSpecialtyActive ? styles.active : ''}`}
                  onClick={() => setSpecialtyOpen((v) => !v)}
                  aria-expanded={specialtyOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${specialtyOpen ? styles.arrowOpen : ''}`} />
                </button>
                {specialtyOpen && (
                  <div className={styles.megaDropdown}>
                    <div className={styles.megaDropdownInner}>
                      {SPECIALTY_GROUPS.map((group) => (
                        <div key={group.path} className={styles.megaGroup}>
                          <Link
                            to={group.path}
                            className={styles.megaGroupTitle}
                            onClick={() => setSpecialtyOpen(false)}
                          >
                            {group.label}
                          </Link>
                          {group.items.map((sp) => (
                            <Link
                              key={sp.path}
                              to={sp.path}
                              className={styles.megaItem}
                              onClick={() => setSpecialtyOpen(false)}
                            >
                              {sp.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.id === 'guide' ? (
              <div
                key={item.path}
                className={styles.dropdownWrapper}
                ref={guideDropdownRef}
                onMouseEnter={() => setGuideOpen(true)}
                onMouseLeave={() => setGuideOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isGuideActive ? styles.active : ''}`}
                  onClick={() => setGuideOpen((v) => !v)}
                  aria-expanded={guideOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${guideOpen ? styles.arrowOpen : ''}`} />
                </button>
                {guideOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownInner}>
                      {PATIENT_GUIDE_DROPDOWN.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`${styles.dropdownItem} ${(location.pathname + location.search) === sub.path ? styles.dropdownItemActive : ''}`}
                          onClick={() => setGuideOpen(false)}
                        >
                          <span className={styles.dropdownIcon}>{GUIDE_ICON_MAP[sub.icon]}</span>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.id === 'services' ? (
              <div
                key={item.path}
                className={styles.dropdownWrapper}
                ref={servicesDropdownRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isServicesActive ? styles.active : ''}`}
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${servicesOpen ? styles.arrowOpen : ''}`} />
                </button>
                {servicesOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownInner}>
                      {SERVICES_DROPDOWN.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`${styles.dropdownItem} ${(location.pathname + location.search) === sub.path ? styles.dropdownItemActive : ''}`}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className={styles.dropdownIcon}>{SERVICE_ICON_MAP[sub.icon]}</span>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.id === 'news' ? (
              <div
                key={item.path}
                className={styles.dropdownWrapper}
                ref={newsDropdownRef}
                onMouseEnter={() => setNewsOpen(true)}
                onMouseLeave={() => setNewsOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isNewsActive ? styles.active : ''}`}
                  onClick={() => setNewsOpen((v) => !v)}
                  aria-expanded={newsOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${newsOpen ? styles.arrowOpen : ''}`} />
                </button>
                {newsOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownInner}>
                      {NEWS_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={cat.path}
                          className={`${styles.dropdownItem} ${location.search.includes(cat.slug) && isNewsActive ? styles.dropdownItemActive : ''}`}
                          onClick={() => setNewsOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.id === 'contact' ? (
              <div
                key={item.path}
                className={styles.dropdownWrapper}
                ref={dropdownRef}
                onMouseEnter={() => setContactOpen(true)}
                onMouseLeave={() => setContactOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isContactActive ? styles.active : ''}`}
                  onClick={() => setContactOpen((v) => !v)}
                  aria-expanded={contactOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${contactOpen ? styles.arrowOpen : ''}`} />
                </button>
                {contactOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownInner}>
                      {contactDropdown.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`${styles.dropdownItem} ${location.pathname === sub.path ? styles.dropdownItemActive : ''}`}
                          onClick={() => setContactOpen(false)}
                        >
                          <span className={styles.dropdownIcon}>{sub.icon}</span>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={288}
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
          {/* User card */}
          {isAuthenticated && (
            <div className={styles.drawerUser}>
              <Avatar
                size={44}
                src={user?.avatar}
                icon={!user?.avatar && <UserOutlined />}
                className={styles.avatar}
              />
              <div className={styles.drawerUserInfo}>
                <span className={styles.drawerUserName}>{user?.fullName}</span>
                <span className={styles.drawerUserEmail}>{user?.email}</span>
              </div>
            </div>
          )}

          {/* Nav links */}
          {NAV_ITEMS.map((item) =>
            item.id === 'specialties' ? (
              <div key={item.path}>
                <button
                  className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isSpecialtyActive ? styles.active : ''}`}
                  onClick={() => setMobileSpecialtyOpen((v) => !v)}
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileSpecialtyOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileSpecialtyOpen && (
                  <div className={styles.drawerSubMenu}>
                    {SPECIALTY_GROUPS.map((group) => (
                      <Link
                        key={group.path}
                        to={group.path}
                        className={`${styles.drawerSubLink} ${location.pathname.startsWith(group.path) ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {group.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'guide' ? (
              <div key={item.path}>
                <button
                  className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isGuideActive ? styles.active : ''}`}
                  onClick={() => setMobileGuideOpen((v) => !v)}
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileGuideOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileGuideOpen && (
                  <div className={styles.drawerSubMenu}>
                    {PATIENT_GUIDE_DROPDOWN.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`${styles.drawerSubLink} ${location.pathname === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span className={styles.dropdownIcon}>{GUIDE_ICON_MAP[sub.icon]}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'services' ? (
              <div key={item.path}>
                <button
                  className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isServicesActive ? styles.active : ''}`}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileServicesOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className={styles.drawerSubMenu}>
                    {SERVICES_DROPDOWN.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`${styles.drawerSubLink} ${(location.pathname + location.search) === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span className={styles.dropdownIcon}>{SERVICE_ICON_MAP[sub.icon]}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'news' ? (
              <div key={item.path}>
                <button
                  className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isNewsActive ? styles.active : ''}`}
                  onClick={() => setMobileNewsOpen((v) => !v)}
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileNewsOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileNewsOpen && (
                  <div className={styles.drawerSubMenu}>
                    {NEWS_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={cat.path}
                        className={`${styles.drawerSubLink} ${location.search.includes(cat.slug) && isNewsActive ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.id === 'contact' ? (
              <div key={item.path}>
                <button
                  className={`${styles.drawerLink} ${styles.drawerDropdownTrigger} ${isContactActive ? styles.active : ''}`}
                  onClick={() => setMobileContactOpen((v) => !v)}
                >
                  {item.label}
                  <DownOutlined className={`${styles.dropdownArrow} ${mobileContactOpen ? styles.arrowOpen : ''}`} />
                </button>
                {mobileContactOpen && (
                  <div className={styles.drawerSubMenu}>
                    {contactDropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`${styles.drawerSubLink} ${location.pathname === sub.path ? styles.active : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span className={styles.dropdownIcon}>{sub.icon}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.drawerLink} ${location.pathname === item.path ? styles.active : ''}`}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Quick links khi đã đăng nhập */}
          {isAuthenticated && (
            <>
              <button
                className={styles.drawerFeatureBtn}
                onClick={() => { navigate('/profile'); setDrawerOpen(false); }}
              >
                <UserOutlined className={styles.drawerFeatureIcon} />
                Hồ sơ của tôi
              </button>
              <button
                className={styles.drawerFeatureBtn}
                onClick={() => { navigate('/ho-so-gia-dinh'); setDrawerOpen(false); }}
              >
                <TeamOutlined className={styles.drawerFeatureIcon} />
                Hồ sơ gia đình
              </button>
            </>
          )}

          {/* Kết quả xét nghiệm */}
          <button
            className={styles.drawerFeatureBtn}
            onClick={() => { handleLabResults(); setDrawerOpen(false); }}
          >
            <FileSearchOutlined className={styles.drawerFeatureIcon} />
            Kết quả xét nghiệm
          </button>

          <div className={styles.drawerDivider} />

          {/* Auth buttons */}
          {isAuthenticated ? (
            <Button
              block
              danger
              icon={<LogoutOutlined />}
              className={styles.drawerLogoutBtn}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          ) : (
            <>
              <Button
                block
                className={styles.drawerLoginBtn}
                onClick={() => { navigate('/login'); setDrawerOpen(false); }}
              >
                Đăng nhập
              </Button>
              <Button
                type="primary"
                block
                className={styles.drawerRegisterBtn}
                onClick={() => { navigate('/register'); setDrawerOpen(false); }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
