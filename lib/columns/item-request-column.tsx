import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { RequestItemType } from "../types/request-item";

export const itemRequestColumn: ColumnDef<RequestItemType>[] = [
  {
    accessorKey: "product",
    accessorFn: (row) => row.Item.Product.name,
    header: ({ column }) => <TableSorter column={column} header="PRODUCT" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => row.Item.Brand.name,
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "type",
    accessorFn: (row) => row.Item.name,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "quantity",
    accessorFn: (row) => row.quantity,
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ getValue }) => {
      const value = getValue();
      return <div className="text-xl text-primary">{value as string}</div>;
    },
  },
];
