// src/types/auth.types.ts
import { User } from 'firebase/auth';

export interface AuthUser extends User {
  // Add any additional user properties here
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}