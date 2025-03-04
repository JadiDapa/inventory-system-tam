import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { RequestType } from "../types/request";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Clock,
  EllipsisVertical,
  Eye,
  FolderCheck,
  FolderX,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const requestColumn: ColumnDef<RequestType>[] = [
  {
    accessorKey: "createdAt",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => (
      <TableSorter column={column} header="DATE/TIME" isFirst />
    ),
    cell: ({ getValue }) => {
      const date = new Date(getValue() as Date);
      return (
        <div className="translate-x-4">
          <div className="font-semibold text-primary">
            {format(date, "HH.mm", { locale: id })}
          </div>
          <div>{format(date, "d MMMM yyyy")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    accessorFn: (row) => row.reason,
    header: ({ column }) => <TableSorter column={column} header="REASON" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },

  {
    accessorKey: "quantity",
    accessorFn: (row) =>
      row.RequestItem.reduce((acc, item) => acc + item.quantity, 0),
    header: ({ column }) => <TableSorter column={column} header="QUANTITY" />,
    cell: ({ getValue }) => {
      const value = getValue();
      return <div className="text-xl text-primary">{value as string}</div>;
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === "pending") {
        return (
          <Badge className="gap-2" variant={"destructive"}>
            <Clock size={20} /> Pending
          </Badge>
        );
      }
      if (value === "accepted") {
        return (
          <Badge className="gap-2" variant={"success"}>
            <FolderCheck size={20} /> Accepted
          </Badge>
        );
      }
      if (value === "rejected") {
        return (
          <Badge className="gap-2" variant={"warning"}>
            <FolderX size={20} /> Rejected
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "function",
    header: () => null,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical strokeWidth={1.5} />
        </PopoverTrigger>
        <PopoverContent className="flex max-w-fit gap-3 px-3 py-1 text-primary">
          <Link href={`/requests/${row.original.id}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
        </PopoverContent>
      </Popover>
    ),
  },
];
