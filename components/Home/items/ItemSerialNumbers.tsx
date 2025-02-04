"use client";

import { getItemById } from "@/lib/networks/item";
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

interface ItemSerialNumbersProps {
  itemId: string;
}

export default function ItemSerialNumbers({ itemId }: ItemSerialNumbersProps) {
  const { data: item } = useQuery({
    queryFn: () => getItemById(itemId as string),
    queryKey: ["item"],
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
            <p className="flex-[2] font-semibold">Status</p>
          </div>
          {item?.SerialNumber?.map((item) => (
            <div key={item.id} className="flex items-center py-2">
              <p className="flex-[2] text-base">{item.number}</p>
              <p className="flex-[2] text-base">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
