import { CreateItemType, ItemType } from "../types/item";
import { axiosInstance } from "./axiosInstance";

export async function getAllItems() {
  const { data } = await axiosInstance.get<ItemType[]>("/items");
  return data;
}

export async function getItemById(id: string) {
  const { data } = await axiosInstance.get<ItemType>("/items/" + id);
  return data;
}

export async function getItemsByBrand(slug: string) {
  const { data } = await axiosInstance.get<ItemType[]>("/items/brand/" + slug);
  return data;
}

export async function getItemsByProduct(slug: string) {
  const { data } = await axiosInstance.get<ItemType[]>(
    "/items/product/" + slug,
  );
  return data;
}

export async function createItem(values: CreateItemType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("detail", values.detail || "");
  formData.append("productSlug", values.productSlug);
  formData.append("brandSlug", values.brandSlug);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.post("/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateItem(id: string, values: CreateItemType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("detail", values.detail || "");
  formData.append("productSlug", values.productSlug);
  formData.append("brandSlug", values.brandSlug);
  formData.append("image", values.image as string);

  const { data } = await axiosInstance.put("/items/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteItem(id: string) {
  const { data } = await axiosInstance.delete("/items/" + id);
  return data;
}
