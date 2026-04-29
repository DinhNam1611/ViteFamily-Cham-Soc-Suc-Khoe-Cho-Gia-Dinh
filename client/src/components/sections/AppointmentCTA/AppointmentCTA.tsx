import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { CalendarOutlined, PhoneOutlined } from '@ant-design/icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './AppointmentCTA.module.css';

const AppointmentCTA = () => {
  const { t } = useTranslation();
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className={styles.section} aria-label={t('cta.badge')}>
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
            <span className={styles.badge}>{t('cta.badge')}</span>
            <h2 className={styles.title}>{t('cta.title')}</h2>
            <p className={styles.desc}>{t('cta.desc')}</p>
          </div>
          <div className={styles.actions}>
            <Button
              type="primary"
              size="large"
              icon={<CalendarOutlined />}
              className={styles.primaryBtn}
            >
              {t('cta.book_online')}
            </Button>
            <Button
              size="large"
              icon={<PhoneOutlined />}
              className={styles.phoneBtn}
            >
              {t('cta.call')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
