import { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { motion } from 'framer-motion';
import {
  QuestionCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MedicineBoxOutlined,
  MessageOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './AskExpert.module.css';

const { TextArea } = Input;
const { Option } = Select;

const EXPERT_TOPICS = [
  'Tim Mạch',
  'Thần Kinh',
  'Nhi Khoa',
  'Da Liễu',
  'Mắt',
  'Tai Mũi Họng',
  'Nội Tiết',
  'Xương Khớp',
  'Sản Phụ Khoa',
  'Tiêu Hóa',
  'Dinh dưỡng',
  'Tâm lý',
  'Khác',
];

const BENEFITS = [
  { icon: <CheckCircleOutlined />, text: 'Được tư vấn bởi bác sĩ chuyên khoa có kinh nghiệm' },
  { icon: <CheckCircleOutlined />, text: 'Phản hồi trong vòng 24 giờ làm việc' },
  { icon: <CheckCircleOutlined />, text: 'Hoàn toàn miễn phí và bảo mật thông tin' },
  { icon: <CheckCircleOutlined />, text: 'Hỗ trợ đặt lịch khám trực tiếp nếu cần' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const AskExpert = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (_values: Record<string, string>) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      message.success('Câu hỏi của bạn đã được gửi! Chuyên gia sẽ phản hồi trong 24 giờ.');
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <motion.p
              className={styles.heroEyebrow}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              VitaFamily
            </motion.p>
            <motion.h1
              className={styles.heroTitle}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              Hỏi Chuyên Gia
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              Gửi câu hỏi sức khỏe – nhận tư vấn miễn phí từ bác sĩ chuyên khoa
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          <div className={`container ${styles.contentWrapper}`}>
            {/* Form */}
            <motion.div
              className={styles.formCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className={styles.formHeader}>
                <QuestionCircleOutlined className={styles.formIcon} />
                <h2 className={styles.formTitle}>Hỏi Chuyên Gia</h2>
                <p className={styles.formDesc}>
                  Điền thông tin và câu hỏi của bạn bên dưới. Đội ngũ bác sĩ VitaFamily
                  sẽ phản hồi trong vòng 24 giờ làm việc.
                </p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className={styles.form}
                size="large"
              >
                <div className={styles.formRow}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    className={styles.formItem}
                  >
                    <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Nguyễn Văn A" />
                  </Form.Item>

                  <Form.Item
                    name="age"
                    label="Tuổi"
                    rules={[{ required: true, message: 'Vui lòng nhập tuổi' }]}
                    className={styles.formItem}
                  >
                    <Input placeholder="35" type="number" min={1} max={120} />
                  </Form.Item>
                </div>

                <div className={styles.formRow}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                    className={styles.formItem}
                  >
                    <Input prefix={<MailOutlined className={styles.inputIcon} />} placeholder="example@email.com" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại' },
                      { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' },
                    ]}
                    className={styles.formItem}
                  >
                    <Input prefix={<PhoneOutlined className={styles.inputIcon} />} placeholder="0901 234 567" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="topic"
                  label="Chủ đề / Chuyên khoa"
                  rules={[{ required: true, message: 'Vui lòng chọn chủ đề' }]}
                >
                  <Select
                    placeholder="Chọn chủ đề bạn muốn hỏi"
                    suffixIcon={<MedicineBoxOutlined className={styles.suffixIcon} />}
                  >
                    {EXPERT_TOPICS.map((t) => (
                      <Option key={t} value={t}>{t}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="question"
                  label="Câu hỏi của bạn"
                  rules={[
                    { required: true, message: 'Vui lòng nhập câu hỏi' },
                    { min: 20, message: 'Câu hỏi cần ít nhất 20 ký tự' },
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Mô tả chi tiết triệu chứng, tình trạng sức khỏe hoặc câu hỏi của bạn..."
                    className={styles.textarea}
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>

                <Form.Item className={styles.submitItem}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={styles.submitBtn}
                    icon={<MessageOutlined />}
                    block
                  >
                    {loading ? 'Đang gửi...' : 'Gửi Câu Hỏi'}
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>

            {/* Side Panel */}
            <div className={styles.sidePanel}>
              <motion.div
                className={styles.benefitCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                <h3 className={styles.benefitTitle}>Tại sao nên hỏi chuyên gia VitaFamily?</h3>
                <ul className={styles.benefitList}>
                  {BENEFITS.map((b, i) => (
                    <motion.li
                      key={i}
                      className={styles.benefitItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={i + 2}
                    >
                      <span className={styles.benefitIcon}>{b.icon}</span>
                      <span>{b.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className={styles.expertCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={6}
              >
                <p className={styles.expertLabel}>ĐỘI NGŨ CHUYÊN GIA</p>
                <p className={styles.expertTitle}>Hơn 50 bác sĩ chuyên khoa</p>
                <p className={styles.expertDesc}>
                  Đội ngũ y bác sĩ giàu kinh nghiệm, được đào tạo tại các trường y khoa
                  hàng đầu trong và ngoài nước.
                </p>
                <div className={styles.expertStats}>
                  <div className={styles.expertStat}>
                    <span className={styles.expertStatNum}>50+</span>
                    <span className={styles.expertStatLabel}>Bác sĩ</span>
                  </div>
                  <div className={styles.expertStat}>
                    <span className={styles.expertStatNum}>12+</span>
                    <span className={styles.expertStatLabel}>Chuyên khoa</span>
                  </div>
                  <div className={styles.expertStat}>
                    <span className={styles.expertStatNum}>24h</span>
                    <span className={styles.expertStatLabel}>Phản hồi</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={styles.privacyNote}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={8}
              >
                <CheckCircleOutlined className={styles.privacyIcon} />
                <p>
                  Thông tin của bạn được <strong>bảo mật tuyệt đối</strong> và chỉ dùng để
                  hỗ trợ tư vấn sức khỏe.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AskExpert;
