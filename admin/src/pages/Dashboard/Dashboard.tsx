import { Column, Line, Pie } from '@ant-design/plots';
import { Table, Tag, Button, Select } from 'antd';
import {
  UserOutlined, MedicineBoxOutlined, CalendarOutlined, ClockCircleOutlined,
  RiseOutlined, FallOutlined, EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Dashboard.module.css';

/* ---------- mock data ---------- */
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
  key: string; patient: string; doctor: string; date: string; type: string;
}
interface PendingDoc {
  key: string; name: string; specialty: string; experience: string; submittedAt: string;
}

const pendingAppts: PendingAppt[] = [
  { key: '1', patient: 'Nguyễn Văn A', doctor: 'BS. Trần Thị B', date: '30/04/2026', type: 'Tại viện' },
  { key: '2', patient: 'Lê Văn C', doctor: 'BS. Phạm Minh D', date: '30/04/2026', type: 'Video' },
  { key: '3', patient: 'Trần Thị E', doctor: 'BS. Nguyễn F', date: '01/05/2026', type: 'Tại nhà' },
  { key: '4', patient: 'Phạm Văn G', doctor: 'BS. Lê Thị H', date: '01/05/2026', type: 'Tại viện' },
  { key: '5', patient: 'Hoàng Thị I', doctor: 'BS. Vũ Văn K', date: '02/05/2026', type: 'Tại viện' },
];

const pendingDocs: PendingDoc[] = [
  { key: '1', name: 'BS. Nguyễn Minh Tú', specialty: 'Tim mạch', experience: '8 năm', submittedAt: '28/04/2026' },
  { key: '2', name: 'BS. Trần Thị Lan', specialty: 'Nhi khoa', experience: '5 năm', submittedAt: '27/04/2026' },
  { key: '3', name: 'BS. Lê Văn Hùng', specialty: 'Thần kinh', experience: '12 năm', submittedAt: '27/04/2026' },
  { key: '4', name: 'BS. Phạm Thu Hà', specialty: 'Da liễu', experience: '6 năm', submittedAt: '26/04/2026' },
];

const apptCols: ColumnsType<PendingAppt> = [
  { title: 'Bệnh nhân', dataIndex: 'patient', key: 'patient' },
  { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor' },
  { title: 'Ngày', dataIndex: 'date', key: 'date', width: 110 },
  { title: 'Loại', dataIndex: 'type', key: 'type', width: 100, render: (v: string) => <Tag color="blue">{v}</Tag> },
  { title: '', key: 'act', width: 50, render: () => <Button type="link" size="small" icon={<EyeOutlined />} /> },
];

const docCols: ColumnsType<PendingDoc> = [
  { title: 'Họ tên', dataIndex: 'name', key: 'name' },
  { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty' },
  { title: 'KN', dataIndex: 'experience', key: 'experience', width: 80 },
  { title: 'Nộp lúc', dataIndex: 'submittedAt', key: 'submittedAt', width: 110 },
  { title: '', key: 'act', width: 50, render: () => <Button type="link" size="small" icon={<EyeOutlined />} /> },
];

/* ---------- chart configs ---------- */
const columnConfig = {
  data: apptByMonth,
  xField: 'month',
  yField: 'value',
  color: '#0077C8',
  columnStyle: { radius: [4, 4, 0, 0] },
  xAxis: { line: null, tickLine: null },
  yAxis: { grid: { line: { style: { stroke: '#F0F0F0' } } } },
  tooltip: { formatter: (d: { value: number }) => ({ name: 'Lịch hẹn', value: d.value }) },
  height: 220,
};

const lineConfig = {
  data: newUsers,
  xField: 'day',
  yField: 'value',
  color: '#0077C8',
  smooth: true,
  point: { size: 4, color: '#0077C8' },
  xAxis: { line: null, tickLine: null },
  yAxis: { grid: { line: { style: { stroke: '#F0F0F0' } } } },
  tooltip: { formatter: (d: { value: number }) => ({ name: 'Người dùng mới', value: d.value }) },
  height: 220,
};

const pieConfig = {
  data: apptTypes,
  angleField: 'value',
  colorField: 'type',
  color: ['#0077C8', '#28A745', '#17A2B8'],
  radius: 0.85,
  innerRadius: 0.6,
  label: { type: 'inner', offset: '-50%', style: { fontSize: 13 } },
  legend: { position: 'bottom' as const },
  height: 220,
};

/* ---------- component ---------- */
const Dashboard = () => (
  <div className={styles.page}>
    {/* Header */}
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Tổng quan hệ thống VitaFamily — 29/04/2026</p>
      </div>
      <Select defaultValue="month" style={{ width: 140 }}>
        <Select.Option value="today">Hôm nay</Select.Option>
        <Select.Option value="week">Tuần này</Select.Option>
        <Select.Option value="month">Tháng này</Select.Option>
        <Select.Option value="year">Năm nay</Select.Option>
      </Select>
    </div>

    {/* KPI */}
    <div className={styles.kpiGrid}>
      {[
        { icon: <UserOutlined />, color: 'blue', label: 'Tổng người dùng', value: '1,248', change: '12%', dir: 'up', note: 'so với tháng trước' },
        { icon: <MedicineBoxOutlined />, color: 'green', label: 'Bác sĩ hoạt động', value: '84', change: '3 bác sĩ mới', dir: 'up', note: '' },
        { icon: <CalendarOutlined />, color: 'orange', label: 'Lịch hẹn hôm nay', value: '37', change: '5%', dir: 'down', note: 'so với hôm qua' },
        { icon: <ClockCircleOutlined />, color: 'red', label: 'Chờ duyệt hồ sơ BS', value: '4', change: 'Cần xử lý', dir: 'down', note: '' },
      ].map((k) => (
        <div key={k.label} className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles[k.color as 'blue' | 'green' | 'orange' | 'red']}`}>{k.icon}</div>
          <div>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiValue}>{k.value}</div>
            <span className={`${styles.kpiChange} ${styles[k.dir as 'up' | 'down']}`}>
              {k.dir === 'up' ? <RiseOutlined /> : <FallOutlined />}
              {' '}{k.change} {k.note}
            </span>
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
        </div>
        <Column {...columnConfig} />
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Người dùng mới (30 ngày)</h3>
            <p className={styles.cardSubtitle}>Lượng đăng ký mỗi ngày</p>
          </div>
        </div>
        <Line {...lineConfig} />
      </div>
    </div>

    {/* Charts row 2 */}
    <div className={styles.row3}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Lịch hẹn chờ xác nhận</h3>
            <p className={styles.cardSubtitle}>5 lịch hẹn mới nhất cần xử lý</p>
          </div>
          <Button type="link" size="small" style={{ color: '#0077C8', padding: 0 }}>Xem tất cả →</Button>
        </div>
        <Table dataSource={pendingAppts} columns={apptCols} pagination={false} size="small" scroll={{ x: 400 }} />
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Phân bổ loại lịch hẹn</h3>
            <p className={styles.cardSubtitle}>Tháng này</p>
          </div>
        </div>
        <Pie {...pieConfig} />
      </div>
    </div>

    {/* Pending doctors */}
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Hồ sơ bác sĩ chờ duyệt</h3>
          <p className={styles.cardSubtitle}>Cần xem xét và phê duyệt sớm</p>
        </div>
        <Button type="primary" size="small" style={{ background: '#0077C8' }}>Xem tất cả</Button>
      </div>
      <Table dataSource={pendingDocs} columns={docCols} pagination={false} size="small" scroll={{ x: 500 }} />
    </div>
  </div>
);

export default Dashboard;
