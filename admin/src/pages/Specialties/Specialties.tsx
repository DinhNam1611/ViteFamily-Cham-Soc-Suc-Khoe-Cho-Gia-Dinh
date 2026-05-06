import { useState } from 'react';
import { Table, Input, Button, Switch, Space, Modal, Form, Popconfirm, Tooltip, message } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Specialties.module.css';

interface SpecialtyRow {
  key: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  doctorCount: number;
  isActive: boolean;
}

const initialData: SpecialtyRow[] = [
  { key: '1', name: 'Tim mạch', slug: 'tim-mach', description: 'Chẩn đoán và điều trị các bệnh về tim và mạch máu', icon: '❤️', doctorCount: 12, isActive: true },
  { key: '2', name: 'Nhi khoa', slug: 'nhi-khoa', description: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi', icon: '👶', doctorCount: 9, isActive: true },
  { key: '3', name: 'Thần kinh', slug: 'than-kinh', description: 'Điều trị các bệnh về hệ thần kinh trung ương và ngoại biên', icon: '🧠', doctorCount: 7, isActive: true },
  { key: '4', name: 'Da liễu', slug: 'da-lieu', description: 'Điều trị các bệnh về da, tóc và móng', icon: '🩺', doctorCount: 5, isActive: true },
  { key: '5', name: 'Chỉnh hình', slug: 'chinh-hinh', description: 'Phẫu thuật và điều trị các bệnh cơ xương khớp', icon: '🦴', doctorCount: 8, isActive: false },
];

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const Specialties = () => {
  const [data, setData] = useState<SpecialtyRow[]>(initialData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SpecialtyRow | null>(null);
  const [form] = Form.useForm();

  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setModalOpen(true);
  };

  const openEdit = (r: SpecialtyRow) => {
    setEditing(r);
    form.setFieldsValue(r);
    setModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const slug = values.slug || toSlug(values.name);
      if (editing) {
        setData((prev) =>
          prev.map((r) => (r.key === editing.key ? { ...r, ...values, slug } : r)),
        );
        message.success('Đã cập nhật chuyên khoa');
      } else {
        setData((prev) => [
          ...prev,
          { ...values, slug, key: String(Date.now()), doctorCount: 0 },
        ]);
        message.success('Đã thêm chuyên khoa mới');
      }
      setModalOpen(false);
    });
  };

  const handleToggleActive = (key: string, active: boolean, name: string) => {
    if (!active) {
      const row = data.find((r) => r.key === key);
      if (row && row.doctorCount > 0) {
        Modal.confirm({
          title: 'Tắt hiển thị chuyên khoa?',
          content: `"${name}" đang có ${row.doctorCount} bác sĩ. Bệnh nhân sẽ không tìm được chuyên khoa này. Lịch hẹn hiện có không bị ảnh hưởng.`,
          okText: 'Tắt hiển thị',
          cancelText: 'Hủy',
          okButtonProps: { danger: true },
          onOk: () => {
            setData((prev) => prev.map((r) => (r.key === key ? { ...r, isActive: false } : r)));
            message.success('Đã tắt hiển thị chuyên khoa');
          },
        });
        return;
      }
    }
    setData((prev) => prev.map((r) => (r.key === key ? { ...r, isActive: active } : r)));
    message.success(active ? 'Đã bật hiển thị chuyên khoa' : 'Đã tắt hiển thị chuyên khoa');
  };

  const handleDelete = (r: SpecialtyRow) => {
    if (r.doctorCount > 0) {
      message.error(
        `Không thể xóa — "${r.name}" đang có ${r.doctorCount} bác sĩ liên kết. Hãy chuyển bác sĩ sang chuyên khoa khác trước.`,
      );
      return;
    }
    setData((prev) => prev.filter((item) => item.key !== r.key));
    message.success('Đã xóa chuyên khoa');
  };

  const cols: ColumnsType<SpecialtyRow> = [
    {
      title: 'Chuyên khoa', key: 'name', width: 180,
      render: (_, r) => (
        <span>
          <span style={{ marginRight: 8, fontSize: 18 }}>{r.icon}</span>
          <b>{r.name}</b>
        </span>
      ),
    },
    { title: 'Slug', dataIndex: 'slug', key: 'slug', width: 150, render: (v: string) => <code style={{ fontSize: 12, color: '#666' }}>{v}</code> },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: 'Số BS', dataIndex: 'doctorCount', key: 'doctorCount', width: 80, align: 'center' },
    {
      title: 'Hiển thị', dataIndex: 'isActive', key: 'isActive', width: 110,
      render: (v: boolean, r) => (
        <Switch
          checked={v}
          size="small"
          checkedChildren="Bật"
          unCheckedChildren="Tắt"
          onChange={(checked) => handleToggleActive(r.key, checked, r.name)}
        />
      ),
    },
    {
      title: 'Thao tác', key: 'act', width: 90, fixed: 'right' as const,
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button type="link" size="small" icon={<FormOutlined />} onClick={() => openEdit(r)} />
          </Tooltip>
          <Tooltip title={r.doctorCount > 0 ? `Còn ${r.doctorCount} bác sĩ — không thể xóa` : 'Xóa chuyên khoa'}>
            <Popconfirm
              title="Xóa chuyên khoa này?"
              description="Hành động này không thể hoàn tác."
              okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}
              disabled={r.doctorCount > 0}
              onConfirm={() => handleDelete(r)}
            >
              <Button
                type="link" size="small" danger
                icon={<DeleteOutlined />}
                disabled={r.doctorCount > 0}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý chuyên khoa</h1>
        <p className={styles.pageSubtitle}>
          {data.length} chuyên khoa — {data.filter((r) => r.isActive).length} đang hiển thị
        </p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm chuyên khoa..."
            style={{ width: 260 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button
            type="primary" icon={<PlusOutlined />}
            style={{ marginLeft: 'auto', background: '#0077C8' }}
            onClick={openAdd}
          >
            Thêm chuyên khoa
          </Button>
        </div>
        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showTotal: (t) => `${t} chuyên khoa` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      <Modal
        title={editing ? 'Chỉnh sửa chuyên khoa' : 'Thêm chuyên khoa mới'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText="Lưu" cancelText="Hủy"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name" label="Tên chuyên khoa"
            rules={[{ required: true, message: 'Vui lòng nhập tên chuyên khoa' }]}
          >
            <Input placeholder="VD: Tim mạch" />
          </Form.Item>
          <Form.Item
            name="slug" label="Slug (URL)"
            tooltip="Tự động tạo từ tên nếu để trống. Dùng cho đường dẫn: /services/[slug]"
          >
            <Input placeholder="VD: tim-mach (tự động tạo nếu để trống)" />
          </Form.Item>
          <Form.Item name="icon" label="Icon (emoji)" tooltip="Emoji đại diện hiển thị trên trang chủ">
            <Input placeholder="VD: ❤️" maxLength={4} style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} placeholder="Mô tả ngắn về chuyên khoa..." />
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái hiển thị" valuePropName="checked">
            <Switch checkedChildren="Đang hiển thị" unCheckedChildren="Tạm ẩn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Specialties;
