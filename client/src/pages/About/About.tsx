import { motion } from 'framer-motion';
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './About.module.css';

const milestones = [
  { year: 'Tháng 9 — 2007', desc: 'Thành lập Bệnh viện Quốc tế VitaFamily, liên doanh giữa các chuyên gia y tế Australia và Bệnh viện Bạch Mai Việt Nam.' },
  { year: '2010', desc: 'Chuyển đổi thành 100% vốn đầu tư nước ngoài, áp dụng mô hình bệnh viện quốc tế tiêu chuẩn Pháp và đổi tên thành VitaFamily.' },
  { year: '2013', desc: 'Đạt chứng nhận Hệ thống Quản lý Chất lượng theo tiêu chuẩn ISO 9001.' },
  { year: '2013 – 2018', desc: 'Liên tục nhận Giải thưởng Bệnh viện Toàn diện Xuất sắc do Bộ Y tế trao tặng.' },
  { year: 'Tháng 7 — 2018', desc: 'Đạt chứng nhận quốc tế JCI — tiêu chuẩn y tế cao nhất thế giới. Bệnh viện đầu tiên tại miền Bắc đạt danh hiệu này.' },
  { year: 'Tháng 7 — 2022', desc: 'Khánh thành Tòa nhà B mới 7 tầng — nâng công suất giường bệnh nội trú lên 170 giường.' },
  { year: 'Tháng 4 — 2024', desc: 'Khai trương Tòa nhà Ngoại trú mới tích hợp Cấp cứu, Khám bệnh và Chẩn đoán hình ảnh hiện đại.' },
];

const awards = [
  { year: '2005', name: 'Thành tích xuất sắc hỗ trợ cộng đồng doanh nghiệp', by: 'VCCI Việt Nam' },
  { year: '2006', name: 'Giải thưởng Xây dựng Thương hiệu Bệnh viện độc đáo', by: 'Asian Hospital Management' },
  { year: '2006', name: 'Giải thưởng Dịch vụ Uy tín & Chất lượng', by: 'Thương hiệu Việt Nam' },
  { year: '2013', name: 'Chứng nhận Hệ thống Quản lý Chất lượng ISO 9001:2008', by: 'Tổ chức Chứng nhận ISO Quốc tế' },
  { year: '2013 – 2018', name: 'Giải thưởng Bệnh viện Xuất sắc Toàn diện', by: 'Bộ Y tế Việt Nam' },
  { year: '2015', name: 'Bằng khen về nâng cao chất lượng dịch vụ và sự hài lòng khách hàng', by: 'Sở Y tế Hà Nội' },
  { year: '2018', name: 'Chứng nhận Quốc tế JCI — tiêu chuẩn y tế cao nhất', by: 'Joint Commission International' },
  { year: '2021', name: 'Tiếp tục được chứng nhận ISO 9001:2015', by: 'Tổ chức Chứng nhận ISO Quốc tế' },
  { year: '2022', name: 'Ngôi sao Năng lượng Xanh', by: 'Sở Công thương Hà Nội' },
  { year: '2024', name: '5 Sao Năng lượng Xanh', by: 'Sở Công thương' },
  { year: '2025', name: 'Giải thưởng "Bệnh viện Xanh, Sạch và Dịch vụ Y tế Chất lượng cao"', by: 'Liên hiệp các Hội KH&CN Việt Nam' },
];

const strengths = [
  'Đội ngũ 120+ bác sĩ chuyên khoa được đào tạo quốc tế',
  'Trang thiết bị y tế thế hệ mới, hiện đại nhất khu vực',
  'Phục vụ cả bệnh nhân Việt Nam và bệnh nhân quốc tế',
  'Giao tiếp đa ngôn ngữ: Tiếng Việt, Anh, Pháp',
  'Đạt chứng nhận JCI — tiêu chuẩn y tế cao nhất thế giới',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const About = () => {
  const { ref: introRef, isInView: introInView } = useScrollAnimation();
  const { ref: milestoneRef, isInView: milestoneInView } = useScrollAnimation();
  const { ref: awardsRef, isInView: awardsInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className={styles.heroBreadcrumb}>
                <Link to="/">Trang chủ</Link> / Về chúng tôi
              </p>
              <h1 className={styles.heroTitle}>Câu chuyện của chúng tôi</h1>
              <p className={styles.heroSub}>Hơn 15 năm đồng hành cùng sức khỏe cộng đồng — chuyên nghiệp, tận tâm, đáng tin cậy</p>
            </motion.div>
          </div>
        </section>

        {/* ── Giới thiệu ── */}
        <section className="section">
          <div className={`container ${styles.introGrid}`}>
            <motion.div
              ref={introRef}
              initial={{ opacity: 0, x: -40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={styles.introText}
            >
              <p className={styles.eyebrow}>Về VitaFamily</p>
              <h2 className={styles.sectionTitle}>
                Bệnh viện Quốc tế <span>đầu tiên</span>{' '}
                tại Hà Nội & Miền Bắc Việt Nam
              </h2>
              <p className={styles.desc}>Thành lập năm 2007, VitaFamily là bệnh viện tư nhân tiên phong mang tiêu chuẩn y tế quốc tế đến với người dân Hà Nội và toàn miền Bắc Việt Nam. Với hơn 15 năm không ngừng phát triển, chúng tôi hiện là một trong những bệnh viện quốc tế hàng đầu khu vực, phục vụ cả bệnh nhân Việt Nam lẫn bệnh nhân nước ngoài.</p>
              <p className={styles.desc}>Tọa lạc tại trung tâm quận Đống Đa, VitaFamily cung cấp đầy đủ các dịch vụ y tế chuyên khoa, tuân thủ nghiêm ngặt các tiêu chuẩn an toàn và chất lượng quốc tế, đồng thời đáp ứng đầy đủ các quy định của Bộ Y tế Việt Nam.</p>
              <ul className={styles.strengthList}>
                {strengths.map((item, i) => (
                  <li key={i} className={styles.strengthItem}>
                    <CheckCircleFilled className={styles.check} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className={styles.introImageWrap}
            >
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=640&h=720&fit=crop"
                alt="VitaFamily hospital building"
                className={styles.introImage}
              />
              <div className={styles.introBadge}>
                <span className={styles.badgeNum}>15+</span>
                <span className={styles.badgeLabel}>Năm phục vụ</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Các mốc lịch sử ── */}
        <section className={`section ${styles.milestoneSec}`}>
          <div className={`container ${styles.milestoneGrid}`}>
            <motion.div
              ref={milestoneRef}
              initial={{ opacity: 0, x: -40 }}
              animate={milestoneInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className={styles.eyebrow}>Hành trình phát triển</p>
              <h2 className={styles.sectionTitle}>Các mốc lịch sử quan trọng</h2>

              <motion.ul
                className={styles.timeline}
                variants={containerVariants}
                initial="hidden"
                animate={milestoneInView ? 'visible' : 'hidden'}
              >
                {milestones.map((m, i) => (
                  <motion.li key={i} variants={itemVariants} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineBody}>
                      <span className={styles.timelineYear}>{m.year}</span>
                      <p className={styles.timelineDesc}>{m.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={milestoneInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className={styles.milestoneImageWrap}
            >
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=560&h=700&fit=crop"
                alt="VitaFamily hospital garden"
                className={styles.milestoneImage}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Giải thưởng & Công nhận ── */}
        <section className="section section-bg">
          <div className="container">
            <motion.div
              ref={awardsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={awardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={styles.awardsHeader}
            >
              <p className={styles.eyebrow}>Thành tích</p>
              <h2 className={styles.sectionTitle}>Giải thưởng & Công nhận</h2>
              <p className={styles.awardsSubtitle}>Những thành tựu minh chứng cho cam kết không ngừng nâng cao chất lượng dịch vụ y tế</p>
            </motion.div>

            <motion.div
              className={styles.awardsTable}
              variants={containerVariants}
              initial="hidden"
              animate={awardsInView ? 'visible' : 'hidden'}
            >
              <div className={styles.awardsHead}>
                <span>Năm</span>
                <span>Giải thưởng / Chứng nhận</span>
                <span>Trao bởi</span>
              </div>
              {awards.map((a, i) => (
                <motion.div key={i} variants={itemVariants} className={styles.awardsRow}>
                  <span className={styles.awardYear}>{a.year}</span>
                  <span className={styles.awardName}>{a.name}</span>
                  <span className={styles.awardBy}>{a.by}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Hợp tác cùng VitaFamily ── */}
        <section className={styles.ctaSec}>
          <div className={`container ${styles.ctaGrid}`}>
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, x: -40 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={styles.ctaImageWrap}
            >
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=560&h=420&fit=crop"
                alt="VitaFamily medical team"
                className={styles.ctaImage}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className={styles.ctaText}
            >
              <p className={styles.eyebrowLight}>Cơ hội nghề nghiệp</p>
              <h2 className={styles.ctaTitle}>Hợp tác cùng VitaFamily</h2>
              <p className={styles.ctaDesc}>VitaFamily là nơi làm việc lý tưởng cho những chuyên gia y tế xuất sắc. Chúng tôi cung cấp môi trường làm việc quốc tế, trang thiết bị y tế tiên tiến hàng đầu và đội ngũ bác sĩ có trình độ cao. Nếu bạn muốn trở thành một phần của gia đình VitaFamily, chúng tôi rất mong được nghe từ bạn.</p>
              <div className={styles.ctaActions}>
                <Button type="primary" size="large" className={styles.ctaBtn}>
                  Ứng tuyển ngay <RightOutlined />
                </Button>
                <Link to="/contact" className={styles.ctaLink}>
                  Liên hệ với chúng tôi
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
