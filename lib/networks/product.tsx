import { ProductType, CreateProductType } from "../types/product";
import { axiosInstance } from "./axiosInstance";

export async function getAllProducts() {
  const { data } = await axiosInstance.get<ProductType[]>("/products");
  return data;
}

export async function getProductById(id: string) {
  const { data } = await axiosInstance.get<ProductType>("/products/" + id);
  return data;
}

export async function createProduct(values: CreateProductType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("brandId", values.brandId);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateProduct(id: string, values: CreateProductType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("brandId", values.brandId);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/products/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteProduct(id: string) {
  const { data } = await axiosInstance.delete("/products/" + id);
  return data;
}
