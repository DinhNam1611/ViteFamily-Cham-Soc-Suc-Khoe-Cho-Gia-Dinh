# Frontend Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix role-based route protection and add booking form validation/confirmation on the client app.

**Architecture:** Layer 1 extends `ProtectedRoute` with an optional `requiredRole` prop and adds a `/403` page. Layer 3 adds a date picker with disabled-past logic, minimum-length reason validation, and a pre-submit confirmation modal to `AppointmentBooking`.

**Tech Stack:** React 18, TypeScript, React Router DOM v6, Ant Design 5, Framer Motion, Dayjs

---

## Scope Note

After reading all 8 admin pages, they already have correct `useState`, `Switch onChange`, `Popconfirm onConfirm`, and `form.validateFields()` patterns. **Layer 2 (admin pages) requires no changes.** Only 4 files need to be touched.

---

## Files

| Action | Path |
|--------|------|
| Edit | `client/src/components/ProtectedRoute.tsx` |
| Create | `client/src/pages/Forbidden/Forbidden.tsx` |
| Edit | `client/src/App.tsx` |
| Edit | `client/src/pages/Contact/AppointmentBooking.tsx` |

---

## Task 1: Extend ProtectedRoute with role guard

**Files:**
- Modify: `client/src/components/ProtectedRoute.tsx`

Current code only checks `isAuthenticated`. Need to also check `user.role` against an optional `requiredRole` prop.

- [ ] **Step 1: Edit ProtectedRoute.tsx**

Replace entire file content with:

```tsx
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'doctor' | 'admin';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd client && npx tsc --noEmit`
Expected: no errors related to `ProtectedRoute`

- [ ] **Step 3: Commit**

```bash
git add client/src/components/ProtectedRoute.tsx
git commit -m "feat: add requiredRole guard to ProtectedRoute"
```

---

## Task 2: Create Forbidden (403) page

**Files:**
- Create: `client/src/pages/Forbidden/Forbidden.tsx`

Use Ant Design `Result` component — no custom CSS needed.

- [ ] **Step 1: Create the file**

```tsx
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/pages/Forbidden/Forbidden.tsx
git commit -m "feat: add 403 Forbidden page"
```

---

## Task 3: Update App.tsx with role guards and /403 route

**Files:**
- Modify: `client/src/App.tsx`

Add `Forbidden` import, `/403` route, and `requiredRole` prop to the doctor portal route.

- [ ] **Step 1: Add Forbidden import**

In `client/src/App.tsx`, add after the last import line:

```tsx
import Forbidden from './pages/Forbidden/Forbidden';
```

- [ ] **Step 2: Add /403 route**

Inside `<Routes>`, add after the `/register` route and before the contact routes:

```tsx
{/* 403 Forbidden */}
<Route path="/403" element={<Forbidden />} />
```

- [ ] **Step 3: Add requiredRole to doctor portal route**

Find:
```tsx
<Route
  path="/doctor"
  element={
    <ProtectedRoute>
      <DoctorPortal />
    </ProtectedRoute>
  }
/>
```

Replace with:
```tsx
<Route
  path="/doctor"
  element={
    <ProtectedRoute requiredRole="doctor">
      <DoctorPortal />
    </ProtectedRoute>
  }
/>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd client && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add client/src/App.tsx
git commit -m "feat: add /403 route and role guard for doctor portal"
```

---

## Task 4: Add date picker, reason validation, and confirm modal to AppointmentBooking

**Files:**
- Modify: `client/src/pages/Contact/AppointmentBooking.tsx`

Three additions to the existing form:
1. A `DatePicker` field with `disabledDate` blocking past dates
2. Make `symptoms` field required with minimum 10 characters
3. A confirm `Modal` that shows a summary before submitting

- [ ] **Step 1: Add dayjs and DatePicker imports**

At the top of `AppointmentBooking.tsx`, update the imports block:

```tsx
import { useState } from 'react';
import { Form, Input, Select, Button, message, DatePicker, Modal } from 'antd';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import {
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import styles from './AppointmentBooking.module.css';
```

- [ ] **Step 2: Add confirmOpen state and confirmData type**

Inside the `AppointmentBooking` component, after `const [loading, setLoading] = useState(false);`, add:

```tsx
const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmData, setConfirmData] = useState<Record<string, unknown> | null>(null);
```

- [ ] **Step 3: Replace handleSubmit with two-step flow**

Replace the existing `handleSubmit` function:

```tsx
const handleOpenConfirm = (values: Record<string, unknown>) => {
  setConfirmData(values);
  setConfirmOpen(true);
};

const handleConfirmSubmit = async () => {
  setConfirmOpen(false);
  setLoading(true);
  try {
    await new Promise((r) => setTimeout(r, 1200));
    message.success('Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.');
    form.resetFields();
    setConfirmData(null);
  } finally {
    setLoading(false);
  }
};
```

- [ ] **Step 4: Update Form onFinish prop**

Find:
```tsx
onFinish={handleSubmit}
```

Replace with:
```tsx
onFinish={handleOpenConfirm}
```

- [ ] **Step 5: Add date field to the form**

Find the second `<div className={styles.formRow}>` block (the one containing `phone` and `hospital`). Add a new `<div className={styles.formRow}>` after it:

```tsx
<div className={styles.formRow}>
  <Form.Item
    name="appointmentDate"
    label="Ngày khám mong muốn"
    rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
    className={styles.formItem}
  >
    <DatePicker
      style={{ width: '100%' }}
      format="DD/MM/YYYY"
      placeholder="Chọn ngày khám"
      disabledDate={(current: Dayjs) => current && current < dayjs().startOf('day')}
    />
  </Form.Item>

  <Form.Item
    name="appointmentTime"
    label="Giờ khám mong muốn"
    rules={[{ required: true, message: 'Vui lòng chọn khung giờ' }]}
    className={styles.formItem}
  >
    <Select placeholder="Chọn khung giờ">
      <Option value="07:00-08:00">07:00 – 08:00</Option>
      <Option value="08:00-09:00">08:00 – 09:00</Option>
      <Option value="09:00-10:00">09:00 – 10:00</Option>
      <Option value="10:00-11:00">10:00 – 11:00</Option>
      <Option value="13:00-14:00">13:00 – 14:00</Option>
      <Option value="14:00-15:00">14:00 – 15:00</Option>
      <Option value="15:00-16:00">15:00 – 16:00</Option>
      <Option value="16:00-17:00">16:00 – 17:00</Option>
    </Select>
  </Form.Item>
</div>
```

- [ ] **Step 6: Update symptoms field to be required with min length**

Find:
```tsx
<Form.Item
  name="symptoms"
  label="Triệu chứng / Ghi chú"
>
  <TextArea
    rows={5}
    placeholder="Mô tả triệu chứng hoặc yêu cầu của bạn..."
    className={styles.textarea}
  />
</Form.Item>
```

Replace with:
```tsx
<Form.Item
  name="symptoms"
  label="Triệu chứng / Lý do khám"
  rules={[
    { required: true, message: 'Vui lòng mô tả triệu chứng hoặc lý do khám' },
    { min: 10, message: 'Vui lòng mô tả rõ hơn (tối thiểu 10 ký tự)' },
  ]}
>
  <TextArea
    rows={5}
    placeholder="Mô tả triệu chứng hoặc lý do khám (ít nhất 10 ký tự)..."
    className={styles.textarea}
  />
</Form.Item>
```

- [ ] **Step 7: Update submit button label**

Find:
```tsx
{loading ? 'Đang gửi...' : 'Đặt Lịch Ngay'}
```

Replace with:
```tsx
{loading ? 'Đang xử lý...' : 'Xem lại & Đặt Lịch'}
```

- [ ] **Step 8: Add confirm Modal before closing `</>`**

Add the following before the final `</>` closing tag (after `<Footer />`):

```tsx
<Modal
  title="Xác nhận thông tin đặt lịch"
  open={confirmOpen}
  onOk={handleConfirmSubmit}
  onCancel={() => setConfirmOpen(false)}
  okText="Xác nhận đặt lịch"
  cancelText="Sửa lại"
  width={480}
>
  {confirmData && (
    <div style={{ lineHeight: 2 }}>
      <p><b>Họ tên:</b> {confirmData.fullName as string}</p>
      <p><b>Email:</b> {confirmData.email as string}</p>
      <p><b>Số điện thoại:</b> {confirmData.phone as string}</p>
      <p><b>Cơ sở:</b> {confirmData.hospital as string}</p>
      <p><b>Hình thức:</b> {
        confirmData.appointmentType === 'tai-vien' ? 'Tại viện' :
        confirmData.appointmentType === 'tai-nha' ? 'Tại nhà' : 'Tư vấn video'
      }</p>
      <p><b>Chuyên khoa:</b> {confirmData.specialty as string}</p>
      <p><b>Ngày:</b> {confirmData.appointmentDate
        ? dayjs(confirmData.appointmentDate as Dayjs).format('DD/MM/YYYY')
        : '—'}
      </p>
      <p><b>Giờ:</b> {confirmData.appointmentTime as string}</p>
      <p><b>Lý do khám:</b> {confirmData.symptoms as string}</p>
    </div>
  )}
</Modal>
```

- [ ] **Step 9: Verify TypeScript compiles**

Run: `cd client && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 10: Commit**

```bash
git add client/src/pages/Contact/AppointmentBooking.tsx
git commit -m "feat: add date picker, reason validation, and confirm modal to AppointmentBooking"
```

---

## Final: Verify all changes together

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Manual test checklist**

- [ ] Navigate to `http://localhost:5173/403` — see 403 Result page with "Về trang chủ" button
- [ ] Log in as `test@vitafamily.vn` (role: user), navigate to `/doctor` — should redirect to `/403`
- [ ] Log in as `doctor@vitafamily.vn` (role: doctor), navigate to `/doctor` — should render DoctorPortal
- [ ] Navigate to `/contact/dat-lich-kham` while logged in — submit form without date → validation error
- [ ] Enter symptoms shorter than 10 chars → validation error "Vui lòng mô tả rõ hơn"
- [ ] Enter symptoms longer than 10 chars, select a past date — past date should be greyed out/disabled
- [ ] Fill all fields → click "Xem lại & Đặt Lịch" → confirm modal appears with correct summary
- [ ] Click "Xác nhận đặt lịch" → success message, form resets

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: frontend fixes complete — role guard, 403 page, booking validation"
```
