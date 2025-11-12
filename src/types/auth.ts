// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  role: "SELLER" | "USER";
  accessToken: string;
  tokenType: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
}

// 백엔드 에러 응답 형식
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export class ApiError extends Error {
  statusCode: number;
  response?: ErrorResponse;

  constructor(message: string, statusCode: number, response?: ErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}