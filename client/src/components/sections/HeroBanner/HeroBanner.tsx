import { useEffect, useState } from 'react';
import { Button, Carousel } from 'antd';
import { motion } from 'framer-motion';
import { CalendarOutlined, TeamOutlined, RightOutlined } from '@ant-design/icons';
import { getHeroBanners } from '../../../services/homeService';
import type { HeroBanner as HeroBannerType } from '../../../types';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  const [banners, setBanners] = useState<HeroBannerType[]>([]);

  useEffect(() => {
    getHeroBanners().then(setBanners);
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className={styles.hero} aria-label="Hero Banner">
      <Carousel autoplay autoplaySpeed={5000} effect="fade" dots className={styles.carousel}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className={styles.overlay} />
              <div className={`container ${styles.content}`}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={styles.textBlock}
                >
                  <span className={styles.badge}>Bệnh viện quốc tế VitaFamily</span>
                  <h1 className={styles.title}>{banner.title}</h1>
                  <p className={styles.subtitle}>{banner.subtitle}</p>
                  <div className={styles.actions}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<CalendarOutlined />}
                      className={styles.primaryBtn}
                    >
                      {banner.ctaPrimary}
                    </Button>
                    <Button
                      size="large"
                      icon={<TeamOutlined />}
                      className={styles.secondaryBtn}
                    >
                      {banner.ctaSecondary}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Quick info bar */}
      <div className={styles.infoBar}>
        <div className={`container ${styles.infoInner}`}>
          <div className={styles.infoItem}>
            <CalendarOutlined className={styles.infoIcon} />
            <div>
              <span className={styles.infoLabel}>Đặt lịch nhanh</span>
              <span className={styles.infoValue}>1800 123 456</span>
            </div>
          </div>
          <div className={styles.infoDivider} />
          <div className={styles.infoItem}>
            <TeamOutlined className={styles.infoIcon} />
            <div>
              <span className={styles.infoLabel}>120+ bác sĩ chuyên khoa</span>
              <span className={styles.infoValue}>Đội ngũ hàng đầu</span>
            </div>
          </div>
          <div className={styles.infoDivider} />
          <div className={styles.infoItem}>
            <RightOutlined className={styles.infoIcon} />
            <div>
              <span className={styles.infoLabel}>Giờ làm việc</span>
              <span className={styles.infoValue}>T2 – CN: 7:00 – 20:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
