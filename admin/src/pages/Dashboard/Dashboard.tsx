import { Column, Line, Pie } from '@ant-design/plots';
import { Table, Tag, Button, Avatar, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined, MedicineBoxOutlined, CalendarOutlined, ClockCircleOutlined,
  DollarCircleOutlined, ArrowRightOutlined, EyeOutlined, StarFilled,
  RiseOutlined, FallOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Dashboard.module.css';

/* ── Mock data ── */
const apptByMonth = [
  { month: 'T1', value: 65 }, { month: 'T2', value: 78 }, { month: 'T3', value: 90 },
  { month: 'T4', value: 81 }, { month: 'T5', value: 110 }, { month: 'T6', value: 95 },
  { month: 'T7', value: 120 }, { month: 'T8', value: 105 }, { month: 'T9', value: 130 },
  { month: 'T10', value: 115 }, { month: 'T11', value: 140 }, { month: 'T12', value: 160 },
];

const newUsers = [
  { day: '20/4', value: 12 }, { day: '21/4', value: 18 }, { day: '22/4', value: 9 },
  { day: '23/4', value: 22 }, { day: '24/4', value: 15 }, { day: '25/4', value: 28 },
  { day: '26/4', value: 14 }, { day: '27/4', value: 31 }, { day: '28/4', value: 20 },
  { day: '29/4', value: 25 },
];

const apptTypes = [
  { type: 'Tại viện', value: 58 },
  { type: 'Tại nhà', value: 25 },
  { type: 'Video', value: 17 },
];

interface PendingAppt {
  key: string; patient: string; doctor: string; specialty: string;
  date: string; type: string; status: string;
}
interface PendingDoc {
  key: string; name: string; specialty: string; experience: string; submittedAt: string;
}
interface TopDoctor {
  key: string; name: string; specialty: string; appointments: number;
  rating: number; completion: number; initials: string; color: string;
}

const pendingAppts: PendingAppt[] = [
  { key: '1', patient: 'Nguyễn Văn A', doctor: 'BS. Trần Thị B', specialty: 'Tim mạch', date: '30/04', type: 'Tại viện', status: 'pending' },
  { key: '2', patient: 'Lê Văn C', doctor: 'BS. Phạm Minh D', specialty: 'Nhi khoa', date: '30/04', type: 'Video', status: 'pending' },
  { key: '3', patient: 'Trần Thị E', doctor: 'BS. Nguyễn F', specialty: 'Da liễu', date: '01/05', type: 'Tại nhà', status: 'pending' },
  { key: '4', patient: 'Phạm Văn G', doctor: 'BS. Lê Thị H', specialty: 'Thần kinh', date: '01/05', type: 'Tại viện', status: 'confirmed' },
  { key: '5', patient: 'Hoàng Thị I', doctor: 'BS. Vũ Văn K', specialty: 'Cơ xương khớp', date: '02/05', type: 'Tại viện', status: 'pending' },
];

const pendingDocs: PendingDoc[] = [
  { key: '1', name: 'BS. Nguyễn Minh Tú', specialty: 'Tim mạch', experience: '8 năm', submittedAt: '28/04' },
  { key: '2', name: 'BS. Trần Thị Lan', specialty: 'Nhi khoa', experience: '5 năm', submittedAt: '27/04' },
  { key: '3', name: 'BS. Lê Văn Hùng', specialty: 'Thần kinh', experience: '12 năm', submittedAt: '27/04' },
  { key: '4', name: 'BS. Phạm Thu Hà', specialty: 'Da liễu', experience: '6 năm', submittedAt: '26/04' },
];

const topDoctors: TopDoctor[] = [
  { key: '1', name: 'BS. Trần Thị Lan', specialty: 'Tim mạch', appointments: 124, rating: 4.9, completion: 96, initials: 'TL', color: '#4e73df' },
  { key: '2', name: 'BS. Nguyễn Văn Hùng', specialty: 'Thần kinh', appointments: 118, rating: 4.8, completion: 94, initials: 'NH', color: '#1cc88a' },
  { key: '3', name: 'BS. Lê Thu Hà', specialty: 'Da liễu', appointments: 105, rating: 4.8, completion: 91, initials: 'LH', color: '#36b9cc' },
  { key: '4', name: 'BS. Phạm Minh Đức', specialty: 'Nhi khoa', appointments: 98, rating: 4.7, completion: 89, initials: 'PD', color: '#f6c23e' },
  { key: '5', name: 'BS. Vũ Thị Mai', specialty: 'Sản phụ khoa', appointments: 93, rating: 4.7, completion: 87, initials: 'VM', color: '#e74a3b' },
];

const apptCols: ColumnsType<PendingAppt> = [
  {
    title: 'Bệnh nhân', dataIndex: 'patient', key: 'patient',
    render: (v: string) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar size={28} style={{ background: '#4e73df', fontSize: 11, fontWeight: 700 }}>
          {v.charAt(0)}
        </Avatar>
        <span style={{ fontWeight: 500, fontSize: 13 }}>{v}</span>
      </div>
    ),
  },
  { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor', render: (v: string) => <span style={{ fontSize: 13 }}>{v}</span> },
  { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty', render: (v: string) => <Tag color="blue" style={{ borderRadius: 20, fontSize: 11 }}>{v}</Tag> },
  { title: 'Ngày', dataIndex: 'date', key: 'date', width: 70 },
  {
    title: 'Loại', dataIndex: 'type', key: 'type', width: 90,
    render: (v: string) => {
      const color = v === 'Video' ? 'purple' : v === 'Tại nhà' ? 'green' : 'geekblue';
      return <Tag color={color} style={{ borderRadius: 20, fontSize: 11 }}>{v}</Tag>;
    },
  },
  {
    title: '', key: 'act', width: 44,
    render: () => <Button type="link" size="small" icon={<EyeOutlined />} style={{ color: '#4e73df' }} />,
  },
];

const docCols: ColumnsType<PendingDoc> = [
  {
    title: 'Họ tên', dataIndex: 'name', key: 'name',
    render: (v: string) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar size={28} style={{ background: '#1cc88a', fontSize: 11, fontWeight: 700 }}>
          {v.charAt(v.lastIndexOf(' ') + 1)}
        </Avatar>
        <span style={{ fontWeight: 500, fontSize: 13 }}>{v}</span>
      </div>
    ),
  },
  { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty', render: (v: string) => <Tag color="green" style={{ borderRadius: 20, fontSize: 11 }}>{v}</Tag> },
  { title: 'K.Nghiệm', dataIndex: 'experience', key: 'experience', width: 90 },
  { title: 'Nộp', dataIndex: 'submittedAt', key: 'submittedAt', width: 72 },
  {
    title: '', key: 'act', width: 44,
    render: () => <Button type="link" size="small" icon={<EyeOutlined />} style={{ color: '#4e73df' }} />,
  },
];

/* ── Chart configs ── */
const columnConfig = {
  data: apptByMonth, xField: 'month', yField: 'value',
  style: { fill: '#4e73df', radiusTopLeft: 3, radiusTopRight: 3 },
  height: 200, autoFit: false,
};

const lineConfig = {
  data: newUsers, xField: 'day', yField: 'value',
  style: { stroke: '#1cc88a', lineWidth: 2.5 },
  point: { style: { fill: '#1cc88a', r: 4 } },
  height: 200, autoFit: false,
};

const pieConfig = {
  data: apptTypes, angleField: 'value', colorField: 'type',
  radius: 0.85, innerRadius: 0.65,
  color: ['#4e73df', '#1cc88a', '#36b9cc'],
  legend: { position: 'bottom' as const },
  height: 200, autoFit: false,
};

/* ── KPI config — link dẫn đến trang tương ứng khi click "Xem chi tiết" ── */
const kpiCards = [
  {
    color: '#4e73df',
    colorLight: '#eaecf4',
    icon: <UserOutlined />,
    label: 'Tổng người dùng',
    value: '1,248',
    change: '+12%',
    dir: 'up',
    note: 'so với tháng trước',
    link: '/admin/users',
  },
  {
    color: '#1cc88a',
    colorLight: '#d1f2e3',
    icon: <MedicineBoxOutlined />,
    label: 'Bác sĩ hoạt động',
    value: '84',
    change: '+3 mới',
    dir: 'up',
    note: 'tháng này',
    link: '/admin/doctors',
  },
  {
    color: '#36b9cc',
    colorLight: '#d1ecf1',
    icon: <CalendarOutlined />,
    label: 'Lịch hẹn hôm nay',
    value: '37',
    change: '-5%',
    dir: 'down',
    note: 'so với hôm qua',
    link: '/admin/appointments',
  },
  {
    color: '#f6c23e',
    colorLight: '#fef3cd',
    icon: <DollarCircleOutlined />,
    label: 'Doanh thu tháng',
    value: '198M ₫',
    change: '+18%',
    dir: 'up',
    note: 'so với tháng trước',
    link: null,
  },
  {
    color: '#e74a3b',
    colorLight: '#fde8e6',
    icon: <ClockCircleOutlined />,
    label: 'Hồ sơ chờ duyệt',
    value: '2',
    change: 'Cần xử lý',
    dir: 'down',
    note: '',
    link: '/admin/doctors',
  },
];

/* ── Component ── */
const Dashboard = () => {
  const navigate = useNavigate();

  return (
  <div className={styles.page}>

    {/* KPI Cards */}
    <div className={styles.kpiGrid}>
      {kpiCards.map((k) => (
        <div key={k.label} className={styles.kpiCard} style={{ borderLeft: `4px solid ${k.color}` }}>
          <div className={styles.kpiBody}>
            <div>
              <div className={styles.kpiLabel}>{k.label}</div>
              <div className={styles.kpiValue}>{k.value}</div>
              <div className={`${styles.kpiChange} ${k.dir === 'up' ? styles.up : styles.down}`}>
                {k.dir === 'up' ? <RiseOutlined /> : <FallOutlined />}
                {' '}{k.change}{k.note ? ` ${k.note}` : ''}
              </div>
            </div>
            <div className={styles.kpiIconWrap} style={{ background: k.colorLight, color: k.color }}>
              {k.icon}
            </div>
          </div>
          <div
            className={styles.kpiFooter}
            style={{
              borderTop: `1px solid ${k.colorLight}`,
              cursor: k.link ? 'pointer' : 'default',
            }}
            onClick={() => k.link && navigate(k.link)}
          >
            <span style={{ color: k.color }}>
              {k.link ? 'Xem chi tiết' : 'Chưa có dữ liệu'}
            </span>
            {k.link && <ArrowRightOutlined style={{ color: k.color, fontSize: 11 }} />}
          </div>
        </div>
      ))}
    </div>

    {/* Charts row 1 */}
    <div className={styles.row2}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Lịch hẹn theo tháng</h3>
            <p className={styles.cardSubtitle}>Tổng số lịch hẹn năm 2026</p>
          </div>
          <Tag color="blue" style={{ borderRadius: 20 }}>2026</Tag>
        </div>
        <Column {...columnConfig} />
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Người dùng mới (30 ngày)</h3>
            <p className={styles.cardSubtitle}>Lượng đăng ký mỗi ngày</p>
          </div>
          <span className={styles.successBadge}><RiseOutlined /> +18%</span>
        </div>
        <Line {...lineConfig} />
      </div>
    </div>

    {/* Tables row */}
    <div className={styles.row2}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Lịch hẹn chờ xác nhận</h3>
            <p className={styles.cardSubtitle}>5 lịch hẹn mới nhất</p>
          </div>
          <Button type="link" size="small" style={{ color: '#4e73df', padding: 0, fontSize: 12 }}>Xem tất cả →</Button>
        </div>
        <Table
          dataSource={pendingAppts}
          columns={apptCols}
          pagination={false}
          size="small"
          scroll={{ x: 560 }}
          rowClassName={styles.tableRow}
        />
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Hồ sơ bác sĩ chờ duyệt</h3>
            <p className={styles.cardSubtitle}>Cần phê duyệt sớm</p>
          </div>
          <Button type="link" size="small" style={{ color: '#4e73df', padding: 0, fontSize: 12 }}>Xem tất cả →</Button>
        </div>
        <Table
          dataSource={pendingDocs}
          columns={docCols}
          pagination={false}
          size="small"
          scroll={{ x: 440 }}
          rowClassName={styles.tableRow}
        />
      </div>
    </div>

    {/* Top Doctors + Pie */}
    <div className={styles.row3}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Top 5 Bác sĩ được đặt nhiều nhất</h3>
            <p className={styles.cardSubtitle}>Xếp hạng theo tổng lịch hẹn tháng này</p>
          </div>
        </div>
        <div className={styles.topDoctorList}>
          {topDoctors.map((doc, i) => (
            <div key={doc.key} className={styles.topDoctorRow}>
              <span className={styles.rankNum} style={{ color: i < 3 ? doc.color : '#b7b9cc' }}>
                #{i + 1}
              </span>
              <Avatar size={36} style={{ background: doc.color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                {doc.initials}
              </Avatar>
              <div className={styles.topDoctorMeta}>
                <div className={styles.topDoctorName}>{doc.name}</div>
                <div className={styles.topDoctorSub}>{doc.specialty}</div>
              </div>
              <div className={styles.topDoctorProgress}>
                <div className={styles.topDoctorStats}>
                  <span style={{ color: doc.color, fontWeight: 600, fontSize: 12 }}>{doc.appointments} lịch</span>
                  <span className={styles.topDoctorRating}>
                    <StarFilled style={{ color: '#f6c23e', fontSize: 11 }} /> {doc.rating}
                  </span>
                </div>
                <Progress percent={doc.completion} strokeColor={doc.color} showInfo={false} size="small" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Phân bổ loại lịch hẹn</h3>
            <p className={styles.cardSubtitle}>Tháng này</p>
          </div>
        </div>
        <Pie {...pieConfig} />
        <div className={styles.pieStats}>
          {apptTypes.map((t, i) => (
            <div key={t.type} className={styles.pieStat}>
              <span className={styles.pieDot} style={{ background: ['#4e73df','#1cc88a','#36b9cc'][i] }} />
              <span className={styles.pieLabel}>{t.type}</span>
              <span className={styles.pieVal}>{t.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
  );
};

export default Dashboard;
