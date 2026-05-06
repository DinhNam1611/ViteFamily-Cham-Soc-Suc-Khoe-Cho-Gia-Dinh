import { motion } from 'framer-motion';
import { Button } from 'antd';
import { CalendarOutlined, PhoneOutlined } from '@ant-design/icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './AppointmentCTA.module.css';

const AppointmentCTA = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className={styles.section} aria-label="Đặt lịch ngay hôm nay">
      <div className={styles.bgDecor} aria-hidden="true" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={styles.inner}
        >
          <div className={styles.textBlock}>
            <span className={styles.badge}>Đặt lịch ngay hôm nay</span>
            <h2 className={styles.title}>Chăm sóc sức khỏe không nên chờ đợi</h2>
            <p className={styles.desc}>
              Đặt lịch khám dễ dàng qua website hoặc hotline. Bác sĩ sẽ liên hệ xác nhận trong vòng 15 phút.
            </p>
          </div>
          <div className={styles.actions}>
            <Button
              type="primary"
              size="large"
              icon={<CalendarOutlined />}
              className={styles.primaryBtn}
            >
              Đặt lịch trực tuyến
            </Button>
            <Button
              size="large"
              icon={<PhoneOutlined />}
              className={styles.phoneBtn}
            >
              Gọi 1800 123 456
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
