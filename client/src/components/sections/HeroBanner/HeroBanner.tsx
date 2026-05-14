import { useEffect, useState } from 'react';
import { Button, Carousel } from 'antd';
import { CalendarOutlined, TeamOutlined, StarFilled, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getHeroBanners } from '../../../services/homeService';
import type { HeroBanner as HeroBannerType } from '../../../types';
import styles from './HeroBanner.module.css';

// Ảnh bác sĩ mẫu — portrait, nền trung tính (Unsplash free)
const DOCTOR_IMAGES = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=560&h=640&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=560&h=640&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=560&h=640&fit=crop&q=80',
];

const HeroBanner = () => {
  const [banners, setBanners] = useState<HeroBannerType[]>([]);

  useEffect(() => {
    getHeroBanners().then(setBanners);
  }, []);

  if (banners.length === 0) {
    return (
      <section className={styles.hero} aria-label="Hero Banner">
        <div className={styles.skeleton} />
      </section>
    );
  }

  return (
    <section className={styles.hero} aria-label="Hero Banner">
      <Carousel
        autoplay
        autoplaySpeed={4000}
        effect="fade"
        dots
        className={styles.carousel}
      >
        {banners.map((banner, index) => (
          <div key={banner.id}>
            <div className={styles.slide}>
              <div className={`container ${styles.inner}`}>

                {/* Cột trái: text */}
                <div className={styles.textCol}>
                  <span className={styles.eyebrow}>Bệnh viện quốc tế VitaFamily</span>
                  <h1 className={styles.title}>{banner.title}</h1>
                  <p className={styles.subtitle}>{banner.subtitle}</p>
                  <div className={styles.actions}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<CalendarOutlined />}
                      className={styles.primaryBtn}
                    >
                      <Link to="/contact/dat-lich-kham">{banner.ctaPrimary}</Link>
                    </Button>
                    <Button
                      size="large"
                      icon={<TeamOutlined />}
                      className={styles.secondaryBtn}
                    >
                      <Link to="/doctors">{banner.ctaSecondary}</Link>
                    </Button>
                  </div>

                  {/* Dải chứng nhận nhỏ */}
                  <div className={styles.trustRow}>
                    <span className={styles.trustItem}>
                      <StarFilled className={styles.trustIcon} /> Chứng nhận JCI Quốc tế
                    </span>
                    <span className={styles.trustDot} />
                    <span className={styles.trustItem}>
                      <HeartFilled className={styles.trustIcon} /> 500K+ bệnh nhân tin tưởng
                    </span>
                  </div>
                </div>

                {/* Cột phải: ảnh bác sĩ + floating cards */}
                <div className={styles.imageCol}>
                  <div className={styles.imageWrap}>
                    <div className={styles.imageBg} />
                    <img
                      src={DOCTOR_IMAGES[index % DOCTOR_IMAGES.length]}
                      alt={`Bác sĩ VitaFamily — ${banner.title}`}
                      className={styles.doctorImg}
                    />
                    <div className={styles.floatCard1}>
                      <span className={styles.floatNum}>120+</span>
                      <span className={styles.floatLabel}>Bác sĩ chuyên khoa</span>
                    </div>
                    <div className={styles.floatCard2}>
                      <span className={styles.floatNum}>15+</span>
                      <span className={styles.floatLabel}>Năm kinh nghiệm</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroBanner;
