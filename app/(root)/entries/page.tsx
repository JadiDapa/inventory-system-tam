"use client";

import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllEntries } from "@/lib/networks/entry";
import EntryTable from "@/components/Home/entries/EntryTable";
import { entryColumn } from "@/lib/columns/entry-column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EntriesPage() {
  const { data: entries } = useQuery({
    queryFn: getAllEntries,
    queryKey: ["entries"],
  });

  if (!entries) return <div>Loading...</div>;

  const pendingEntries = entries?.filter((entry) => entry.status === "pending");
  const confirmedEntries = entries?.filter(
    (entry) => entry.status === "confirmed",
  );
  const canceledEntries = entries?.filter(
    (entry) => entry.status === "canceled",
  );

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"Item's Entry List"}</h1>
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
          <Link href="/entries/create">
            <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
              <Plus size={24} />
            </div>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid h-24 w-full grid-cols-2 gap-2 bg-tertiary shadow-md lg:h-12 lg:grid-cols-4 lg:gap-4">
          <TabsTrigger className="data-[state=active]:bg-primary" value="all">
            All Entries
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
          <EntryTable columns={entryColumn} data={entries} />
        </TabsContent>
        <TabsContent value="confirmed">
          <EntryTable columns={entryColumn} data={confirmedEntries} />
        </TabsContent>
        <TabsContent value="pending">
          <EntryTable columns={entryColumn} data={pendingEntries} />
        </TabsContent>
        <TabsContent value="canceled">
          <EntryTable columns={entryColumn} data={canceledEntries} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
