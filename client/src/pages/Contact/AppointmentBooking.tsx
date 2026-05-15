import { useState } from 'react';
import { Form, Input, Select, Button, message, DatePicker, Modal } from 'antd';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import {
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { BOOKING_HOSPITALS, BOOKING_SPECIALTIES } from '../../data/constants';
import styles from './AppointmentBooking.module.css';

const { TextArea } = Input;
const { Option } = Select;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const AppointmentBooking = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<Record<string, unknown> | null>(null);

  const handleOpenConfirm = (values: Record<string, unknown>) => {
    setConfirmData(values);
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      message.success('Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.');
      form.resetFields();
      setConfirmData(null);
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
              Đặt Lịch Khám
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              Đặt lịch trực tuyến nhanh chóng – chúng tôi sẽ xác nhận và nhắc lịch cho bạn
            </motion.p>
          </div>
        </section>

        {/* Form Section */}
        <section className={styles.formSection}>
          <div className={`container ${styles.formWrapper}`}>
            <motion.div
              className={styles.formCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className={styles.formHeader}>
                <CalendarOutlined className={styles.formIcon} />
                <h2 className={styles.formTitle}>Đặt Lịch Khám Bệnh</h2>
                <p className={styles.formDesc}>
                  Vui lòng điền đầy đủ thông tin bên dưới. Đội ngũ của chúng tôi sẽ liên hệ
                  xác nhận lịch khám trong thời gian sớm nhất.
                </p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleOpenConfirm}
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
                </div>

                <div className={styles.formRow}>
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

                  <Form.Item
                    name="hospital"
                    label="Chọn cơ sở"
                    rules={[{ required: true, message: 'Vui lòng chọn cơ sở' }]}
                    className={styles.formItem}
                  >
                    <Select
                      placeholder="Chọn cơ sở khám"
                      suffixIcon={<EnvironmentOutlined className={styles.suffixIcon} />}
                    >
                      {BOOKING_HOSPITALS.map((h) => (
                        <Option key={h} value={h}>{h}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className={styles.formRow}>
                  <Form.Item
                    name="appointmentDate"
                    label="Ngày khám mong muốn"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
                    className={styles.formItem}
                  >
                    <DatePicker
                      className={styles.datePicker}
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày khám"
                      disabledDate={(current: Dayjs) => current && current < dayjs().startOf('day')}
                    />
                  </Form.Item>

                  <Form.Item
                    name="appointmentTime"
                    label="Giờ khám mong muốn"
                    rules={[{ required: true, message: 'Vui lòng chọn khung giờ' }]}
                    className={styles.formItem}
                  >
                    <Select placeholder="Chọn khung giờ">
                      <Option value="07:00-08:00">07:00 – 08:00</Option>
                      <Option value="08:00-09:00">08:00 – 09:00</Option>
                      <Option value="09:00-10:00">09:00 – 10:00</Option>
                      <Option value="10:00-11:00">10:00 – 11:00</Option>
                      <Option value="13:00-14:00">13:00 – 14:00</Option>
                      <Option value="14:00-15:00">14:00 – 15:00</Option>
                      <Option value="15:00-16:00">15:00 – 16:00</Option>
                      <Option value="16:00-17:00">16:00 – 17:00</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className={styles.formRow}>
                  <Form.Item
                    name="appointmentType"
                    label="Hình thức khám"
                    rules={[{ required: true, message: 'Vui lòng chọn hình thức khám' }]}
                    className={styles.formItem}
                  >
                    <Select placeholder="Chọn hình thức khám">
                      <Option value="tai-vien">Tại viện</Option>
                      <Option value="tai-nha">Tại nhà</Option>
                      <Option value="video">Tư vấn video</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="specialty"
                    label="Chọn chuyên khoa"
                    rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
                    className={styles.formItem}
                  >
                    <Select
                      placeholder="Chọn chuyên khoa"
                      suffixIcon={<MedicineBoxOutlined className={styles.suffixIcon} />}
                    >
                      {BOOKING_SPECIALTIES.map((s) => (
                        <Option key={s} value={s}>{s}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  name="symptoms"
                  label="Triệu chứng / Lý do khám"
                  rules={[
                    { required: true, message: 'Vui lòng mô tả triệu chứng hoặc lý do khám' },
                    { min: 10, message: 'Vui lòng mô tả rõ hơn (tối thiểu 10 ký tự)' },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Mô tả triệu chứng hoặc lý do khám (ít nhất 10 ký tự)..."
                    className={styles.textarea}
                  />
                </Form.Item>

                <Form.Item className={styles.submitItem}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={styles.submitBtn}
                    block
                  >
                    {loading ? 'Đang xử lý...' : 'Xem lại & Đặt Lịch'}
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>

            {/* Side Info */}
            <motion.div
              className={styles.sideInfo}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              {[
                {
                  icon: <PhoneOutlined />,
                  title: 'Hotline 24/7',
                  desc: '1800 123 456',
                  sub: 'Miễn phí – Hỗ trợ mọi lúc',
                },
                {
                  icon: <EnvironmentOutlined />,
                  title: 'Cơ sở gần bạn',
                  desc: '4 cơ sở tại TP.HCM',
                  sub: 'Quận 1 · 7 · Bình Thạnh · Thủ Đức',
                },
                {
                  icon: <CalendarOutlined />,
                  title: 'Giờ làm việc',
                  desc: 'Thứ 2 – Chủ nhật',
                  sub: '7:00 – 20:00',
                },
              ].map((info, i) => (
                <motion.div
                  key={info.title}
                  className={styles.infoCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 3}
                >
                  <span className={styles.infoIcon}>{info.icon}</span>
                  <div>
                    <p className={styles.infoTitle}>{info.title}</p>
                    <p className={styles.infoDesc}>{info.desc}</p>
                    <p className={styles.infoSub}>{info.sub}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className={styles.noteBox}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={6}
              >
                <p className={styles.noteTitle}>Lưu ý khi đặt lịch</p>
                <ul className={styles.noteList}>
                  <li>Vui lòng đến trước giờ hẹn 15 phút</li>
                  <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
                  <li>Nhịn ăn 6–8 tiếng nếu xét nghiệm máu</li>
                  <li>Mang theo kết quả xét nghiệm cũ (nếu có)</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <Modal
        title="Xác nhận thông tin đặt lịch"
        open={confirmOpen}
        onOk={handleConfirmSubmit}
        onCancel={() => setConfirmOpen(false)}
        okText="Xác nhận đặt lịch"
        cancelText="Sửa lại"
        width={480}
      >
        {confirmData && (
          <div className={styles.confirmContent}>
            <p><b>Họ tên:</b> {confirmData.fullName as string}</p>
            <p><b>Email:</b> {confirmData.email as string}</p>
            <p><b>Số điện thoại:</b> {confirmData.phone as string}</p>
            <p><b>Cơ sở:</b> {confirmData.hospital as string}</p>
            <p><b>Hình thức:</b> {
              confirmData.appointmentType === 'tai-vien' ? 'Tại viện' :
              confirmData.appointmentType === 'tai-nha' ? 'Tại nhà' : 'Tư vấn video'
            }</p>
            <p><b>Chuyên khoa:</b> {confirmData.specialty as string}</p>
            <p><b>Ngày:</b> {confirmData.appointmentDate
              ? dayjs(confirmData.appointmentDate as Dayjs).format('DD/MM/YYYY')
              : '—'}
            </p>
            <p><b>Giờ:</b> {confirmData.appointmentTime as string}</p>
            <p><b>Lý do khám:</b> {confirmData.symptoms as string}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AppointmentBooking;
