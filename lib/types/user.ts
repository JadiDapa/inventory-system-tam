export interface UserType {
  id: string;
  username: string;
  email: string;
  emailVerified?: Date;
  password: string;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserType {
  username: string;
  email: string;
  password?: string;
  role?: string;
  image?: string | File;
}
