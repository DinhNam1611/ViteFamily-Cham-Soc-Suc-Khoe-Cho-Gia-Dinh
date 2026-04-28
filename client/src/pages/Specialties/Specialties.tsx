import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import {
  HeartOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  SmileOutlined,
  CloudOutlined,
  BulbOutlined,
  UserOutlined,
  SafetyOutlined,
  WomanOutlined,
  ToolOutlined,
  SoundOutlined,
  EyeOutlined,
  AlertOutlined,
  ThunderboltOutlined,
  FilterOutlined,
  FileImageOutlined,
  DatabaseOutlined,
  FireOutlined,
  StarOutlined,
  ShopOutlined,
  RightOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { SPECIALTIES, GROUP_META } from '../../data/specialtyData';
import type { Specialty } from '../../types';
import styles from './Specialties.module.css';

type GroupKey = Specialty['group'];

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

const TABS: { key: GroupKey; label: string }[] = [
  { key: 'internal', label: 'Chuyên khoa nội' },
  { key: 'surgical', label: 'Chuyên khoa ngoại' },
  { key: 'support', label: 'Chuyên khoa hỗ trợ' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.06 },
  }),
};

const VALID_GROUPS: GroupKey[] = ['internal', 'surgical', 'support'];

const Specialties = () => {
  const [searchParams] = useSearchParams();
  const groupParam = searchParams.get('group') as GroupKey | null;

  const [activeGroup, setActiveGroup] = useState<GroupKey>(
    groupParam && VALID_GROUPS.includes(groupParam) ? groupParam : 'internal',
  );

  useEffect(() => {
    if (groupParam && VALID_GROUPS.includes(groupParam)) {
      setActiveGroup(groupParam);
    }
  }, [groupParam]);

  const filtered = SPECIALTIES.filter((s) => s.group === activeGroup);
  const meta = GROUP_META[activeGroup];

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <motion.div
              className={styles.heroInner}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className={styles.heroEyebrow}>VitaFamily</p>
              <h1 className={styles.heroTitle}>Chuyên khoa y tế</h1>
              <p className={styles.heroSubtitle}>
                Đội ngũ bác sĩ chuyên môn cao, trang thiết bị hiện đại —<br />
                chăm sóc sức khỏe toàn diện cho cả gia đình bạn.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>20+</span>
                  <span className={styles.heroStatLabel}>Chuyên khoa</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>120+</span>
                  <span className={styles.heroStatLabel}>Bác sĩ chuyên gia</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNum}>50k+</span>
                  <span className={styles.heroStatLabel}>Bệnh nhân mỗi năm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Tab bar ── */}
        <section className={styles.tabSection}>
          <div className={`container ${styles.tabBar}`}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tabBtn} ${activeGroup === tab.key ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveGroup(tab.key)}
              >
                {tab.label}
                <span className={styles.tabCount}>
                  {SPECIALTIES.filter((s) => s.group === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Grid ── */}
        <section className={styles.gridSection}>
          <div className="container">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>{meta.label}</h2>
                <p className={styles.groupDesc}>{meta.description}</p>
              </div>

              <div className={styles.grid}>
                {filtered.map((specialty, i) => (
                  <motion.div
                    key={specialty.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={styles.card}
                  >
                    <div className={styles.cardIconWrap}>
                      <span className={styles.cardIcon}>
                        {ICON_MAP[specialty.icon] ?? <MedicineBoxOutlined />}
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{specialty.name}</h3>
                      <p className={styles.cardDesc}>{specialty.description}</p>

                      <div className={styles.cardDiseases}>
                        <span className={styles.cardDiseasesLabel}>Bệnh thường gặp:</span>
                        <div className={styles.cardTags}>
                          {specialty.commonDiseases.slice(0, 3).map((d) => (
                            <span key={d} className={styles.tag}>{d}</span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.cardDoctorCount}>
                          {specialty.doctorCount} bác sĩ chuyên khoa
                        </span>
                        <Link to={`/specialties/${specialty.slug}`} className={styles.cardLink}>
                          Xem chi tiết <RightOutlined />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className={styles.ctaBanner}>
          <div className={`container ${styles.ctaInner}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              viewport={{ once: true }}
              className={styles.ctaText}
            >
              <h2 className={styles.ctaTitle}>Cần tư vấn chuyên khoa phù hợp?</h2>
              <p className={styles.ctaSubtitle}>
                Đội ngũ tư vấn của chúng tôi sẵn sàng hỗ trợ bạn 24/7
              </p>
            </motion.div>
            <div className={styles.ctaBtns}>
              <Button
                type="primary"
                size="large"
                icon={<CalendarOutlined />}
                className={styles.ctaBtnPrimary}
                href="/contact/dat-lich-kham"
              >
                Đặt lịch khám ngay
              </Button>
              <Button size="large" className={styles.ctaBtnSecondary} href="/doctors">
                Tìm bác sĩ
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Specialties;
