"use client";

import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Upload, XCircle } from "lucide-react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "@/lib/networks/brand";
import { CreateBrandType } from "@/lib/types/brand";

const brandSchema = z.object({
  name: z.string().min(1, "Brand Name is required"),
  detail: z.string().optional(),
});

interface CreateBrandModalProps {
  children: React.ReactNode;
}

export default function CreateBrandModal({ children }: CreateBrandModalProps) {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: onCreateBrand, isPending } = useMutation({
    mutationFn: (values: CreateBrandType) => createBrand(values),
    onSuccess: () => {
      toast.success("Data Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.refresh();
      setIsDialogOpen(false);
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

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      detail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof brandSchema>) {
    onCreateBrand({
      image: picture,
      slug: slugify(values.name, { lower: true }),
      ...values,
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add a New Brand
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap gap-12 pt-4 lg:gap-4"
            >
              <div className="flex-1 space-y-2 lg:space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description{" "}
                        <span className="text-primary">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />

                <div className="flex-1">
                  <div className="text-lg font-medium">
                    Brand Logo <span className="text-primary">(Optional)</span>
                  </div>
                  {pictureUrl ? (
                    <div className="relative flex h-[134px] w-full flex-col rounded-md border-[3px] border-dashed">
                      <div className="relative h-full w-full items-center justify-center p-1">
                        <Image
                          src={pictureUrl}
                          className="border-2 border-double object-contain object-center p-1"
                          alt=""
                          fill
                        />
                      </div>
                      <div
                        onClick={removePicture}
                        className="absolute bottom-2 right-2 flex cursor-pointer items-center justify-end gap-2 text-red-400"
                      >
                        <XCircle size={18} />
                        <span className="text-lg font-medium">Remove</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex h-[134px] w-full flex-col items-center justify-center gap-3 rounded-md border-[3px] border-dashed">
                      <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Upload size={24} strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Button
                          type="button"
                          className="max-w-fit bg-sky-100 text-primary"
                        >
                          Upload Image
                          <FormLabel className="absolute left-0 top-0 h-full w-full border opacity-0">
                            {'""'}
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

              <Button
                disabled={isPending}
                className="flex w-full items-center gap-3"
                type="submit"
              >
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
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
