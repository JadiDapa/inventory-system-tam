"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import Link from "next/link";
import { getAllEntries } from "@/lib/networks/entry";
import { entryColumn } from "@/lib/columns/entry-column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchDataTable from "@/components/Home/SearchDataTable";
import SelectTableFilter from "@/components/Home/SelectTableFilter";
import { entryStatus } from "@/lib/types/entry";
import DataTable from "@/components/Home/DataTable";
import ExcelExport from "@/components/Home/ExcelExport";

export default function EntriesPage() {
  const { data: entries } = useQuery({
    queryFn: getAllEntries,
    queryKey: ["entries"],
  });

  if (!entries) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"Item's Entry List"}</h1>
          <p className="hidden lg:inline">
            These are Item Entries Transaction to Add More Item into Inventory
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />

          <ExcelExport data={entries} filename="entries-list.xlsx" />

          <Link href="/entries/create">
            <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
              <Plus size={24} />
            </div>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid h-24 w-full grid-cols-2 gap-2 bg-tertiary shadow-md lg:h-12 lg:grid-cols-4 lg:gap-4">
          {entryStatus.map((status) => (
            <TabsTrigger
              key={status.value}
              value={status.value}
              className={`data-[state=active]:${status.color}`}
            >
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {entryStatus.map((status) => (
          <TabsContent key={status.value} value={status.value}>
            <DataTable
              columns={entryColumn}
              data={
                status.value === "all"
                  ? entries
                  : entries.filter((request) => request.status === status.value)
              }
              filters={(table) => (
                <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
                  <SearchDataTable
                    table={table}
                    column="reason"
                    placeholder="Search Reason..."
                  />
                  <SelectTableFilter
                    table={table}
                    column="status"
                    placeholder="Select Status..."
                    options={entryStatus}
                  />
                </div>
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
