import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import type { RegisterPayload } from '../../types';
import styles from './Register.module.css';

interface RegisterForm extends RegisterPayload {
  confirmPassword: string;
}

const Register = () => {
  const [form] = Form.useForm<RegisterForm>();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';

  const handleSubmit = async (values: RegisterForm) => {
    setLoading(true);
    try {
      await register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      message.success('Đăng ký thành công! Chào mừng bạn đến với VitaFamily.');
      navigate(fromPath, { replace: true });
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>V</span>
          <span className={styles.brandText}>
            Vita<strong>Family</strong>
          </span>
        </Link>

        <h1 className={styles.title}>Tạo tài khoản</h1>
        <p className={styles.subtitle}>Đăng ký để quản lý sức khỏe gia đình bạn</p>

        <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className={styles.form}>
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="Nguyễn Văn A"
              autoComplete="name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input
              prefix={<MailOutlined className={styles.inputIcon} />}
              placeholder="email@example.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ (10-11 chữ số)' },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className={styles.inputIcon} />}
              placeholder="0901 234 567"
              autoComplete="tel"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Tối thiểu 6 ký tự"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Nhập lại mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className={styles.submitBtn}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.switchLink}>
          Đã có tài khoản?{' '}
          <Link
            to="/login"
            state={location.state ?? undefined}
            className={styles.link}
          >
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
