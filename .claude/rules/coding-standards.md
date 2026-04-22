---
description: Quy tắc TypeScript, đặt tên, xử lý lỗi và cấu trúc file — áp dụng cho MỌI file trong dự án.
---

# Coding Standards

## TypeScript

- Luôn dùng TypeScript. **Cấm dùng `any`** trừ trường hợp bắt buộc có comment giải thích.
- Mọi file React phải có đuôi **`.tsx`**. **Cấm tạo file `.jsx`**.
  - Lý do: TypeScript kiểm tra kiểu cho toàn bộ JSX markup, bắt lỗi tại compile-time.
- Luôn định nghĩa `interface` cho props của mọi component.
- Không dùng `type assertion` (`as`) nếu có thể tránh được.

## Async & Error Handling

- Dùng `async/await`, **không dùng** `.then().catch()`.
- **Luôn** bọc logic bất đồng bộ trong `try/catch`.
- Không để lỗi unhandled — mọi catch block phải xử lý hoặc re-throw có nghĩa.

## Đặt tên (Naming Conventions)

| Loại                | Quy tắc      | Ví dụ                  |
|---------------------|--------------|------------------------|
| Biến, hàm           | `camelCase`  | `getUserById`          |
| Component, Interface| `PascalCase` | `UserCard`, `UserProps`|
| File component      | `PascalCase` | `UserCard.tsx`         |
| File khác           | `camelCase`  | `authService.ts`       |
| Hằng số             | `UPPER_SNAKE`| `MAX_PAGE_SIZE`        |

## Hằng số & Cấu hình

- **Không hardcode** giá trị — dùng constants trong `src/data/` hoặc biến môi trường `.env`.
- Biến môi trường đặt tên `VITE_*` cho frontend, không expose secret ra client.
