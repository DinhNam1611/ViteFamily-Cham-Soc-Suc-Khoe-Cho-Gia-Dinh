import { useState } from 'react';
import { Table, Input, Select, Tag, Button, Space, Popconfirm } from 'antd';
import { SearchOutlined, StopOutlined, SwapOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Appointments.module.css';

interface ApptRow {
  key: string; patient: string; doctor: string;
  date: string; time: string; type: string; status: string;
}

const mock: ApptRow[] = [
  { key: '1', patient: 'Nguyễn Văn An', doctor: 'BS. Trần Thị Bình', date: '30/04/2026', time: '08:30', type: 'Tại viện', status: 'confirmed' },
  { key: '2', patient: 'Lê Văn Cường', doctor: 'BS. Phạm Minh Đức', date: '30/04/2026', time: '09:00', type: 'Video', status: 'pending' },
  { key: '3', patient: 'Trần Thị Em', doctor: 'BS. Nguyễn Văn Phú', date: '01/05/2026', time: '10:30', type: 'Tại nhà', status: 'pending' },
  { key: '4', patient: 'Phạm Văn Giỏi', doctor: 'BS. Lê Thị Hoa', date: '01/05/2026', time: '14:00', type: 'Tại viện', status: 'completed' },
  { key: '5', patient: 'Hoàng Thị Lan', doctor: 'BS. Vũ Văn Khánh', date: '02/05/2026', time: '08:00', type: 'Tại viện', status: 'cancelled' },
];

const statusColor: Record<string, string> = { pending: 'orange', confirmed: 'blue', completed: 'green', cancelled: 'red' };
const statusLabel: Record<string, string> = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', completed: 'Hoàn thành', cancelled: 'Đã hủy' };

const Appointments = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');

  const data = mock.filter((a) =>
    (a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase())) &&
    (status === 'all' || a.status === status) &&
    (type === 'all' || a.type === type)
  );

  const cols: ColumnsType<ApptRow> = [
    { title: 'Bệnh nhân', dataIndex: 'patient', key: 'patient', width: 160 },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor', width: 180 },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Giờ', dataIndex: 'time', key: 'time', width: 80 },
    { title: 'Loại', dataIndex: 'type', key: 'type', width: 100, render: (v: string) => <Tag>{v}</Tag> },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 140, render: (s: string) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag> },
    {
      title: 'Thao tác', key: 'act', width: 150, fixed: 'right' as const,
      render: (_, r) => (r.status === 'pending' || r.status === 'confirmed') ? (
        <Space>
          <Button type="link" size="small" icon={<SwapOutlined />}>Chuyển BS</Button>
          <Popconfirm title="Hủy lịch hẹn?" okText="Hủy lịch" cancelText="Không" okButtonProps={{ danger: true }}>
            <Button type="link" size="small" danger icon={<StopOutlined />}>Hủy</Button>
          </Popconfirm>
        </Space>
      ) : null,
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý lịch hẹn</h1>
        <p className={styles.pageSubtitle}>Giám sát và điều phối toàn bộ lịch khám</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input prefix={<SearchOutlined style={{ color: '#6B7C99' }} />} placeholder="Tìm bệnh nhân, bác sĩ..."
            value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 260 }} />
          <Select value={status} onChange={setStatus} style={{ width: 160 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="pending">Chờ xác nhận</Select.Option>
            <Select.Option value="confirmed">Đã xác nhận</Select.Option>
            <Select.Option value="completed">Hoàn thành</Select.Option>
            <Select.Option value="cancelled">Đã hủy</Select.Option>
          </Select>
          <Select value={type} onChange={setType} style={{ width: 140 }}>
            <Select.Option value="all">Tất cả loại</Select.Option>
            <Select.Option value="Tại viện">Tại viện</Select.Option>
            <Select.Option value="Tại nhà">Tại nhà</Select.Option>
            <Select.Option value="Video">Video</Select.Option>
          </Select>
        </div>
        <Table dataSource={data} columns={cols}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} lịch hẹn` }}
          scroll={{ x: 'max-content' }} size="middle" />
      </div>
    </div>
  );
};

export default Appointments;
