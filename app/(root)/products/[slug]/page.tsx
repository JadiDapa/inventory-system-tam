"use client";

import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DeleteDialog from "@/components/Home/DeleteDialog";
import UpdateProductModal from "@/components/Home/products/UpdateProductModal";
import { deleteProduct, getProductBySlug } from "@/lib/networks/product";
import SelectedProductItems from "@/components/Home/products/SelectedProductItems";

export default function ProductDetail() {
  const { slug } = useParams();

  const { data: product } = useQuery({
    queryFn: () => getProductBySlug(slug as string),
    queryKey: ["products", slug],
  });

  if (!product) return null;

  return (
    <section
      id="products"
      className="min-h-screen w-full space-y-4 lg:space-y-6"
    >
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">
            Product:{" "}
            <span className="font-semibold text-primary">{product?.name}</span>
          </h1>
          <p className="hidden lg:inline">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci?
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <UpdateProductModal product={product}>
            <div className="flex h-10 items-center gap-4 rounded-md bg-tertiary px-4 py-4 text-primary shadow-sm transition hover:bg-primary hover:text-tertiary">
              <p className="text-lg">Modify Product</p>
              <Pencil />
            </div>
          </UpdateProductModal>
          <DeleteDialog
            params={slug as string}
            deleteFunction={deleteProduct}
            queryKey={["products", slug]}
          >
            <div className="grid size-10 place-items-center rounded-md bg-secondary text-tertiary">
              <Trash size={20} className="cursor-pointer" />
            </div>
          </DeleteDialog>
        </div>
      </div>
      <SelectedProductItems productSlug={slug as string} />
    </section>
  );
}
