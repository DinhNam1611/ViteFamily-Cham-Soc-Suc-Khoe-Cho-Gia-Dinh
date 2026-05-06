import { useState } from 'react';
import { Table, Input, Button, Switch, Space, Modal, Form, Popconfirm, Tooltip, message } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Hospitals.module.css';

interface HospitalRow {
  key: string;
  name: string;
  address: string;
  phone: string;
  doctorCount: number;
  isActive: boolean;
}

const initialData: HospitalRow[] = [
  { key: '1', name: 'BV Chợ Rẫy', address: '201B Nguyễn Chí Thanh, Q5, TPHCM', phone: '028 3855 4137', doctorCount: 18, isActive: true },
  { key: '2', name: 'BV Nhi đồng 1', address: '341 Sư Vạn Hạnh, Q10, TPHCM', phone: '028 3927 1119', doctorCount: 12, isActive: true },
  { key: '3', name: 'BV 115', address: '527 Sư Vạn Hạnh, Q10, TPHCM', phone: '028 3865 4044', doctorCount: 9, isActive: true },
  { key: '4', name: 'BV Da liễu TPHCM', address: '2 Nguyễn Thông, Q3, TPHCM', phone: '028 3930 5220', doctorCount: 6, isActive: false },
];

const Hospitals = () => {
  const [data, setData] = useState<HospitalRow[]>(initialData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HospitalRow | null>(null);
  const [form] = Form.useForm();

  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setModalOpen(true);
  };

  const openEdit = (r: HospitalRow) => {
    setEditing(r);
    form.setFieldsValue(r);
    setModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editing) {
        setData((prev) => prev.map((r) => (r.key === editing.key ? { ...r, ...values } : r)));
        message.success('Đã cập nhật thông tin bệnh viện');
      } else {
        setData((prev) => [
          ...prev,
          { ...values, key: String(Date.now()), doctorCount: 0 },
        ]);
        message.success('Đã thêm bệnh viện mới');
      }
      setModalOpen(false);
    });
  };

  const handleToggleActive = (key: string, active: boolean, name: string) => {
    if (!active) {
      Modal.confirm({
        title: 'Tắt hiển thị bệnh viện?',
        content: `Bệnh nhân sẽ không thấy "${name}" khi đặt lịch. Lịch hẹn đang có không bị ảnh hưởng.`,
        okText: 'Tắt hiển thị',
        cancelText: 'Hủy',
        okButtonProps: { danger: true },
        onOk: () => {
          setData((prev) => prev.map((r) => (r.key === key ? { ...r, isActive: false } : r)));
          message.success('Đã tắt hiển thị bệnh viện');
        },
      });
    } else {
      setData((prev) => prev.map((r) => (r.key === key ? { ...r, isActive: true } : r)));
      message.success('Đã bật hiển thị bệnh viện');
    }
  };

  const handleDelete = (r: HospitalRow) => {
    if (r.doctorCount > 0) {
      message.error(
        `Không thể xóa — "${r.name}" đang có ${r.doctorCount} bác sĩ liên kết. Hãy chuyển bác sĩ sang cơ sở khác trước.`,
      );
      return;
    }
    setData((prev) => prev.filter((item) => item.key !== r.key));
    message.success('Đã xóa bệnh viện');
  };

  const cols: ColumnsType<HospitalRow> = [
    {
      title: 'Tên bệnh viện', dataIndex: 'name', key: 'name', width: 200,
      render: (v: string) => <b>{v}</b>,
    },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: 300 },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone', width: 150 },
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
          <Tooltip title={r.doctorCount > 0 ? `Còn ${r.doctorCount} bác sĩ — không thể xóa` : 'Xóa bệnh viện'}>
            <Popconfirm
              title="Xóa bệnh viện này?"
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
        <h1 className={styles.pageTitle}>Quản lý bệnh viện</h1>
        <p className={styles.pageSubtitle}>
          {data.length} bệnh viện — {data.filter((r) => r.isActive).length} đang hiển thị
        </p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            prefix={<SearchOutlined style={{ color: '#6B7C99' }} />}
            placeholder="Tìm bệnh viện hoặc địa chỉ..."
            style={{ width: 280 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button
            type="primary" icon={<PlusOutlined />}
            style={{ marginLeft: 'auto', background: '#0077C8' }}
            onClick={openAdd}
          >
            Thêm bệnh viện
          </Button>
        </div>
        <Table
          dataSource={filtered}
          columns={cols}
          rowKey="key"
          pagination={{ pageSize: 10, showTotal: (t) => `${t} bệnh viện` }}
          scroll={{ x: 'max-content' }}
          size="middle"
        />
      </div>

      <Modal
        title={editing ? 'Chỉnh sửa bệnh viện' : 'Thêm bệnh viện mới'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText="Lưu" cancelText="Hủy"
        width={560}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name" label="Tên bệnh viện"
            rules={[{ required: true, message: 'Vui lòng nhập tên bệnh viện' }]}
          >
            <Input placeholder="VD: BV Chợ Rẫy" />
          </Form.Item>
          <Form.Item
            name="address" label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input placeholder="Số nhà, đường, quận, thành phố" />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input placeholder="028 xxxx xxxx" />
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái hiển thị" valuePropName="checked">
            <Switch checkedChildren="Đang hiển thị" unCheckedChildren="Tạm ẩn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hospitals;
