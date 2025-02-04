import { EntryType } from "perf_hooks";
import { ItemType } from "./item";
import { SerialNumberType } from "./serial-number";

export interface EntryItemType {
  id: string;
  Entry: EntryType;
  entryId: string;
  Item: ItemType;
  itemId: string;
  quantity: number;
  SerialNumber: SerialNumberType[];
}

export interface CreateEntryItemType {
  entryId: string;
  itemId: string;
  quantity: number;
}
