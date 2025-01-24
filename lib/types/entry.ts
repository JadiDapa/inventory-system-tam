import { CreateEntryItemType, EntryItemType } from "./entry-item";

export interface EntryType {
  id: string;
  reason: string;
  status: string;
  detail: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  EntryItems: EntryItemType[];
}

export interface CreateEntryType {
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  entryItems?: CreateEntryItemType[];
}
