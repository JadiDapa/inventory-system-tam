import { ItemType } from "./item";
import { RequestType } from "./request";

export interface RequestItemType {
  id: string;
  Request: RequestType;
  requestId: string;
  Item: ItemType;
  itemId: string;
  quantity: number;
  status?: string;
}

export interface CreateRequestItemType {
  itemId: string;
  quantity: number;
  status?: string;
}
