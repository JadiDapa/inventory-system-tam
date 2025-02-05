"use client";

import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/networks/user";
import { userColumn } from "@/lib/columns/user-column";
import CreateUserModal from "@/components/Home/users/CreateUserModal";
import DataTable from "@/components/Home/DataTable";
import SearchDataTable from "@/components/Home/SearchDataTable";
import SelectTableFilter from "@/components/Home/SelectTableFilter";
import { userRoles } from "@/lib/types/user";

export default function UsersPage() {
  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  if (!users) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">{"User List"}</h1>
          <p className="hidden lg:inline">
            These are The Users that Use and Operate in This App.
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <LayoutSwitch />
          <Button className="h-10 items-center gap-4 bg-tertiary text-primary shadow-sm hover:text-tertiary">
            <p className="text-lg">Export</p>
            <Download />
          </Button>
          <CreateUserModal>
            <div className="grid size-10 place-items-center gap-4 rounded-md bg-primary text-lg text-tertiary shadow-sm">
              <Plus size={24} />
            </div>
          </CreateUserModal>
        </div>
      </div>

      <DataTable
        columns={userColumn}
        data={users}
        filters={(table) => (
          <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
            <SearchDataTable
              table={table}
              column="username"
              placeholder="Search Username..."
            />
            <SelectTableFilter
              table={table}
              column="role"
              placeholder="Select Role..."
              options={userRoles}
            />
          </div>
        )}
      />
    </section>
  );
}
