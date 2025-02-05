"use client";

import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { deleteProduct } from "@/lib/networks/product";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/lib/networks/user";
import DataTable from "@/components/Home/DataTable";
import { requestColumn } from "@/lib/columns/request-column";
import { getRequestsByUsername } from "@/lib/networks/request";
import SearchDataTable from "@/components/Home/SearchDataTable";
import SelectTableFilter from "@/components/Home/SelectTableFilter";
import { requestStatus } from "@/lib/types/request";

export default function UserDetail() {
  const { username } = useParams();

  const { data: user } = useQuery({
    queryFn: () => getUserByUsername(username as string),
    queryKey: ["users", username],
  });

  const { data: requests } = useQuery({
    queryFn: () => getRequestsByUsername(username as string),
    queryKey: ["requests", username],
  });

  if (!user || !requests) return null;

  return (
    <section
      id="products"
      className="min-h-screen w-full space-y-4 lg:space-y-6"
    >
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">
            User:{" "}
            <span className="font-semibold text-primary">{user?.username}</span>
          </h1>
          <p className="hidden lg:inline">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci?
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <Link href={`/users/update/${username}`}>
            <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
              <p className="text-lg">Modify User</p>
              <Pencil />
            </Button>
          </Link>
          <DeleteDialog
            params={username as string}
            deleteFunction={deleteProduct}
            queryKey={["users", username]}
          >
            <div className="grid size-10 place-items-center rounded-md bg-secondary text-tertiary">
              <Trash size={20} className="cursor-pointer" />
            </div>
          </DeleteDialog>
        </div>
      </div>
      <DataTable
        columns={requestColumn}
        data={requests}
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
    </section>
  );
}
