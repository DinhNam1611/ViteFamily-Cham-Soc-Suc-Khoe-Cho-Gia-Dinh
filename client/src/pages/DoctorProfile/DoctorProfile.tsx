import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Rate } from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ReadOutlined,
  TrophyOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getDoctorBySlug } from '../../services/doctorService';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import type { Doctor } from '../../types';
import styles from './DoctorProfile.module.css';

/* ── Section card animation ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

/* ── Skeleton shown while fetching ── */
const ProfileSkeleton = () => (
  <>
    <Header />
    <main>
      <div className={styles.heroSkeleton} />
      <section className="section">
        <div className="container">
          <div className={styles.skeletonGrid}>
            <div className={styles.skeletonMain}>
              <div className={styles.skeletonBlock} style={{ height: 120 }} />
              <div className={styles.skeletonBlock} style={{ height: 360 }} />
              <div className={styles.skeletonBlock} style={{ height: 180 }} />
            </div>
            <div className={styles.skeletonSide}>
              <div className={styles.skeletonBlock} style={{ height: 200 }} />
              <div className={styles.skeletonBlock} style={{ height: 180 }} />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

/* ── 404 shown when slug is not found ── */
const NotFound = () => (
  <>
    <Header />
    <main>
      <section className="section" style={{ marginTop: 72 }}>
        <div className="container">
          <div className={styles.notFound}>
            <UserOutlined className={styles.notFoundIcon} />
            <h2 className={styles.notFoundTitle}>Không tìm thấy bác sĩ</h2>
            <p className={styles.notFoundDesc}>
              Bác sĩ bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật.
            </p>
            <Link to="/doctors">
              <Button type="primary" size="large">
                Quay lại danh sách bác sĩ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

/* ── Timeline section ── */
interface TimelineSectionProps {
  title: string;
  items: { period: string; description: string }[];
}
const TimelineSection = ({ title, items }: TimelineSectionProps) => (
  <div className={styles.credSection}>
    <h3 className={styles.credTitle}>{title}</h3>
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <div key={i} className={styles.timelineItem}>
          <div className={styles.timelinePeriod}>{item.period}</div>
          <div className={styles.timelineDotCol}>
            <div className={styles.timelineDot} />
          </div>
          <div className={styles.timelineDesc}>{item.description}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Main component ── */
const DoctorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getDoctorBySlug(slug).then((data) => {
      setDoctor(data ?? null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <ProfileSkeleton />;
  if (!doctor) return <NotFound />;

  const hasCredentials =
    (doctor.education?.length ?? 0) > 0 ||
    (doctor.certifications?.length ?? 0) > 0 ||
    (doctor.workExperience?.length ?? 0) > 0 ||
    (doctor.memberships?.length ?? 0) > 0;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroInner}`}>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link to="/doctors" className={styles.backBtn}>
                <ArrowLeftOutlined /> Danh sách bác sĩ
              </Link>
            </motion.div>

            <motion.div
              className={styles.heroBody}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            >
              {/* Avatar */}
              <div className={styles.avatarWrap}>
                <img
                  src={doctor.avatar}
                  alt={doctor.fullName}
                  className={styles.avatar}
                />
              </div>

              {/* Info */}
              <div className={styles.heroInfo}>
                <div className={styles.tagRow}>
                  <span className={styles.specialtyTag}>{doctor.specialty}</span>
                  {doctor.subSpecialty && (
                    <span className={styles.subTag}>{doctor.subSpecialty}</span>
                  )}
                </div>

                <h1 className={styles.heroName}>{doctor.fullName}</h1>
                <p className={styles.heroQual}>{doctor.qualifications}</p>

                {doctor.languages && doctor.languages.length > 0 && (
                  <div className={styles.langRow}>
                    <GlobalOutlined className={styles.langIcon} />
                    {doctor.languages.map((l) => (
                      <span key={l} className={styles.langTag}>{l}</span>
                    ))}
                  </div>
                )}

                <div className={styles.statRow}>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>{doctor.experience}+</span>
                    <span className={styles.statLabel}>Năm kinh nghiệm</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>{doctor.rating}</span>
                    <span className={styles.statLabel}>Điểm đánh giá</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>{doctor.reviewCount}</span>
                    <span className={styles.statLabel}>Lượt đánh giá</span>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  icon={<CalendarOutlined />}
                  className={styles.heroBookBtn}
                >
                  Đặt lịch khám
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="section">
          <div className="container">
            <div className={styles.contentGrid}>

              {/* ── Left: Main content ── */}
              <div className={styles.mainCol}>

                {/* Giới thiệu */}
                <motion.div
                  className={styles.card}
                  custom={0}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className={styles.cardTitle}>
                    <HeartOutlined className={styles.titleIcon} /> Giới thiệu
                  </h2>
                  <p className={styles.bioText}>{doctor.bio}</p>
                </motion.div>

                {/* Trình độ chuyên môn */}
                {hasCredentials && (
                  <motion.div
                    className={styles.card}
                    custom={1}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h2 className={styles.cardTitle}>
                      <ReadOutlined className={styles.titleIcon} /> Trình độ chuyên môn
                    </h2>

                    {doctor.education && doctor.education.length > 0 && (
                      <TimelineSection title="Trường đào tạo" items={doctor.education} />
                    )}
                    {doctor.certifications && doctor.certifications.length > 0 && (
                      <TimelineSection title="Bằng cấp chuyên môn" items={doctor.certifications} />
                    )}
                    {doctor.workExperience && doctor.workExperience.length > 0 && (
                      <TimelineSection title="Kinh nghiệm làm việc" items={doctor.workExperience} />
                    )}

                    {doctor.memberships && doctor.memberships.length > 0 && (
                      <div className={styles.credSection}>
                        <h3 className={styles.credTitle}>Thành viên</h3>
                        <ul className={styles.bulletList}>
                          {doctor.memberships.map((m, i) => (
                            <li key={i} className={styles.bulletItem}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Lĩnh vực quan tâm đặc biệt */}
                {doctor.specialInterests && doctor.specialInterests.length > 0 && (
                  <motion.div
                    className={styles.card}
                    custom={2}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h2 className={styles.cardTitle}>
                      <TrophyOutlined className={styles.titleIcon} /> Lĩnh vực quan tâm đặc biệt
                    </h2>
                    <ul className={styles.interestList}>
                      {doctor.specialInterests.map((item, i) => (
                        <li key={i} className={styles.interestItem}>
                          <span className={styles.interestDot} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* ── Right: Sidebar ── */}
              <div className={styles.sidebar}>

                {/* Booking card */}
                <motion.div
                  className={`${styles.card} ${styles.sideCard}`}
                  custom={0}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h3 className={styles.sideTitle}>Đặt lịch khám</h3>
                  <div className={styles.ratingRow}>
                    <Rate
                      disabled
                      value={doctor.rating}
                      allowHalf
                      className={styles.stars}
                    />
                    <span className={styles.ratingNum}>{doctor.rating}</span>
                    <span className={styles.ratingCount}>({doctor.reviewCount})</span>
                  </div>
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<CalendarOutlined />}
                    className={styles.sideBookBtn}
                  >
                    Đặt lịch ngay
                  </Button>
                  <p className={styles.sideNote}>
                    Hỗ trợ đặt lịch 24/7 · Miễn phí tư vấn trực tuyến
                  </p>
                </motion.div>

                {/* Info card */}
                <motion.div
                  className={`${styles.card} ${styles.sideCard}`}
                  custom={1}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h3 className={styles.sideTitle}>Thông tin nhanh</h3>
                  <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                      <EnvironmentOutlined className={styles.infoIcon} />
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>Bệnh viện</span>
                        <span className={styles.infoValue}>{doctor.hospital}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <ClockCircleOutlined className={styles.infoIcon} />
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>Kinh nghiệm</span>
                        <span className={styles.infoValue}>{doctor.experience}+ năm</span>
                      </div>
                    </div>
                    {doctor.languages && doctor.languages.length > 0 && (
                      <div className={styles.infoItem}>
                        <GlobalOutlined className={styles.infoIcon} />
                        <div className={styles.infoContent}>
                          <span className={styles.infoLabel}>Ngôn ngữ</span>
                          <span className={styles.infoValue}>
                            {doctor.languages.join(' · ')}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className={styles.infoItem}>
                      <TeamOutlined className={styles.infoIcon} />
                      <div className={styles.infoContent}>
                        <span className={styles.infoLabel}>Chuyên khoa</span>
                        <span className={styles.infoValue}>{doctor.specialty}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DoctorProfile;
