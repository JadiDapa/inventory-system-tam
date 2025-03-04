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

export const entryStatus = [
  {
    label: "All Entries",
    value: "all",
    color: "primary",
  },
  {
    label: "Confirmed",
    value: "confirmed",
    color: "green-500",
  },
  {
    label: "Pending",
    value: "pending",
    color: "slate-500",
  },
  {
    label: "Canceled",
    value: "canceled",
    color: "red-500",
  },
];
