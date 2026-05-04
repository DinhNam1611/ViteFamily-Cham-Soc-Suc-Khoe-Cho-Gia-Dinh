import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import type { LoginPayload } from '../../types';
import styles from './Login.module.css';

const Login = () => {
  const { t } = useTranslation();
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
      const user = await login(values);
      message.success(t('login.success'));

      if (user.role === 'admin') {
        window.location.href = `${import.meta.env.VITE_ADMIN_URL ?? ''}/admin`;
      } else if (user.role === 'doctor') {
        navigate('/doctor', { replace: true });
      } else {
        navigate(fromPath, { replace: true });
      }
    } catch (err) {
      message.error(err instanceof Error ? err.message : t('login.error_default'));
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

        <h1 className={styles.title}>{t('login.title')}</h1>
        <p className={styles.subtitle}>
          {isRedirected ? t('login.subtitle_redirect') : t('login.subtitle_welcome')}
        </p>

        <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className={styles.form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: t('login.error_email_required') },
              { type: 'email', message: t('login.error_email_invalid') },
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
            label={t('login.label_password')}
            rules={[{ required: true, message: t('login.error_password_required') }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder={t('login.placeholder_password')}
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
              {loading ? t('login.submitting') : t('login.submit')}
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.switchLink}>
          {t('login.no_account')}{' '}
          <Link
            to="/register"
            state={isRedirected ? location.state : undefined}
            className={styles.link}
          >
            {t('login.register_link')}
          </Link>
        </p>

        <div className={styles.demoHint}>
          <span className={styles.demoLabel}>Demo</span>
          <div>👤 test@vitafamily.vn &nbsp;/&nbsp; 123456</div>
          <div>🛡️ admin@vitafamily.vn &nbsp;/&nbsp; 123456</div>
          <div>🩺 doctor@vitafamily.vn &nbsp;/&nbsp; 123456</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
