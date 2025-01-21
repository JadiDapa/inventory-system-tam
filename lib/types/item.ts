import { BrandType } from "./brand";
import { ProductType } from "./product";

export interface ItemType {
  id: string;
  name: string;
  code: string;
  image?: string;
  detail?: string;
  productSlug: string;
  Product: ProductType[];
  brandSlug: string;
  Brand: BrandType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemType {
  name: string;
  code: string;
  image?: string | File;
  detail?: string;
  productSlug: string;
  brandSlug: string;
}
