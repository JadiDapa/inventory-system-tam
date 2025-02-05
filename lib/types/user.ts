import { RequestType } from "./request";

export interface UserType {
  id: string;
  username: string;
  email: string;
  emailVerified?: Date;
  password: string;
  role: string;
  image?: string | File;
  createdAt: Date;
  updatedAt: Date;
  Request?: RequestType[];
}

export interface CreateUserType {
  username: string;
  email: string;
  password?: string;
  role?: string;
  image?: string | File;
}

export const userRoles = [
  {
    label: "Admin",
    value: "admin",
    color: "green-500",
  },
  {
    label: "Employee",
    value: "employee",
    color: "blue-500",
  },
];
