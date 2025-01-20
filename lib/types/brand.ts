import { ProductType } from "./product";

export interface BrandType {
  id: string;
  name: string;
  slug: string;
  image?: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
  Product: ProductType[];
}

export interface CreateBrandType {
  name: string;
  slug: string;
  image?: string | File;
  detail?: string;
}
