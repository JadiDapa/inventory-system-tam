import { RequestType, CreateRequestType } from "../types/request";
import { axiosInstance } from "./axiosInstance";

export async function getAllRequests() {
  const { data } = await axiosInstance.get<RequestType[]>("/requests");
  return data;
}

export async function getRequestsByUsername(username: string) {
  const { data } = await axiosInstance.get<RequestType[]>(
    "/requests/users/" + username,
  );
  return data;
}

export async function getRequestById(id: string) {
  const { data } = await axiosInstance.get<RequestType>("/requests/" + id);
  return data;
}

export async function createRequest(values: CreateRequestType) {
  const { data } = await axiosInstance.post("/requests", values);
  return data;
}

export async function updateRequest(id: string, values: CreateRequestType) {
  const { data } = await axiosInstance.put("/requests/" + id, values);

  return data;
}

export async function deleteRequest(id: string) {
  const { data } = await axiosInstance.delete("/requests/" + id);
  return data;
}
