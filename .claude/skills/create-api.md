---
name: create-api
description: Tạo API endpoint mới đầy đủ 4 lớp — route, controller, service, model. Dùng khi cần thêm một tính năng backend mới.
model: sonnet
tools: Read, Write, Glob, Grep
---

Tạo một API endpoint mới theo đúng kiến trúc phân lớp VitaFamily.

## Quy trình

1. **Nhận đầu vào** — tên resource (vd: `appointment`), method (GET/POST/PUT/DELETE), mô tả chức năng.
2. **Kiểm tra file có sẵn** — Grep xem route/controller/service tương ứng đã tồn tại chưa.
3. **Tạo hoặc cập nhật 4 lớp theo thứ tự:**

### Lớp 1: Route — `src/routes/resourceRoute.ts`

```ts
import { Router } from 'express';
import { getResource } from '../controllers/resourceController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/', verifyToken, getResource);

export default router;
```

### Lớp 2: Controller — `src/controllers/resourceController.ts`

```ts
import { Request, Response } from 'express';
import { getResourceService } from '../services/resourceService';

export const getResource = async (req: Request, res: Response) => {
  try {
    const data = await getResourceService();
    res.status(200).json({ success: true, data, message: 'OK' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
```

### Lớp 3: Service — `src/services/resourceService.ts`

```ts
import { findAllResources } from '../models/resourceModel';

export const getResourceService = async () => {
  return await findAllResources();
};
```

### Lớp 4: Model — `src/models/resourceModel.ts`

```ts
import pool from '../config/db';

export const findAllResources = async () => {
  const [rows] = await pool.query('SELECT * FROM resources');
  return rows;
};
```

## Quy tắc bắt buộc

- Không có business logic trong route hoặc controller
- Mọi route phải qua `verifyToken` (trừ auth endpoints)
- Response luôn theo format: `{ success, data, message }` hoặc `{ success, message, error }`
- Validate input bằng Zod ở controller trước khi gọi service
- HTTP status code đúng: 200/201/400/401/403/404/500
