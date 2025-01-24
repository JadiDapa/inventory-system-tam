"use client";

import { Button } from "@/components/ui/button";
import { Clock, Download, FolderCheck, FolderX } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getEntryById, updateEntry } from "@/lib/networks/entry";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import EntryItemTable from "@/components/Home/entries/EntryItemTable";
import { entryItemColumn } from "@/lib/columns/entry-item-column";
import { CreateEntryType } from "@/lib/types/entry";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EntryDetail() {
  const { entryId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: entry } = useQuery({
    queryFn: () => getEntryById(entryId as string),
    queryKey: ["entries", entryId],
  });

  const { mutate: onUpdateBrand } = useMutation({
    mutationFn: (values: CreateEntryType) =>
      updateEntry(entryId as string, values),
    onSuccess: () => {
      toast.success("Item Entry Handled Successfully!");
      queryClient.invalidateQueries({ queryKey: ["entries", entryId] });
      router.push("/entries");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  async function onUpdateEntry(status: string) {
    onUpdateBrand({
      reason: entry!.reason,
      status: status,
      detail: entry!.detail,
      image: entry!.image,
    });
  }

  if (!entry) return null;

  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-medium">{"Item's Entry"}</h1>
          <p className="text-xl font-medium uppercase text-primary">
            #{entry?.id}
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <Button
            onClick={() => onUpdateEntry("confirmed")}
            className="h-10 items-center gap-4 bg-green-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-green-500"
          >
            <p className="text-lg">Confirm Entry</p>
            <FolderCheck />
          </Button>
          <Button
            onClick={() => onUpdateEntry("canceled")}
            className="h-10 items-center gap-4 bg-red-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-red-500"
          >
            <p className="text-lg">Cancel Entry</p>
            <FolderX />
          </Button>
          <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
            <p className="text-lg">Print Document</p>
            <Download />
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <div className="w-full space-y-3 rounded-xl bg-tertiary p-6">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="text-xl font-medium">Entry Informations</h2>
            <p className="text-sm font-medium capitalize text-slate-600">
              {formatDate(entry?.createdAt as unknown as string)}
            </p>
          </div>
          <div className="flex items-center gap-9">
            <p className="text-lg font-medium text-primary">Status : </p>
            {entry.status === "pending" && (
              <Badge
                variant={"destructive"}
                className="flex max-w-fit items-center gap-2"
              >
                Pending <Clock />
              </Badge>
            )}
            {entry.status === "confirmed" && (
              <Badge
                variant={"success"}
                className="flex max-w-fit items-center gap-2"
              >
                Confirmed <FolderCheck />
              </Badge>
            )}
            {entry.status === "canceled" && (
              <Badge
                variant={"warning"}
                className="flex max-w-fit items-center gap-2"
              >
                Canceled <FolderX />
              </Badge>
            )}
          </div>
          <div className="">
            <p className="text-lg font-medium text-primary">Reason : </p>
            <p>{entry?.reason}</p>
          </div>
          <div className="">
            <p className="text-lg font-medium text-primary">Detai : </p>
            <p>{entry?.detail || "No detail provided"}</p>
          </div>
        </div>
        <div className="space-y-6 rounded-xl bg-tertiary p-6">
          <div className="size-50 relative flex w-full flex-col rounded-md border-[3px] border-dashed lg:size-80">
            <Image
              fill
              src={entry?.image || "/images/logo-placeholder.jpg"}
              className="border-2 border-double object-contain object-center p-1"
              alt={entry?.image || "/images/logo-placeholder.jpg"}
            />
          </div>
        </div>
      </div>
      <EntryItemTable data={entry.EntryItems} columns={entryItemColumn} />
    </section>
  );
}
