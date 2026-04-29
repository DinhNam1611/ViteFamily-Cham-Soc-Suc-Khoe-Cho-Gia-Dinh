import { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import {
  HeartOutlined, MedicineBoxOutlined, ExperimentOutlined, SmileOutlined,
  CloudOutlined, BulbOutlined, UserOutlined, SafetyOutlined, WomanOutlined,
  ToolOutlined, SoundOutlined, EyeOutlined, AlertOutlined, ThunderboltOutlined,
  FilterOutlined, FileImageOutlined, DatabaseOutlined, FireOutlined,
  StarOutlined, ShopOutlined,
  CheckCircleFilled, CalendarOutlined, PhoneOutlined, TeamOutlined,
  HomeOutlined, RightOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { getSpecialtyBySlug, getSpecialtiesByGroup } from '../../data/specialtyData';
import styles from './SpecialtyDetail.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  heart: <HeartOutlined />,
  medicine: <MedicineBoxOutlined />,
  experiment: <ExperimentOutlined />,
  smile: <SmileOutlined />,
  cloud: <CloudOutlined />,
  bulb: <BulbOutlined />,
  user: <UserOutlined />,
  safety: <SafetyOutlined />,
  woman: <WomanOutlined />,
  tool: <ToolOutlined />,
  sound: <SoundOutlined />,
  eye: <EyeOutlined />,
  alert: <AlertOutlined />,
  thunderbolt: <ThunderboltOutlined />,
  filter: <FilterOutlined />,
  fileimage: <FileImageOutlined />,
  database: <DatabaseOutlined />,
  fire: <FireOutlined />,
  star: <StarOutlined />,
  shop: <ShopOutlined />,
};

const GROUP_COLOR: Record<string, string> = {
  internal: '#0077c8',
  surgical: '#00875a',
  support: '#7c3aed',
};

const SpecialtyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const specialty = useMemo(() => getSpecialtyBySlug(slug ?? ''), [slug]);
  const sameGroup = useMemo(
    () => (specialty ? getSpecialtiesByGroup(specialty.group) : []),
    [specialty],
  );

  if (!specialty) {
    return (
      <>
        <Header />
        <main className={styles.notFound}>
          <h2>Không tìm thấy chuyên khoa</h2>
          <Button type="primary" onClick={() => navigate('/specialties')}>
            Quay lại danh sách
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const groupColor = GROUP_COLOR[specialty.group] ?? '#0077c8';

  return (
    <>
      <Header />
      <main>
        {/* ── Hero Banner ── */}
        <section className={styles.hero} style={{ '--group-color': groupColor } as React.CSSProperties}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="breadcrumb">
              <Link to="/" className={styles.breadcrumbLink}>
                <HomeOutlined /> Trang chủ
              </Link>
              <RightOutlined className={styles.breadcrumbSep} />
              <Link to="/specialties" className={styles.breadcrumbLink}>Chuyên khoa</Link>
              <RightOutlined className={styles.breadcrumbSep} />
              <span className={styles.breadcrumbCurrent}>{specialty.name}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={styles.heroMain}
            >
              <div className={styles.heroIconBox}>
                {ICON_MAP[specialty.icon] ?? <MedicineBoxOutlined />}
              </div>
              <div>
                <span className={styles.heroGroupBadge}>{specialty.groupLabel}</span>
                <h1 className={styles.heroTitle}>{specialty.name}</h1>
                <p className={styles.heroDoctorCount}>
                  <TeamOutlined /> {specialty.doctorCount} bác sĩ chuyên khoa
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2-column layout ── */}
        <section className={styles.body}>
          <div className={`container ${styles.bodyInner}`}>

            {/* ── Sidebar ── */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarBox}>
                <h3 className={styles.sidebarTitle}>{specialty.groupLabel}</h3>
                <nav className={styles.sidebarNav}>
                  {sameGroup.map((sp) => (
                    <Link
                      key={sp.slug}
                      to={`/specialties/${sp.slug}`}
                      className={`${styles.sidebarLink} ${sp.slug === slug ? styles.sidebarLinkActive : ''}`}
                    >
                      <span className={styles.sidebarLinkIcon}>
                        {ICON_MAP[sp.icon] ?? <MedicineBoxOutlined />}
                      </span>
                      {sp.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* CTA box */}
              <div className={styles.sidebarCta}>
                <CalendarOutlined className={styles.sidebarCtaIcon} />
                <p className={styles.sidebarCtaText}>
                  Đặt lịch khám {specialty.name} ngay hôm nay
                </p>
                <Button
                  type="primary"
                  block
                  size="large"
                  className={styles.sidebarCtaBtn}
                  href="/contact/dat-lich-kham"
                >
                  Đặt lịch khám
                </Button>
                <a href="tel:1800123456" className={styles.sidebarCtaPhone}>
                  <PhoneOutlined /> 1800 123 456
                </a>
              </div>

              {/* All specialties link */}
              <Link to="/specialties" className={styles.sidebarAllLink}>
                Xem tất cả chuyên khoa <RightOutlined />
              </Link>
            </aside>

            {/* ── Main content ── */}
            <article className={styles.main}>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.section}
              >
                <h2 className={styles.sectionTitle}>Giới thiệu chuyên khoa</h2>
                <p className={styles.descText}>{specialty.description}</p>
                <p className={styles.descText}>
                  Tại VitaFamily, chúng tôi cam kết cung cấp dịch vụ y tế chất lượng cao với trang thiết bị
                  hiện đại và đội ngũ chuyên gia giàu kinh nghiệm. Mọi bệnh nhân đều được thăm khám, tư vấn
                  và điều trị theo phác đồ cá nhân hóa, đảm bảo hiệu quả tối ưu.
                </p>
              </motion.div>

              {/* Common diseases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={styles.section}
              >
                <h2 className={styles.sectionTitle}>Các bệnh thường gặp</h2>
                <div className={styles.diseaseList}>
                  {specialty.commonDiseases.map((disease) => (
                    <div key={disease} className={styles.diseaseItem}>
                      <CheckCircleFilled className={styles.diseaseCheck} />
                      <span>{disease}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Staff types */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={styles.section}
              >
                <h2 className={styles.sectionTitle}>Nhân lực chuyên khoa</h2>
                <div className={styles.staffGrid}>
                  {specialty.staffTypes.map((staff) => (
                    <div key={staff} className={styles.staffCard}>
                      <UserOutlined className={styles.staffIcon} />
                      <span className={styles.staffLabel}>{staff}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Related specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={styles.section}
              >
                <h2 className={styles.sectionTitle}>Chuyên khoa liên quan</h2>
                <div className={styles.relatedGrid}>
                  {sameGroup
                    .filter((sp) => sp.slug !== slug)
                    .slice(0, 4)
                    .map((sp) => (
                      <Link
                        key={sp.slug}
                        to={`/specialties/${sp.slug}`}
                        className={styles.relatedCard}
                      >
                        <span className={styles.relatedIcon}>
                          {ICON_MAP[sp.icon] ?? <MedicineBoxOutlined />}
                        </span>
                        <span className={styles.relatedName}>{sp.name}</span>
                        <RightOutlined className={styles.relatedArrow} />
                      </Link>
                    ))}
                </div>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className={styles.bottomCta}
              >
                <h3 className={styles.bottomCtaTitle}>
                  Bạn cần khám {specialty.name}?
                </h3>
                <p className={styles.bottomCtaText}>
                  Đặt lịch ngay để được tư vấn và thăm khám bởi đội ngũ chuyên gia hàng đầu của VitaFamily.
                </p>
                <div className={styles.bottomCtaBtns}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<CalendarOutlined />}
                    className={styles.bottomCtaBtnPrimary}
                    href="/contact/dat-lich-kham"
                  >
                    Đặt lịch khám ngay
                  </Button>
                  <Button
                    size="large"
                    className={styles.bottomCtaBtnSecondary}
                    href="/doctors"
                  >
                    Xem danh sách bác sĩ
                  </Button>
                </div>
              </motion.div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SpecialtyDetail;
