import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MedicineBoxOutlined,
  ExperimentOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { getServices } from '../../../services/homeService';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import type { Service } from '../../../types';
import styles from './ServicesHighlight.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  MedicineBoxOutlined: <MedicineBoxOutlined />,
  ExperimentOutlined: <ExperimentOutlined />,
  FileImageOutlined: <FileImageOutlined />,
  VideoCameraOutlined: <VideoCameraOutlined />,
  SafetyCertificateOutlined: <SafetyCertificateOutlined />,
  HeartOutlined: <HeartOutlined />,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const ServicesHighlight = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <section className={`section section-bg`}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>Dịch vụ</p>
          <h2 className="section-title">Dịch vụ y tế toàn diện</h2>
          <p className="section-subtitle">
            Từ khám tổng quát đến phẫu thuật chuyên sâu, chúng tôi cung cấp
            đầy đủ dịch vụ y tế với tiêu chuẩn quốc tế.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link to={`/services/${service.slug}`} className={styles.card}>
                <div className={styles.iconWrap}>
                  {ICON_MAP[service.icon] || <MedicineBoxOutlined />}
                </div>
                <h3 className={styles.cardTitle}>{service.name}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <span className={styles.link}>
                  Tìm hiểu thêm <RightOutlined />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
