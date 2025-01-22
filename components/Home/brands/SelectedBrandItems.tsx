"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getItemsByBrand } from "@/lib/networks/item";
import Image from "next/image";
import { ItemType } from "../../../lib/types/item";
import { useQuery } from "@tanstack/react-query";
import { Boxes, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SelectedBrandItemsProps {
  brandSlug: string;
}

interface TransformedData {
  productName: string;
  productImage?: string;
  items: {
    name: string;
    code: string;
    quantity: string;
  }[];
}

export default function SelectedBrandItems({
  brandSlug,
}: SelectedBrandItemsProps) {
  const { data: items } = useQuery({
    queryFn: () => getItemsByBrand(brandSlug as string),
    queryKey: ["items"],
  });

  function transformItemsArrayToProduct(items: ItemType[]): TransformedData[] {
    const groupedData: Record<string, TransformedData> = {};

    items.forEach((item) => {
      const productName = item.Product.name;
      if (!groupedData[productName]) {
        groupedData[productName] = {
          productName,
          productImage: item.Product.image,
          items: [],
        };
      }

      groupedData[productName].items.push({
        name: item.name,
        code: item.code,
        quantity: item.quantity || "0",
      });
    });

    return Object.values(groupedData);
  }

  if (!items) return null;

  const products = transformItemsArrayToProduct(items);

  return (
    <div className="space-y-6 rounded-xl bg-tertiary p-6">
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
        <div className="relative w-full bg-tertiary">
          <Search
            size={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
          />

          <Input
            className="h-10 w-full ps-12"
            placeholder="Search Brand Name Here..."
          />
        </div>

        <Select>
          <SelectTrigger className="h-10 w-full bg-tertiary lg:w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-[2] space-y-3">
        <Accordion type="single" collapsible className="w-full">
          {products?.map((product) => (
            <AccordionItem
              key={product.productName}
              value={product.productName}
            >
              <AccordionTrigger>
                <div className="flex items-center gap-6">
                  <figure className="relative size-28 overflow-hidden rounded-xl border-2">
                    <Image
                      src={
                        product.productImage || "/images/logo-placeholder.jpg"
                      }
                      alt="Trafo Image"
                      fill
                      className="object-cover object-center"
                    />
                  </figure>
                  <div className="space-y-3 text-start">
                    <p className="text-xl font-semibold">
                      {product.productName}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Boxes className="size-6 text-muted-foreground" />
                      <span className="hidden text-sm font-medium lg:inline">
                        Product Types
                      </span>
                      <Badge variant={"default"} className="hidden lg:block">
                        {product.items.length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="divide-y border-t py-1">
                <div className="flex items-center py-2">
                  <p className="flex-[2] font-semibold">Product Type</p>
                  <p className="flex-[2] font-semibold">Code/SN</p>
                  <p className="flex-[1] font-semibold">Quantity</p>
                </div>
                {product.items.map((item) => (
                  <div key={item.name} className="flex items-center py-2">
                    <p className="flex-[2] text-base">{item.name}</p>
                    <p className="flex-[2] text-base">{item.code}</p>
                    <p className="flex-[1] text-lg font-semibold text-primary">
                      {item.quantity}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
