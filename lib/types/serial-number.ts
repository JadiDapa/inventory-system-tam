import { ConsumeItemType } from "./consume-item";
import { EntryItemType } from "./entry-item";
import { ItemType } from "./item";

export interface SerialNumberType {
  id: string;
  number: string;
  itemId: string;
  Item: ItemType;
  status: string;
  EntryItem?: EntryItemType;
  entryItemId?: string;
  ConsumeItem?: ConsumeItemType;
  consumeItemId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSerialNumberType {
  number: string;
  itemId: string;
  status: string;
  entryItemId?: string;
  consumeItemId?: string;
}

export const SerialNumberStatus = [
  {
    label: "All Status",
    value: "all",
    color: "primary",
  },
  {
    label: "Available",
    value: "available",
    color: "green-500",
  },
  {
    label: "Used",
    value: "used",
    color: "slate-500",
  },
];
