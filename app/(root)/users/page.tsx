"use client";

import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LayoutSwitch from "@/components/Home/LayoutSwitch";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/networks/user";
import UserTable from "@/components/Home/users/UserTable";
import { userColumn } from "@/lib/columns/user-column";
import CreateUserModal from "@/components/Home/users/CreateUserModal";

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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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

      <UserTable columns={userColumn} data={users} />
    </section>
  );
}
