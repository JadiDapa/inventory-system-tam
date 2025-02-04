import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/Home/TableSorter";
import Link from "next/link";
import { UserType } from "../types/user";

export const userColumn: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => (
      <div className="pl-4">
        <TableSorter column={column} header="#" />
      </div>
    ),
    cell: ({ row }) => <div className="ml-4 text-primary">{row.index + 1}</div>,
  },
  {
    accessorKey: "username",
    accessorFn: (row) => row.username,
    header: ({ column }) => <TableSorter column={column} header="USERNAME" />,
    cell: ({ getValue }) => <Link href={""}>{getValue() as string}</Link>,
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.email,
    header: ({ column }) => <TableSorter column={column} header="EMAIL" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "role",
    accessorFn: (row) => row.role,
    header: ({ column }) => <TableSorter column={column} header="ROLE" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
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
