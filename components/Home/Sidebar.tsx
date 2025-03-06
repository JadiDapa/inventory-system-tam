"use client";

import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/stores/SidebarStore";
import {
  Boxes,
  House,
  LogOut,
  NotebookPen,
  NotepadText,
  Package,
  PackageOpen,
  Tag,
  Users,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const userLink = [
  {
    name: "Dashboard",
    url: "/",
    Icon: House,
    public: true,
  },
  {
    name: "My Requests",
    url: "/my-requests",
    Icon: NotebookPen,
    public: true,
  },
  {
    name: "Requests",
    url: "/requests",
    Icon: NotepadText,
    public: false,
  },
  {
    name: "Users",
    url: "/users",
    Icon: Users,
    public: false,
  },
  {
    name: "Entries",
    url: "/entries",
    Icon: Package,
    public: false,
  },
  {
    name: "Consumes",
    url: "/consumes",
    Icon: PackageOpen,
    public: false,
  },
  {
    name: "Inventory",
    url: "/brands",
    Icon: Tag,
    public: false,
  },
  {
    name: "Items",
    url: "/items",
    Icon: Boxes,
    public: false,
  },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const { data: user } = useSession();

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
          "box-shadow fixed z-50 min-h-screen w-[280px] space-y-3 overflow-hidden bg-tertiary px-4 py-7 shadow-sm transition-all duration-500",
          isSidebarOpen ? "translate-x-0" : "max-lg:-translate-x-full",
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
            onClick={closeSidebar}
            className="text-primary lg:hidden"
            size={32}
            strokeWidth={1.8}
          />
        </div>

        <Separator />

        <ScrollArea className="h-[85vh] text-slate-100">
          <Accordion type="single" className="flex flex-col gap-2" collapsible>
            {userLink.map((item) => {
              if (!item.public && user?.user.role === "employee") return null;
              return (
                <div key={item.url}>
                  <Link
                    onClick={closeSidebar}
                    key={item.url}
                    href={item.url}
                    className={cn(
                      "mt-1 flex w-full items-center justify-between rounded-lg px-5 py-2.5 text-primary duration-300",
                      pathname === item.url
                        ? "bg-primary text-tertiary shadow-sm"
                        : "hover:bg-primary/50 hover:text-tertiary",
                    )}
                  >
                    <div className="flex items-center justify-center gap-5">
                      <item.Icon strokeWidth={1.8} size={24} />
                      <div className="text-xl">{item.name}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
            <Separator />
            <div
              className={cn(
                "mt-1 flex h-full w-full cursor-pointer items-center px-5 py-2.5 text-primary duration-300",
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
          </Accordion>
        </ScrollArea>
      </aside>
    </>
  );
}
