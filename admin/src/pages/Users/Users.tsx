import { useState } from 'react';
import { Table, Input, Select, Button, Popconfirm, Tag, Space, Avatar } from 'antd';
import { SearchOutlined, UserOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Users.module.css';

interface UserRow {
  key: string; id: number; name: string; email: string; phone: string;
  role: string; status: string; createdAt: string;
}

const mock: UserRow[] = [
  { key: '1', id: 1, name: 'Nguyễn Văn An', email: 'an@gmail.com', phone: '0901234567', role: 'user', status: 'active', createdAt: '01/03/2026' },
  { key: '2', id: 2, name: 'Trần Thị Bình', email: 'binh@gmail.com', phone: '0912345678', role: 'user', status: 'active', createdAt: '05/03/2026' },
  { key: '3', id: 3, name: 'BS. Lê Văn Cường', email: 'cuong@gmail.com', phone: '0923456789', role: 'doctor', status: 'active', createdAt: '10/03/2026' },
  { key: '4', id: 4, name: 'Phạm Thị Dung', email: 'dung@gmail.com', phone: '0934567890', role: 'user', status: 'locked', createdAt: '15/03/2026' },
  { key: '5', id: 5, name: 'BS. Hoàng Văn Em', email: 'em@gmail.com', phone: '0945678901', role: 'doctor', status: 'active', createdAt: '20/03/2026' },
];

const roleLabel: Record<string, string> = { user: 'Bệnh nhân', doctor: 'Bác sĩ', admin: 'Admin' };
const roleColor: Record<string, string> = { user: 'default', doctor: 'blue', admin: 'purple' };

const Users = () => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');

  const data = mock.filter((u) =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)) &&
    (role === 'all' || u.role === role) &&
    (status === 'all' || u.status === status)
  );

  const cols: ColumnsType<UserRow> = [
    {
      title: 'Họ tên', dataIndex: 'name', key: 'name', width: 200,
      render: (n: string) => (
        <Space>
          <Avatar size={32} icon={<UserOutlined />} style={{ background: '#E8F4FD', color: '#0077C8' }} />
          <span style={{ fontWeight: 500 }}>{n}</span>
        </Space>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone', width: 130 },
    {
      title: 'Role', dataIndex: 'role', key: 'role', width: 110,
      render: (r: string) => <Tag color={roleColor[r]}>{roleLabel[r]}</Tag>,
    },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 130,
      render: (s: string) => (
        <Tag color={s === 'active' ? 'green' : 'red'}>{s === 'active' ? 'Hoạt động' : 'Đã khóa'}</Tag>
      ),
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', width: 120 },
    {
      title: 'Thao tác', key: 'act', width: 150, fixed: 'right' as const,
      render: (_, r) => (
        <Space>
          <Button type="link" size="small" icon={<UserOutlined />}>Chi tiết</Button>
          <Popconfirm title={r.status === 'active' ? 'Khóa tài khoản?' : 'Mở khóa?'} okText="Xác nhận" cancelText="Hủy">
            <Button type="link" size="small" danger={r.status === 'active'}
              icon={r.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}>
              {r.status === 'active' ? 'Khóa' : 'Mở khóa'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý người dùng</h1>
        <p className={styles.pageSubtitle}>Tổng: {mock.length} người dùng</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input prefix={<SearchOutlined style={{ color: '#6B7C99' }} />} placeholder="Tìm theo tên, email..."
            value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 260 }} />
          <Select value={role} onChange={setRole} style={{ width: 140 }}>
            <Select.Option value="all">Tất cả role</Select.Option>
            <Select.Option value="user">Bệnh nhân</Select.Option>
            <Select.Option value="doctor">Bác sĩ</Select.Option>
          </Select>
          <Select value={status} onChange={setStatus} style={{ width: 150 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="active">Hoạt động</Select.Option>
            <Select.Option value="locked">Đã khóa</Select.Option>
          </Select>
        </div>
        <Table dataSource={data} columns={cols}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `${t} người dùng` }}
          scroll={{ x: 'max-content' }} size="middle" />
      </div>
    </div>
  );
};

export default Users;
