import { ConsumeItemType } from "./consume-item";

export interface ConsumeType {
  id: string;
  number: string;
  destination: string;
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  csvFile?: string | File;
  createdAt: Date;
  updatedAt: Date;
  ConsumeItem: ConsumeItemType[];
}

export interface CreateConsumeType {
  number: string;
  destination: string;
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  csvFile?: string | File;
}
