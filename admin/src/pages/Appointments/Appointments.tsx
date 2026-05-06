import { useState } from 'react';
import {
  Table, Input, Select, Tag, Button, Space, Tooltip,
  Modal, Form, Descriptions, Badge, message, DatePicker,
} from 'antd';
import { SearchOutlined, MinusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import styles from './Appointments.module.css';

interface ApptRow {
  key: string;
  patient: string;
  patientPhone: string;
  familyMember: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  reason: string;
  status: string;
}

const mockData: ApptRow[] = [
  { key: '1', patient: 'Nguyễn Văn An', patientPhone: '0901234567', familyMember: 'Nguyễn Văn An (bản thân)', doctor: 'BS. Trần Thị Bình', specialty: 'Tim mạch', date: '30/04/2026', time: '08:30', type: 'Tại viện', reason: 'Đau ngực, khó thở khi gắng sức', status: 'confirmed' },
  { key: '2', patient: 'Lê Văn Cường', patientPhone: '0912345678', familyMember: 'Lê Thị Mẹ (mẹ)', doctor: 'BS. Phạm Minh Đức', specialty: 'Nhi khoa', date: '30/04/2026', time: '09:00', type: 'Video', reason: 'Tư vấn sau phẫu thuật', status: 'pending' },
  { key: '3', patient: 'Trần Thị Em', patientPhone: '0923456789', familyMember: 'Trần Thị Em (bản thân)', doctor: 'BS. Nguyễn Văn Phú', specialty: 'Da liễu', date: '01/05/2026', time: '10:30', type: 'Tại nhà', reason: 'Nổi mẩn đỏ toàn thân kéo dài', status: 'pending' },
  { key: '4', patient: 'Phạm Văn Giỏi', patientPhone: '0934567890', familyMember: 'Phạm Bé Con (con trai)', doctor: 'BS. Lê Thị Hoa', specialty: 'Thần kinh', date: '01/05/2026', time: '14:00', type: 'Tại viện', reason: 'Đau đầu, chóng mặt', status: 'completed' },
  { key: '5', patient: 'Hoàng Thị Lan', patientPhone: '0945678901', familyMember: 'Hoàng Thị Lan (bản thân)', doctor: 'BS. Vũ Văn Khánh', specialty: 'Cơ xương khớp', date: '02/05/2026', time: '08:00', type: 'Tại viện', reason: 'Đau khớp gối mãn tính', status: 'cancelled' },
];

const statusColor: Record<string, string> = {
  pending: 'orange', confirmed: 'blue', completed: 'green', cancelled: 'red',
};
const statusLabel: Record<string, string> = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', completed: 'Hoàn thành', cancelled: 'Đã hủy',
};
const typeColor: Record<string, string> = { 'Tại viện': 'geekblue', 'Tại nhà': 'green', Video: 'purple' };

const Appointments = () => {
  const [data, setData] = useState<ApptRow[]>(mockData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);

  // State cho modal chi tiết lịch hẹn
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<ApptRow | null>(null);

  // State cho modal hủy lịch (yêu cầu lý do)
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelKey, setCancelKey] = useState<string | null>(null);
  const [cancelForm] = Form.useForm();

  const filtered = data.filter((a) => {
    const matchSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    const matchDate = !dateFilter || a.date === dateFilter.format('DD/MM/YYYY');
    return matchSearch && matchStatus && matchType && matchDate;
  });

  const openDetail = (record: ApptRow) => {
    setSelected(record);
    setDetailOpen(true);
  };

  const openCancelModal = (key: string) => {
    setCancelKey(key);
    cancelForm.resetFields();
    setCancelOpen(true);
  };

  const handleConfirmCancel = () => {
    cancelForm.validateFields().then(() => {
      setData((prev) =>
        prev.map((a) => (a.key === cancelKey ? { ...a, status: 'cancelled' } : a)),
      );
      message.success('Đã hủy lịch hẹn. Bệnh nhân sẽ nhận được thông báo.');
      setCancelOpen(false);
    });
  };

  const cols: ColumnsType<ApptRow> = [
    {
      title: 'Bệnh nhân', key: 'patient', width: 170,
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.patient}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.patientPhone}</div>
        </div>
      ),
    },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor', width: 180 },
    { title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty', width: 130,
      render: (v: string) => <Tag color="blue">{v}</Tag>,
    },
    { title: 'Ngày', dataIndex: 'date', key: 'date', width: 110 },
    { title: 'Giờ', dataIndex: 'time', key: 'time', width: 70 },
    {
      title: 'Loại', dataIndex: 'type', key: 'type', width: 90,
      render: (v: string) => <Tag color={typeColor[v] ?? 'default'}>{v}</Tag>,
    },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 140,
      render: (s: string) => <Tag color={statusColor[s]}>{statusLabel[s]}</Tag>,
    },
    {
      title: 'Thao tác', key: 'act', width: 90, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title="Xem chi tiết">
            <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => openDetail(r)} />
          </Tooltip>
          {(r.status === 'pending' || r.status === 'confirmed') && (
            <Tooltip title="Hủy lịch hẹn">
              <Button
                type="link" size="small" danger
                icon={<MinusCircleOutlined />}
                onClick={() => openCancelModal(r.key)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  // Đếm số lịch cần xử lý để hiển thị ở subtitle
  const pendingCount = data.filter((a) => a.status === 'pending').length;

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý lịch hẹn</h1>
        <p className={styles.pageSubtitle}>
          {data.length} lịch hẹn
          {pendingCount > 0 && (
            <span style={{ color: '#fa8c16', marginLeft: 8 }}>
              — {pendingCount} chờ xác nhận
            </span>
          )}
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm bệnh nhân, bác sĩ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <DatePicker
            placeholder="Lọc theo ngày"
            format="DD/MM/YYYY"
            value={dateFilter}
            onChange={(val) => setDateFilter(val)}
            style={{ width: 150 }}
          />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 155 }}>
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="pending">Chờ xác nhận</Select.Option>
            <Select.Option value="confirmed">Đã xác nhận</Select.Option>
            <Select.Option value="completed">Hoàn thành</Select.Option>
            <Select.Option value="cancelled">Đã hủy</Select.Option>
          </Select>
          <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 130 }}>
            <Select.Option value="all">Tất cả loại</Select.Option>
            <Select.Option value="Tại viện">Tại viện</Select.Option>
            <Select.Option value="Tại nhà">Tại nhà</Select.Option>
            <Select.Option value="Video">Video</Select.Option>
          </Select>
        </div>

        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showTotal: (t) => `${t} lịch hẹn` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      {/* Modal xem chi tiết lịch hẹn */}
      <Modal
        title="Chi tiết lịch hẹn"
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={<Button onClick={() => setDetailOpen(false)}>Đóng</Button>}
        width={480}
      >
        {selected && (
          <Descriptions bordered size="small" column={1} style={{ marginTop: 8 }}>
            <Descriptions.Item label="Bệnh nhân">
              <b>{selected.patient}</b> — {selected.patientPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Thành viên khám">
              {selected.familyMember}
            </Descriptions.Item>
            <Descriptions.Item label="Bác sĩ">{selected.doctor}</Descriptions.Item>
            <Descriptions.Item label="Chuyên khoa">
              <Tag color="blue">{selected.specialty}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày & Giờ">
              {selected.date} lúc {selected.time}
            </Descriptions.Item>
            <Descriptions.Item label="Hình thức">
              <Tag color={typeColor[selected.type]}>{selected.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Lý do khám">{selected.reason}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Badge
                status={
                  selected.status === 'completed' ? 'success'
                  : selected.status === 'confirmed' ? 'processing'
                  : selected.status === 'cancelled' ? 'error'
                  : 'warning'
                }
                text={statusLabel[selected.status]}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal hủy lịch — bắt buộc nhập lý do */}
      <Modal
        title="Hủy lịch hẹn"
        open={cancelOpen}
        onOk={handleConfirmCancel}
        onCancel={() => setCancelOpen(false)}
        okText="Xác nhận hủy"
        okButtonProps={{ danger: true }}
        cancelText="Không hủy"
        destroyOnHidden
      >
        <p style={{ marginBottom: 12 }}>
          Vui lòng nhập lý do hủy. Bệnh nhân sẽ nhận được thông báo qua email/app.
        </p>
        <Form form={cancelForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Lý do hủy"
            rules={[{ required: true, message: 'Vui lòng nhập lý do hủy lịch hẹn' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="VD: Bác sĩ bị bệnh đột xuất, bệnh nhân yêu cầu đổi lịch..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments;
