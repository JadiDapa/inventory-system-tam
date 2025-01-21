import { ItemType } from "./item";

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  image?: string;
  detail?: string;
  brandSlug: string;
  createdAt: Date;
  updatedAt: Date;
  Item: ItemType[];
}

export interface CreateProductType {
  name: string;
  slug: string;
  image?: string | File;
  detail?: string;
}
