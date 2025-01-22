import { ItemType } from "./item";

export interface BrandType {
  id: string;
  name: string;
  slug: string;
  image?: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
  Item: ItemType[];
  _count: { Item: number };
}

export interface CreateBrandType {
  name: string;
  slug: string;
  image?: string | File;
  detail?: string;
}
