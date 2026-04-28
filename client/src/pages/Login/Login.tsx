import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import type { LoginPayload } from '../../types';
import styles from './Login.module.css';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';
  const isRedirected = !!location.state?.from;

  const handleSubmit = async (values: LoginPayload) => {
    setLoading(true);
    try {
      await login(values);
      message.success('Đăng nhập thành công!');
      navigate(fromPath, { replace: true });
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Đăng nhập thất bại');
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

        <h1 className={styles.title}>Đăng nhập</h1>
        <p className={styles.subtitle}>
          {isRedirected
            ? 'Vui lòng đăng nhập để tiếp tục'
            : 'Chào mừng bạn trở lại VitaFamily'}
        </p>

        <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className={styles.form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="email@example.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="Nhập mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              autoComplete="current-password"
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
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.switchLink}>
          Chưa có tài khoản?{' '}
          <Link
            to="/register"
            state={isRedirected ? location.state : undefined}
            className={styles.link}
          >
            Đăng ký ngay
          </Link>
        </p>

        <div className={styles.demoHint}>
          <span className={styles.demoLabel}>Demo</span>
          test@vitafamily.vn &nbsp;/&nbsp; 123456
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
