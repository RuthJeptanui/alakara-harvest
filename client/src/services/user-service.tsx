import axios, { type AxiosInstance } from 'axios';
import { getToken } from '../utils/auth';
import type { IUser, PaginatedUsers } from '../types/types';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData: Partial<IUser>) => {
  const response = await api.post<{ user: IUser; token: string }>('/register', userData);
  return response.data;
};

export const loginUser = async (credentials: { emailOrPhone: string; password: string }) => {
  const response = await api.post<{ user: IUser; token: string }>('/login', credentials);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.get<{ user: IUser }>('/verify-email/' + token);
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post('/resend-verification', { email });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get<{ user: IUser }>('/profile');
  return response.data.user;
};

export const updateProfile = async (userData: Partial<IUser>) => {
  const response = await api.put<{ user: IUser }>('/profile', userData);
  return response.data.user;
};

export const getAllUsers = async (page: number, limit: number) => {
  const response = await api.get<PaginatedUsers>('/users', { params: { page, limit } });
  return response.data;
};

export default api;