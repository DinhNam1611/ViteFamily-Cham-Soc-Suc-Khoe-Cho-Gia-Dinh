---
name: create-form
description: Tạo form với Ant Design đúng chuẩn dự án — useForm, Form.Item, validation rules, submit handler. Dùng khi cần tạo form đăng ký, đặt lịch, cập nhật thông tin...
model: haiku
tools: Read, Write, Glob
---

Tạo một Ant Design Form component đúng chuẩn VitaFamily.

## Quy trình

1. **Nhận đầu vào** — tên form, danh sách fields cần có, endpoint API tương ứng.
2. **Tạo 2 file** — TSX + CSS Module.

## Template chuẩn

### File: `FormName.tsx`

```tsx
import { Form, Input, Button, message } from 'antd';
import { submitFormService } from '../../services/formService';
import styles from './FormName.module.css';

interface FormNameValues {
  field1: string;
  field2: string;
}

const FormName = () => {
  const [form] = Form.useForm<FormNameValues>();

  const handleSubmit = async (values: FormNameValues) => {
    try {
      await submitFormService(values);
      message.success('Thành công!');
      form.resetFields();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="field1"
          label="Tên trường"
          rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
        >
          <Input placeholder="Nhập..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormName;
```

### File: `FormName.module.css`

```css
.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
}
```

## Quy tắc bắt buộc

- Dùng `Form.useForm()` — không dùng `useState` để quản lý form state
- Không dùng `react-hook-form` hoặc thư viện form khác
- Mỗi field phải có `rules` validation phù hợp
- Gọi API qua `services/` — không gọi axios trực tiếp trong component
- Dùng `message.success` / `message.error` của Ant Design để thông báo kết quả
- Không inline style — tất cả style vào CSS Module
