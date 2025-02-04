import { ConsumeItemType } from "./consume-item";

export interface ConsumeType {
  id: string;
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
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  csvFile?: string | File;
}
