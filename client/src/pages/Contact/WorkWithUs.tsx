import { useState } from 'react';
import { Collapse, Tag, Button, Form, Input, Upload, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TeamOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
  TrophyOutlined,
  HeartOutlined,
  SafetyOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './WorkWithUs.module.css';

const { Panel } = Collapse;
const { TextArea } = Input;

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Toàn thời gian' | 'Bán thời gian' | 'Thực tập';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'bsck1',
    title: 'Bác Sĩ Chuyên Khoa I – Tim Mạch',
    department: 'Phòng Tim Mạch',
    location: 'Quận 7, TP.HCM',
    type: 'Toàn thời gian',
    salary: '30 – 50 triệu/tháng',
    description:
      'Chúng tôi đang tìm kiếm Bác sĩ Chuyên khoa Tim mạch có kinh nghiệm để tham gia vào đội ngũ y tế chuyên nghiệp của VitaFamily.',
    requirements: [
      'Bằng Bác sĩ Chuyên khoa I hoặc II ngành Tim mạch',
      'Ít nhất 3 năm kinh nghiệm thực hành lâm sàng',
      'Có chứng chỉ hành nghề khám chữa bệnh còn hiệu lực',
      'Kỹ năng giao tiếp tốt, tận tâm với bệnh nhân',
    ],
    benefits: ['Lương cạnh tranh + thưởng hiệu suất', 'Bảo hiểm sức khỏe cao cấp', 'Hỗ trợ đào tạo chuyên môn'],
  },
  {
    id: 'điều-dưỡng',
    title: 'Điều Dưỡng Trưởng',
    department: 'Phòng Điều Dưỡng',
    location: 'Quận 1, TP.HCM',
    type: 'Toàn thời gian',
    salary: '15 – 22 triệu/tháng',
    description:
      'VitaFamily tìm kiếm Điều dưỡng Trưởng có kinh nghiệm để quản lý và phối hợp hoạt động điều dưỡng tại cơ sở.',
    requirements: [
      'Bằng Cử nhân Điều dưỡng trở lên',
      'Ít nhất 5 năm kinh nghiệm, trong đó 2 năm ở vị trí quản lý',
      'Chứng chỉ hành nghề điều dưỡng còn hiệu lực',
      'Kỹ năng lãnh đạo và quản lý nhóm tốt',
    ],
    benefits: ['Phụ cấp quản lý', 'Đào tạo kỹ năng lãnh đạo', 'Môi trường làm việc chuyên nghiệp'],
  },
  {
    id: 'ktvxn',
    title: 'Kỹ Thuật Viên Xét Nghiệm',
    department: 'Phòng Xét Nghiệm',
    location: 'Bình Thạnh, TP.HCM',
    type: 'Toàn thời gian',
    salary: '12 – 18 triệu/tháng',
    description:
      'Chúng tôi cần Kỹ thuật viên Xét nghiệm thành thạo để vận hành thiết bị và đảm bảo chất lượng kết quả xét nghiệm.',
    requirements: [
      'Bằng Cử nhân hoặc Cao đẳng Kỹ thuật Xét nghiệm Y học',
      'Có kinh nghiệm sử dụng máy xét nghiệm tự động',
      'Tỉ mỉ, chính xác, tinh thần trách nhiệm cao',
      'Ưu tiên có kinh nghiệm làm việc tại bệnh viện',
    ],
    benefits: ['Thưởng chất lượng hàng tháng', 'Được đào tạo sử dụng thiết bị mới', 'Chế độ ca linh hoạt'],
  },
  {
    id: 'kttinhoc',
    title: 'Chuyên Viên CNTT Y Tế',
    department: 'Phòng Công nghệ Thông tin',
    location: 'Quận 7, TP.HCM',
    type: 'Toàn thời gian',
    salary: '20 – 35 triệu/tháng',
    description:
      'Vị trí dành cho kỹ sư CNTT muốn ứng dụng công nghệ vào lĩnh vực y tế, phát triển và duy trì hệ thống thông tin bệnh viện.',
    requirements: [
      'Bằng Đại học ngành CNTT hoặc liên quan',
      'Kinh nghiệm phát triển phần mềm web/mobile (React, Node.js...)',
      'Hiểu biết về bảo mật dữ liệu y tế (HIPAA là lợi thế)',
      'Khả năng làm việc độc lập và trong nhóm',
    ],
    benefits: ['Môi trường startup trong lĩnh vực y tế', 'Cổ phần ưu đãi nhân viên', 'Remote hybrid linh hoạt'],
  },
  {
    id: 'chamsockhachhang',
    title: 'Chuyên Viên Chăm Sóc Khách Hàng',
    department: 'Phòng Khách Hàng',
    location: 'Thủ Đức, TP.HCM',
    type: 'Toàn thời gian',
    salary: '10 – 15 triệu/tháng',
    description:
      'Tiếp nhận và hỗ trợ bệnh nhân đặt lịch khám, tư vấn dịch vụ và giải quyết thắc mắc một cách chuyên nghiệp.',
    requirements: [
      'Tốt nghiệp Cao đẳng trở lên, ưu tiên ngành Y tế, Điều dưỡng',
      'Giọng nói rõ ràng, kỹ năng giao tiếp xuất sắc',
      'Kiên nhẫn, thấu hiểu, lấy bệnh nhân làm trung tâm',
      'Thành thạo vi tính văn phòng',
    ],
    benefits: ['Hoa hồng theo kết quả tư vấn', 'Đồng phục + phụ cấp ăn trưa', 'Ca làm việc xoay vòng'],
  },
  {
    id: 'thucsinh',
    title: 'Thực Tập Sinh Y Tế – Nhiều Vị Trí',
    department: 'Tất cả phòng ban',
    location: 'TP.HCM (nhiều cơ sở)',
    type: 'Thực tập',
    salary: 'Hỗ trợ 3 – 5 triệu/tháng',
    description:
      'Cơ hội thực tập tại môi trường y tế chuyên nghiệp dành cho sinh viên các trường đại học y dược và CNTT.',
    requirements: [
      'Sinh viên năm 3, 4 hoặc mới tốt nghiệp ngành Y, Dược, Điều dưỡng, CNTT',
      'Nhiệt tình, chủ động và ham học hỏi',
      'Có thể làm việc ít nhất 3 tháng liên tục',
    ],
    benefits: ['Được hướng dẫn bởi bác sĩ/chuyên gia kinh nghiệm', 'Xác nhận thực tập chính thức', 'Cơ hội nhận việc chính thức'],
  },
];

const STATS = [
  { num: '200+', label: 'Nhân viên', icon: <TeamOutlined /> },
  { num: '12+', label: 'Chuyên khoa', icon: <SafetyOutlined /> },
  { num: '4', label: 'Cơ sở', icon: <EnvironmentOutlined /> },
  { num: '10+', label: 'Năm kinh nghiệm', icon: <TrophyOutlined /> },
];

const PERKS = [
  { icon: <DollarOutlined />, title: 'Thu nhập cạnh tranh', desc: 'Lương thưởng xứng đáng với năng lực, cộng thưởng hiệu suất hàng quý.' },
  { icon: <HeartOutlined />, title: 'Chăm sóc sức khỏe', desc: 'Bảo hiểm sức khỏe cao cấp cho bản thân và gia đình nhân viên.' },
  { icon: <RiseOutlined />, title: 'Phát triển nghề nghiệp', desc: 'Hỗ trợ học phí, đào tạo chuyên môn và lộ trình thăng tiến rõ ràng.' },
  { icon: <TeamOutlined />, title: 'Môi trường chuyên nghiệp', desc: 'Làm việc cùng đội ngũ y bác sĩ giàu kinh nghiệm, văn hóa tôn trọng lẫn nhau.' },
];

const TYPE_COLORS: Record<string, string> = {
  'Toàn thời gian': 'blue',
  'Bán thời gian': 'cyan',
  'Thực tập': 'green',
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.07 },
  }),
};

const WorkWithUs = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async (_values: Record<string, string>) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      message.success('Hồ sơ của bạn đã được gửi! Chúng tôi sẽ liên hệ trong 3–5 ngày làm việc.');
      form.resetFields();
      setSelectedJob(null);
    } finally {
      setSubmitting(false);
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
            <motion.p className={styles.heroEyebrow} initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              Cơ hội nghề nghiệp
            </motion.p>
            <motion.h1 className={styles.heroTitle} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
              Làm Việc Với Chúng Tôi Tại VF
            </motion.h1>
            <motion.p className={styles.heroSub} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
              Cùng VitaFamily kiến tạo tương lai y tế – nơi bạn phát triển, cống hiến và được trân trọng
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={styles.statCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why VitaFamily */}
        <section className={styles.perksSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Tại Sao Chọn VitaFamily?
            </motion.h2>
            <div className={styles.perksGrid}>
              {PERKS.map((p, i) => (
                <motion.div
                  key={p.title}
                  className={styles.perkCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <span className={styles.perkIcon}>{p.icon}</span>
                  <h3 className={styles.perkTitle}>{p.title}</h3>
                  <p className={styles.perkDesc}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className={styles.jobsSection}>
          <div className="container">
            <motion.h2
              className={styles.sectionTitle}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Vị Trí Tuyển Dụng
            </motion.h2>
            <motion.p
              className={styles.sectionSub}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              Khám phá các cơ hội nghề nghiệp tại VitaFamily — nhấn vào vị trí để xem chi tiết và ứng tuyển
            </motion.p>

            <div className={styles.jobList}>
              {JOB_POSITIONS.map((job, i) => (
                <motion.div
                  key={job.id}
                  className={styles.jobCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className={styles.jobHeader}>
                    <div className={styles.jobMain}>
                      <div className={styles.jobTitleRow}>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                        <Tag color={TYPE_COLORS[job.type]} className={styles.jobTag}>{job.type}</Tag>
                      </div>
                      <p className={styles.jobDept}>{job.department}</p>
                      <div className={styles.jobMeta}>
                        <span className={styles.jobMetaItem}>
                          <EnvironmentOutlined /> {job.location}
                        </span>
                        <span className={styles.jobMetaItem}>
                          <ClockCircleOutlined /> {job.type}
                        </span>
                        <span className={styles.jobMetaItem}>
                          <DollarOutlined /> {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button
                      type="primary"
                      className={styles.applyBtn}
                      icon={<RightOutlined />}
                      onClick={() => setSelectedJob(job)}
                    >
                      Ứng tuyển
                    </Button>
                  </div>

                  <Collapse ghost className={styles.jobCollapse}>
                    <Panel header={<span className={styles.collapseHeader}>Xem chi tiết</span>} key="1">
                      <div className={styles.jobDetail}>
                        <p className={styles.jobDesc}>{job.description}</p>
                        <div className={styles.jobRequirements}>
                          <p className={styles.detailLabel}>Yêu cầu:</p>
                          <ul className={styles.detailList}>
                            {job.requirements.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.jobBenefits}>
                          <p className={styles.detailLabel}>Quyền lợi:</p>
                          <ul className={styles.detailList}>
                            {job.benefits.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply Modal / Inline Form */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              className={styles.applyOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedJob(null); }}
            >
              <motion.div
                className={styles.applyModal}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className={styles.modalHeader}>
                  <div>
                    <p className={styles.modalEyebrow}>Ứng tuyển vị trí</p>
                    <h3 className={styles.modalTitle}>{selectedJob.title}</h3>
                  </div>
                  <button className={styles.modalClose} onClick={() => setSelectedJob(null)} aria-label="Đóng">
                    ✕
                  </button>
                </div>

                <Form form={form} layout="vertical" onFinish={handleApply} size="large" className={styles.applyForm}>
                  <div className={styles.applyRow}>
                    <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                      <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}>
                      <Input prefix={<MailOutlined className={styles.inputIcon} />} placeholder="example@email.com" />
                    </Form.Item>
                  </div>
                  <div className={styles.applyRow}>
                    <Form.Item name="phone" label="Điện thoại" rules={[{ required: true, pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }]}>
                      <Input prefix={<PhoneOutlined className={styles.inputIcon} />} placeholder="0901 234 567" />
                    </Form.Item>
                    <Form.Item name="experience" label="Kinh nghiệm (năm)">
                      <Input placeholder="3" type="number" min={0} />
                    </Form.Item>
                  </div>
                  <Form.Item name="coverLetter" label="Thư giới thiệu">
                    <TextArea rows={4} placeholder="Giới thiệu về bản thân và lý do bạn muốn ứng tuyển..." className={styles.textarea} />
                  </Form.Item>
                  <Form.Item name="cv" label="CV / Hồ sơ (tùy chọn)">
                    <Upload maxCount={1} beforeUpload={() => false} accept=".pdf,.doc,.docx">
                      <Button icon={<UploadOutlined />}>Tải lên CV</Button>
                    </Upload>
                  </Form.Item>
                  <div className={styles.modalActions}>
                    <Button onClick={() => setSelectedJob(null)}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={submitting} className={styles.submitBtn}>
                      {submitting ? 'Đang gửi...' : 'Gửi Hồ Sơ'}
                    </Button>
                  </div>
                </Form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default WorkWithUs;
