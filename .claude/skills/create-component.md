---
name: create-component
description: Tạo React component mới đúng chuẩn dự án — file TSX + CSS Module + interface props. Dùng khi cần scaffold nhanh một component mới.
model: sonnet
tools: Read, Write, Glob
---

Tạo một React component mới theo đúng chuẩn VitaFamily.

## Quy trình

1. **Nhận đầu vào** — tên component và mô tả ngắn về chức năng.
2. **Kiểm tra trùng** — Glob trong `src/components/` xem component đó đã tồn tại chưa.
3. **Tạo 2 file:**

### File 1: `ComponentName.tsx`

```tsx
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // định nghĩa props ở đây
}

const ComponentName = ({}: ComponentNameProps) => {
  return (
    <div className={styles.container}>
      {/* nội dung */}
    </div>
  );
};

export default ComponentName;
```

### File 2: `ComponentName.module.css`

```css
.container {
  /* styles ở đây */
}
```

## Quy tắc bắt buộc

- Tên file và component: `PascalCase`
- Luôn có `interface` cho props — dù chưa có props cũng phải khai báo interface rỗng
- Không inline style trong TSX
- Không import CSS trực tiếp — chỉ dùng CSS Module
- Dùng Ant Design components nếu cần UI elements
- Đặt file vào đúng thư mục:
  - `src/components/` → shared component
  - `src/components/sections/` → page section
  - `src/pages/` → page component
