import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      message.success(t('register.success'));
      navigate(fromPath, { replace: true });
    } catch (err) {
      message.error(err instanceof Error ? err.message : t('register.error_default'));
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

        <h1 className={styles.title}>{t('register.title')}</h1>
        <p className={styles.subtitle}>{t('register.subtitle')}</p>

        <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" className={styles.form}>
          <Form.Item
            name="fullName"
            label={t('register.label_name')}
            rules={[{ required: true, message: t('register.error_name') }]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder={t('register.placeholder_name')}
              autoComplete="name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: t('register.error_email_required') },
              { type: 'email', message: t('register.error_email_invalid') },
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
            label={t('register.label_phone')}
            rules={[
              { required: true, message: t('register.error_phone_required') },
              { pattern: /^[0-9]{10,11}$/, message: t('register.error_phone_invalid') },
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
            label={t('register.label_password')}
            rules={[
              { required: true, message: t('register.error_password_required') },
              { min: 6, message: t('register.error_password_min') },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder={t('register.placeholder_password')}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={t('register.label_confirm')}
            dependencies={['password']}
            rules={[
              { required: true, message: t('register.error_confirm_required') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.error_confirm_mismatch')));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder={t('register.placeholder_confirm')}
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
              {loading ? t('register.submitting') : t('register.submit')}
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.switchLink}>
          {t('register.have_account')}{' '}
          <Link
            to="/login"
            state={location.state ?? undefined}
            className={styles.link}
          >
            {t('register.login_link')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
