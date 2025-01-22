import { BrandType, CreateBrandType } from "../types/brand";
import { axiosInstance } from "./axiosInstance";

export async function getAllBrands() {
  const { data } = await axiosInstance.get<BrandType[]>("/brands");
  return data;
}

export async function getBrandBySlug(slug: string) {
  const { data } = await axiosInstance.get<BrandType>("/brands/" + slug);
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

export async function updateBrand(slug: string, values: CreateBrandType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/brands/" + slug, formData, {
    headers: {
      "Content-Type": "multi /form-data",
    },
  });

  return data;
}

export async function deleteBrand(slug: string) {
  const { data } = await axiosInstance.delete("/brands/" + slug);
  return data;
}
