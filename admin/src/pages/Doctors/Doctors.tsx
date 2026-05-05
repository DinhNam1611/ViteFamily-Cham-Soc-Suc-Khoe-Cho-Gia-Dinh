import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, Tabs, Input, Button, Tag, Avatar, Space, Modal, Form,
  Select, Popconfirm, message, Tooltip,
} from 'antd';
import {
  SearchOutlined, ProfileOutlined, CheckCircleOutlined, CloseCircleOutlined,
  PlusOutlined, FormOutlined, DeleteOutlined, UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Doctors.module.css';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface DoctorRow {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  hospital: string;
  experience: string;
  bio: string;
  approvalStatus: ApprovalStatus;
  submittedAt: string;
}

const initialData: DoctorRow[] = [
  { key: '1', id: 1, name: 'BS. Nguyễn Minh Tú', email: 'tu@gmail.com', phone: '0901111111', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', experience: '8 năm', bio: 'Bác sĩ CKI Tim mạch, 8 năm kinh nghiệm.', approvalStatus: 'pending', submittedAt: '28/04/2026' },
  { key: '2', id: 2, name: 'BS. Trần Thị Lan', email: 'lan@gmail.com', phone: '0902222222', specialty: 'Nhi khoa', hospital: 'BV Nhi đồng 1', experience: '5 năm', bio: 'Chuyên gia Nhi khoa, điều trị bệnh nhi từ sơ sinh đến 15 tuổi.', approvalStatus: 'pending', submittedAt: '27/04/2026' },
  { key: '3', id: 3, name: 'BS. Lê Văn Hùng', email: 'hung@gmail.com', phone: '0903333333', specialty: 'Thần kinh', hospital: 'BV 115', experience: '12 năm', bio: 'Bác sĩ CKII Thần kinh học, 12 năm kinh nghiệm.', approvalStatus: 'approved', submittedAt: '20/04/2026' },
  { key: '4', id: 4, name: 'BS. Phạm Thu Hà', email: 'ha@gmail.com', phone: '0904444444', specialty: 'Da liễu', hospital: 'BV Da liễu', experience: '6 năm', bio: 'Chuyên khoa Da liễu và thẩm mỹ da.', approvalStatus: 'approved', submittedAt: '18/04/2026' },
  { key: '5', id: 5, name: 'BS. Vũ Công Minh', email: 'minh@gmail.com', phone: '0905555555', specialty: 'Chỉnh hình', hospital: 'BV Chấn thương', experience: '9 năm', bio: 'Bác sĩ Chỉnh hình và phục hồi chức năng.', approvalStatus: 'rejected', submittedAt: '15/04/2026' },
];

const SPECIALTIES = ['Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Chỉnh hình', 'Nội tổng quát', 'Tai mũi họng', 'Mắt'];
const HOSPITALS = ['BV Chợ Rẫy', 'BV Nhi đồng 1', 'BV 115', 'BV Da liễu', 'BV Chấn thương', 'BV Đại học Y Dược'];

const statusColor: Record<ApprovalStatus, string> = { pending: 'orange', approved: 'green', rejected: 'red' };
const statusLabel: Record<ApprovalStatus, string> = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };

const Doctors = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DoctorRow[]>(initialData);
  const [status, setStatus] = useState('all');

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DoctorRow | null>(null);
  const [form] = Form.useForm();

  const counts = (s: ApprovalStatus) => data.filter((d) => d.approvalStatus === s).length;

  const filtered = data.filter(
    (d) =>
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())) &&
      (status === 'all' || d.approvalStatus === status),
  );

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (r: DoctorRow) => {
    setEditing(r);
    form.setFieldsValue(r);
    setModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editing) {
        setData((prev) => prev.map((d) => (d.key === editing.key ? { ...d, ...values } : d)));
        message.success('Đã cập nhật thông tin bác sĩ');
      } else {
        const newKey = String(Date.now());
        setData((prev) => [
          ...prev,
          {
            ...values,
            key: newKey,
            id: Date.now(),
            approvalStatus: 'approved' as ApprovalStatus,
            submittedAt: new Date().toLocaleDateString('vi-VN'),
          },
        ]);
        message.success('Đã thêm bác sĩ mới');
      }
      setModalOpen(false);
    });
  };

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((d) => d.key !== key));
    message.success('Đã xóa bác sĩ');
  };

  const handleApprove = (key: string) => {
    setData((prev) => prev.map((d) => (d.key === key ? { ...d, approvalStatus: 'approved' } : d)));
    message.success('Đã duyệt hồ sơ bác sĩ');
  };

  const handleReject = (key: string) => {
    setData((prev) => prev.map((d) => (d.key === key ? { ...d, approvalStatus: 'rejected' } : d)));
    message.warning('Đã từ chối hồ sơ bác sĩ');
  };

  const cols: ColumnsType<DoctorRow> = [
    {
      title: 'Bác sĩ', dataIndex: 'name', key: 'name', width: 220,
      render: (n: string) => (
        <Space>
          <Avatar size={36} icon={<UserOutlined />} className={styles.avatar}>
            {n.charAt(n.lastIndexOf(' ') + 1)}
          </Avatar>
          <span className={styles.doctorName}>{n}</span>
        </Space>
      ),
    },
    { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty', width: 140 },
    { title: 'Bệnh viện', dataIndex: 'hospital', key: 'hospital', width: 180 },
    { title: 'Kinh nghiệm', dataIndex: 'experience', key: 'experience', width: 120 },
    {
      title: 'Trạng thái', dataIndex: 'approvalStatus', key: 'approvalStatus', width: 130,
      render: (s: ApprovalStatus) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag>,
    },
    { title: 'Ngày nộp', dataIndex: 'submittedAt', key: 'submittedAt', width: 120 },
    {
      title: 'Thao tác', key: 'act', width: 140, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title="Xem chi tiết">
            <Button
              type="link" size="small" icon={<ProfileOutlined />}
              onClick={() => navigate(`/admin/doctors/${r.id}`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="link" size="small" icon={<FormOutlined />} onClick={() => openEdit(r)} />
          </Tooltip>
          <Tooltip title="Xóa bác sĩ">
            <Popconfirm
              title="Xóa bác sĩ này?"
              description="Hành động này không thể hoàn tác."
              okText="Xóa" okType="danger" cancelText="Hủy"
              onConfirm={() => handleDelete(r.key)}
            >
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          {r.approvalStatus === 'pending' && (
            <>
              <Tooltip title="Duyệt hồ sơ">
                <Popconfirm
                  title="Duyệt hồ sơ bác sĩ này?"
                  okText="Duyệt" cancelText="Hủy"
                  onConfirm={() => handleApprove(r.key)}
                >
                  <Button type="link" size="small" style={{ color: '#28A745' }} icon={<CheckCircleOutlined />} />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="Từ chối hồ sơ">
                <Popconfirm
                  title="Từ chối hồ sơ này?"
                  okText="Từ chối" okType="danger" cancelText="Hủy"
                  onConfirm={() => handleReject(r.key)}
                >
                  <Button type="link" size="small" danger icon={<CloseCircleOutlined />} />
                </Popconfirm>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Quản lý Bác sĩ</h1>
          <p className={styles.pageSubtitle}>
            {data.length} bác sĩ — {counts('pending')} chờ duyệt
          </p>
        </div>

      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm bác sĩ, chuyên khoa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select value={status} onChange={setStatus} style={{ width: 170 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="pending">Chờ duyệt</Select.Option>
            <Select.Option value="approved">Đã duyệt</Select.Option>
            <Select.Option value="rejected">Từ chối</Select.Option>
          </Select>

          <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 'auto', background: '#0077C8' }} onClick={openAdd}>
            Thêm bác sĩ
          </Button>
        </div>

        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `${t} bác sĩ` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      <Modal
        title={editing ? 'Sửa thông tin bác sĩ' : 'Thêm bác sĩ mới'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        okText={editing ? 'Lưu thay đổi' : 'Thêm bác sĩ'}
        cancelText="Hủy"
        width={580}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Nhập họ tên' }]}>
            <Input placeholder="VD: BS. Nguyễn Văn A" />
          </Form.Item>
          <div className={styles.formGrid}>
            <Form.Item
              label="Email" name="email"
              rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
            >
              <Input placeholder="email@gmail.com" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại" name="phone"
              rules={[{ pattern: /^0\d{9}$/, message: 'SĐT không hợp lệ' }]}
            >
              <Input placeholder="09xxxxxxxx" />
            </Form.Item>
            <Form.Item label="Chuyên khoa" name="specialty" rules={[{ required: true, message: 'Chọn chuyên khoa' }]}>
              <Select placeholder="Chọn chuyên khoa">
                {SPECIALTIES.map((s) => <Select.Option key={s} value={s}>{s}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Bệnh viện" name="hospital" rules={[{ required: true, message: 'Chọn bệnh viện' }]}>
              <Select placeholder="Chọn bệnh viện">
                {HOSPITALS.map((h) => <Select.Option key={h} value={h}>{h}</Select.Option>)}
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Kinh nghiệm" name="experience" rules={[{ required: true, message: 'Nhập kinh nghiệm' }]}>
            <Input placeholder="VD: 5 năm" />
          </Form.Item>
          <Form.Item label="Giới thiệu ngắn" name="bio">
            <Input.TextArea rows={3} placeholder="Mô tả chuyên môn, kinh nghiệm nổi bật..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Doctors;
