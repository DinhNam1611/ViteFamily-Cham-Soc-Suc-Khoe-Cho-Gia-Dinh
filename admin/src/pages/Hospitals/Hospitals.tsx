import { useState } from 'react';
import { Table, Input, Button, Switch, Space, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './Hospitals.module.css';

interface HospitalRow { key: string; name: string; address: string; phone: string; doctorCount: number; isActive: boolean; }

const mock: HospitalRow[] = [
  { key: '1', name: 'BV Chợ Rẫy', address: '201B Nguyễn Chí Thanh, Q5, TPHCM', phone: '028 3855 4137', doctorCount: 18, isActive: true },
  { key: '2', name: 'BV Nhi đồng 1', address: '341 Sư Vạn Hạnh, Q10, TPHCM', phone: '028 3927 1119', doctorCount: 12, isActive: true },
  { key: '3', name: 'BV 115', address: '527 Sư Vạn Hạnh, Q10, TPHCM', phone: '028 3865 4044', doctorCount: 9, isActive: true },
  { key: '4', name: 'BV Da liễu TPHCM', address: '2 Nguyễn Thông, Q3, TPHCM', phone: '028 3930 5220', doctorCount: 6, isActive: false },
];

const Hospitals = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HospitalRow | null>(null);
  const [form] = Form.useForm();

  const openEdit = (r: HospitalRow) => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); };
  const openAdd  = () => { setEditing(null); form.resetFields(); setModalOpen(true); };

  const cols: ColumnsType<HospitalRow> = [
    { title: 'Tên bệnh viện', dataIndex: 'name', key: 'name', width: 200, render: (v: string) => <b>{v}</b> },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: 300 },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone', width: 150 },
    { title: 'Số BS', dataIndex: 'doctorCount', key: 'doctorCount', width: 80, align: 'center' },
    { title: 'Hiển thị', dataIndex: 'isActive', key: 'isActive', width: 90, render: (v: boolean) => <Switch checked={v} size="small" /> },
    {
      title: 'Thao tác', key: 'act', width: 120, fixed: 'right' as const,
      render: (_, r) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(r)}>Sửa</Button>
          <Popconfirm title="Xóa bệnh viện?" okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>Quản lý bệnh viện</h1>
        <p className={styles.pageSubtitle}>CRUD thông tin cơ sở y tế</p>
      </div>
      <div className={styles.card}>
        <div className={styles.toolbar}>
          <Input prefix={<SearchOutlined style={{ color: '#6B7C99' }} />} placeholder="Tìm bệnh viện..." style={{ width: 260 }} />
          <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 'auto', background: '#0077C8' }} onClick={openAdd}>Thêm bệnh viện</Button>
        </div>
        <Table dataSource={mock} columns={cols} pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} size="middle" />
      </div>
      <Modal title={editing ? 'Chỉnh sửa bệnh viện' : 'Thêm bệnh viện mới'} open={modalOpen}
        onOk={() => { form.submit(); setModalOpen(false); }} onCancel={() => setModalOpen(false)}
        okText="Lưu" cancelText="Hủy" width={560}>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Tên bệnh viện" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="phone" label="Số điện thoại"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hospitals;
