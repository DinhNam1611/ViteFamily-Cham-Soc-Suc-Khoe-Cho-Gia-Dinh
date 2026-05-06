import { motion } from 'framer-motion';
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './AboutPreview.module.css';

const highlights = [
  'Hơn 15 năm kinh nghiệm chăm sóc sức khỏe cộng đồng',
  'Đạt chứng chỉ quốc tế JCI — tiêu chuẩn y tế cao nhất',
  'Đội ngũ 120+ bác sĩ chuyên khoa đầu ngành',
  'Hệ thống máy móc thế hệ mới, kết quả chính xác',
];

const AboutPreview = () => {
  const { ref: leftRef, isInView: leftInView } = useScrollAnimation();
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation();

  return (
    <section className="section">
      <div className={`container ${styles.inner}`}>
        {/* Text column */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -40 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={styles.textCol}
        >
          <p className={styles.eyebrow}>Về chúng tôi</p>
          <h2 className={styles.title}>
            Bệnh viện quốc tế VitaFamily — <span>Nơi bạn được chăm sóc</span>
          </h2>
          <p className={styles.desc}>
            Thành lập năm 2007, VitaFamily là bệnh viện tư nhân đầu tiên tại Hà Nội đạt chứng nhận JCI quốc tế.
            Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao, lấy bệnh nhân làm trung tâm của mọi quyết định điều trị.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item, i) => (
              <li key={i} className={styles.highlightItem}>
                <CheckCircleFilled className={styles.check} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button type="primary" size="large" className={styles.primaryBtn}>
              Tìm hiểu thêm
              <RightOutlined />
            </Button>
            <Button size="large" className={styles.secondaryBtn}>
              Đặt lịch khám
            </Button>
          </div>
        </motion.div>

        {/* Image column */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 40 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className={styles.imageCol}
        >
          <div className={styles.imageWrap}>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=700&fit=crop"
              alt="Bệnh viện VitaFamily — cơ sở vật chất hiện đại"
              className={styles.mainImage}
            />
            <div className={styles.statBadge}>
              <span className={styles.statNum}>500K+</span>
              <span className={styles.statLabel}>Bệnh nhân tin tưởng</span>
            </div>
            <div className={styles.certBadge}>
              <span className={styles.certYear}>2018</span>
              <span className={styles.certName}>JCI</span>
              <span className={styles.certDesc}>Chứng nhận quốc tế</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
