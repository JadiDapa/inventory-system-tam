"use client";

import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Box,
  ChevronRight,
  House,
  LogOut,
  Ticket,
  UsersRound,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const userLink = [
  {
    name: "Dashboard",
    url: "/",
    Icon: House,
  },
  {
    name: "Products",
    url: "/products",
    Icon: Box,
  },
  {
    name: "Activity",
    url: "/activity",
    Icon: UsersRound,
  },
  {
    name: "Distributions",
    url: "/distributions",
    Icon: Ticket,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
    toast.success("Behasil Log Out!");
  }

  return (
    <>
      <aside
        className={cn(
          "box-shadow bg-tertiary fixed z-50 min-h-screen w-[280px] space-y-4 overflow-hidden px-4 py-7 shadow-sm transition-all duration-500",
          isOpen ? "translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        <div className="flex w-full items-center gap-4 px-5">
          <Link href={"/"} className="relative flex size-24 items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="object-contain object-center"
              fill
            />
          </Link>
          <Link href={"/"}>
            <p className="text-xl font-bold text-primary lg:text-2xl">
              Inventory
            </p>

            <p className="text-lg text-primary lg:text-xl">Management</p>
          </Link>

          <X
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary lg:hidden"
            size={24}
            strokeWidth={1.8}
          />
        </div>

        <Separator />

        <ScrollArea className="h-[85vh] text-slate-100">
          <Accordion type="single" className="flex flex-col gap-2" collapsible>
            {userLink.map((item) => (
              <div key={item.url}>
                <Link
                  onClick={() => setIsOpen(false)}
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "mt-1 flex w-full items-center justify-between rounded-md px-5 py-2.5 text-primary duration-300",
                    pathname === item.url
                      ? "text-tertiary bg-primary shadow-sm"
                      : "hover:text-tertiary hover:bg-primary",
                  )}
                >
                  <div className="flex items-center justify-center gap-5">
                    <item.Icon strokeWidth={1.8} size={24} />
                    <div className="text-xl">{item.name}</div>
                  </div>
                </Link>
              </div>
            ))}

            <div>
              <div
                className={cn(
                  "mt-1 flex w-full cursor-pointer items-center justify-between px-5 py-2.5 text-primary duration-300",
                )}
              >
                <div
                  onClick={handleLogout}
                  className={`"justify-center flex cursor-pointer items-center gap-5`}
                >
                  <LogOut strokeWidth={1.8} size={24} />
                  <div className="text-xl">Log Out</div>
                </div>
              </div>
            </div>
          </Accordion>
        </ScrollArea>
      </aside>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 z-50 grid size-8 place-items-center rounded-e-lg bg-primary text-primary lg:hidden"
        >
          <ChevronRight size={24} strokeWidth={1.8} />
        </div>
      )}
    </>
  );
}
