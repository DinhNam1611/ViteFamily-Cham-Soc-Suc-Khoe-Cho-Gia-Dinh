import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Collapse, Tag, message } from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  ShareAltOutlined,
  StarFilled,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { getServicePackageBySlug, getServicePackagesByCategory } from '../../services/servicePackageService';
import type { ServicePackage } from '../../types';
import styles from './ServiceDetail.module.css';

const CATEGORY_SLUG_MAP: Record<string, string> = {
  'Khám Chuyên Khoa': 'kham-chuyen-khoa',
  'Gói Khám Tổng Quát': 'goi-kham-tong-quat',
  'Xét Nghiệm & Chẩn Đoán': 'xet-nghiem',
  'Tiêm Chủng & Phòng Ngừa': 'tiem-chung',
  'Phẫu Thuật & Thủ Thuật': 'phau-thuat',
  'Dịch Vụ Số & Hỗ Trợ': 'dich-vu-so',
};

const formatPrice = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState<ServicePackage | null | undefined>(undefined);
  const [related, setRelated] = useState<ServicePackage[]>([]);

  useEffect(() => {
    if (!slug) return;
    getServicePackageBySlug(slug).then((found) => {
      setPkg(found);
      if (found) {
        getServicePackagesByCategory(found.category).then((all) =>
          setRelated(all.filter((p) => p.slug !== slug).slice(0, 3))
        );
      }
    });
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('Đã sao chép liên kết dịch vụ');
  };

  /* ── Loading ─────────────────────────────────────────────────── */
  if (pkg === undefined) {
    return (
      <>
        <Header />
        <div className={styles.loadingPage}>
          <div className={styles.loadingSpinner} />
        </div>
        <Footer />
      </>
    );
  }

  /* ── 404 ─────────────────────────────────────────────────────── */
  if (pkg === null) {
    return (
      <>
        <Header />
        <div className={styles.notFound}>
          <h2>Không tìm thấy dịch vụ</h2>
          <p>Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị gỡ.</p>
          <Button type="primary" onClick={() => navigate('/services')}>
            Xem tất cả dịch vụ
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const catSlug = CATEGORY_SLUG_MAP[pkg.category] ?? '';

  return (
    <>
      <Header />

      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <Link to="/" className={styles.breadLink}>Trang chủ</Link>
          <RightOutlined className={styles.sep} />
          <Link to="/services" className={styles.breadLink}>Dịch vụ</Link>
          <RightOutlined className={styles.sep} />
          <Link to={`/services/${catSlug}`} className={styles.breadLink}>{pkg.category}</Link>
          <RightOutlined className={styles.sep} />
          <span className={styles.breadCurrent}>{pkg.name}</span>
        </div>
      </div>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className={styles.hero}>
          <img src={pkg.image} alt={pkg.name} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <button className={styles.backBtn} onClick={() => navigate(-1)}>
                <ArrowLeftOutlined /> Quay lại
              </button>
              {pkg.badge && <span className={styles.heroBadge}>{pkg.badge}</span>}
              <h1 className={styles.heroTitle}>{pkg.name}</h1>
              <div className={styles.heroMeta}>
                <Tag color="blue" className={styles.catTag}>{pkg.category}</Tag>
                {pkg.duration && (
                  <span className={styles.metaItem}>
                    <ClockCircleOutlined /> {pkg.duration}
                  </span>
                )}
                {pkg.location && (
                  <span className={styles.metaItem}>
                    <EnvironmentOutlined /> {pkg.location}
                  </span>
                )}
                <button className={styles.shareBtn} onClick={handleShare}>
                  <ShareAltOutlined /> Chia sẻ
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Body: 2 cột ──────────────────────────────────────────── */}
        <div className={`container ${styles.bodyGrid}`}>

          {/* ── LEFT: nội dung chi tiết ────────────────────────────── */}
          <motion.div
            className={styles.leftCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Description */}
            <motion.section className={styles.card} variants={fadeUp}>
              <h2 className={styles.sectionTitle}>Mô tả dịch vụ</h2>
              <p className={styles.description}>{pkg.description}</p>
              <div className={styles.targetBox}>
                <UserOutlined className={styles.targetIcon} />
                <div>
                  <span className={styles.targetLabel}>Đối tượng phù hợp</span>
                  <p className={styles.targetText}>{pkg.targetAudience}</p>
                </div>
              </div>
            </motion.section>

            {/* Features */}
            <motion.section className={styles.card} variants={fadeUp}>
              <h2 className={styles.sectionTitle}>Danh mục dịch vụ bao gồm</h2>
              <ul className={styles.featureList}>
                {pkg.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <CheckCircleFilled className={styles.featureIcon} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Steps */}
            {pkg.steps && pkg.steps.length > 0 && (
              <motion.section className={styles.card} variants={fadeUp}>
                <h2 className={styles.sectionTitle}>Quy trình thực hiện</h2>
                <div className={styles.stepList}>
                  {pkg.steps.map((s) => (
                    <div key={s.step} className={styles.stepItem}>
                      <div className={styles.stepNum}>{s.step}</div>
                      <div className={styles.stepBody}>
                        <h4 className={styles.stepTitle}>{s.title}</h4>
                        <p className={styles.stepDesc}>{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Preparation */}
            {pkg.preparation && pkg.preparation.length > 0 && (
              <motion.section className={styles.card} variants={fadeUp}>
                <h2 className={styles.sectionTitle}>Chuẩn bị trước khi đến khám</h2>
                <ul className={styles.prepList}>
                  {pkg.preparation.map((p, i) => (
                    <li key={i} className={styles.prepItem}>
                      <span className={styles.prepDot} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Specialists */}
            {pkg.specialists && pkg.specialists.length > 0 && (
              <motion.section className={styles.card} variants={fadeUp}>
                <h2 className={styles.sectionTitle}>
                  <TeamOutlined className={styles.titleIcon} /> Đội ngũ thực hiện
                </h2>
                <div className={styles.specialistList}>
                  {pkg.specialists.map((spec, i) => (
                    <div key={i} className={styles.specialistItem}>
                      <div className={styles.specialistAvatar}>
                        <UserOutlined />
                      </div>
                      <p className={styles.specialistName}>{spec}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* FAQ */}
            {pkg.faq && pkg.faq.length > 0 && (
              <motion.section className={styles.card} variants={fadeUp}>
                <h2 className={styles.sectionTitle}>
                  <QuestionCircleOutlined className={styles.titleIcon} /> Câu hỏi thường gặp
                </h2>
                <Collapse
                  className={styles.faqCollapse}
                  expandIconPosition="end"
                  ghost
                  items={pkg.faq.map((item, i) => ({
                    key: i,
                    label: <span className={styles.faqQ}>{item.q}</span>,
                    children: <p className={styles.faqA}>{item.a}</p>,
                  }))}
                />
              </motion.section>
            )}
          </motion.div>

          {/* ── RIGHT: sticky booking card ─────────────────────────── */}
          <aside className={styles.rightCol}>
            <div className={styles.bookingCard}>
              {/* Price */}
              {pkg.price ? (
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Chi phí dịch vụ</span>
                  <div className={styles.priceValue}>
                    <span className={styles.priceFrom}>
                      {formatPrice(pkg.price.from)}
                    </span>
                    {pkg.price.to && (
                      <>
                        <span className={styles.priceSep}> – </span>
                        <span className={styles.priceTo}>{formatPrice(pkg.price.to)}</span>
                      </>
                    )}
                  </div>
                  {pkg.price.note && (
                    <p className={styles.priceNote}>{pkg.price.note}</p>
                  )}
                </div>
              ) : (
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Chi phí dịch vụ</span>
                  <div className={styles.priceValue}>
                    <span className={styles.priceFrom}>Liên hệ</span>
                  </div>
                </div>
              )}

              {/* Quick info */}
              <div className={styles.infoList}>
                {pkg.duration && (
                  <div className={styles.infoRow}>
                    <ClockCircleOutlined className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Thời gian</span>
                      <span className={styles.infoValue}>{pkg.duration}</span>
                    </div>
                  </div>
                )}
                {pkg.location && (
                  <div className={styles.infoRow}>
                    <EnvironmentOutlined className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Địa điểm</span>
                      <span className={styles.infoValue}>{pkg.location}</span>
                    </div>
                  </div>
                )}
                <div className={styles.infoRow}>
                  <StarFilled className={styles.infoIcon} style={{ color: '#f59e0b' }} />
                  <div>
                    <span className={styles.infoLabel}>Tiêu chuẩn</span>
                    <span className={styles.infoValue}>Đạt chuẩn JCI Quốc Tế</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link to="/contact/dat-lich-kham">
                <Button type="primary" size="large" block className={styles.bookBtn} icon={<CalendarOutlined />}>
                  Đặt lịch dịch vụ này
                </Button>
              </Link>
              <a href="tel:18001234" className={styles.phoneBtn}>
                <PhoneOutlined /> Gọi tư vấn: 1800 1234
              </a>

              {/* Trust signals */}
              <div className={styles.trustList}>
                <div className={styles.trustItem}><CheckCircleFilled className={styles.trustIcon} /> Miễn phí tư vấn trước khám</div>
                <div className={styles.trustItem}><CheckCircleFilled className={styles.trustIcon} /> Bảo hiểm y tế được chấp nhận</div>
                <div className={styles.trustItem}><CheckCircleFilled className={styles.trustIcon} /> Kết quả bảo mật tuyệt đối</div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related packages ──────────────────────────────────────── */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.relatedTitle}>Dịch vụ cùng chuyên khoa</h2>
                <p className={styles.relatedSub}>Các gói dịch vụ khác trong danh mục <strong>{pkg.category}</strong></p>
              </motion.div>
              <motion.div
                className={styles.relatedGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                {related.map((rel) => (
                  <motion.article key={rel.id} className={styles.relatedCard} variants={fadeUp}>
                    <div className={styles.relatedThumb}>
                      <img src={rel.image} alt={rel.name} className={styles.relatedImg} loading="lazy" />
                      {rel.badge && <span className={styles.relatedBadge}>{rel.badge}</span>}
                    </div>
                    <div className={styles.relatedBody}>
                      <h3 className={styles.relatedName}>{rel.name}</h3>
                      <p className={styles.relatedDesc}>{rel.description}</p>
                      <Link to={`/services/goi/${rel.slug}`} className={styles.relatedLink}>
                        Xem chi tiết <RightOutlined />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
              <div className={styles.relatedFooter}>
                <Link to={`/services/${catSlug}`} className={styles.viewAllBtn}>
                  Xem tất cả dịch vụ {pkg.category} <RightOutlined />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA Banner ─────────────────────────────────────── */}
        <section className={styles.ctaBanner}>
          <div className="container">
            <motion.div
              className={styles.ctaContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>Chưa chắc chắn? Hãy để chúng tôi tư vấn</h2>
              <p className={styles.ctaDesc}>
                Đội ngũ chuyên gia VitaFamily sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn chọn gói dịch vụ phù hợp nhất — miễn phí, không cần đặt cọc.
              </p>
              <div className={styles.ctaActions}>
                <Link to="/contact/dat-lich-kham">
                  <Button size="large" className={styles.ctaWhiteBtn} icon={<CalendarOutlined />}>
                    Đặt lịch tư vấn miễn phí
                  </Button>
                </Link>
                <a href="tel:18001234" className={styles.ctaPhoneLink}>
                  <PhoneOutlined /> Hotline: 1800 1234
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

export default ServiceDetail;
