import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { ItemType } from "../types/item";
import { deleteItem } from "../networks/item";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { formatDate } from "../format-date";
import TableSorter from "@/components/Home/TableSorter";

export const itemColumn: ColumnDef<ItemType>[] = [
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
    accessorKey: "code",
    accessorFn: (row) => row.code,
    header: ({ column }) => <TableSorter column={column} header="CODE/SN" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "quantity",
    accessorFn: (row) => row.quantity,
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ getValue }) => (
      <div className="text-lg text-primary">{getValue() as string}</div>
    ),
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
          <Link href={`/products/${row.original.id}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
          <Link href={`/dashboard/product-list/${row.original.id}`}>
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
