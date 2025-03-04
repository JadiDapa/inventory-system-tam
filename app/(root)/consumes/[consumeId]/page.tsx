"use client";

import { Button } from "@/components/ui/button";
import { Clock, Download, FolderCheck, FolderX } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getConsumeById, updateConsume } from "@/lib/networks/consume";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateConsumeType } from "@/lib/types/consume";
import { PDFViewer } from "@react-pdf/renderer";
import ConsumeInvoice from "@/components/Home/consumes/ConsumeInvoice";
import DataTable from "@/components/Home/DataTable";
import SearchDataTable from "@/components/Home/SearchDataTable";
import { consumeItemColumn } from "@/lib/columns/consume-item-column";
import { ConsumeItemType } from "@/lib/types/consume-item";

export default function ConsumeDetail() {
  const { consumeId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: consume } = useQuery({
    queryFn: () => getConsumeById(consumeId as string),
    queryKey: ["consumes", consumeId],
  });

  const { mutate: onUpdateConsume } = useMutation({
    mutationFn: (values: CreateConsumeType) =>
      updateConsume(consumeId as string, values),
    onSuccess: () => {
      toast.success("Item Consume Handled Successfully!");
      queryClient.invalidateQueries({ queryKey: ["consumes", consumeId] });
      router.push("/consumes");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  async function handleConsume(status: string) {
    onUpdateConsume({
      number: consume!.number,
      destination: consume!.destination,
      reason: consume!.reason,
      status: status,
      detail: consume!.detail,
      image: consume!.image,
      csvFile: consume!.csvFile,
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
                onClick={() => handleConsume("confirmed")}
                className="h-10 items-center gap-4 bg-green-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-green-500"
              >
                <p className="text-lg">
                  Confirm <span className="hidden lg:inline">Consume</span>
                </p>
                <FolderCheck className="hidden lg:block" />
              </Button>
              <Button
                onClick={() => handleConsume("canceled")}
                className="h-10 items-center gap-4 bg-red-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-red-500"
              >
                <p className="text-lg">
                  Cancel <span className="hidden lg:inline">Consume</span>
                </p>
                <FolderX className="hidden lg:block" />
              </Button>
            </>
          )}
          <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
            <p className="text-lg">
              Print <span className="hidden lg:inline">Document</span>
            </p>
            <Download />
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row">
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
            <p className="text-lg font-medium text-primary">
              Identifier Number :{" "}
            </p>
            <p>{consume?.number}</p>
          </div>
          <div className="">
            <p className="text-lg font-medium text-primary">destination : </p>
            <p>{consume?.destination}</p>
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
              src={(consume?.image as string) || "/images/logo-placeholder.jpg"}
              className="border-2 border-double object-contain object-center p-1"
              alt={(consume?.image as string) || "/images/logo-placeholder.jpg"}
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={consumeItemColumn}
        title="Consume Items List"
        data={consume?.ConsumeItem as ConsumeItemType[]}
        filters={(table) => (
          <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
            <SearchDataTable
              table={table}
              column="type"
              placeholder="Search Item Type..."
            />
          </div>
        )}
      />
      <PDFViewer width="721" height="500" className="app">
        <ConsumeInvoice consume={consume} />
      </PDFViewer>
    </section>
  );
}
