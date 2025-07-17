import { Request } from 'express';
// import { User, Client } from '@prisma/client';

// Auth types
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'TRAINER' | 'ADMIN';
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Business logic types
// export type UserWithoutPassword = Omit<User, 'password'>;
// export type ClientWithTrainer = Client & {
//   trainer: UserWithoutPassword;
// };