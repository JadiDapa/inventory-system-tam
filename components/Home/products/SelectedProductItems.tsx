"use client";

import { getItemsByProduct } from "@/lib/networks/item";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectedProductItemsProps {
  productSlug: string;
}

export default function SelectedProductItems({
  productSlug,
}: SelectedProductItemsProps) {
  const { data: items } = useQuery({
    queryFn: () => getItemsByProduct(productSlug as string),
    queryKey: ["items"],
  });

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
        <div className="divide-y border-t py-1">
          <div className="flex items-center py-2">
            <p className="flex-[2] font-semibold">Product Type</p>
            <p className="flex-[2] font-semibold">Code/SN</p>
            <p className="flex-[1] font-semibold">Quantity</p>
          </div>
          {items?.map((item) => (
            <div key={item.name} className="flex items-center py-2">
              <p className="flex-[2] text-base">{item.name}</p>
              <p className="flex-[2] text-base">{item.code}</p>
              <p className="flex-[1] text-lg font-semibold text-primary">
                {item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
