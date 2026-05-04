import { useState } from 'react';
import { Table, Input, Button, Switch, Space, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Specialties.module.css';

interface SpecialtyRow { key: string; name: string; description: string; doctorCount: number; isActive: boolean; }

const mock: SpecialtyRow[] = [
  { key: '1', name: 'Tim mạch', description: 'Chẩn đoán và điều trị các bệnh về tim và mạch máu', doctorCount: 12, isActive: true },
  { key: '2', name: 'Nhi khoa', description: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến 18 tuổi', doctorCount: 9, isActive: true },
  { key: '3', name: 'Thần kinh', description: 'Điều trị các bệnh về hệ thần kinh trung ương và ngoại biên', doctorCount: 7, isActive: true },
  { key: '4', name: 'Da liễu', description: 'Điều trị các bệnh về da, tóc và móng', doctorCount: 5, isActive: true },
  { key: '5', name: 'Chỉnh hình', description: 'Phẫu thuật và điều trị các bệnh cơ xương khớp', doctorCount: 8, isActive: false },
];

const Specialties = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SpecialtyRow | null>(null);
  const [form] = Form.useForm();

  const openEdit = (r: SpecialtyRow) => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); };
  const openAdd  = () => { setEditing(null); form.resetFields(); setModalOpen(true); };

  const cols: ColumnsType<SpecialtyRow> = [
    { title: 'Chuyên khoa', dataIndex: 'name', key: 'name', width: 150, render: (v: string) => <b>{v}</b> },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 320 },
    { title: 'Số BS', dataIndex: 'doctorCount', key: 'doctorCount', width: 80, align: 'center' },
    { title: 'Hiển thị', dataIndex: 'isActive', key: 'isActive', width: 90, render: (v: boolean) => <Switch checked={v} size="small" /> },
    {
      title: 'Thao tác', key: 'act', width: 120, fixed: 'right' as const,
      render: (_, r) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(r)}>Sửa</Button>
          <Popconfirm title="Xóa chuyên khoa?" okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý chuyên khoa</h1>
        <p className={styles.pageSubtitle}>CRUD danh mục chuyên khoa y tế</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input prefix={<SearchOutlined style={{ color: '#6B7C99' }} />} placeholder="Tìm chuyên khoa..." style={{ width: 260 }} />
          <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 'auto', background: '#0077C8' }} onClick={openAdd}>Thêm chuyên khoa</Button>
        </div>
        <Table dataSource={mock} columns={cols} pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} size="middle" />
      </div>
      <Modal title={editing ? 'Chỉnh sửa chuyên khoa' : 'Thêm chuyên khoa mới'} open={modalOpen}
        onOk={() => { form.submit(); setModalOpen(false); }} onCancel={() => setModalOpen(false)}
        okText="Lưu" cancelText="Hủy">
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Tên chuyên khoa" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Specialties;
