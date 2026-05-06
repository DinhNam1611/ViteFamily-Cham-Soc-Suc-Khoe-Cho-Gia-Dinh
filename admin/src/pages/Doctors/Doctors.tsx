import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, Tabs, Input, Button, Tag, Avatar, Space, Modal, Form,
  Select, Popconfirm, message, Tooltip, Alert,
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
  rejectionReason?: string;
}

const initialData: DoctorRow[] = [
  { key: '1', id: 1, name: 'BS. Nguyễn Minh Tú', email: 'tu@gmail.com', phone: '0901111111', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', experience: '8 năm', bio: 'Bác sĩ CKI Tim mạch, 8 năm kinh nghiệm.', approvalStatus: 'pending', submittedAt: '28/04/2026' },
  { key: '2', id: 2, name: 'BS. Trần Thị Lan', email: 'lan@gmail.com', phone: '0902222222', specialty: 'Nhi khoa', hospital: 'BV Nhi đồng 1', experience: '5 năm', bio: 'Chuyên gia Nhi khoa, điều trị bệnh nhi từ sơ sinh đến 15 tuổi.', approvalStatus: 'pending', submittedAt: '27/04/2026' },
  { key: '3', id: 3, name: 'BS. Lê Văn Hùng', email: 'hung@gmail.com', phone: '0903333333', specialty: 'Thần kinh', hospital: 'BV 115', experience: '12 năm', bio: 'Bác sĩ CKII Thần kinh học, 12 năm kinh nghiệm.', approvalStatus: 'approved', submittedAt: '20/04/2026' },
  { key: '4', id: 4, name: 'BS. Phạm Thu Hà', email: 'ha@gmail.com', phone: '0904444444', specialty: 'Da liễu', hospital: 'BV Da liễu', experience: '6 năm', bio: 'Chuyên khoa Da liễu và thẩm mỹ da.', approvalStatus: 'approved', submittedAt: '18/04/2026' },
  { key: '5', id: 5, name: 'BS. Vũ Công Minh', email: 'minh@gmail.com', phone: '0905555555', specialty: 'Chỉnh hình', hospital: 'BV Chấn thương', experience: '9 năm', bio: 'Bác sĩ Chỉnh hình và phục hồi chức năng.', approvalStatus: 'rejected', submittedAt: '15/04/2026', rejectionReason: 'Bằng cấp chưa được xác minh' },
];

// Đồng bộ với trang Specialties và Hospitals — sẽ thay bằng API call khi có backend
const SPECIALTIES = ['Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Chỉnh hình', 'Nội tổng quát', 'Tai mũi họng', 'Mắt'];
const HOSPITALS = ['BV Chợ Rẫy', 'BV Nhi đồng 1', 'BV 115', 'BV Da liễu', 'BV Chấn thương', 'BV Đại học Y Dược'];

const statusColor: Record<ApprovalStatus, string> = { pending: 'orange', approved: 'green', rejected: 'red' };
const statusLabel: Record<ApprovalStatus, string> = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };

const Doctors = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DoctorRow[]>(initialData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Modal thêm/sửa bác sĩ
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DoctorRow | null>(null);
  const [form] = Form.useForm();

  // Modal từ chối hồ sơ (yêu cầu lý do)
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectForm] = Form.useForm();

  const pendingCount = data.filter((d) => d.approvalStatus === 'pending').length;

  const filtered = data.filter(
    (d) =>
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.hospital.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === 'all' || d.approvalStatus === statusFilter),
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
        // Bác sĩ mới thêm phải qua bước duyệt — đặt pending, không phải approved
        const newKey = String(Date.now());
        setData((prev) => [
          ...prev,
          {
            ...values,
            key: newKey,
            id: Date.now(),
            approvalStatus: 'pending' as ApprovalStatus,
            submittedAt: new Date().toLocaleDateString('vi-VN'),
          },
        ]);
        message.success('Đã thêm bác sĩ. Hồ sơ đang chờ duyệt.');
      }
      setModalOpen(false);
    });
  };

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((d) => d.key !== key));
    message.success('Đã xóa bác sĩ');
  };

  const handleApprove = (key: string) => {
    setData((prev) => prev.map((d) => (d.key === key ? { ...d, approvalStatus: 'approved', rejectionReason: undefined } : d)));
    message.success('Đã duyệt hồ sơ bác sĩ. Bác sĩ sẽ hiển thị trên hệ thống.');
  };

  const openRejectModal = (key: string) => {
    setRejectTarget(key);
    rejectForm.resetFields();
    setRejectModalOpen(true);
  };

  const handleConfirmReject = (values: { reason: string }) => {
    setData((prev) =>
      prev.map((d) =>
        d.key === rejectTarget
          ? { ...d, approvalStatus: 'rejected', rejectionReason: values.reason }
          : d,
      ),
    );
    message.warning('Đã từ chối hồ sơ bác sĩ');
    setRejectModalOpen(false);
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
      title: 'Thao tác', key: 'act', width: 160, fixed: 'right' as const,
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
                  description="Bác sĩ sẽ được hiển thị và bệnh nhân có thể đặt lịch."
                  okText="Duyệt" cancelText="Hủy"
                  onConfirm={() => handleApprove(r.key)}
                >
                  <Button type="link" size="small" style={{ color: '#28A745' }} icon={<CheckCircleOutlined />} />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="Từ chối hồ sơ">
                <Button
                  type="link" size="small" danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => openRejectModal(r.key)}
                />
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
            {data.length} bác sĩ — {pendingCount} chờ duyệt
          </p>
        </div>
      </div>

      {/* Cảnh báo nổi bật nếu có hồ sơ chờ duyệt */}
      {pendingCount > 0 && (
        <Alert
          message={`Có ${pendingCount} hồ sơ bác sĩ đang chờ duyệt`}
          description="Hồ sơ chưa được duyệt sẽ không hiển thị cho bệnh nhân. Vui lòng xem xét và xử lý sớm."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={() => setStatusFilter('pending')}>
              Lọc hồ sơ chờ duyệt
            </Button>
          }
        />
      )}

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm bác sĩ, chuyên khoa, bệnh viện..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 170 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="pending">Chờ duyệt ({pendingCount})</Select.Option>
            <Select.Option value="approved">Đã duyệt</Select.Option>
            <Select.Option value="rejected">Từ chối</Select.Option>
          </Select>
          <Button
            type="primary" icon={<PlusOutlined />}
            style={{ marginLeft: 'auto', background: '#0077C8' }}
            onClick={openAdd}
          >
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

      {/* Modal thêm/sửa bác sĩ */}
      <Modal
        title={editing ? 'Sửa thông tin bác sĩ' : 'Thêm bác sĩ mới'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText={editing ? 'Lưu thay đổi' : 'Thêm bác sĩ'}
        cancelText="Hủy"
        width={580}
        destroyOnHidden
      >
        {!editing && (
          <Alert
            message="Bác sĩ mới sẽ được đặt trạng thái Chờ duyệt"
            description="Hồ sơ cần được admin xem xét và duyệt trước khi bác sĩ xuất hiện trên hệ thống."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form form={form} layout="vertical">
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

      {/* Modal từ chối hồ sơ — bắt buộc nhập lý do */}
      <Modal
        title="Từ chối hồ sơ bác sĩ"
        open={rejectModalOpen}
        onOk={() => rejectForm.submit()}
        onCancel={() => setRejectModalOpen(false)}
        okText="Xác nhận từ chối"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
        destroyOnHidden
      >
        <p style={{ marginBottom: 12, color: '#595959' }}>
          Lý do sẽ được gửi đến bác sĩ để họ có thể chỉnh sửa và nộp lại hồ sơ.
        </p>
        <Form form={rejectForm} layout="vertical" onFinish={handleConfirmReject}>
          <Form.Item
            name="reason"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="VD: Thiếu chứng chỉ hành nghề, bằng cấp chưa xác minh..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Doctors;
