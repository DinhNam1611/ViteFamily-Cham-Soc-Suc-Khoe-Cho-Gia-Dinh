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

## Danh sách Rules

| File | Nội dung | Áp dụng khi |
|------|----------|-------------|
| [coding-standards.md](.claude/rules/coding-standards.md) | TypeScript, đặt tên, async, error handling | Viết bất kỳ file nào |
| [frontend-react.md](.claude/rules/frontend-react.md) | Component, Ant Design, CSS Modules, services/ | Làm việc với frontend |
| [backend-express.md](.claude/rules/backend-express.md) | Route, middleware, response format, architecture | Làm việc với backend |
| [ui-design-system.md](.claude/rules/ui-design-system.md) | Màu sắc, typography, spacing, component style | Chỉnh sửa giao diện |
| [animation-responsive.md](.claude/rules/animation-responsive.md) | Scroll animation, breakpoints, mobile checklist | Tạo/sửa UI section |
| [performance-accessibility.md](.claude/rules/performance-accessibility.md) | Lighthouse, WCAG, image guidelines | Thêm ảnh, lazy load, audit |
| [project-context.md](.claude/rules/project-context.md) | Tech stack, ERD, cấu trúc trang, roles | Cần hiểu ngữ cảnh dự án |
| [context-compaction.md](.claude/rules/context-compaction.md) | Snapshot format trước khi compact | Trước mỗi lần nén context |
| [file-reading-strategy.md](.claude/rules/file-reading-strategy.md) | Chỉ đọc file cần thiết, tiết kiệm token | **Mọi task** — đặc biệt khi tạo chức năng mới |

---

## Quy tắc ưu tiên cao nhất (tóm tắt nhanh)

1. **Chỉ dùng `.tsx`** — cấm tạo file `.jsx`.
2. **Xem ảnh gốc** `www.hfh.com.vn_en_home_.png` trước mỗi lần sửa UI.
3. **Ant Design** cho mọi UI component và Form — không tự viết lại.
4. **CSS Module** riêng mỗi component — cấm inline style trong TSX.
5. **Mọi section** phải có scroll-triggered animation.
6. **Kiểm tra 3 viewport** trước khi hoàn thành: 375px · 768px · 1280px.
7. **Chỉ đọc file cần thiết** — dùng Grep/Glob trước, Read sau; không đọc toàn bộ codebase khi tạo chức năng mới.
