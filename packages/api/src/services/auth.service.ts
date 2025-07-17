import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';
import { JWTPayload } from '../types';
import crypto from 'crypto';

const prisma = new PrismaClient();

type UserWithoutPassword = any;

export class AuthService {
  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: UserWithoutPassword; accessToken: string; refreshToken: string }> {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Ein Benutzer mit dieser E-Mail existiert bereits');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      }
    });

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.role);

    // Save refresh token
    await this.saveRefreshToken(user.id, refreshToken);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }

  static async login(email: string, password: string): Promise<{
    user: UserWithoutPassword;
    accessToken: string;
    refreshToken: string;
  }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Ungültige Anmeldedaten');
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Ungültige Anmeldedaten');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Generate tokens
    const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.role);

    // Save refresh token
    await this.saveRefreshToken(user.id, refreshToken);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }

  static async refreshTokens(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    // Find token in database
    const tokenData = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenData || tokenData.expiresAt < new Date()) {
      throw new Error('Ungültiger oder abgelaufener Refresh Token');
    }

    // Delete old refresh token
    await prisma.refreshToken.delete({
      where: { id: tokenData.id }
    });

    // Generate new tokens
    const tokens = await this.generateTokens(
      tokenData.user.id,
      tokenData.user.email,
      tokenData.user.role
    );

    // Save new refresh token
    await this.saveRefreshToken(tokenData.user.id, tokens.refreshToken);

    return tokens;
  }

  static async logout(userId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      // Delete specific refresh token
      await prisma.refreshToken.deleteMany({
        where: {
          userId,
          token: refreshToken
        }
      });
    } else {
      // Delete all refresh tokens for user (logout from all devices)
      await prisma.refreshToken.deleteMany({
        where: { userId }
      });
    }
  }

  private static async generateTokens(userId: string, email: string, role: string) {
    const payload: JWTPayload = {
      userId,
      email,
      role: role as 'TRAINER' | 'ADMIN'
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '15m'
    });

    const refreshToken = this.generateRefreshToken();

    return { accessToken, refreshToken };
  }

  private static generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  private static async saveRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt
      }
    });
  }
}