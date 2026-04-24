# File Reading Strategy — Tiết kiệm Token

## Nguyên tắc cốt lõi

**Chỉ đọc file CẦN THIẾT cho task hiện tại — KHÔNG đọc toàn bộ codebase.**

Mỗi lần đọc file thừa = lãng phí token. Phải tư duy trước khi đọc.

---

## Quy trình khi nhận task "tạo chức năng mới"

### Bước 1 — Xác định phạm vi TRƯỚC KHI đọc file

Trả lời 3 câu hỏi này trước:
1. Chức năng này thuộc layer nào? (frontend / backend / cả hai)
2. Nó liên quan đến entity/model nào? (user, doctor, appointment...)
3. Nó tương tác với component/route nào đã có?

### Bước 2 — Chỉ đọc đúng các file sau

| Loại task | File được phép đọc |
|-----------|-------------------|
| Tạo component mới | File component cha (để lấy props pattern) + CSS module cùng folder |
| Thêm API route | Route file liên quan + controller tương ứng + service tương ứng |
| Thêm form | 1 form mẫu gần nhất + service của entity đó |
| Sửa UI section | File component đó + CSS module của nó |
| Tích hợp service mới | File service tương tự đã có (1 file làm mẫu) |

### Bước 3 — Dùng Grep/Glob thay vì Read khi tìm kiếm

- Dùng **Grep** để tìm pattern, function name, interface — **không Read cả file**.
- Dùng **Glob** để xác định file tồn tại — **không Read hàng loạt**.
- Chỉ **Read** khi đã biết chắc file đó chứa thông tin cần thiết.

---

## Thứ tự ưu tiên đọc file

```
1. File sẽ bị EDIT trực tiếp          ← luôn phải đọc
2. File import/export trực tiếp với nó ← đọc nếu cần biết interface
3. File cùng loại làm mẫu (1 file)    ← đọc để học pattern
4. File config / env                   ← chỉ đọc nếu cần biến môi trường
```

**DỪNG lại ở bước 4. Không đi tiếp.**

---

## Các hành động CẤM

- ❌ Đọc toàn bộ `src/` để "nắm cấu trúc"
- ❌ Đọc `package.json` khi không cần kiểm tra dependency
- ❌ Đọc mọi file trong folder chỉ để tìm một function
- ❌ Đọc lại file đã đọc trong cùng conversation
- ❌ Đọc file test/config không liên quan đến task

## Dùng Grep để tìm, không dùng Read để duyệt

```
# Tìm interface trước khi đọc file
Grep "interface AppointmentProps" src/

# Tìm nơi gọi API
Grep "appointmentService" src/

# Xác định file tồn tại
Glob "src/services/*Service.ts"
```

---

## Ví dụ áp dụng

### Task: "Tạo trang lịch sử đặt khám cho user"

**Đúng — chỉ đọc:**
- `src/pages/` (Glob để xem cấu trúc folder, KHÔNG Read từng file)
- `src/services/appointmentService.ts` (nếu đã có)
- `src/types/appointment.ts` (để biết interface)
- 1 page mẫu gần nhất (ví dụ `DoctorProfile.tsx`) làm template

**Sai — không đọc:**
- Toàn bộ `src/components/`
- `src/pages/Home.tsx`, `src/pages/Services.tsx` (không liên quan)
- `server/routes/`, `server/models/` (nếu chỉ làm frontend)
- `package.json`, `vite.config.ts`
