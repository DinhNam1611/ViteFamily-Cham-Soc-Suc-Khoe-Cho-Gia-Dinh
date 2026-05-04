import axiosInstance from '../config/axios';
import type { LoginPayload, RegisterPayload, AuthResponse, User } from '../types';

// ─── Toggle này khi backend sẵn sàng ─────────────────────────────────────────
const USE_MOCK = true;
// ─────────────────────────────────────────────────────────────────────────────

const mockDelay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

const MOCK_ACCOUNTS: Record<string, { token: string; user: User }> = {
  'test@vitafamily.vn': {
    token: 'mock-jwt-token-001',
    user: { id: 1, email: 'test@vitafamily.vn', fullName: 'Nguyễn Văn A', phone: '0901234567', role: 'user' },
  },
  'admin@vitafamily.vn': {
    token: 'mock-jwt-token-002',
    user: { id: 2, email: 'admin@vitafamily.vn', fullName: 'Quản trị viên', phone: '0901000001', role: 'admin' },
  },
  'doctor@vitafamily.vn': {
    token: 'mock-jwt-token-003',
    user: { id: 3, email: 'doctor@vitafamily.vn', fullName: 'BS. Nguyễn Văn An', phone: '0901000010', role: 'doctor' },
  },
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  if (USE_MOCK) {
    await mockDelay();
    const account = MOCK_ACCOUNTS[payload.email];
    if (account && payload.password === '123456') {
      return account;
    }
    throw new Error('Email hoặc mật khẩu không đúng');
  }
  // Real API — chỉ cần đổi USE_MOCK = false
  const res = await axiosInstance.post<{ success: boolean; data: AuthResponse }>('/auth/login', payload);
  return res.data.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  if (USE_MOCK) {
    await mockDelay();
    return {
      token: 'mock-jwt-token-002',
      user: { id: 2, email: payload.email, fullName: payload.fullName, phone: payload.phone, role: 'user' },
    };
  }
  const res = await axiosInstance.post<{ success: boolean; data: AuthResponse }>('/auth/register', payload);
  return res.data.data;
};

export const persistAuth = (res: AuthResponse): void => {
  localStorage.setItem('token', res.token);
  localStorage.setItem('user', JSON.stringify(res.user));
};

export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const restoreUser = (): User | null => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};
