# VitaFamily — CLAUDE.md

Dự án DATN: Website đặt lịch khám và quản lý hồ sơ y tế.  
Mọi quy tắc chi tiết đã được tách vào `.claude/rules/` theo từng chủ đề.

---

## ⚠️ TRƯỚC KHI COMPACT CONTEXT

**Bắt buộc** tạo structured snapshot gồm 7 mục trước khi nén:

1. **Project Architecture** — tech stack, folder structure, architectural decisions
2. **Business Logic & Domain Rules** — core logic, constraints, edge cases
3. **Active Task State** — đang làm gì, đã xong gì, còn lại gì
4. **Critical Design Decisions** — trade-offs, patterns đã chọn và lý do
5. **Known Issues & Blockers** — bug chưa sửa, technical debt, blocker
6. **API Contracts & Data Schemas** — endpoint, request/response, schema changes
7. **Dependencies & Integrations** — env vars, third-party services, config

Chi tiết format snapshot: [context-compaction.md](.claude/rules/context-compaction.md)

---

## Cấu trúc thư mục Rules

Rules được tổ chức theo **sub-folder theo chủ đề** — không để tất cả file ở gốc `.claude/rules/`.

```
.claude/rules/
├── core/                  ← Quy tắc nền tảng, áp dụng mọi nơi
│   ├── coding-standards.md
│   ├── file-reading-strategy.md
│   └── context-compaction.md
├── frontend/              ← Quy tắc giao diện & React
│   ├── frontend-react.md
│   ├── ui-design-system.md
│   ├── animation-responsive.md
│   └── performance-accessibility.md
├── backend/               ← Quy tắc API & Express
│   └── backend-express.md
├── project/               ← Ngữ cảnh & spec dự án
│   ├── project-context.md
│   └── features-spec.md
├── admin.rules/           ← Testing & rules cho toàn bộ Admin panel
│   ├── admin-design-system.md
│   ├── testing-doctor-management.md
│   └── testing-customer-management.md
└── client.rules/          ← Testing & rules cho Client (bệnh nhân)
    └── (thêm vào khi cần)
```

> **Quy tắc khi tạo rule mới:** Xác định rule thuộc domain nào → đặt vào đúng sub-folder.  
> Không tạo file rule trực tiếp ở gốc `.claude/rules/` nếu đã có sub-folder phù hợp.

---

## Danh sách Rules

### Core — Áp dụng mọi task
| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [core/coding-standards.md](.claude/rules/core/coding-standards.md) | TypeScript, đặt tên, async, error handling | Viết bất kỳ file nào |
| [core/file-reading-strategy.md](.claude/rules/core/file-reading-strategy.md) | Chỉ đọc file cần thiết, tiết kiệm token | **Mọi task** |
| [core/context-compaction.md](.claude/rules/core/context-compaction.md) | Snapshot format trước khi compact | Trước mỗi lần nén context |

### Frontend
| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [frontend/frontend-react.md](.claude/rules/frontend/frontend-react.md) | Component, Ant Design, CSS Modules, services/ | Làm việc với frontend |
| [frontend/ui-design-system.md](.claude/rules/frontend/ui-design-system.md) | Màu sắc, typography, spacing, component style | Chỉnh sửa giao diện |
| [frontend/animation-responsive.md](.claude/rules/frontend/animation-responsive.md) | Scroll animation, breakpoints, mobile checklist | Tạo/sửa UI section |
| [frontend/performance-accessibility.md](.claude/rules/frontend/performance-accessibility.md) | Lighthouse, WCAG, image guidelines | Thêm ảnh, lazy load, audit |

### Backend
| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [backend/backend-express.md](.claude/rules/backend/backend-express.md) | Route, middleware, response format, architecture | Làm việc với backend |

### Project Context
| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [project/project-context.md](.claude/rules/project/project-context.md) | Tech stack, ERD, cấu trúc trang, roles | Cần hiểu ngữ cảnh dự án |
| [project/features-spec.md](.claude/rules/project/features-spec.md) | 20 chức năng chi tiết, business logic, tables | Implement hoặc review tính năng |

### Admin Rules
| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [admin.rules/admin-design-system.md](.claude/rules/admin.rules/admin-design-system.md) | Layout, màu sắc, component chuẩn cho Admin panel | Làm việc với `admin/` |
| [admin.rules/testing-customer-management.md](.claude/rules/admin.rules/testing-customer-management.md) | Bug list + test cases cho Quản lý Khách hàng & Gia đình | Fix bug hoặc implement tính năng user/family |
| [admin.rules/testing-doctor-management.md](.claude/rules/admin.rules/testing-doctor-management.md) | Bug list + test cases cho Quản lý Bác sĩ (nghiệp vụ y tế + kỹ thuật) | Fix bug hoặc implement tính năng doctor/schedule/appointment |

---

## Model Workflow — Bắt buộc tuân theo

| Loại task | Model cần dùng | Model ID |
|-----------|---------------|----------|
| **Planning** — Lên kiến trúc, đặc tả tính năng, phân tích nghiệp vụ, thiết kế database, review tổng thể | **Claude Opus 4.7** | `claude-opus-4-7` |
| **Coding** — Viết code, implement tính năng, sửa bug | **Claude Sonnet 4.6** | `claude-sonnet-4-6` |
| **Unit Test** — Viết test, kiểm thử | **Claude Sonnet 4.6** | `claude-sonnet-4-6` |

**Cách chuyển model trong Claude Code:**
- Gõ `/model` để chọn model
- Hoặc dùng `--model claude-opus-4-7` khi khởi động

> Nếu đang dùng sai model cho loại task, hãy nhắc user chuyển sang đúng model trước khi tiếp tục.

---

## Quy tắc ưu tiên cao nhất (tóm tắt nhanh)

1. **Chỉ dùng `.tsx`** — cấm tạo file `.jsx`.
2. **Xem ảnh gốc** `www.hfh.com.vn_en_home_.png` trước mỗi lần sửa UI.
3. **Ant Design** cho mọi UI component và Form — không tự viết lại.
4. **CSS Module** riêng mỗi component — cấm inline style trong TSX.
5. **Mọi section** phải có scroll-triggered animation.
6. **Kiểm tra 3 viewport** trước khi hoàn thành: 375px · 768px · 1280px.
7. **Chỉ đọc file cần thiết** — dùng Grep/Glob trước, Read sau; không đọc toàn bộ codebase khi tạo chức năng mới.
