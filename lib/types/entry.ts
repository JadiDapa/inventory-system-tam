import { EntryItemType } from "./entry-item";

export interface EntryType {
  id: string;
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  csvFile: string | File;
  createdAt: Date;
  updatedAt: Date;
  EntryItem: EntryItemType[];
}

export interface CreateEntryType {
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  csvFile: string | File;
}
