import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getStats } from '../../../services/homeService';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import type { Stat } from '../../../types';
import styles from './KeyStats.module.css';

interface CounterProps {
  target: number;
  suffix: string;
  duration?: number;
}

const Counter = ({ target, suffix, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const end = start + duration * 1000;
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (now < end) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  const display =
    target > 9999 ? (count / 1000).toFixed(0) + 'K' : count.toLocaleString('vi-VN');

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const KeyStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.titleBlock}
        >
          <h2 className={styles.title}>Những con số ấn tượng</h2>
          <p className={styles.subtitle}>Hơn 15 năm không ngừng phát triển và cải thiện chất lượng dịch vụ</p>
        </motion.div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className={styles.statItem}
            >
              <div className={styles.statValue}>
                {isInView && (
                  <Counter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statDivider} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
