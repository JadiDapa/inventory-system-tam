import { ProductType, CreateProductType } from "../types/product";
import { axiosInstance } from "./axiosInstance";

export async function getAllProducts() {
  const { data } = await axiosInstance.get<ProductType[]>("/products");
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data } = await axiosInstance.get<ProductType>("/products/" + slug);
  return data;
}

export async function createProduct(values: CreateProductType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateProduct(slug: string, values: CreateProductType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/products/" + slug, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteProduct(slug: string) {
  const { data } = await axiosInstance.delete("/products/" + slug);
  return data;
}
