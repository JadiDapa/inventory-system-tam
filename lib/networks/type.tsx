import { TypeType, CreateTypeType } from "../types/type";
import { axiosInstance } from "./axiosInstance";

export async function getAllTypes() {
  const { data } = await axiosInstance.get<TypeType[]>("/types");
  return data;
}

export async function getTypeById(id: string) {
  const { data } = await axiosInstance.get<TypeType>("/types/" + id);
  return data;
}

export async function createType(values: CreateTypeType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("code", values.code);
  formData.append("detail", values.detail || "");
  formData.append("productId", values.productId);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.post("/types", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateType(id: string, values: CreateTypeType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("code", values.code);
  formData.append("detail", values.detail || "");
  formData.append("productId", values.productId);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/types/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteType(id: string) {
  const { data } = await axiosInstance.delete("/types/" + id);
  return data;
}
