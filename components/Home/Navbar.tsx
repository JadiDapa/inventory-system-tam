"use client";

import { Bell, Menu } from "lucide-react";
import SearchDialog from "./SearchDialog";
import Image from "next/image";
import useSidebarStore from "@/stores/SidebarStore";

export default function Navbar() {
  const { openSidebar } = useSidebarStore();

  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 p-6 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-6">
        <Menu
          strokeWidth={1.5}
          size={28}
          onClick={openSidebar}
          className="lg:hidden"
        />
        <SearchDialog />
      </div>
      <div className="flex items-center gap-6">
        <Bell strokeWidth={1.5} size={28} />
        <figure className="relative size-[44px] overflow-hidden rounded-full border border-primary">
          <Image
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
            alt="Logo"
            fill
            className="object-cover object-center"
          />
        </figure>
      </div>
    </div>
  );
}
