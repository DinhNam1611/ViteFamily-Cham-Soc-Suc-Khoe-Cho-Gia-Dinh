import { Form, Input, Select, DatePicker, Button } from 'antd';
import { motion } from 'framer-motion';
import {
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MedicineBoxOutlined,
  CheckCircleFilled,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './AppointmentCTA.module.css';

const { Option } = Select;

const SPECIALTIES = [
  'Tim Mạch', 'Thần Kinh', 'Nhi Khoa', 'Da Liễu', 'Mắt',
  'Tai Mũi Họng', 'Nội Tiết', 'Xương Khớp', 'Sản Phụ Khoa',
  'Tiêu Hóa', 'Ung Bướu', 'Khám Tổng Quát',
];

const WHY_ITEMS = [
  'Xác nhận lịch trong vòng 30 phút',
  'Bác sĩ chuyên khoa giàu kinh nghiệm',
  'Hỗ trợ bảo hiểm y tế',
  'Dịch vụ 24/7 không nghỉ lễ',
];

const AppointmentCTA = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { ref, isInView } = useScrollAnimation();

  const handleSubmit = (values: Record<string, unknown>) => {
    const params = new URLSearchParams();
    if (values.fullName) params.set('name', String(values.fullName));
    if (values.phone) params.set('phone', String(values.phone));
    if (values.specialty) params.set('specialty', String(values.specialty));
    if (values.date) params.set('date', (values.date as { format: (f: string) => string }).format('YYYY-MM-DD'));
    navigate(`/contact/dat-lich-kham?${params.toString()}`);
  };

  return (
    <section className={styles.section} aria-label="Đặt lịch khám nhanh">
      {/* Pattern trang trí */}
      <div className={styles.dotPattern} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>

          {/* Cột trái: text + why list */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={styles.textCol}
          >
            <span className={styles.eyebrow}>Đặt lịch ngay hôm nay</span>
            <h2 className={styles.title}>
              Chăm sóc sức khỏe<br />không nên chờ đợi
            </h2>
            <p className={styles.desc}>
              Đặt lịch khám dễ dàng — chúng tôi sẽ xác nhận và nhắc lịch cho bạn qua SMS và email.
            </p>

            <ul className={styles.whyList}>
              {WHY_ITEMS.map((item) => (
                <li key={item} className={styles.whyItem}>
                  <CheckCircleFilled className={styles.whyIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust photos — bác sĩ stack + rating */}
            <div className={styles.trustPhotos}>
              <div className={styles.avatarStack}>
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&q=80" alt="" className={styles.stackAvatar} />
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=48&h=48&fit=crop&q=80" alt="" className={styles.stackAvatar} />
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&q=80" alt="" className={styles.stackAvatar} />
                <div className={styles.stackMore}>+120</div>
              </div>
              <div className={styles.trustInfo}>
                <div className={styles.trustRating}>
                  <StarFilled className={styles.starIcon} />
                  <StarFilled className={styles.starIcon} />
                  <StarFilled className={styles.starIcon} />
                  <StarFilled className={styles.starIcon} />
                  <StarFilled className={styles.starIcon} />
                  <span>4.9/5</span>
                </div>
                <span className={styles.trustCount}>10,000+ bệnh nhân đã tin tưởng</span>
              </div>
            </div>

            <a href="tel:1800123456" className={styles.hotline}>
              <PhoneOutlined />
              <span>Gọi ngay: <strong>1800 123 456</strong></span>
            </a>
          </motion.div>

          {/* Cột phải: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className={styles.formCard}
          >
            <div className={styles.formHeader}>
              <CalendarOutlined className={styles.formHeaderIcon} />
              <h3 className={styles.formTitle}>Đặt Lịch Nhanh</h3>
              <p className={styles.formSub}>Điền thông tin — chúng tôi lo phần còn lại</p>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input
                  prefix={<UserOutlined className={styles.inputIcon} />}
                  placeholder="Họ và tên của bạn"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className={styles.inputIcon} />}
                  placeholder="Số điện thoại"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                name="specialty"
                rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
              >
                <Select
                  placeholder="Chọn chuyên khoa"
                  className={styles.select}
                  suffixIcon={<MedicineBoxOutlined className={styles.inputIcon} />}
                >
                  {SPECIALTIES.map((s) => (
                    <Option key={s} value={s}>{s}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="date"
                rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
              >
                <DatePicker
                  placeholder="Chọn ngày khám"
                  className={styles.datePicker}
                  format="DD/MM/YYYY"
                  disabledDate={(d) => d && d.valueOf() < Date.now() - 86400000}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className={styles.submitBtn}
                  icon={<CalendarOutlined />}
                >
                  Đặt Lịch Ngay
                </Button>
              </Form.Item>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
