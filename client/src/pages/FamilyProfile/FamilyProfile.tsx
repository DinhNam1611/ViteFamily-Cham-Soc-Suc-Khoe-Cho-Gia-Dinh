import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Popconfirm,
  Spin,
  Empty,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  HeartOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import * as profileService from '../../services/profileService';
import type { Family, FamilyMember, FamilyMemberPayload } from '../../types';
import styles from './FamilyProfile.module.css';

interface FamilyMemberFormValues extends Omit<FamilyMemberPayload, 'dob'> {
  dob: dayjs.Dayjs;
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' },
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RELATIONSHIP_OPTIONS = [
  'Bản thân', 'Vợ/Chồng', 'Con', 'Bố', 'Mẹ',
  'Anh/Chị/Em', 'Ông/Bà', 'Khác',
];

const GENDER_COLOR: Record<string, string> = {
  male: 'blue',
  female: 'pink',
  other: 'purple',
};

const GENDER_LABEL: Record<string, string> = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
};

const calcAge = (dob: string): number => {
  return dayjs().diff(dayjs(dob), 'year');
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' } }),
};

const FamilyProfile = () => {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    profileService
      .getFamily()
      .then(setFamily)
      .catch(() => message.error('Không thể tải dữ liệu gia đình'))
      .finally(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditingMember(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (member: FamilyMember) => {
    setEditingMember(member);
    form.setFieldsValue({
      ...member,
      dob: dayjs(member.dob),
    });
    setModalOpen(true);
  };

  const handleSave = async (values: FamilyMemberFormValues) => {
    setSaving(true);
    try {
      const payload: FamilyMemberPayload = {
        ...values,
        dob: values.dob.format('YYYY-MM-DD'),
      };

      if (editingMember) {
        const updated = await profileService.updateFamilyMember(editingMember.id, payload);
        setFamily((prev) =>
          prev
            ? {
                ...prev,
                members: prev.members.map((m) => (m.id === updated.id ? updated : m)),
              }
            : prev
        );
        message.success('Cập nhật thành viên thành công!');
      } else {
        const added = await profileService.addFamilyMember(payload);
        setFamily((prev) =>
          prev ? { ...prev, members: [...prev.members, added] } : prev
        );
        message.success('Thêm thành viên thành công!');
      }
      setModalOpen(false);
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await profileService.deleteFamilyMember(id);
      setFamily((prev) =>
        prev ? { ...prev, members: prev.members.filter((m) => m.id !== id) } : prev
      );
      message.success('Đã xoá thành viên');
    } catch {
      message.error('Xoá thất bại');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loadingWrap}>
          <Spin size="large" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <TeamOutlined />
            </div>
            <div>
              <h1 className={styles.pageTitle}>Hồ sơ gia đình</h1>
              <p className={styles.pageSubtitle}>{family?.familyName}</p>
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAdd}
            className={styles.addBtn}
          >
            Thêm thành viên
          </Button>
        </motion.div>

        {/* Members grid */}
        {family?.members.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty description="Chưa có thành viên nào. Thêm thành viên đầu tiên!" />
          </div>
        ) : (
          <div className={styles.grid}>
            {family?.members.map((member, i) => (
              <motion.div
                key={member.id}
                className={styles.card}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.memberAvatar}>
                    <UserOutlined />
                  </div>
                  <div className={styles.memberMeta}>
                    <h3 className={styles.memberName}>{member.fullName}</h3>
                    <div className={styles.memberTags}>
                      <Tag color={GENDER_COLOR[member.gender]}>{GENDER_LABEL[member.gender]}</Tag>
                      <Tag color="cyan">{member.relationship}</Tag>
                    </div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.infoRow}>
                    <CalendarOutlined className={styles.infoIcon} />
                    <span>
                      {dayjs(member.dob).format('DD/MM/YYYY')}
                      <span className={styles.ageNote}> ({calcAge(member.dob)} tuổi)</span>
                    </span>
                  </div>

                  {member.bloodType && (
                    <div className={styles.infoRow}>
                      <HeartOutlined className={styles.infoIcon} />
                      <span>Nhóm máu: <strong>{member.bloodType}</strong></span>
                    </div>
                  )}

                  {member.allergy && (
                    <div className={styles.infoRow}>
                      <AlertOutlined className={styles.infoIconWarning} />
                      <span className={styles.allergyText}>Dị ứng: {member.allergy}</span>
                    </div>
                  )}

                  {member.medicalHistory && (
                    <p className={styles.medHistory}>{member.medicalHistory}</p>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => openEdit(member)}
                    className={styles.editBtn}
                  >
                    Chỉnh sửa
                  </Button>
                  <Popconfirm
                    title="Xoá thành viên này?"
                    description="Thao tác này không thể hoàn tác."
                    onConfirm={() => handleDelete(member.id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                    okButtonProps={{ danger: true }}
                  >
                    <Button icon={<DeleteOutlined />} size="small" danger>
                      Xoá
                    </Button>
                  </Popconfirm>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      <Modal
        title={editingMember ? 'Chỉnh sửa thành viên' : 'Thêm thành viên gia đình'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={540}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          size="large"
          onFinish={handleSave}
          className={styles.modalForm}
        >
          <div className={styles.formRow}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: 'Nhập họ tên' }]}
              className={styles.formItemFull}
            >
              <Input placeholder="Họ và tên đầy đủ" />
            </Form.Item>
          </div>

          <div className={styles.formGrid}>
            <Form.Item
              name="dob"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Chọn ngày sinh' }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Ngày/Tháng/Năm"
                style={{ width: '100%' }}
                disabledDate={(d) => d.isAfter(dayjs())}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: 'Chọn giới tính' }]}
            >
              <Select options={GENDER_OPTIONS} placeholder="Chọn giới tính" />
            </Form.Item>
          </div>

          <div className={styles.formGrid}>
            <Form.Item name="bloodType" label="Nhóm máu">
              <Select
                allowClear
                placeholder="Chọn nhóm máu"
                options={BLOOD_TYPES.map((b) => ({ value: b, label: b }))}
              />
            </Form.Item>

            <Form.Item
              name="relationship"
              label="Quan hệ"
              rules={[{ required: true, message: 'Chọn quan hệ' }]}
            >
              <Select
                placeholder="Quan hệ với bạn"
                options={RELATIONSHIP_OPTIONS.map((r) => ({ value: r, label: r }))}
              />
            </Form.Item>
          </div>

          <Form.Item name="allergy" label="Dị ứng (nếu có)">
            <Input placeholder="VD: Penicillin, hải sản..." />
          </Form.Item>

          <Form.Item name="medicalHistory" label="Tiền sử bệnh (nếu có)">
            <Input.TextArea rows={3} placeholder="VD: Tăng huyết áp, tiểu đường..." />
          </Form.Item>

          <div className={styles.modalFooter}>
            <Button onClick={() => setModalOpen(false)}>Huỷ</Button>
            <Button type="primary" htmlType="submit" loading={saving} className={styles.saveBtn}>
              {editingMember ? 'Lưu thay đổi' : 'Thêm thành viên'}
            </Button>
          </div>
        </Form>
      </Modal>
      </main>
      <Footer />
    </>
  );
};

export default FamilyProfile;
