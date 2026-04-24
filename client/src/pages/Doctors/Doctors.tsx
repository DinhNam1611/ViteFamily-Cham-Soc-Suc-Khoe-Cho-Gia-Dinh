import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, Input, Button, Rate } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { getDoctors, getDoctorsByFilter } from '../../services/doctorService';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import type { Doctor } from '../../types';
import styles from './Doctors.module.css';

const SPECIALTIES = [
  'Tất cả',
  'Tim Mạch',
  'Thần Kinh',
  'Nhi Khoa',
  'Da Liễu',
  'Mắt',
  'Tai Mũi Họng',
  'Nội Tiết',
  'Xương Khớp',
  'Sản Phụ Khoa',
  'Tiêu Hóa',
  'Ung Bướu',
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.07 },
  }),
};

const Doctors = () => {
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [specialty, setSpecialty] = useState('Tất cả');
  const [nameSearch, setNameSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getDoctors().then((data) => {
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  /* Demo skeleton: gọi qua service layer — sau này chỉ cần thay URL trong getDoctorsByFilter */
  const handleSpecialtyChange = useCallback(async (value: string) => {
    setSpecialty(value);
    setSearching(true);
    const result = await getDoctorsByFilter(value, nameSearch);
    setFiltered(result);
    setSearching(false);
  }, [nameSearch]);

  const handleSearch = useCallback(async () => {
    setSearching(true);
    const result = await getDoctorsByFilter(specialty, nameSearch);
    setFiltered(result);
    setSearching(false);
  }, [specialty, nameSearch]);

  const handleReset = useCallback(async () => {
    setSpecialty('Tất cả');
    setNameSearch('');
    setSearching(true);
    const result = await getDoctorsByFilter('Tất cả', '');
    setFiltered(result);
    setSearching(false);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroInner}`}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={styles.heroText}
            >
              <p className={styles.heroEyebrow}>Đội ngũ chuyên gia VitaFamily</p>
              <h1 className={styles.heroTitle}>Tìm Bác Sĩ</h1>
              <p className={styles.heroDesc}>
                Hơn 120 bác sĩ chuyên khoa đầu ngành — được đào tạo trong nước và quốc tế,
                sẵn sàng đồng hành cùng sức khỏe gia đình bạn.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>120+</span>
                  <span className={styles.statLabel}>Bác sĩ chuyên khoa</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNum}>20+</span>
                  <span className={styles.statLabel}>Chuyên khoa</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNum}>4.8★</span>
                  <span className={styles.statLabel}>Đánh giá trung bình</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <div className={styles.filterBar}>
          <div className="container">
          <div className={styles.filterInner}>
            <Select
              value={specialty}
              onChange={handleSpecialtyChange}
              className={styles.specialtySelect}
              size="large"
              options={SPECIALTIES.map((s) => ({ value: s, label: s }))}
              placeholder="Chọn chuyên khoa"
            />
            <Input
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined className={styles.searchIcon} />}
              placeholder="Tìm theo tên bác sĩ..."
              className={styles.nameInput}
            />
            <Button
              type="primary"
              size="large"
              className={styles.searchBtn}
              onClick={handleSearch}
              loading={searching}
            >
              Tìm kiếm
            </Button>
            {(specialty !== 'Tất cả' || nameSearch) && (
              <Button size="large" className={styles.resetBtn} onClick={handleReset}>
                Đặt lại
              </Button>
            )}
          </div>
          </div>
        </div>

        {/* ── Doctor List ── */}
        <section className="section">
          <div className="container">
            <motion.p
              className={styles.resultCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Tìm thấy <strong>{filtered.length}</strong> bác sĩ
              {specialty !== 'Tất cả' && (
                <> trong chuyên khoa <span>{specialty}</span></>
              )}
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${specialty}-${nameSearch}`}
                className={styles.list}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={styles.skeleton} />
                    ))
                  : filtered.length === 0
                  ? (
                    <div className={styles.empty}>
                      <UserOutlined className={styles.emptyIcon} />
                      <p>Không tìm thấy bác sĩ phù hợp.</p>
                      <Button onClick={handleReset}>Xem tất cả bác sĩ</Button>
                    </div>
                  )
                  : filtered.map((doctor, i) => (
                    <motion.article
                      key={doctor.id}
                      custom={i}
                      variants={cardVariants}
                      className={styles.card}
                    >
                      <div className={styles.cardAvatar}>
                        <img
                          src={doctor.avatar}
                          alt={doctor.fullName}
                          className={styles.avatarImg}
                        />
                      </div>

                      <div className={styles.cardInfo}>
                        <div className={styles.cardTop}>
                          <div>
                            <h3 className={styles.cardName}>{doctor.fullName}</h3>
                            <p className={styles.cardQual}>{doctor.qualifications}</p>
                          </div>
                          <div className={styles.expBadge}>
                            {doctor.experience} năm KN
                          </div>
                        </div>

                        <div className={styles.tags}>
                          <span className={styles.specialtyTag}>{doctor.specialty}</span>
                          {doctor.subSpecialty && (
                            <span className={styles.subTag}>{doctor.subSpecialty}</span>
                          )}
                        </div>

                        <p className={styles.cardMeta}>
                          <EnvironmentOutlined className={styles.metaIcon} />
                          {doctor.hospital}
                        </p>

                        <p className={styles.cardBio}>{doctor.bio}</p>
                      </div>

                      <div className={styles.cardActions}>
                        <div className={styles.ratingRow}>
                          <Rate
                            disabled
                            value={doctor.rating}
                            allowHalf
                            className={styles.stars}
                          />
                          <span className={styles.ratingNum}>{doctor.rating}</span>
                          <span className={styles.reviewCount}>({doctor.reviewCount})</span>
                        </div>
                        <Button
                          type="primary"
                          block
                          icon={<CalendarOutlined />}
                          className={styles.bookBtn}
                        >
                          Đặt lịch khám
                        </Button>
                        <Link
                          to={`/doctors/${doctor.slug}`}
                          className={styles.profileLink}
                        >
                          Xem hồ sơ
                        </Link>
                      </div>
                    </motion.article>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className={styles.ctaBanner}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.ctaContent}
            >
              <h2 className={styles.ctaTitle}>Chưa biết chọn bác sĩ nào?</h2>
              <p className={styles.ctaDesc}>
                Đội ngũ tư vấn VitaFamily sẽ giúp bạn kết nối với chuyên gia phù hợp nhất —
                hoàn toàn miễn phí.
              </p>
              <Button size="large" className={styles.ctaBtn}>
                <CalendarOutlined /> Tư vấn miễn phí
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Doctors;
