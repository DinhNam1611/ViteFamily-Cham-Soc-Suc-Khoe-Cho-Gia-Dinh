import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Avatar,
  Tabs,
  message,
  Tag,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  EditOutlined,
  SaveOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  IdcardOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import * as profileService from '../../services/profileService';
import type { UpdateProfilePayload } from '../../types';
import styles from './Profile.module.css';

const ROLE_LABEL: Record<string, { text: string; color: string }> = {
  user: { text: 'Bệnh nhân', color: 'blue' },
  doctor: { text: 'Bác sĩ', color: 'green' },
  admin: { text: 'Quản trị viên', color: 'red' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [infoForm] = Form.useForm();
  const [pwForm] = Form.useForm();
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  if (!user) return null;

  const roleConfig = ROLE_LABEL[user.role] ?? ROLE_LABEL.user;

  const handleSaveInfo = async (values: UpdateProfilePayload) => {
    setSavingInfo(true);
    try {
      const updated = await profileService.updateProfile(values);
      updateUser(updated);
      message.success('Cập nhật thông tin thành công!');
    } catch {
      message.error('Cập nhật thất bại, thử lại sau.');
    } finally {
      setSavingInfo(false);
    }
  };

  const handleChangePw = async (values: ChangePasswordForm) => {
    setSavingPw(true);
    try {
      await profileService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('Đổi mật khẩu thành công!');
      pwForm.resetFields();
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại');
    } finally {
      setSavingPw(false);
    }
  };

  const tabItems = [
    {
      key: 'info',
      label: (
        <span>
          <IdcardOutlined /> Thông tin cá nhân
        </span>
      ),
      children: (
        <Form
          form={infoForm}
          layout="vertical"
          size="large"
          initialValues={{ fullName: user.fullName, phone: user.phone }}
          onFinish={handleSaveInfo}
          className={styles.form}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              prefix={<MailOutlined />}
              value={user.email}
              disabled
              className={styles.disabledInput}
            />
            <p className={styles.fieldNote}>Email không thể thay đổi.</p>
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại">
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={savingInfo}
            icon={<SaveOutlined />}
            className={styles.saveBtn}
          >
            Lưu thay đổi
          </Button>
        </Form>
      ),
    },
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined /> Đổi mật khẩu
        </span>
      ),
      children: (
        <Form
          form={pwForm}
          layout="vertical"
          size="large"
          onFinish={handleChangePw}
          className={styles.form}
        >
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: 'Nhập mật khẩu hiện tại' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu hiện tại"
              iconRender={(v) => (v ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: 'Nhập mật khẩu mới' },
              { min: 6, message: 'Tối thiểu 6 ký tự' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
              iconRender={(v) => (v ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Nhập lại mật khẩu mới' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu mới"
              iconRender={(v) => (v ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={savingPw}
            icon={<SaveOutlined />}
            className={styles.saveBtn}
          >
            Cập nhật mật khẩu
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.page}>
      <div className={styles.container}>
        <motion.div
          className={styles.sidebar}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className={styles.avatarWrap}>
            <Avatar
              size={96}
              src={user.avatar}
              icon={!user.avatar ? <UserOutlined /> : undefined}
              className={styles.avatar}
            />
            <button className={styles.avatarEdit} aria-label="Thay đổi ảnh đại diện">
              <EditOutlined />
            </button>
          </div>

          <h2 className={styles.userName}>{user.fullName}</h2>
          <p className={styles.userEmail}>{user.email}</p>
          <Tag color={roleConfig.color} className={styles.roleTag}>
            {roleConfig.text}
          </Tag>

          <div className={styles.sideStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>3</span>
              <span className={styles.statLabel}>Thành viên gia đình</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>4</span>
              <span className={styles.statLabel}>Hồ sơ khám</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h1 className={styles.pageTitle}>Hồ sơ của tôi</h1>
          <p className={styles.pageSubtitle}>Quản lý thông tin tài khoản và bảo mật</p>

          <Tabs defaultActiveKey="info" items={tabItems} className={styles.tabs} />
        </motion.div>
      </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
