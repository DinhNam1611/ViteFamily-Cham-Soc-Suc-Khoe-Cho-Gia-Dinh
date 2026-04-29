import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './About.module.css';

interface Milestone { year: string; desc: string; }
interface Award { year: string; name: string; by: string; }

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const About = () => {
  const { t } = useTranslation();
  const { ref: introRef, isInView: introInView } = useScrollAnimation();
  const { ref: milestoneRef, isInView: milestoneInView } = useScrollAnimation();
  const { ref: awardsRef, isInView: awardsInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  const milestones = t('about.milestones', { returnObjects: true }) as Milestone[];
  const awards = t('about.awards', { returnObjects: true }) as Award[];
  const strengths = t('about.strengths', { returnObjects: true }) as string[];

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
                <Link to="/">{t('about.hero_home')}</Link> / {t('about.hero_about')}
              </p>
              <h1 className={styles.heroTitle}>{t('about.hero_title')}</h1>
              <p className={styles.heroSub}>{t('about.hero_sub')}</p>
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
              <p className={styles.eyebrow}>{t('about.intro_eyebrow')}</p>
              <h2 className={styles.sectionTitle}>
                {t('about.intro_title_plain')} <span>{t('about.intro_title_highlight')}</span>{' '}
                {t('about.intro_title_suffix')}
              </h2>
              <p className={styles.desc}>{t('about.intro_desc_1')}</p>
              <p className={styles.desc}>{t('about.intro_desc_2')}</p>
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
                <span className={styles.badgeLabel}>{t('about.badge_years')}</span>
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
              <p className={styles.eyebrow}>{t('about.milestones_eyebrow')}</p>
              <h2 className={styles.sectionTitle}>{t('about.milestones_title')}</h2>

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
              <p className={styles.eyebrow}>{t('about.awards_eyebrow')}</p>
              <h2 className={styles.sectionTitle}>{t('about.awards_title')}</h2>
              <p className={styles.awardsSubtitle}>{t('about.awards_subtitle')}</p>
            </motion.div>

            <motion.div
              className={styles.awardsTable}
              variants={containerVariants}
              initial="hidden"
              animate={awardsInView ? 'visible' : 'hidden'}
            >
              <div className={styles.awardsHead}>
                <span>{t('about.awards_col_year')}</span>
                <span>{t('about.awards_col_award')}</span>
                <span>{t('about.awards_col_by')}</span>
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
              <p className={styles.eyebrowLight}>{t('about.cta_eyebrow')}</p>
              <h2 className={styles.ctaTitle}>{t('about.cta_title')}</h2>
              <p className={styles.ctaDesc}>{t('about.cta_desc')}</p>
              <div className={styles.ctaActions}>
                <Button type="primary" size="large" className={styles.ctaBtn}>
                  {t('about.cta_apply')} <RightOutlined />
                </Button>
                <Link to="/contact" className={styles.ctaLink}>
                  {t('about.cta_contact')}
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
