import { Column, Line, Pie } from '@ant-design/plots';
import { Table, DatePicker, Button, Space } from 'antd';
import { DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Statistics.module.css';

const apptData = [
  { month: 'T1', value: 65 }, { month: 'T2', value: 78 }, { month: 'T3', value: 90 },
  { month: 'T4', value: 81 }, { month: 'T5', value: 110 }, { month: 'T6', value: 95 },
  { month: 'T7', value: 120 }, { month: 'T8', value: 105 }, { month: 'T9', value: 130 },
  { month: 'T10', value: 115 }, { month: 'T11', value: 140 }, { month: 'T12', value: 160 },
];

const userGrowth = [
  { month: 'T1', value: 80 }, { month: 'T2', value: 120 }, { month: 'T3', value: 160 },
  { month: 'T4', value: 200 }, { month: 'T5', value: 260 }, { month: 'T6', value: 310 },
  { month: 'T7', value: 390 }, { month: 'T8', value: 450 }, { month: 'T9', value: 540 },
  { month: 'T10', value: 620 }, { month: 'T11', value: 720 }, { month: 'T12', value: 850 },
];

const serviceTypes = [
  { type: 'Tại viện', value: 58 },
  { type: 'Tại nhà', value: 25 },
  { type: 'Video', value: 17 },
];

interface TopDoc { key: string; name: string; specialty: string; appointments: number; rating: number; }

const topDocs: TopDoc[] = [
  { key: '1', name: 'BS. Lê Văn Hùng', specialty: 'Thần kinh', appointments: 48, rating: 4.9 },
  { key: '2', name: 'BS. Phạm Thu Hà', specialty: 'Da liễu', appointments: 41, rating: 4.8 },
  { key: '3', name: 'BS. Hoàng Văn Em', specialty: 'Nhi khoa', appointments: 39, rating: 4.7 },
  { key: '4', name: 'BS. Trần Thị Lan', specialty: 'Tim mạch', appointments: 35, rating: 4.6 },
  { key: '5', name: 'BS. Nguyễn Văn An', specialty: 'Chỉnh hình', appointments: 30, rating: 4.5 },
];

const docCols: ColumnsType<TopDoc> = [
  { title: '#', key: 'rank', render: (_, __, i) => <b style={{ color: i < 3 ? '#0077C8' : '#6B7C99' }}>{i + 1}</b>, width: 50 },
  { title: 'Bác sĩ', dataIndex: 'name', key: 'name', render: (v: string) => <span style={{ fontWeight: 500 }}>{v}</span> },
  { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty' },
  { title: 'Lịch hẹn', dataIndex: 'appointments', key: 'appointments', width: 100, align: 'center' },
  { title: 'Đánh giá TB', dataIndex: 'rating', key: 'rating', width: 110, align: 'center',
    render: (v: number) => <span style={{ color: '#FF8C00', fontWeight: 600 }}>★ {v}</span> },
];

const Statistics = () => (
  <div className={styles.page}>
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>Thống kê & Báo cáo</h1>
        <p className={styles.pageSubtitle}>Dữ liệu phân tích toàn hệ thống</p>
      </div>
      <Space className={styles.exportBar}>
        <DatePicker.RangePicker format="DD/MM/YYYY" style={{ width: 260 }} />
        <Button icon={<DownloadOutlined />}>Xuất Excel</Button>
        <Button icon={<FilePdfOutlined />} type="primary" style={{ background: '#0077C8' }}>Xuất PDF</Button>
      </Space>
    </div>

    {/* KPI */}
    <div className={styles.kpiGrid}>
      {[
        { label: 'Tổng người dùng', value: '1,248' },
        { label: 'Tổng lịch hẹn', value: '1,290' },
        { label: 'Tỷ lệ hoàn thành', value: '78%' },
        { label: 'Bác sĩ hoạt động', value: '84' },
      ].map((k) => (
        <div key={k.label} className={styles.kpiCard}>
          <div className={styles.kpiLabel}>{k.label}</div>
          <div className={styles.kpiValue}>{k.value}</div>
        </div>
      ))}
    </div>

    {/* Charts row 1 */}
    <div className={styles.row2}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Lịch hẹn theo tháng</h3>
        <p className={styles.cardSubtitle}>Tổng số lịch hẹn năm 2026</p>
        <Column data={apptData} xField="month" yField="value" color="#0077C8"
          columnStyle={{ radius: [4,4,0,0] }} height={220}
          xAxis={{ line: null, tickLine: null }}
          yAxis={{ grid: { line: { style: { stroke: '#F0F0F0' } } } }} />
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Tăng trưởng người dùng</h3>
        <p className={styles.cardSubtitle}>Tích lũy theo tháng</p>
        <Line data={userGrowth} xField="month" yField="value" color="#28A745"
          smooth height={220} point={{ size: 4, color: '#28A745' }}
          xAxis={{ line: null, tickLine: null }}
          yAxis={{ grid: { line: { style: { stroke: '#F0F0F0' } } } }} />
      </div>
    </div>

    {/* Charts row 2 */}
    <div className={styles.row2}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Top 5 bác sĩ được đặt nhiều nhất</h3>
        <p className={styles.cardSubtitle}>Tháng này</p>
        <Table dataSource={topDocs} columns={docCols} pagination={false} size="small" />
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Phân bổ loại dịch vụ</h3>
        <p className={styles.cardSubtitle}>Tháng này</p>
        <Pie data={serviceTypes} angleField="value" colorField="type"
          color={['#0077C8','#28A745','#17A2B8']}
          radius={0.85} innerRadius={0.6}
          legend={{ position: 'bottom' }}
          height={240} />
      </div>
    </div>
  </div>
);

export default Statistics;
