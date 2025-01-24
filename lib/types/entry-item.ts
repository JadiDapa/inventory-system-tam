import { EntryType } from "perf_hooks";
import { ItemType } from "./item";

export interface EntryItemType {
  id: string;
  itemCode: string;
  Items: ItemType;
  entryId: string;
  Entry: EntryType;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntryItemType {
  itemCode: string;
  entryId?: string;
  quantity: string;
}
