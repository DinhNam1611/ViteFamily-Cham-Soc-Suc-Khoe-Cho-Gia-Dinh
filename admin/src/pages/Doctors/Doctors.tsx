import { useState } from 'react';
import { Table, Tabs, Input, Button, Tag, Avatar, Space } from 'antd';
import { SearchOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Doctors.module.css';

interface DoctorRow {
  key: string; name: string; specialty: string; hospital: string;
  experience: string; approvalStatus: string; submittedAt: string;
}

const mock: DoctorRow[] = [
  { key: '1', name: 'BS. Nguyễn Minh Tú', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', experience: '8 năm', approvalStatus: 'pending', submittedAt: '28/04/2026' },
  { key: '2', name: 'BS. Trần Thị Lan', specialty: 'Nhi khoa', hospital: 'BV Nhi đồng 1', experience: '5 năm', approvalStatus: 'pending', submittedAt: '27/04/2026' },
  { key: '3', name: 'BS. Lê Văn Hùng', specialty: 'Thần kinh', hospital: 'BV 115', experience: '12 năm', approvalStatus: 'approved', submittedAt: '20/04/2026' },
  { key: '4', name: 'BS. Phạm Thu Hà', specialty: 'Da liễu', hospital: 'BV Da liễu', experience: '6 năm', approvalStatus: 'approved', submittedAt: '18/04/2026' },
  { key: '5', name: 'BS. Vũ Công Minh', specialty: 'Chỉnh hình', hospital: 'BV Chấn thương', experience: '9 năm', approvalStatus: 'rejected', submittedAt: '15/04/2026' },
];

const statusColor: Record<string, string> = { pending: 'orange', approved: 'green', rejected: 'red' };
const statusLabel: Record<string, string> = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };

const Doctors = () => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');

  const data = mock.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (tab === 'all' || d.approvalStatus === tab)
  );

  const counts = (s: string) => mock.filter((d) => d.approvalStatus === s).length;

  const cols: ColumnsType<DoctorRow> = [
    {
      title: 'Bác sĩ', dataIndex: 'name', key: 'name',
      render: (n: string) => (
        <Space>
          <Avatar size={36} style={{ background: '#E8F4FD', color: '#0077C8', fontWeight: 600 }}>
            {n.charAt(n.lastIndexOf(' ') + 1)}
          </Avatar>
          <span style={{ fontWeight: 500 }}>{n}</span>
        </Space>
      ),
    },
    { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty' },
    { title: 'Bệnh viện', dataIndex: 'hospital', key: 'hospital' },
    { title: 'Kinh nghiệm', dataIndex: 'experience', key: 'experience', width: 120 },
    {
      title: 'Trạng thái', dataIndex: 'approvalStatus', key: 'approvalStatus', width: 130,
      render: (s: string) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag>,
    },
    { title: 'Nộp lúc', dataIndex: 'submittedAt', key: 'submittedAt', width: 120 },
    {
      title: 'Thao tác', key: 'act', width: 180, fixed: 'right' as const,
      render: (_, r) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>Xem</Button>
          {r.approvalStatus === 'pending' && (
            <>
              <Button type="link" size="small" style={{ color: '#28A745' }} icon={<CheckOutlined />}>Duyệt</Button>
              <Button type="link" size="small" danger icon={<CloseOutlined />}>Từ chối</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý bác sĩ</h1>
        <p className={styles.pageSubtitle}>Duyệt hồ sơ và quản lý đội ngũ y tế</p>
      </div>
      <div className={styles.card}>
        <Tabs activeKey={tab} onChange={setTab} items={[
          { key: 'all', label: `Tất cả (${mock.length})` },
          { key: 'pending', label: `Chờ duyệt (${counts('pending')})` },
          { key: 'approved', label: `Đã duyệt (${counts('approved')})` },
          { key: 'rejected', label: `Từ chối (${counts('rejected')})` },
        ]} />
        <div style={{ marginBottom: 16 }}>
          <Input prefix={<SearchOutlined style={{ color: '#6B7C99' }} />} placeholder="Tìm bác sĩ..."
            value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 280 }} />
        </div>
        <Table dataSource={data} columns={cols}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} bác sĩ` }}
          scroll={{ x: 900 }} size="middle" />
      </div>
    </div>
  );
};

export default Doctors;
