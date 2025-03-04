import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/Home/TableSorter";
import Link from "next/link";
import { SerialNumberType } from "../types/serial-number";
import { formatDate } from "../format-date";
import { Badge } from "@/components/ui/badge";
import { Package, PackageX } from "lucide-react";

export const serialItemColumn: ColumnDef<SerialNumberType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter column={column} header="#" isFirst />,
    cell: ({ row }) => (
      <div className="translate-x-4 text-primary">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "number",
    accessorFn: (row) => row.number,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => {
      const value = getValue();

      if (value === "available") {
        return (
          <Badge className="w-40 gap-2" variant={"success"}>
            <Package size={20} /> Available
          </Badge>
        );
      }
      if (value === "used") {
        return (
          <Badge className="w-40 gap-2" variant={"warning"}>
            <PackageX size={20} /> Used
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
    header: ({ column }) => <TableSorter column={column} header="DETAIL" />,
    cell: ({ row }) => (
      <Link
        href={`/items/${row.original.id}`}
        className="cursor-pointer rounded-md bg-primary px-4 py-1 text-tertiary hover:bg-primary/80"
      >
        Detail
      </Link>
    ),
  },
];
