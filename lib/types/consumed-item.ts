import { ConsumeType } from "./consume";
import { ItemType } from "./item";

export interface ConsumedItemType {
  id: string;
  itemCode: string;
  Items: ItemType;
  consumeId: string;
  Consume: ConsumeType;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConsumedItemType {
  itemCode: string;
  consumeId?: string;
  quantity: string;
}
