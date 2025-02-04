import { BrandType } from "./brand";
import { ConsumeItemType } from "./consume-item";
import { EntryItemType } from "./entry-item";
import { ProductType } from "./product";
import { SerialNumberType } from "./serial-number";

export interface ItemType {
  id: string;
  name: string;
  image?: string | File;
  detail?: string;
  quantity?: number;
  isSerialized?: boolean;
  productSlug: string;
  Product: ProductType;
  brandSlug: string;
  Brand: BrandType;
  createdAt: Date;
  updatedAt: Date;
  SerialNumber: SerialNumberType[];
  EntryItem: EntryItemType[];
  ConsumeItem: ConsumeItemType[];
}

export interface CreateItemType {
  name: string;
  image?: string | File;
  detail?: string;
  quantity?: number;
  isSerialized?: boolean;
  productSlug: string;
  brandSlug: string;
}
