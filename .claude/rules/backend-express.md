---
description: Quy tắc kiến trúc và viết code cho backend Node.js/Express — áp dụng cho mọi file trong thư mục server/backend.
---

# Backend Rules (Node.js + Express)

## Kiến trúc phân lớp

Tách biệt rõ ràng, **không để business logic trong route**:

```
route → controller → service → model
```

- **Route**: chỉ định nghĩa endpoint và gắn middleware.
- **Controller**: nhận request, gọi service, trả response.
- **Service**: toàn bộ business logic.
- **Model**: truy vấn database.

## Authentication Middleware

- **Mọi route đều phải qua `verifyToken`**, ngoại trừ các route auth (`/login`, `/register`).

```ts
router.get('/profile', verifyToken, getUserProfile);
router.post('/login', login); // ← không cần verifyToken
```

## Validate Input

- **Validate bằng Zod** trước khi xử lý logic — không tin tưởng dữ liệu từ client.

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const parsed = schema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ success: false, message: 'Invalid input' });
```

## Response Format Chuẩn

Mọi response phải theo đúng format sau — **không được trả về cấu trúc khác**:

```json
// Thành công
{ "success": true, "data": { ... }, "message": "..." }

// Thất bại
{ "success": false, "message": "...", "error": "..." }
```

## HTTP Status Codes

| Tình huống            | Status |
|-----------------------|--------|
| Thành công            | 200    |
| Tạo mới thành công    | 201    |
| Dữ liệu không hợp lệ | 400    |
| Chưa xác thực        | 401    |
| Không có quyền       | 403    |
| Không tìm thấy       | 404    |
| Lỗi server           | 500    |

## Error Handling

- Dùng `try/catch` trong controller và service.
- Lỗi không mong muốn phải được log và trả về 500 với message chung chung (không expose stack trace).
