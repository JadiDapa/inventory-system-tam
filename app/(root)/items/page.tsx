"use client";

import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/lib/networks/item";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import { itemColumn } from "@/lib/columns/item-column";
import ItemTable from "@/components/Home/items/ItemTable";
import Link from "next/link";

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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <LayoutSwitch />
            <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
              <p className="text-lg">Export</p>
              <Download />
            </Button>
            <Link href="/items/create">
              <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
                <Plus size={24} />
              </div>
            </Link>
          </div>
        </div>

        {/* Data Statistic */}

        {/* <div className="box-shadow flex flex-col divide-y rounded-md bg-white py-6 lg:flex-row lg:divide-x lg:divide-y-0">
          {productsCard.map((list) => (
            <ConnectedCard
              key={list.title}
              title={list.title}
              value={list.value!}
              detail={list.detail}
              Icon={list.Icon}
              bgColor={list.bgColor}
              textColor={list.textColor}
            />
          ))}
        </div> */}

        <ItemTable columns={itemColumn} data={items} />
      </section>
    );
  }
}
