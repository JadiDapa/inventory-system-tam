"use client";

import { Button } from "@/components/ui/button";
import { Clock, Download, FolderCheck, FolderX } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import { CreateRequestType } from "@/lib/types/request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getRequestById, updateRequest } from "@/lib/networks/request";
import ItemRequestTable from "@/components/Home/requests/ItemRequestTable";
import { itemRequestColumn } from "@/lib/columns/item-request-column";
import { useSession } from "next-auth/react";

export default function RequestDetail() {
  const { requestId } = useParams();
  const { data: user } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: request } = useQuery({
    queryFn: () => getRequestById(requestId as string),
    queryKey: ["requests", requestId],
  });

  const { mutate: onUpdateRequest } = useMutation({
    mutationFn: (values: CreateRequestType) =>
      updateRequest(requestId as string, values),
    onSuccess: () => {
      toast.success("Item request Handled Successfully!");
      queryClient.invalidateQueries({ queryKey: ["requests", requestId] });
      router.push("/requests");
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  async function handleRequest(status: string) {
    onUpdateRequest({
      reason: request!.reason,
      status: status,
      detail: request!.detail,
      image: request!.image,
      username: request!.username,
    });
  }

  if (!request) return null;

  return (
    <section id="brands" className="min-h-screen w-full space-y-4 lg:space-y-6">
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-medium">{"Item's request"}</h1>
          <p className="text-xl font-medium uppercase text-primary">
            #{request?.id}
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          {(request.status === "pending" || user?.user.role === "admin") && (
            <>
              <Button
                onClick={() => handleRequest("accepted")}
                className="h-10 items-center gap-4 bg-green-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-green-500"
              >
                <p className="text-lg">Accept Request</p>
                <FolderCheck />
              </Button>
              <Button
                onClick={() => handleRequest("rejected")}
                className="h-10 items-center gap-4 bg-red-500 text-tertiary shadow-sm hover:bg-tertiary hover:text-red-500"
              >
                <p className="text-lg">Reject Request</p>
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
            <h2 className="text-xl font-medium">Request Informations</h2>
            <p className="text-sm font-medium capitalize text-slate-600">
              {formatDate(request?.createdAt as unknown as string)}
            </p>
          </div>
          <div className="flex items-center gap-9">
            <p className="text-lg font-medium text-primary">Status : </p>
            {request.status === "pending" && (
              <Badge
                variant={"destructive"}
                className="flex max-w-fit items-center gap-2"
              >
                Pending <Clock />
              </Badge>
            )}
            {request.status === "confirmed" && (
              <Badge
                variant={"success"}
                className="flex max-w-fit items-center gap-2"
              >
                Confirmed <FolderCheck />
              </Badge>
            )}
            {request.status === "canceled" && (
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
            <p>{request?.reason}</p>
          </div>
          <div className="">
            <p className="text-lg font-medium text-primary">Detail : </p>
            <p>{request?.detail || "No detail provided"}</p>
          </div>
        </div>
        <div className="space-y-6 rounded-xl bg-tertiary p-6">
          <div className="size-50 relative flex w-full flex-col rounded-md border-[3px] border-dashed lg:size-80">
            <Image
              fill
              src={(request?.image as string) || "/images/logo-placeholder.jpg"}
              className="border-2 border-double object-contain object-center p-1"
              alt={(request?.image as string) || "/images/logo-placeholder.jpg"}
            />
          </div>
        </div>
      </div>
      <div className="w-full space-y-3 rounded-xl bg-tertiary p-6">
        <ItemRequestTable
          data={request.RequestItem}
          columns={itemRequestColumn}
        />
      </div>
    </section>
  );
}
