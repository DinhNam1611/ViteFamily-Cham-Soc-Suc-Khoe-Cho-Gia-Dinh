import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  HeartOutlined,
  ExperimentOutlined,
  SmileOutlined,
  MedicineBoxOutlined,
  EyeOutlined,
  AudioOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { getSpecialties } from '../../../services/specialtyService';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import type { Specialty } from '../../../types';
import styles from './SpecialtyFinder.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  HeartOutlined: <HeartOutlined />,
  ExperimentOutlined: <ExperimentOutlined />,
  SmileOutlined: <SmileOutlined />,
  MedicineBoxOutlined: <MedicineBoxOutlined />,
  EyeOutlined: <EyeOutlined />,
  AudioOutlined: <AudioOutlined />,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const SpecialtyFinder = () => {
  const { t } = useTranslation();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    getSpecialties().then(setSpecialties);
  }, []);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>{t('specialty_finder.eyebrow')}</p>
          <h2 className="section-title">{t('specialty_finder.title')}</h2>
          <p className="section-subtitle">{t('specialty_finder.subtitle')}</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {specialties.map((specialty) => (
            <motion.div key={specialty.id} variants={itemVariants}>
              <Link to={`/services/${specialty.slug}`} className={styles.card}>
                <div className={styles.iconWrap}>
                  {ICON_MAP[specialty.icon] || <MedicineBoxOutlined />}
                </div>
                <h3 className={styles.cardName}>{specialty.name}</h3>
                <p className={styles.cardCount}>{t('specialty_finder.doctors', { count: specialty.doctorCount })}</p>
                <RightOutlined className={styles.arrow} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={styles.viewAll}
        >
          <Button size="large" className={styles.viewAllBtn}>
            {t('specialty_finder.view_all')}
            <RightOutlined />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialtyFinder;
