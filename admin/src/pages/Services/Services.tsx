import { useState } from 'react';
import { Table, Input, Button, Switch, Space, Modal, Form, InputNumber, Select, Popconfirm, Tooltip, Tag } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Services.module.css';

interface ServiceRow {
  key: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  specialty: string;
  isActive: boolean;
}

const SPECIALTIES = ['Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Nội khoa', 'Chỉnh hình'];

const mock: ServiceRow[] = [
  { key: '1', name: 'Khám tổng quát tại nhà', description: 'Bác sĩ đến tận nhà thăm khám, đo sinh hiệu và tư vấn sức khỏe toàn diện', price: 350000, duration: 60, specialty: 'Nội khoa', isActive: true },
  { key: '2', name: 'Khám nhi tại nhà', description: 'Chuyên khám và theo dõi sức khỏe trẻ em từ sơ sinh đến 18 tuổi tại nhà', price: 280000, duration: 45, specialty: 'Nhi khoa', isActive: true },
  { key: '3', name: 'Tư vấn video chuyên khoa', description: 'Kết nối trực tuyến với bác sĩ chuyên khoa, nhận tư vấn và hướng dẫn điều trị', price: 200000, duration: 30, specialty: 'Thần kinh', isActive: true },
  { key: '4', name: 'Lấy mẫu xét nghiệm tại nhà', description: 'Nhân viên y tế đến lấy mẫu máu, nước tiểu và các mẫu xét nghiệm cần thiết', price: 150000, duration: 30, specialty: 'Nội khoa', isActive: false },
  { key: '5', name: 'Khám tim mạch tại nhà', description: 'Bác sĩ tim mạch thăm khám, đo điện tim và tư vấn chuyên sâu tại nhà bệnh nhân', price: 450000, duration: 75, specialty: 'Tim mạch', isActive: true },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();

  const openEdit = (r: ServiceRow) => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); };
  const openAdd  = () => { setEditing(null); form.resetFields(); setModalOpen(true); };

  const filtered = mock.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const cols: ColumnsType<ServiceRow> = [
    {
      title: 'Dịch vụ', dataIndex: 'name', key: 'name', width: 200,
      render: (v: string) => <b style={{ color: '#1A2B4B' }}>{v}</b>,
    },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 300 },
    {
      title: 'Giá', dataIndex: 'price', key: 'price', width: 130, align: 'right' as const,
      render: (v: number) => <span style={{ color: '#0077C8', fontWeight: 600 }}>{formatPrice(v)}</span>,
    },
    {
      title: 'Thời gian', dataIndex: 'duration', key: 'duration', width: 100, align: 'center' as const,
      render: (v: number) => `${v} phút`,
    },
    {
      title: 'Chuyên khoa', dataIndex: 'specialty', key: 'specialty', width: 130,
      render: (v: string) => <Tag color="blue">{v}</Tag>,
    },
    {
      title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive', width: 110, align: 'center' as const,
      render: (v: boolean) => <Switch checked={v} size="small" />,
    },
    {
      title: 'Thao tác', key: 'act', width: 90, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button type="link" size="small" icon={<FormOutlined />} onClick={() => openEdit(r)} />
          </Tooltip>
          <Tooltip title="Xóa dịch vụ">
            <Popconfirm title="Xóa dịch vụ này?" okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}>
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý dịch vụ</h1>
        <p className={styles.pageSubtitle}>Quản lý các gói dịch vụ khám tại nhà và tư vấn video</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm dịch vụ hoặc chuyên khoa..."
            style={{ width: 280 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginLeft: 'auto', background: '#0077C8' }}
            onClick={openAdd}
          >
            Thêm dịch vụ
          </Button>
        </div>
        <Table
          dataSource={filtered}
          columns={cols}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      <Modal
        title={editing ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
        open={modalOpen}
        onOk={() => { form.submit(); setModalOpen(false); }}
        onCancel={() => setModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
            <Input placeholder="VD: Khám tổng quát tại nhà" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} placeholder="Mô tả chi tiết về dịch vụ..." />
          </Form.Item>
          <div className={styles.formRow}>
            <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập giá' }]} style={{ flex: 1 }}>
              <InputNumber
                min={0}
                step={10000}
                style={{ width: '100%' }}
                formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="350000"
              />
            </Form.Item>
            <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true, message: 'Vui lòng nhập thời gian' }]} style={{ flex: 1 }}>
              <InputNumber min={15} step={15} style={{ width: '100%' }} placeholder="60" />
            </Form.Item>
          </div>
          <Form.Item name="specialty" label="Chuyên khoa liên kết" rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}>
            <Select placeholder="Chọn chuyên khoa">
              {SPECIALTIES.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Tạm dừng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
