# Frontend Fixes Design — VitaFamily
**Date:** 2026-05-15  
**Scope:** Frontend only (backend deferred)  
**Approach:** Layer-based — Core Guards → Admin Patterns → Booking Validation

---

## Layer 1 — Core Guards

### ProtectedRoute.tsx
- Add optional prop `requiredRole?: 'user' | 'doctor' | 'admin'`
- Logic:
  - No token → redirect `/login`
  - Token + wrong role → redirect `/403`
  - Token + correct role (or no requiredRole) → render children
- Source: `client/src/components/ProtectedRoute.tsx`

### Forbidden.tsx (new file)
- Path: `client/src/pages/Forbidden/Forbidden.tsx`
- Use Ant Design `Result` component with `status="403"`
- Title: "403 — Không có quyền truy cập"
- SubTitle: "Bạn không có quyền xem trang này."
- Extra: Button "Về trang chủ" → navigate `/`
- No custom CSS needed (Result component handles styling)

### App.tsx
- Wrap admin routes with `<ProtectedRoute requiredRole="admin" />`
- Wrap doctor-portal route with `<ProtectedRoute requiredRole="doctor" />`
- Add `<Route path="/403" element={<Forbidden />} />`

---

## Layer 2 — Admin Shared Patterns

Applied to 8 pages. Each page gets all 4 patterns that apply to it.

### Pattern 1 — Mock data in useState
```tsx
// Replace: const data = mockData; const filtered = data.filter(...)
// With:
const [data, setData] = useState(mockData);
const filtered = data.filter(...searchCondition);
```

### Pattern 2 — Form modal (validateFields before close)
```tsx
onOk={() => {
  form.validateFields()
    .then(values => {
      if (editingRecord) {
        setData(prev => prev.map(item =>
          item.id === editingRecord.id ? { ...item, ...values } : item
        ));
        message.success('Cập nhật thành công');
      } else {
        setData(prev => [...prev, { id: Date.now(), ...values }]);
        message.success('Thêm thành công');
      }
      setModalOpen(false);
      form.resetFields();
    })
    .catch(() => {});
}}
```

### Pattern 3 — Switch onChange (update local state)
```tsx
<Switch
  checked={record.isActive}
  onChange={(checked) => {
    setData(prev => prev.map(item =>
      item.id === record.id ? { ...item, isActive: checked } : item
    ));
    message.success(checked ? 'Đã bật hiển thị' : 'Đã tắt hiển thị');
  }}
/>
```

### Pattern 4 — Popconfirm onConfirm (remove from local state)
```tsx
<Popconfirm
  title="Xác nhận xóa?"
  description="Hành động này không thể hoàn tác."
  onConfirm={() => {
    setData(prev => prev.filter(item => item.id !== record.id));
    message.success('Đã xóa thành công');
  }}
  okText="Xóa"
  cancelText="Hủy"
>
```

### Pages & Applicable Patterns

| Page | File | useState | Form modal | Switch | Popconfirm |
|------|------|---------|-----------|--------|-----------|
| Hospitals | `admin/src/pages/Hospitals/Hospitals.tsx` | ✓ | ✓ | ✓ | ✓ |
| Specialties | `admin/src/pages/Specialties/Specialties.tsx` | ✓ | ✓ | ✓ | ✓ |
| Services | `admin/src/pages/Services/Services.tsx` | ✓ | ✓ | ✓ | ✓ |
| Reviews | `admin/src/pages/Reviews/Reviews.tsx` | ✓ | — | — | ✓ |
| Notifications | `admin/src/pages/Notifications/Notifications.tsx` | ✓ | ✓ | — | — |
| Appointments | `admin/src/pages/Appointments/Appointments.tsx` | ✓ | — | — | ✓ |
| Doctors | `admin/src/pages/Doctors/Doctors.tsx` | ✓ | ✓ | — | ✓ |
| Users | `admin/src/pages/Users/Users.tsx` | ✓ | ✓ | ✓ | ✓ |

---

## Layer 3 — Appointment Booking Validation

### File: `client/src/pages/Contact/AppointmentBooking.tsx`

### Validation Rules

**Rule 1 — Member vs Guest mutual exclusion:**
- If `memberId` selected → disable guest fields (name, phone)
- If `guestName` typed → disable member dropdown
- Submit blocked if both empty

**Rule 2 — Date must not be in the past:**
```tsx
disabledDate={(current) => current && current < dayjs().startOf('day')}
```

**Rule 3 — Cascading selection (specialty → doctor → slot):**
- Doctor Select: `disabled` until specialty chosen
- Slot Select: `disabled` until doctor + date chosen
- Submit Button: `disabled` until specialty + doctor + slot + subject all filled

**Rule 4 — Reason minimum length:**
```tsx
rules={[
  { required: true, message: 'Vui lòng nhập lý do khám' },
  { min: 10, message: 'Vui lòng mô tả rõ hơn (tối thiểu 10 ký tự)' }
]}
```

**Rule 5 — Confirm modal before submit:**
- Trigger: click "Đặt lịch"
- Modal shows summary:
  - Đối tượng khám: [tên thành viên hoặc tên khách]
  - Bác sĩ: [tên bác sĩ] — [chuyên khoa]
  - Ngày giờ: [date] lúc [slot]
  - Loại khám: [Tại viện / Tại nhà / Video]
  - Lý do: [reason]
- 2 buttons: "Sửa lại" (close modal) | "Xác nhận đặt lịch" (submit → mockDelay → success)

### Booking flow after fix:
```
1. Chọn loại khám (Tại viện / Tại nhà / Video)
2. Chọn đối tượng: Member (dropdown) HOẶC Guest (text input) — loại trừ nhau
3. Chọn chuyên khoa → Bác sĩ unlock
4. Chọn bác sĩ + ngày → Slot unlock
5. Chọn slot
6. Nhập lý do (≥ 10 ký tự)
7. Click "Đặt lịch" → Modal confirm tóm tắt
8. Click "Xác nhận" → mockDelay → message.success → reset form
```

---

## Files Changed

| # | File | Action |
|---|------|--------|
| 1 | `client/src/components/ProtectedRoute.tsx` | Edit — add requiredRole prop |
| 2 | `client/src/pages/Forbidden/Forbidden.tsx` | Create — 403 page |
| 3 | `client/src/App.tsx` | Edit — role guards + /403 route |
| 4 | `admin/src/pages/Hospitals/Hospitals.tsx` | Edit — all 4 patterns |
| 5 | `admin/src/pages/Specialties/Specialties.tsx` | Edit — all 4 patterns |
| 6 | `admin/src/pages/Services/Services.tsx` | Edit — all 4 patterns |
| 7 | `admin/src/pages/Reviews/Reviews.tsx` | Edit — useState + Popconfirm |
| 8 | `admin/src/pages/Notifications/Notifications.tsx` | Edit — useState + form modal |
| 9 | `admin/src/pages/Appointments/Appointments.tsx` | Edit — useState + Popconfirm |
| 10 | `admin/src/pages/Doctors/Doctors.tsx` | Edit — useState + form modal + Popconfirm |
| 11 | `admin/src/pages/Users/Users.tsx` | Edit — all 4 patterns |
| 12 | `client/src/pages/Contact/AppointmentBooking.tsx` | Edit — 5 validation rules |

---

## Out of Scope (Backend deferred)
- Real API calls
- Server-side validation
- Actual slot capacity check
- JWT middleware
- Payment logic
