import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import CreateProductModal from "@/components/Home/products/CreateProductModal";
import ProductList from "@/components/Home/products/ProductList";

export default function Products() {
  return (
    <section
      id="products"
      className="min-h-screen w-full space-y-4 lg:space-y-6"
    >
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Product List</h1>
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
          <CreateProductModal>
            <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
              <Plus size={24} />
            </div>
          </CreateProductModal>
        </div>
      </div>
      <ProductList />
    </section>
  );
}
