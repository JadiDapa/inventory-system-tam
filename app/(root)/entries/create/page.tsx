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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { CreateEntryType } from "@/lib/types/entry";
import { createEntry } from "@/lib/networks/entry";
import CSVUpload from "@/components/Home/CSVUpload";
import { Textarea } from "@/components/ui/textarea";

const itemSchema = z.object({
  reason: z.string().min(1, "Item Name is required"),
  detail: z.string().optional(),
});

export default function CreateEntry() {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();

  const [csvFile, setCsvFile] = useState<File>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: onCreateEntry, isPending } = useMutation({
    mutationFn: (values: CreateEntryType) => createEntry(values),
    onSuccess: () => {
      toast.success("Data Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      router.push("/entries");
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

  function handleCsvFileUpload(file: File) {
    setCsvFile(file);
  }

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      reason: "",
      detail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    if (!csvFile) {
      toast.error("Items CSV File is required!");
      return;
    }

    onCreateEntry({
      image: picture,
      csvFile: csvFile,
      status: "pending",
      ...values,
    });
  }

  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex gap-1 text-2xl capitalize">
        <span className="text-gray-400">Entry / </span>
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
          <div className="flex gap-6">
            <div className="grid w-full flex-col flex-wrap gap-6 rounded-md bg-tertiary p-6 shadow-md lg:flex-row">
              <h2 className="text-xl font-medium">Item Details</h2>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Reason of Item&lsquo;s Entry</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>
                      Detail{" "}
                      <span className="text-sm text-primary">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32"
                        placeholder="Provide more details here if needed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 rounded-md bg-tertiary p-6 shadow-md">
              <h2 className="font-medium">{"Item's Picture"}</h2>

              <div className="flex flex-col gap-6 lg:flex-row">
                {pictureUrl ? (
                  <div className="relative flex h-72 w-full flex-col rounded-md border-[3px] border-dashed lg:size-80">
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
                  <div className="relative flex h-40 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed lg:size-72">
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
          <CSVUpload onFileUpload={handleCsvFileUpload} />
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
        </form>
      </Form>
    </section>
  );
}
