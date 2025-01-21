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
}

export interface CreateBrandType {
  name: string;
  slug: string;
  image?: string | File;
  detail?: string;
}
