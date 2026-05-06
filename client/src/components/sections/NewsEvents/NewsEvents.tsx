import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Tag } from 'antd';
import { CalendarOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getNews } from '../../../services/newsService';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import type { NewsItem } from '../../../types';
import styles from './NewsEvents.module.css';

const CATEGORY_COLORS: Record<string, string> = {
  'Tin tức': 'blue',
  'Thành tựu': 'gold',
  'Sự kiện': 'green',
  'Sức khỏe': 'cyan',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const NewsEvents = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    getNews().then((items) => setNews(items.slice(0, 3)));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.topRow}
        >
          <div>
            <p className={styles.eyebrow}>Tin tức & Sự kiện</p>
            <h2 className={`section-title ${styles.heading}`}>Cập nhật mới nhất</h2>
          </div>
          <Button size="large" className={styles.viewAllBtn}>
            Xem tất cả <ArrowRightOutlined />
          </Button>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {news.map((item) => (
            <motion.article key={item.id} variants={itemVariants} className={styles.card}>
              <Link to={`/news/${item.slug}`} className={styles.cardLink}>
                <div className={styles.thumbnail}>
                  <img src={item.thumbnail} alt={item.title} className={styles.img} />
                  <Tag
                    color={CATEGORY_COLORS[item.category] || 'blue'}
                    className={styles.tag}
                  >
                    {item.category}
                  </Tag>
                </div>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <CalendarOutlined className={styles.metaIcon} />
                    <time dateTime={item.date}>
                      {dayjs(item.date).format('DD/MM/YYYY')}
                    </time>
                  </div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.summary}>{item.summary}</p>
                  <span className={styles.readMore}>
                    Đọc tiếp <RightOutlined />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;
