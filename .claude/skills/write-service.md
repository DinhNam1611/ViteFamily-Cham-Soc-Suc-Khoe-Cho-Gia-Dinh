---
name: write-service
description: Tạo file service mới trong src/services/ để gọi API từ frontend. Dùng khi cần thêm các hàm gọi backend endpoint chưa có.
model: haiku
tools: Read, Write, Glob, Grep
---

Tạo hoặc cập nhật file service trong `src/services/` để frontend gọi API backend.

## Quy trình

1. **Nhận đầu vào** — tên resource, danh sách endpoints cần gọi.
2. **Kiểm tra file có sẵn** — Glob `src/services/**/*.ts` xem đã có chưa.
3. **Tạo hoặc append** vào file service tương ứng.

## Template chuẩn

### File: `src/services/resourceService.ts`

```ts
import axiosInstance from '../config/axios';

export interface ResourceData {
  id: number;
  // ... các fields
}

// GET — lấy danh sách
export const getResources = async (): Promise<ResourceData[]> => {
  const { data } = await axiosInstance.get('/resources');
  return data.data;
};

// GET — lấy chi tiết
export const getResourceById = async (id: number): Promise<ResourceData> => {
  const { data } = await axiosInstance.get(`/resources/${id}`);
  return data.data;
};

// POST — tạo mới
export const createResource = async (payload: Omit<ResourceData, 'id'>): Promise<ResourceData> => {
  const { data } = await axiosInstance.post('/resources', payload);
  return data.data;
};

// PUT — cập nhật
export const updateResource = async (id: number, payload: Partial<ResourceData>): Promise<ResourceData> => {
  const { data } = await axiosInstance.put(`/resources/${id}`, payload);
  return data.data;
};

// DELETE — xóa
export const deleteResource = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/resources/${id}`);
};
```

## Quy tắc bắt buộc

- Dùng `axiosInstance` từ `src/config/axios` — không import axios trực tiếp
- Luôn định nghĩa `interface` cho kiểu dữ liệu trả về
- Mỗi hàm chỉ làm 1 việc — không gộp logic vào chung
- Không dùng `any` cho kiểu trả về
- Tên hàm theo pattern: `getX`, `getXById`, `createX`, `updateX`, `deleteX`
