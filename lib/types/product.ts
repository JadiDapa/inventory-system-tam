import { BrandType } from "./brand";
import { TypeType } from "./type";

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  image?: string;
  detail?: string;
  brandId: string;
  Brand: BrandType;
  createdAt: Date;
  updatedAt: Date;
  Type: TypeType[];
}

export interface CreateProductType {
  name: string;
  slug: string;
  image?: string | File;
  brandId: string;
  detail?: string;
}
