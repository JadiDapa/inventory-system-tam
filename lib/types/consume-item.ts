import { ConsumeType } from "./consume";
import { ItemType } from "./item";
import { SerialNumberType } from "./serial-number";

export interface ConsumeItemType {
  id: string;
  Consume: ConsumeType;
  consumeId: string;
  Item: ItemType;
  itemId: string;
  quantity: number;
  SerialNumber: SerialNumberType[];
}

export interface CreateConsumeItemType {
  consumeId: string;
  itemId: string;
  quantity?: number;
}
