import { axiosInstance } from "./axiosInstance";
import { CreateUserType, UserType } from "../types/user";

export async function getAllUsers() {
  const { data } = await axiosInstance.get<UserType[]>("/users");
  return data;
}

export async function getUserById(id: string) {
  const { data } = await axiosInstance.get<UserType>("/users/" + id);
  return data;
}

export async function createUser(values: CreateUserType) {
  const { data } = await axiosInstance.post("/users", values);
  return data;
}

export async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete("/users/" + id);
  return data;
}
