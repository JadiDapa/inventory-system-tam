"use client";

import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllRequests } from "@/lib/networks/request";
import RequestTable from "@/components/Home/requests/RequestTable";
import { requestColumn } from "@/lib/columns/request-column";

export default function RequestPage() {
  const { data: requests } = useQuery({
    queryFn: getAllRequests,
    queryKey: ["requests"],
  });

  if (!requests) return <div>Loading...</div>;

  const pendingRequests = requests?.filter(
    (entry) => entry.status === "pending",
  );
  const confirmedRequests = requests?.filter(
    (entry) => entry.status === "confirmed",
  );
  const canceledRequests = requests?.filter(
    (entry) => entry.status === "canceled",
  );

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"Your Request List"}</h1>
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
          <Link href="/requests/create">
            <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
              <Plus size={24} />
            </div>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid h-24 w-full grid-cols-2 gap-2 bg-tertiary shadow-md lg:h-12 lg:grid-cols-4 lg:gap-4">
          <TabsTrigger className="data-[state=active]:bg-primary" value="all">
            All Requests
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-green-500"
            value="confirmed"
          >
            Confirmed
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-slate-500"
            value="pending"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-red-500"
            value="canceled"
          >
            Canceled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <RequestTable columns={requestColumn} data={requests} />
        </TabsContent>
        <TabsContent value="confirmed">
          <RequestTable columns={requestColumn} data={confirmedRequests} />
        </TabsContent>
        <TabsContent value="pending">
          <RequestTable columns={requestColumn} data={pendingRequests} />
        </TabsContent>
        <TabsContent value="canceled">
          <RequestTable columns={requestColumn} data={canceledRequests} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
