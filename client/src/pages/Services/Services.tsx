import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'antd';
import { CheckOutlined, CalendarOutlined, RightOutlined } from '@ant-design/icons';
import { getServicePackages } from '../../services/servicePackageService';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import type { ServicePackage } from '../../types';
import styles from './Services.module.css';

const CATEGORIES = [
  'Tất cả',
  'Khám Chuyên Khoa',
  'Gói Khám Tổng Quát',
  'Xét Nghiệm & Chẩn Đoán',
  'Tiêm Chủng & Phòng Ngừa',
  'Phẫu Thuật & Thủ Thuật',
  'Dịch Vụ Số & Hỗ Trợ',
];

const CAT_SLUG_MAP: Record<string, string> = {
  'kham-chuyen-khoa': 'Khám Chuyên Khoa',
  'goi-kham-tong-quat': 'Gói Khám Tổng Quát',
  'xet-nghiem': 'Xét Nghiệm & Chẩn Đoán',
  'tiem-chung': 'Tiêm Chủng & Phòng Ngừa',
  'phau-thuat': 'Phẫu Thuật & Thủ Thuật',
  'dich-vu-so': 'Dịch Vụ Số & Hỗ Trợ',
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Services = () => {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [activeCategory, setActiveCategory] = useState(() => {
    const slug = searchParams.get('cat');
    return slug ? (CAT_SLUG_MAP[slug] ?? 'Tất cả') : 'Tất cả';
  });
  const [filtered, setFiltered] = useState<ServicePackage[]>([]);
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();

  useEffect(() => {
    const slug = searchParams.get('cat');
    setActiveCategory(slug ? (CAT_SLUG_MAP[slug] ?? 'Tất cả') : 'Tất cả');
  }, [searchParams]);

  useEffect(() => {
    getServicePackages().then((data) => {
      setPackages(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    if (activeCategory === 'Tất cả') {
      setFiltered(packages);
    } else {
      setFiltered(packages.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, packages]);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroInner}`}>
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className={styles.heroEyebrow}>Dịch vụ y tế VitaFamily</p>
              <h1 className={styles.heroTitle}>Lựa chọn dịch vụ chăm sóc sức khỏe đúng tầm quan trọng cho bạn</h1>
              <p className={styles.heroDesc}>Hơn 18 gói dịch vụ đa dạng — từ khám tổng quát, xét nghiệm đến phẫu thuật chuyên sâu, tất cả đạt chuẩn quốc tế JCI.</p>
              <div className={styles.heroActions}>
                <Button
                  type="primary"
                  size="large"
                  icon={<CalendarOutlined />}
                  className={styles.heroPrimaryBtn}
                >
                  Đặt lịch khám ngay
                </Button>
                <a href="tel:18001234" className={styles.heroPhoneBtn}>
                  Gọi tư vấn: 1800 1234
                </a>
              </div>
            </motion.div>

            <motion.div
              className={styles.heroImage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            >
              <img
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=640&h=500&fit=crop"
                alt="Dịch vụ y tế VitaFamily"
                className={styles.heroImg}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Category Tab Bar ── */}
        <div className={styles.tabBar}>
          <div className={`container ${styles.tabInner}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Service Cards Grid ── */}
        <section className="section">
          <div className="container">
            <motion.div
              ref={gridRef}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={styles.gridHeader}
            >
              <p className={styles.gridCount}>
                Hiển thị <strong>{filtered.length}</strong> dịch vụ
                {activeCategory !== 'Tất cả' && (
                  <> trong <span>{activeCategory}</span></>
                )}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filtered.map((pkg) => (
                  <motion.article
                    key={pkg.id}
                    variants={cardVariants}
                    layout
                    className={styles.card}
                  >
                    <div className={styles.cardThumb}>
                      <img src={pkg.image} alt={pkg.name} className={styles.cardImg} />
                      <span className={styles.cardBadge}>{pkg.category}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{pkg.name}</h3>
                      <p className={styles.cardDesc}>{pkg.description}</p>

                      <ul className={styles.featureList}>
                        {pkg.features.slice(0, 3).map((f, i) => (
                          <li key={i} className={styles.featureItem}>
                            <CheckOutlined className={styles.featureIcon} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <p className={styles.target}>
                        <strong>Phù hợp:</strong> {pkg.targetAudience}
                      </p>

                      <div className={styles.cardActions}>
                        <Button
                          type="primary"
                          block
                          className={styles.bookBtn}
                          icon={<CalendarOutlined />}
                        >
                          Đặt lịch dịch vụ
                        </Button>
                        <Link to={`/services/${pkg.slug}`} className={styles.detailLink}>
                          Xem chi tiết <RightOutlined />
                        </Link>
                      </div>
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
              <h2 className={styles.ctaTitle}>Chưa biết chọn dịch vụ nào?</h2>
              <p className={styles.ctaDesc}>Đội ngũ tư vấn VitaFamily sẵn sàng hỗ trợ bạn chọn gói phù hợp nhất — miễn phí, không cần đặt cọc.</p>
              <div className={styles.ctaActions}>
                <Button size="large" className={styles.ctaWhiteBtn}>
                  <CalendarOutlined /> Đặt lịch tư vấn
                </Button>
                <a href="tel:18001234" className={styles.ctaPhoneLink}>
                  Hotline: 1800 1234
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
