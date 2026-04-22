---
description: Hệ thống màu sắc, typography, spacing và component style — áp dụng khi chỉnh sửa hoặc tạo mới bất kỳ giao diện nào.
---

# UI Design System

## Quy tắc bắt buộc trước khi chỉnh sửa UI

1. **Xem lại ảnh gốc** `www.hfh.com.vn_en_home_.png` trước mỗi lần sửa giao diện — không thiết kế từ trí nhớ.
2. **Sau mỗi thay đổi lớn** (section mới, layout, màu, spacing) phải so sánh trực quan với ảnh gốc.
3. Tiêu chí so sánh: cân bằng không gian · thứ tự section · tỷ lệ ảnh/text · màu sắc tổng thể.

## Bảng màu (Color Palette)

| Vai trò       | Mã màu    | Ứng dụng                        |
|---------------|-----------|---------------------------------|
| Primary Blue  | `#0077C8` | Nút CTA, tiêu đề, liên kết      |
| Light Blue    | `#E8F4FD` | Nền section, thẻ card           |
| Accent Cyan   | `#00B4D8` | Highlight, trạng thái hover     |
| White         | `#FFFFFF` | Nền chính, bề mặt card          |
| Text Dark     | `#1A2B4B` | Văn bản chính, tiêu đề          |
| Text Muted    | `#6B7C99` | Văn bản phụ, chú thích          |
| Success Green | `#28A745` | Chỉ số tích cực                 |
| Border Gray   | `#E2E8F0` | Đường phân cách, viền card      |

### Quy tắc màu sắc

- **Cấm** màu đỏ `#FF0000`, vàng neon, cam rực, tím sặc sỡ làm màu chính.
- Gradient chỉ được dùng: `#0077C8` → `#00B4D8`. Không dùng gradient nhiều màu.
- Background section xen kẽ `#FFFFFF` và `#E8F4FD` — không dùng nền tối cho section nội dung.
- Contrast ratio ≥ 4.5:1 cho văn bản thường (WCAG AA).

## Typography

| Yếu tố          | Quy định                                      |
|-----------------|-----------------------------------------------|
| Tiêu đề (h1–h3) | Font Montserrat, Bold / SemiBold              |
| Nội dung        | Font Inter, Regular 400 / Medium 500          |
| Thang cỡ chữ   | 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48px |
| Line height     | 1.6 cho nội dung — 1.2 cho tiêu đề           |
| Font tối thiểu  | **14px trên mobile** — không dùng cỡ nhỏ hơn |

## Spacing & Layout

| Quy tắc              | Giá trị                                  |
|----------------------|------------------------------------------|
| Section padding dọc  | 64px (desktop) / 40px (mobile)           |
| Container max-width  | 1280px, căn giữa, padding ngang 16–32px  |
| Card gap             | 24px hoặc 32px                           |

## Component Style

| Thuộc tính    | Quy định                                        |
|---------------|-------------------------------------------------|
| Border radius | 8px cho card — bo tròn hoàn toàn cho pill/badge |
| Shadow        | Nhẹ mặc định — đậm hơn khi hover               |
| Transition    | 200ms cho tất cả hover state                    |
| Border        | Ưu tiên shadow nhẹ thay vì viền cứng            |
