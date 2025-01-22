"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateItemType } from "@/lib/types/item";
import { createItem } from "@/lib/networks/item";
import { TailSpin } from "react-loader-spinner";
import { getAllBrands } from "@/lib/networks/brand";
import { getAllProducts } from "@/lib/networks/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CreateBrandModal from "@/components/Home/brands/CreateBrandModal";
import CreateProductModal from "@/components/Home/products/CreateProductModal";

const itemSchema = z.object({
  name: z.string().min(1, "Item Name is required"),
  code: z.string().min(1, "Item Code/SK is required"),
  productSlug: z.string().min(1, "Item's Product is required"),
  brandSlug: z.string().min(1, "Item's Brand is required"),
  detail: z.string().optional(),
});

export default function CreateItems() {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: brands } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["brands"],
  });

  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
  });

  const { mutate: onCreateBrand, isPending } = useMutation({
    mutationFn: (values: CreateItemType) => createItem(values),
    onSuccess: () => {
      toast.success("Data Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      router.push("/items");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setPicture(picture);
    setPictureUrl(URL.createObjectURL(picture!));
  }

  function removePicture() {
    setPicture(undefined);
    setPictureUrl(undefined);
  }

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      code: "",
      productSlug: "",
      brandSlug: "",
      detail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    if (!picture) {
      toast.error("Foto Peserta harus diinput");
      return;
    }

    onCreateBrand({
      image: picture,
      ...values,
    });
  }
  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex gap-1 text-2xl capitalize">
        <span className="text-gray-400">Items / </span>
        <span>Create</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <header className="items-center justify-between lg:flex">
            <div className="">
              <h1 className="text-2xl font-medium">Create a New Items</h1>
              <p className="mt-1 text-gray-400">Create a New Items to Store</p>
            </div>
            <div className="mt-6 flex justify-end gap-4 lg:mt-0 lg:justify-start">
              <Button variant="default" type="submit" className="gap-2">
                <Plus />
                Submit
              </Button>
            </div>
          </header>
          <div className="flex flex-col flex-wrap gap-6 lg:flex-row">
            <div className="flex w-full flex-col gap-6 lg:flex-row">
              <div className="grid w-full grid-cols-1 flex-col flex-wrap gap-6 rounded-md bg-tertiary p-6 shadow-md lg:grid-cols-2 lg:flex-row">
                <h2 className="text-xl font-medium lg:col-span-2">
                  Item Details
                </h2>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Item Name / Type</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Item Code / SK</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandSlug"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>{"Item's Brand"}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Item's Brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands?.map((brand) => (
                            <SelectItem key={brand.id} value={brand.slug}>
                              {brand.name}
                            </SelectItem>
                          ))}
                          <CreateBrandModal>
                            <div className="flex items-center gap-2 py-1.5 pl-2 pr-8 text-sm">
                              <p>Create New Brand</p>
                              <Plus className="size-4" />
                            </div>
                          </CreateBrandModal>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productSlug"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>{"Item's Product"}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Item's Product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products?.map((product) => (
                            <SelectItem key={product.id} value={product.slug}>
                              {product.name}
                            </SelectItem>
                          ))}
                          <CreateProductModal>
                            <div className="flex items-center gap-2 py-1.5 pl-2 pr-8 text-sm">
                              <p>Create New Product</p>
                              <Plus className="size-4" />
                            </div>
                          </CreateProductModal>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-6 lg:col-span-2">
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem className="h-96 lg:h-80">
                        <FormLabel>Detail</FormLabel>
                        <FormControl className="h-64">
                          <Textarea placeholder="ex: John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2 rounded-lg bg-tertiary p-6 shadow-md">
                <h2 className="font-medium">{"Item's Picture"}</h2>

                <div className="flex flex-col gap-6 lg:flex-row">
                  {pictureUrl ? (
                    <div className="relative flex h-80 w-full flex-col rounded-md border-[3px] border-dashed lg:size-80">
                      <div className="relative h-5/6 w-full items-center justify-center">
                        {pictureUrl && (
                          <Image
                            fill
                            src={pictureUrl}
                            className="border-2 border-double object-contain object-center p-1"
                            alt={pictureUrl}
                          />
                        )}
                      </div>
                      <div
                        onClick={removePicture}
                        className="flex w-full cursor-pointer items-center justify-end gap-2 p-2 text-red-400"
                      >
                        <XCircle size={18} />
                        <span className="text-lg font-medium">Remove File</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed lg:size-80">
                      <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Plus size={28} strokeWidth={1.75} />
                      </div>
                      <div className="mt-8 flex flex-col items-center gap-2 text-center">
                        <Button
                          type="button"
                          className="max-w-fit bg-sky-100 text-primary"
                        >
                          Upload Image
                          <FormLabel className="absolute left-0 top-0 h-full w-full border opacity-0">
                            {"'"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="absolute left-0 top-0 opacity-0"
                              type="file"
                              accept="image/*"
                              onChange={handlePicture}
                            />
                          </FormControl>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-between gap-6 rounded-md bg-tertiary p-6 shadow-md lg:flex-row">
              <Button className="w-full lg:w-1/3">
                {isPending ? (
                  <>
                    Submitting
                    <TailSpin
                      visible={true}
                      color="#ffffff"
                      ariaLabel="tail-spin-loading"
                      radius="0.2"
                      width={24}
                      height={24}
                      strokeWidth={5}
                    />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <div className="text-center lg:text-end">
                <div className="text-primary lg:text-lg">
                  Make sure the data that you input is correct
                </div>
                <small className="text-xs lg:text-sm">
                  Data could be modified later*
                </small>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
