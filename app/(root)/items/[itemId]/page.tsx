"use client";

import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { deleteProduct } from "@/lib/networks/product";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getItemById } from "@/lib/networks/item";
import ItemSerialNumbers from "@/components/Home/items/ItemSerialNumbers";

export default function ItemDetail() {
  const { itemId } = useParams();

  const { data: item } = useQuery({
    queryFn: () => getItemById(itemId as string),
    queryKey: ["items", itemId],
  });

  if (!item) return null;

  return (
    <section
      id="products"
      className="min-h-screen w-full space-y-4 lg:space-y-6"
    >
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">
            Product:{" "}
            <span className="font-semibold text-primary">{item?.name}</span>
          </h1>
          <p className="hidden lg:inline">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci?
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <Link href={`/items/update/${itemId}`}>
            <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
              <p className="text-lg">Modify Item</p>
              <Pencil />
            </Button>
          </Link>
          <DeleteDialog
            params={itemId as string}
            deleteFunction={deleteProduct}
            queryKey={["items", itemId]}
          >
            <div className="grid size-10 place-items-center rounded-md bg-secondary text-tertiary">
              <Trash size={20} className="cursor-pointer" />
            </div>
          </DeleteDialog>
        </div>
      </div>
      <ItemSerialNumbers itemId={itemId as string} />
    </section>
  );
}
