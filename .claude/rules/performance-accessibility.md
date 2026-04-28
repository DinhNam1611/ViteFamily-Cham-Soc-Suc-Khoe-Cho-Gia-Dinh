---
description: Mục tiêu hiệu năng, tiêu chuẩn accessibility và hướng dẫn hình ảnh — áp dụng khi thêm image, lazy load hoặc kiểm tra UI trước khi commit.
---

# Performance & Accessibility

## Mục tiêu hiệu năng (Performance Goals)

| Chỉ số     | Mục tiêu                              |
|------------|---------------------------------------|
| Lighthouse | ≥ 90 trên tất cả danh mục            |
| LCP        | < 2.5s                                |
| CLS        | < 0.1                                 |
| Hình ảnh   | Dùng component Image tối ưu của framework |
| Lazy load  | Bắt buộc cho tất cả section dưới fold |

## Accessibility (WCAG 2.1 AA)

- Tất cả phần tử tương tác phải **điều hướng được bằng bàn phím**.
- Contrast ratio **≥ 4.5:1** cho văn bản thường, ≥ 3:1 cho text lớn.
- Dùng HTML ngữ nghĩa: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`.
- Nút chỉ có icon **phải có `aria-label`** mô tả hành động.
- Ảnh phải có thuộc tính `alt` mô tả rõ ràng — không để `alt=""` trừ ảnh trang trí thuần túy.

## Hình ảnh (Image Guidelines)

- Sử dụng ảnh y tế chất lượng cao (bác sĩ, cơ sở vật chất, bệnh nhân).
- Ưu tiên ảnh sáng, thoáng với tông màu xanh/trắng — phù hợp brand VitaFamily.
- **Kích thước chuẩn:**
  - Ảnh Hero: tối thiểu 1440×600px.
  - Thumbnail card: tỷ lệ 16:9.
- Luôn dùng component Image tối ưu (lazy load, responsive srcset tự động).
- Không nhúng ảnh lớn chưa nén vào repo — dùng Cloudinary để lưu trữ.
