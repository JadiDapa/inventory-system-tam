import { CreateConsumedItemType, ConsumedItemType } from "./consumed-item";

export interface ConsumeType {
  id: string;
  reason: string;
  status: string;
  detail: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  ConsumedItems: ConsumedItemType[];
}

export interface CreateConsumeType {
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  ConsumedItems?: CreateConsumedItemType[];
}
