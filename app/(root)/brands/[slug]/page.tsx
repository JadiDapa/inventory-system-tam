"use client";

import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { deleteBrand, getBrandBySlug } from "@/lib/networks/brand";
import SelectedBrandItems from "@/components/Home/brands/SelectedBrandItems";
import DeleteDialog from "@/components/Home/DeleteDialog";
import UpdateBrandModal from "@/components/Home/brands/UpdateBrandModal";

export default function BrandDetail() {
  const { slug } = useParams();

  const { data: brand } = useQuery({
    queryFn: () => getBrandBySlug(slug as string),
    queryKey: ["brand"],
  });

  if (!brand) return null;

  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">
            Brand:{" "}
            <span className="font-semibold text-primary">{brand?.name}</span>
          </h1>
          <p className="hidden lg:inline">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci?
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <UpdateBrandModal brand={brand}>
            <div className="flex h-10 items-center gap-4 rounded-md bg-tertiary px-4 py-4 text-primary shadow-sm transition hover:bg-primary hover:text-tertiary">
              <p className="text-lg">Modify Brand</p>
              <Pencil />
            </div>
          </UpdateBrandModal>
          <DeleteDialog
            params={slug as string}
            deleteFunction={deleteBrand}
            queryKey={["brands", slug]}
          >
            <div className="grid size-10 place-items-center rounded-md bg-secondary text-tertiary">
              <Trash size={20} className="cursor-pointer" />
            </div>
          </DeleteDialog>
        </div>
      </div>
      <SelectedBrandItems brandSlug={slug as string} />
    </section>
  );
}
