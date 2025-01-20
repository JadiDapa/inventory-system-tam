"use client";

import { Bell } from "lucide-react";
import SearchDialog from "./SearchDialog";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex w-full flex-col gap-4 px-4 py-6 max-md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-6">
      <SearchDialog />
      <div className="flex items-center gap-8">
        <Bell size={24} />
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
