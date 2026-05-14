import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { StarFilled, RightOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getDoctors } from '../../../services/doctorService';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import type { Doctor } from '../../../types';
import styles from './DoctorsTeam.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const DoctorsTeam = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    getDoctors().then((data) => setDoctors(data.slice(0, 4)));
  }, []);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>Đội ngũ chuyên gia</p>
          <h2 className="section-title">Bác sĩ tiêu biểu của VitaFamily</h2>
          <p className="section-subtitle">
            Đội ngũ hơn 120 bác sĩ chuyên khoa đầu ngành, được đào tạo tại các cơ sở uy tín trong và ngoài nước.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {doctors.map((doctor) => (
            <motion.div key={doctor.id} variants={itemVariants} className={styles.card}>
              <div className={styles.avatarWrap}>
                <img
                  src={doctor.avatar || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=340&fit=crop&q=80`}
                  alt={doctor.fullName}
                  className={styles.avatar}
                />
                <div className={styles.overlay}>
                  <Link to={`/doctors/${doctor.slug}`} className={styles.viewBtn}>
                    Xem hồ sơ <RightOutlined />
                  </Link>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{doctor.fullName}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
                <div className={styles.meta}>
                  <span className={styles.rating}>
                    <StarFilled className={styles.starIcon} />
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span className={styles.sep}>·</span>
                  <span className={styles.exp}>{doctor.experience} năm kinh nghiệm</span>
                </div>
              </div>
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
            <Link to="/doctors">Xem tất cả bác sĩ <ArrowRightOutlined /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsTeam;
