import { motion } from 'framer-motion';
import {
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './WhyChooseUs.module.css';

const REASONS = [
  {
    icon: <ClockCircleOutlined />,
    title: 'Hỗ trợ 24/7',
    desc: 'Đường dây nóng và đội ngũ y tế trực sẵn sàng hỗ trợ bạn mọi lúc, kể cả ngày lễ.',
    image: null,
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Chứng nhận JCI',
    desc: 'Tiêu chuẩn quốc tế cao nhất về chất lượng điều trị và an toàn cho người bệnh.',
    image: null,
  },
  {
    icon: <CreditCardOutlined />,
    title: 'Hỗ trợ bảo hiểm',
    desc: 'Liên kết hơn 30 công ty bảo hiểm, thanh toán nhanh chóng không rắc rối thủ tục.',
    image: null,
  },
  {
    icon: <RobotOutlined />,
    title: 'Công nghệ AI',
    desc: 'Ứng dụng trí tuệ nhân tạo trong chẩn đoán và theo dõi sức khỏe từ xa.',
    image: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const WhyChooseUs = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <p className={styles.eyebrow}>Vì sao chọn chúng tôi</p>
          <h2 className="section-title">VitaFamily — Cam kết vì sức khỏe của bạn</h2>
          <p className="section-subtitle">
            Chúng tôi không chỉ điều trị bệnh — chúng tôi đồng hành cùng bạn trên hành trình giữ gìn sức khỏe.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {REASONS.map((item) => (
            <motion.div key={item.title} variants={itemVariants} className={styles.card}>
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className={styles.cardImg}
                />
              )}
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <div className={styles.textWrap}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
