"use client";

import { Button } from "@/components/ui/button";
import { Clock, Download, FolderCheck, FolderX } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getConsumeById, updateConsume } from "@/lib/networks/consume";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import ConsumedItemTable from "@/components/Home/consumes/ConsumedItemTable";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { PDFViewer } from "@react-pdf/renderer";
// import EntryInvoice from "@/components/Home/entries/EntryInvoice";
import { CreateConsumeType } from "@/lib/types/consume";
import { consumedItemColumn } from "@/lib/columns/consume-item-column";

export default function ConsumeDetail() {
  const { consumeId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: consume } = useQuery({
    queryFn: () => getConsumeById(consumeId as string),
    queryKey: ["consumes", consumeId],
  });

  const { mutate: onUpdateBrand } = useMutation({
    mutationFn: (values: CreateConsumeType) =>
      updateConsume(consumeId as string, values),
    onSuccess: () => {
      toast.success("Item Consume Handled Successfully!");
      queryClient.invalidateQueries({ queryKey: ["consumes", consumeId] });
      router.push("/consumes");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  async function onUpdateConsume(status: string) {
    onUpdateBrand({
      reason: consume!.reason,
      status: status,
      detail: consume!.detail,
      image: consume!.image,
    });
  }

  if (!consume) return null;

  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-medium">{"Item's Consume"}</h1>
          <p className="text-xl font-medium uppercase text-primary">
            #{consume?.id}
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          {consume?.status === "pending" && (
            <>
              <Button
                onClick={() => onUpdateConsume("confirmed")}
                className="h-10 items-center gap-4 bg-green-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-green-500"
              >
                <p className="text-lg">Confirm Consume</p>
                <FolderCheck />
              </Button>
              <Button
                onClick={() => onUpdateConsume("canceled")}
                className="h-10 items-center gap-4 bg-red-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-red-500"
              >
                <p className="text-lg">Cancel Consume</p>
                <FolderX />
              </Button>
            </>
          )}
          <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
            <p className="text-lg">Print Document</p>
            <Download />
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <div className="w-full space-y-3 rounded-xl bg-tertiary p-6">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="text-xl font-medium">Consume Informations</h2>
            <p className="text-sm font-medium capitalize text-slate-600">
              {formatDate(consume?.createdAt as unknown as string)}
            </p>
          </div>
          <div className="flex items-center gap-9">
            <p className="text-lg font-medium text-primary">Status : </p>
            {consume?.status === "pending" && (
              <Badge
                variant={"destructive"}
                className="flex max-w-fit items-center gap-2"
              >
                Pending <Clock />
              </Badge>
            )}
            {consume?.status === "confirmed" && (
              <Badge
                variant={"success"}
                className="flex max-w-fit items-center gap-2"
              >
                Confirmed <FolderCheck />
              </Badge>
            )}
            {consume?.status === "canceled" && (
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
            <p>{consume?.reason}</p>
          </div>
          <div className="">
            <p className="text-lg font-medium text-primary">Detai : </p>
            <p>{consume?.detail || "No detail provided"}</p>
          </div>
        </div>
        <div className="space-y-6 rounded-xl bg-tertiary p-6">
          <div className="size-50 relative flex w-full flex-col rounded-md border-[3px] border-dashed lg:size-80">
            <Image
              fill
              src={consume?.image || "/images/logo-placeholder.jpg"}
              className="border-2 border-double object-contain object-center p-1"
              alt={consume?.image || "/images/logo-placeholder.jpg"}
            />
          </div>
        </div>
      </div>
      <ConsumedItemTable
        data={consume?.ConsumedItems}
        columns={consumedItemColumn}
      />
      {/* <PDFViewer width="721" height="500" className="app">
        <EntryInvoice entry={cons} />
      </PDFViewer> */}
    </section>
  );
}
