---
description: Quy tắc animation khi scroll và responsive layout — áp dụng khi tạo hoặc sửa bất kỳ section/component giao diện nào.
---

# Animation & Responsive

## Animation khi Scroll

**Mọi section phải có** scroll-triggered animation — không được bỏ qua.

### Các pattern được phép

| Pattern            | Mô tả                        | Dùng khi                      |
|--------------------|------------------------------|-------------------------------|
| `fadeInUp`         | Element trượt lên + fade in  | Mặc định cho hầu hết section  |
| `fadeInLeft/Right` | Trượt ngang + fade in        | Layout 2 cột                  |
| `staggerChildren`  | Các item xuất hiện lần lượt  | Card grid, danh sách          |
| `scaleIn`          | Phóng to từ nhỏ + fade in    | Số liệu thống kê, icon lớn    |

### Timing

- **Duration:** 0.5s – 0.8s. Không vượt quá 1s.
- **Easing:** `easeOut`.
- Dùng `viewport={{ once: true }}` — chỉ chạy animation một lần khi scroll đến.

### Cấm

- Animation lặp vô hạn (`repeat: Infinity`).
- Hiệu ứng xoay / flip gây mất tập trung.
- Delay quá 0.3s cho element đầu tiên trong section.

---

## Responsive — Mobile First

### Breakpoints

| Thiết bị | Kích thước     |
|----------|----------------|
| Mobile   | < 640px        |
| Tablet   | 640px – 1024px |
| Desktop  | > 1024px       |

Toàn bộ layout theo hướng **mobile-first** — viết style cho mobile trước, mở rộng dần lên desktop.

### Checklist trước khi hoàn thành component

Kiểm tra ở đủ 3 viewport: **375px · 768px · 1280px**

- [ ] Không có layout bị vỡ hoặc overflow ngang.
- [ ] Text không bị tràn hoặc cắt.
- [ ] Ảnh không bị méo, đúng tỷ lệ.
- [ ] Navigation: hamburger menu trên mobile, full nav trên desktop.
- [ ] Touch targets tối thiểu **44×44px** trên mobile.
- [ ] Font size tối thiểu **14px** — không dùng cỡ chữ nhỏ hơn cho nội dung chính.
