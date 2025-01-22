"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import BrandCard from "@/components/Home/brands/BrandCard";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "@/lib/networks/brand";
import Link from "next/link";

export default function BrandList() {
  const { data: brands } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["brands"],
  });

  return (
    <div className="h-full w-full space-y-4 lg:space-y-6 lg:rounded-lg lg:bg-tertiary lg:p-4 lg:shadow-md">
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {brands &&
          brands.map((brand, index) => (
            <Link key={index} href={`/brands/${brand.slug}`}>
              <BrandCard
                key={index}
                name={brand.name}
                slug={brand.slug}
                image={brand.image}
                totalItems={brand._count.Item}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
