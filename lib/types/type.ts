import { ProductType } from "./product";

export interface TypeType {
  id: string;
  name: string;
  code: string;
  image?: string;
  detail?: string;
  productId: string;
  Product: ProductType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTypeType {
  name: string;
  code: string;
  image?: string | File;
  detail?: string;
  productId: string;
}
