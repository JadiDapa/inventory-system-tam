"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllConsumes } from "@/lib/networks/consume";
import { consumeColumn } from "@/lib/columns/consume-column";
import { entryStatus } from "@/lib/types/entry";
import DataTable from "@/components/Home/DataTable";
import SearchDataTable from "@/components/Home/SearchDataTable";
import SelectTableFilter from "@/components/Home/SelectTableFilter";
import ExcelExport from "@/components/Home/ExcelExport";

export default function ConsumePage() {
  const { data: consumes } = useQuery({
    queryFn: getAllConsumes,
    queryKey: ["consumes"],
  });

  if (!consumes) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"Item's Consume List"}</h1>
          <p className="hidden lg:inline">
            These are Item Consumes Transaction to Use and Reduce Item into
            Inventory
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <ExcelExport data={consumes} filename="consumes-list.xlsx" />

          <Link href="/consumes/create">
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
              columns={consumeColumn}
              data={
                status.value === "all"
                  ? consumes
                  : consumes.filter(
                      (request) => request.status === status.value,
                    )
              }
              filters={(table) => (
                <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
                  <SearchDataTable
                    table={table}
                    column="number"
                    placeholder="Search Number..."
                  />
                  <SelectTableFilter
                    table={table}
                    column="destination"
                    placeholder="Select Destination..."
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
