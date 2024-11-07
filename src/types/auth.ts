export interface UserData {
  id: string;
  email: string;
  username: string;
  skinType?: string;
  skinTone?: string;
  productPreference?: string;
  createdAt: number;
}

export interface AuthError {
  code: string;
  message: string;
}