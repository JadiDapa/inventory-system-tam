import { EntryType, CreateEntryType } from "../types/entry";
import { axiosInstance } from "./axiosInstance";

export async function getAllEntries() {
  const { data } = await axiosInstance.get<EntryType[]>("/entries");
  return data;
}

export async function getEntryById(id: string) {
  const { data } = await axiosInstance.get<EntryType>("/entries/" + id);
  return data;
}

export async function createEntry(values: CreateEntryType) {
  const formData = new FormData();

  formData.append("reason", values.reason);
  formData.append("status", values.status);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);
  formData.append("csvFile", values.csvFile as string);

  const { data } = await axiosInstance.post("/entries", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateEntry(id: string, values: CreateEntryType) {
  const formData = new FormData();

  formData.append("reason", values.reason);
  formData.append("status", values.status);
  formData.append("detail", values.detail || "");
  formData.append("image", values.image as string);
  formData.append("csvFile", values.csvFile as string);

  const { data } = await axiosInstance.put("/entries/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteEntry(id: string) {
  const { data } = await axiosInstance.delete("/entries/" + id);
  return data;
}
