import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { deleteItem } from "../networks/item";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { formatDate } from "../format-date";
import TableSorter from "@/components/Home/TableSorter";
import { Badge } from "@/components/ui/badge";
import { ConsumeType } from "../types/consume";

export const consumeColumn: ColumnDef<ConsumeType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => (
      <div className="pl-4">
        <TableSorter column={column} header="#" />
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-primary">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "reason",
    accessorFn: (row) => row.reason,
    header: ({ column }) => <TableSorter column={column} header="REASON" />,
    cell: ({ getValue }) => <Link href={""}>{getValue() as string}</Link>,
  },
  {
    accessorKey: "quantity",
    accessorFn: (row) => row.ConsumeItem.length,
    header: ({ column }) => <TableSorter column={column} header="QUANTITY" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
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
      if (value === "confirmed") {
        return <Badge variant={"success"}>Confirmed</Badge>;
      }
      if (value === "canceled") {
        return <Badge variant={"warning"}>Canceled</Badge>;
      }
    },
  },

  {
    accessorKey: "createdAt",
    accessorFn: (row) => row.createdAt,
    header: ({ column }) => <TableSorter column={column} header="DATE" />,
    cell: ({ getValue }) => <div>{formatDate(getValue() as string)}</div>,
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
          <Link href={`/consumes/${row.original.id}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
          <Link href={`/consumes/product-list/${row.original.id}`}>
            <Pencil size={20} className="cursor-pointer" />
          </Link>
          <DeleteDialog
            params={row.original.id!.toString()}
            deleteFunction={deleteItem}
            queryKey={["alumnis", row.original.id!.toString()]}
          >
            <Trash size={20} className="cursor-pointer" />
          </DeleteDialog>
        </PopoverContent>
      </Popover>
    ),
  },
];
