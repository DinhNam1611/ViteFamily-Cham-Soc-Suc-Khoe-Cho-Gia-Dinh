import { useState } from 'react';
import {
  Table, Input, Select, Button, Popconfirm, Tag, Space, Avatar,
  Drawer, Tabs, Form, Descriptions, Badge, Empty, Card, Row, Col,
} from 'antd';
import {
  SearchOutlined, UserOutlined, LockOutlined, UnlockOutlined,
  EditOutlined, TeamOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Users.module.css';

interface FamilyMember {
  id: number;
  fullName: string;
  dob: string;
  gender: string;
  bloodType: string;
  allergy: string;
  medicalHistory: string;
}

interface UserRow {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  familyName?: string;
  members?: FamilyMember[];
}

const mockUsers: UserRow[] = [
  {
    key: '1', id: 1, name: 'Nguyễn Văn An', email: 'an@gmail.com', phone: '0901234567',
    status: 'active', createdAt: '01/03/2026',
    familyName: 'Gia đình Nguyễn',
    members: [
      { id: 1, fullName: 'Nguyễn Văn An', dob: '15/05/1990', gender: 'Nam', bloodType: 'A+', allergy: 'Penicillin', medicalHistory: 'Huyết áp cao' },
      { id: 2, fullName: 'Nguyễn Thị Lan', dob: '20/08/1992', gender: 'Nữ', bloodType: 'O+', allergy: '', medicalHistory: '' },
      { id: 3, fullName: 'Nguyễn Văn Bảo', dob: '10/12/2018', gender: 'Nam', bloodType: 'A+', allergy: '', medicalHistory: 'Hen suyễn nhẹ' },
    ],
  },
  {
    key: '2', id: 2, name: 'Trần Thị Bình', email: 'binh@gmail.com', phone: '0912345678',
    status: 'active', createdAt: '05/03/2026',
    familyName: 'Gia đình Trần',
    members: [
      { id: 4, fullName: 'Trần Thị Bình', dob: '03/07/1988', gender: 'Nữ', bloodType: 'B+', allergy: '', medicalHistory: 'Tiểu đường type 2' },
    ],
  },
  {
    key: '3', id: 3, name: 'Phạm Thị Dung', email: 'dung@gmail.com', phone: '0934567890',
    status: 'locked', createdAt: '15/03/2026',
  },
  {
    key: '4', id: 4, name: 'Lê Quang Khải', email: 'khai@gmail.com', phone: '0956789012',
    status: 'active', createdAt: '22/03/2026',
    familyName: 'Gia đình Lê',
    members: [
      { id: 5, fullName: 'Lê Quang Khải', dob: '11/02/1985', gender: 'Nam', bloodType: 'AB-', allergy: 'Aspirin', medicalHistory: '' },
      { id: 6, fullName: 'Nguyễn Thị Mai', dob: '25/09/1987', gender: 'Nữ', bloodType: 'O+', allergy: '', medicalHistory: 'Dị ứng phấn hoa' },
    ],
  },
  {
    key: '5', id: 5, name: 'Võ Thị Hồng', email: 'hong@gmail.com', phone: '0967890123',
    status: 'active', createdAt: '28/03/2026',
  },
];

const genderColor: Record<string, string> = { Nam: 'blue', Nữ: 'pink' };

const Users = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [data, setData] = useState<UserRow[]>(mockUsers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<UserRow | null>(null);
  const [activeTab, setActiveTab] = useState('account');
  const [form] = Form.useForm();

  const filtered = data.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)) &&
      (status === 'all' || u.status === status),
  );

  const openDrawer = (record: UserRow) => {
    setSelected(record);
    setActiveTab('account');
    form.setFieldsValue({ name: record.name, phone: record.phone });
    setDrawerOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setData((prev) =>
        prev.map((u) => (u.key === selected?.key ? { ...u, name: values.name, phone: values.phone } : u)),
      );
      setDrawerOpen(false);
    });
  };

  const toggleLock = (record: UserRow) => {
    setData((prev) =>
      prev.map((u) =>
        u.key === record.key ? { ...u, status: u.status === 'active' ? 'locked' : 'active' } : u,
      ),
    );
  };

  const cols: ColumnsType<UserRow> = [
    {
      title: 'Khách hàng', dataIndex: 'name', key: 'name', width: 220,
      render: (n: string) => (
        <Space>
          <Avatar size={36} icon={<UserOutlined />} className={styles.avatar} />
          <span className={styles.userName}>{n}</span>
        </Space>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 210 },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', width: 140 },
    {
      title: 'Hồ sơ gia đình', key: 'family', width: 160,
      render: (_, r) =>
        r.familyName ? (
          <Tag icon={<TeamOutlined />} color="cyan">{r.familyName}</Tag>
        ) : (
          <span className={styles.noFamily}>Chưa tạo</span>
        ),
    },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 130,
      render: (s: string) => (
        <Badge
          status={s === 'active' ? 'success' : 'error'}
          text={s === 'active' ? 'Hoạt động' : 'Đã khóa'}
        />
      ),
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', width: 120 },
    {
      title: 'Thao tác', key: 'act', width: 160, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openDrawer(r)}>
            Xem / Sửa
          </Button>
          <Popconfirm
            title={r.status === 'active' ? 'Khóa tài khoản này?' : 'Mở khóa tài khoản này?'}
            description={r.status === 'active' ? 'Khách hàng sẽ không thể đăng nhập.' : 'Khách hàng sẽ đăng nhập lại được.'}
            okText="Xác nhận" cancelText="Hủy"
            onConfirm={() => toggleLock(r)}
          >
            <Button
              type="link" size="small" danger={r.status === 'active'}
              icon={r.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
            >
              {r.status === 'active' ? 'Khóa' : 'Mở khóa'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'account',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: 6 }} />
          Thông tin tài khoản
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <Descriptions column={1} size="small" className={styles.descriptions} bordered>
            <Descriptions.Item label="Email">{selected?.email}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{selected?.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Badge
                status={selected?.status === 'active' ? 'success' : 'error'}
                text={selected?.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
              />
            </Descriptions.Item>
          </Descriptions>

          <div className={styles.editSection}>
            <p className={styles.editTitle}>Chỉnh sửa thông tin</p>
            <Form form={form} layout="vertical" size="middle">
              <Form.Item
                label="Họ và tên" name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại" name="phone"
                rules={[{ pattern: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Form>
          </div>
        </div>
      ),
    },
    {
      key: 'family',
      label: (
        <span>
          <TeamOutlined style={{ marginRight: 6 }} />
          Hồ sơ gia đình
          {selected?.members?.length ? (
            <span className={styles.memberBadge}>{selected.members.length}</span>
          ) : null}
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          {selected?.familyName && (
            <div className={styles.familyHeader}>
              <TeamOutlined className={styles.familyIcon} />
              <span className={styles.familyName}>{selected.familyName}</span>
            </div>
          )}
          {selected?.members?.length ? (
            <Row gutter={[12, 12]}>
              {selected.members.map((m) => (
                <Col span={24} key={m.id}>
                  <Card size="small" className={styles.memberCard}>
                    <div className={styles.memberHeader}>
                      <Avatar size={38} icon={<UserOutlined />} className={styles.memberAvatar} />
                      <div>
                        <p className={styles.memberName}>{m.fullName}</p>
                        <Space size={4}>
                          <Tag color={genderColor[m.gender] ?? 'default'} style={{ fontSize: 11 }}>
                            {m.gender}
                          </Tag>
                          <span className={styles.memberDob}>{m.dob}</span>
                        </Space>
                      </div>
                    </div>
                    <Descriptions size="small" column={2} style={{ marginTop: 10 }}>
                      <Descriptions.Item label="Nhóm máu">
                        <Tag color="red">{m.bloodType || '—'}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Dị ứng">
                        {m.allergy || <span className={styles.none}>Không có</span>}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tiền sử bệnh" span={2}>
                        {m.medicalHistory || <span className={styles.none}>Không có</span>}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="Khách hàng chưa tạo hồ sơ gia đình" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý Khách hàng</h1>
        <p className={styles.pageSubtitle}>
          {filtered.length} khách hàng —{' '}
          {data.filter((u) => u.status === 'locked').length} tài khoản đã khóa
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm theo tên, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select value={status} onChange={setStatus} style={{ width: 170 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="active">Hoạt động</Select.Option>
            <Select.Option value="locked">Đã khóa</Select.Option>
          </Select>
        </div>

        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `${t} khách hàng` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      <Drawer
        title={
          <Space>
            <Avatar size={36} icon={<UserOutlined />} className={styles.avatar} />
            <div>
              <p className={styles.drawerName}>{selected?.name}</p>
              <p className={styles.drawerEmail}>{selected?.email}</p>
            </div>
          </Space>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        footer={
          activeTab === 'account' ? (
            <div className={styles.drawerFooter}>
              <Button onClick={() => setDrawerOpen(false)}>Hủy</Button>
              <Button type="primary" onClick={handleSave}>Lưu thay đổi</Button>
            </div>
          ) : null
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className={styles.tabs}
        />
      </Drawer>
    </div>
  );
};

export default Users;
