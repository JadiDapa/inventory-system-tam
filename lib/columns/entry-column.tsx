import { ColumnDef } from "@tanstack/react-table";
import {
  EllipsisVertical,
  Eye,
  PackageCheck,
  PackageOpen,
  PackageX,
  Pencil,
  Trash,
} from "lucide-react";
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
import { EntryType } from "../types/entry";
import { Badge } from "@/components/ui/badge";

export const entryColumn: ColumnDef<EntryType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter column={column} header="#" isFirst />,
    cell: ({ getValue }) => (
      <div className="translate-x-4 text-primary">{getValue() as string}</div>
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
    accessorFn: (row) => row.EntryItem.length,
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
        return (
          <Badge className="gap-2" variant={"destructive"}>
            <PackageOpen size={20} /> Pending
          </Badge>
        );
      }
      if (value === "confirmed") {
        return (
          <Badge className="gap-2" variant={"success"}>
            <PackageCheck size={20} /> Confirmed
          </Badge>
        );
      }
      if (value === "canceled") {
        return (
          <Badge className="gap-2" variant={"warning"}>
            <PackageX size={20} /> Canceled
          </Badge>
        );
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
          <Link href={`/entries/${row.original.id}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
          <Link href={`/entries/product-list/${row.original.id}`}>
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
