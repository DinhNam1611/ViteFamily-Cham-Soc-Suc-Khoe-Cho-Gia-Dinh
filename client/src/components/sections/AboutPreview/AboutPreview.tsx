import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './AboutPreview.module.css';

const AboutPreview = () => {
  const { t } = useTranslation();
  const { ref: leftRef, isInView: leftInView } = useScrollAnimation();
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation();

  const highlights = [
    t('about_preview.highlight_1'),
    t('about_preview.highlight_2'),
    t('about_preview.highlight_3'),
    t('about_preview.highlight_4'),
  ];

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
          <p className={styles.eyebrow}>{t('about_preview.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('about_preview.title_plain')} <span>{t('about_preview.title_highlight')}</span>
          </h2>
          <p className={styles.desc}>{t('about_preview.desc')}</p>

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
              {t('about_preview.learn_more')}
              <RightOutlined />
            </Button>
            <Button size="large" className={styles.secondaryBtn}>
              {t('about_preview.book_appointment')}
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
              <span className={styles.statLabel}>{t('about_preview.patients')}</span>
            </div>
            <div className={styles.certBadge}>
              <span className={styles.certYear}>2018</span>
              <span className={styles.certName}>JCI</span>
              <span className={styles.certDesc}>{t('about_preview.cert_desc')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
