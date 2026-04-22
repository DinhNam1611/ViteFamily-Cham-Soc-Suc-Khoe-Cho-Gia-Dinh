---
description: Quy tắc viết React component, dùng Ant Design, CSS Modules và kiến trúc frontend — áp dụng cho mọi file trong src/ frontend.
---

# Frontend Rules (React + TSX)

## Cấu trúc Component

- Mỗi component **1 file riêng** — không gộp nhiều component không liên quan vào cùng file.
- Luôn định nghĩa `interface` cho props trước khi dùng:

```tsx
interface UserCardProps {
  name: string;
  role: 'user' | 'doctor' | 'admin';
}

const UserCard = ({ name, role }: UserCardProps) => { ... };
```

## Ant Design — UI Components

- **Dùng Ant Design components**, không tự viết lại UI có sẵn (`Button`, `Table`, `Modal`, `Select`, `DatePicker`...).
- **Form** phải dùng Ant Design: `Form`, `Form.Item`, `useForm` — không dùng thư viện form khác.

```tsx
const [form] = Form.useForm();

<Form form={form} onFinish={handleSubmit}>
  <Form.Item name="email" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
</Form>
```

## CSS Modules — Styling

- **Cấm inline style** và **cấm viết CSS trong file `.tsx`**.
- Mỗi component phải có file CSS Module riêng:
  - Component: `Login.tsx` → Style: `Login.module.css`
- Import và dùng:

```tsx
import styles from './Login.module.css';
<div className={styles.container}>...</div>
```

## Gọi API

- **Không gọi API trực tiếp trong component** — tất cả phải đi qua `services/`.
- Cấu trúc: `component → custom hook → service → axios`

```
src/
  services/
    authService.ts      ← gọi API
  hooks/
    useAuth.ts          ← custom hook dùng service
  components/
    LoginForm.tsx       ← dùng hook
```

## Custom Hooks

- Tái sử dụng logic bằng custom hooks (`use` prefix).
- Không lặp lại cùng một logic fetch/state trong nhiều component.

## Cấu trúc thư mục

```
src/
  components/           ← shared components
  components/sections/  ← page sections
  components/ui/        ← UI primitives
  pages/                ← page components
  services/             ← API calls
  hooks/                ← custom hooks
  types/                ← TypeScript interfaces
  data/                 ← constants, static data
```
