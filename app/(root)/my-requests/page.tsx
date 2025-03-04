"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRequestsByUsername } from "@/lib/networks/request";
import { requestColumn } from "@/lib/columns/request-column";
import DataTable from "@/components/Home/DataTable";
import SearchDataTable from "@/components/Home/SearchDataTable";
import SelectTableFilter from "@/components/Home/SelectTableFilter";
import { requestStatus } from "@/lib/types/request";
import { useSession } from "next-auth/react";
import ExcelExport from "@/components/Home/ExcelExport";

export default function RequestPage() {
  const { data } = useSession();
  const { data: requests } = useQuery({
    queryFn: () => getRequestsByUsername(data?.user?.username as string),
    queryKey: ["requests"],
  });

  if (!requests) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"Your Request List"}</h1>
          <p className="hidden lg:inline">
            These are Item Requests that you have made.
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <ExcelExport
            data={requests}
            filename={data?.user.username + "-requests-list.xlsx"}
          />

          <Link
            className="flex items-center gap-4 rounded-md bg-primary px-3 py-1.5 text-lg text-tertiary shadow-sm transition hover:bg-tertiary hover:text-primary"
            href="/requests/create"
          >
            <p className="text-lg max-sm:hidden">Create Request</p>

            <Plus size={24} />
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid h-24 w-full grid-cols-2 gap-2 bg-tertiary shadow-md lg:h-12 lg:grid-cols-4 lg:gap-4">
          {requestStatus.map((status) => (
            <TabsTrigger
              key={status.value}
              value={status.value}
              className={`data-[state=active]:${status.color}`}
            >
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {requestStatus.map((status) => (
          <TabsContent key={status.value} value={status.value}>
            <DataTable
              columns={requestColumn}
              data={
                status.value === "all"
                  ? requests
                  : requests.filter(
                      (request) => request.status === status.value,
                    )
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
                    options={requestStatus}
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
