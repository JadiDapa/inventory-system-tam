import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/Home/TableSorter";
import { ItemType } from "../types/item";
import Link from "next/link";

export const itemColumn: ColumnDef<ItemType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="translate-x-4 text-primary">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => row.Brand.name,
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
    cell: ({ getValue }) => <Link href={""}>{getValue() as string}</Link>,
  },
  {
    accessorKey: "product",
    accessorFn: (row) => row.Product.name,
    header: ({ column }) => <TableSorter column={column} header="PRODUCT" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "quantity",
    accessorFn: (row) => row.quantity,
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ row }) => {
      const quantity =
        row.original.quantity! > 0
          ? row.original.quantity
          : row.original.SerialNumber.length;
      return <div className="text-lg text-primary">{quantity}</div>;
    },
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
