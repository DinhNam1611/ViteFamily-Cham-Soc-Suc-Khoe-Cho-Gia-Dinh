---
description: Hướng dẫn bắt buộc trước khi compact context — Claude phải tạo snapshot đầy đủ để không mất thông tin quan trọng.
---

# Context Compaction

## Lệnh bắt buộc trước khi compact

Trước khi nén/compact context, **bắt buộc** tạo một structured snapshot bao gồm 7 mục sau:

---

### 1. Project Architecture
- Tech stack hiện tại đang dùng (phiên bản cụ thể)
- Cấu trúc thư mục đã xác định
- Các quyết định kiến trúc đã được thống nhất

### 2. Business Logic & Domain Rules
- Logic nghiệp vụ cốt lõi đã định nghĩa
- Các ràng buộc (constraints) và edge cases đã biết
- Quy tắc phân quyền (user / doctor / admin)

### 3. Active Task State
- Task/tính năng đang làm dở
- Những gì đã hoàn thành
- Những gì còn lại chưa làm

### 4. Critical Design Decisions
- Các trade-off đã chọn và lý do
- Pattern đang áp dụng (design pattern, state management...)
- Những quyết định không được thay đổi ngược lại

### 5. Known Issues & Blockers
- Bug đã phát hiện nhưng chưa sửa
- Technical debt đã đánh dấu
- Blocker đang chờ giải quyết

### 6. API Contracts & Data Schemas
- Endpoint đã định nghĩa (method, path, request/response)
- Thay đổi schema database (migration chưa chạy)
- Interface / type đã thống nhất

### 7. Dependencies & Integrations
- Biến môi trường cần thiết (`.env`)
- Third-party service đang tích hợp
- Config đặc biệt cần lưu ý

---

## Format snapshot

Khi compact, xuất ra đầu conversation mới theo format:

```
## Context Snapshot — [ngày giờ]

### Architecture
...

### Active Task
...

### Decisions
...

### Issues
...
```
