import { ConsumeType, CreateConsumeType } from "../types/consume";
import { axiosInstance } from "./axiosInstance";

export async function getAllConsumes() {
  const { data } = await axiosInstance.get<ConsumeType[]>("/consumes");
  return data;
}

export async function getConsumeById(id: string) {
  const { data } = await axiosInstance.get<ConsumeType>("/consumes/" + id);
  return data;
}

export async function createConsume(values: CreateConsumeType) {
  const formData = new FormData();

  formData.append("reason", values.reason);
  formData.append("status", values.status);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);
  formData.append("consumedItems", JSON.stringify(values.ConsumedItems));

  const { data } = await axiosInstance.post("/consumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateConsume(id: string, values: CreateConsumeType) {
  const formData = new FormData();

  formData.append("reason", values.reason);
  formData.append("status", values.status);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/consumes/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteConsume(id: string) {
  const { data } = await axiosInstance.delete("/consumes/" + id);
  return data;
}
