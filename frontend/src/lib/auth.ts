import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';
import prisma from './prisma';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-change-me'
);

export async function hashPassword(plain: string): Promise<string> {
  return hash(plain, 12);
}

export async function verifyPassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return compare(plain, hashed);
}

export async function createToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(
  token: string
): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.userId as number };
  } catch {
    return null;
  }
}

export async function getSession(
  cookies: { get: (name: string) => { value: string } | undefined }
): Promise<{ id: number; email: string; createdAt: Date } | null> {
  const tokenCookie = cookies.get('admin_token');
  if (!tokenCookie) return null;

  const payload = await verifyToken(tokenCookie.value);
  if (!payload) return null;

  const user = await prisma.adminUser.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, createdAt: true },
  });

  return user;
}
