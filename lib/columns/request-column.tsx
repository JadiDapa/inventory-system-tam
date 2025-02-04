import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { RequestType } from "../types/request";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { deleteRequest } from "../networks/request";
import { Badge } from "@/components/ui/badge";

export const requestColumn: ColumnDef<RequestType>[] = [
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
    accessorFn: (row) => row.RequestItem.length,
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
        return <Badge variant={"destructive"}>Pending</Badge>;
      }
      if (value === "accepted") {
        return <Badge variant={"success"}>Accepted</Badge>;
      }
      if (value === "rejected") {
        return <Badge variant={"warning"}>Rejected</Badge>;
      }
    },
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="FN" />,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical strokeWidth={1.5} />
        </PopoverTrigger>
        <PopoverContent className="flex max-w-fit gap-3 px-3 py-1 text-primary">
          <Link href={`/requests/${row.original.id}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
          <Link href={`/requests/product-list/${row.original.id}`}>
            <Pencil size={20} className="cursor-pointer" />
          </Link>
          <DeleteDialog
            params={row.original.id!.toString()}
            deleteFunction={deleteRequest}
            queryKey={["alumnis", row.original.id!.toString()]}
          >
            <Trash size={20} className="cursor-pointer" />
          </DeleteDialog>
        </PopoverContent>
      </Popover>
    ),
  },
];
