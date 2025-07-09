import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'pass@123';

export async function authenticateUser({ username, password }: { username: string; password: string }) {
  console.log(`Authentication attempt for username: ${username}`);
  
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    console.log('Authentication failed: Invalid credentials');
    throw new AppError('Invalid credentials', 401);
  }

  console.log('Authentication successful');
  
  // Generate JWT token
  const token = jwt.sign(
    { username: VALID_USERNAME },
    env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    message: 'hello, welcome to Joylo Powered backend',
    token,
  };
}