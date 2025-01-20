import { BrandType, CreateBrandType } from "../types/brand";
import { axiosInstance } from "./axiosInstance";

export async function getAllBrands() {
  const { data } = await axiosInstance.get<BrandType[]>("/brands");
  return data;
}

export async function getBrandById(id: string) {
  const { data } = await axiosInstance.get<BrandType>("/brands/" + id);
  return data;
}

export async function createBrand(values: CreateBrandType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.post("/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateBrand(id: string, values: CreateBrandType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/brands/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteBrand(id: string) {
  const { data } = await axiosInstance.delete("/brands/" + id);
  return data;
}
