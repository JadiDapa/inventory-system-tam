"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/lib/networks/item";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { itemColumn } from "@/lib/columns/item-column";
import Link from "next/link";
import DataTable from "@/components/Home/DataTable";
import SearchDataTable from "@/components/Home/SearchDataTable";
import ExcelExport from "@/components/Home/ExcelExport";

export default function ItemsPage() {
  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  if (items) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        {/* Header Title */}
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="">
            <h1 className="text-4xl font-medium">Items List</h1>
            <p className="hidden lg:inline">
              These are the Items that Consist in the Inventory
            </p>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <LayoutSwitch />
            <ExcelExport data={items} filename="items-list.xlsx" />

            <Link href="/items/create">
              <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
                <Plus size={24} />
              </div>
            </Link>
          </div>
        </div>

        <DataTable
          columns={itemColumn}
          data={items}
          filters={(table) => (
            <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
              <SearchDataTable
                table={table}
                column="name"
                placeholder="Search Item Type..."
              />
              <SearchDataTable
                table={table}
                column="brand"
                placeholder="Search Item Brand..."
              />
              <SearchDataTable
                table={table}
                column="product"
                placeholder="Search Item Product..."
              />
            </div>
          )}
        />
      </section>
    );
  }
}
