import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "@/lib/networks/request";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";

export default function Notifications() {
  const { data: requests } = useQuery({
    queryFn: getAllRequests,
    queryKey: ["requests"],
  });

  const pendingRequests = requests?.filter((r) => r.status === "pending");

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Bell strokeWidth={1.8} size={24} />
        <div className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-red-500">
          <p className="text-xs text-white">{pendingRequests?.length}</p>
        </div>
      </PopoverTrigger>
      {pendingRequests && (
        <PopoverContent align="end" className="w-96 bg-tertiary p-0">
          <div className="relative flex items-center justify-between border-b px-6 py-4">
            <p className="">Notifications</p>
            <div className="rounded-md bg-primary/70 px-3 py-0.5 text-sm text-white">
              <p>{pendingRequests.length} New</p>
            </div>
          </div>
          <div className="">
            {pendingRequests.map((r) => (
              <Link
                href={`/requests/${r.id}`}
                key={r.id}
                className="flex cursor-pointer items-center gap-6 border-b p-4 transition hover:bg-slate-100"
              >
                <div className="grid size-10 place-items-center rounded-full bg-primary">
                  <p className="text-xl text-white">{"DA"}</p>
                </div>
                <div className="">
                  <p className="text-sm">
                    Request from{" "}
                    <span className="font-medium text-primary">
                      {r.username}
                    </span>
                  </p>
                  <p className="text-sm font-light">
                    {r.username} is requesting {r.RequestItem.length} type of
                    items
                  </p>
                  <p className="text-sm font-light text-slate-400">
                    {formatDate(new Date(r.createdAt) as unknown as string)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
