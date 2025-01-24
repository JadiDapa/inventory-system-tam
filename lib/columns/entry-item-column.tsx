import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { EntryItemType } from "../types/entry-item";

export const entryItemColumn: ColumnDef<EntryItemType>[] = [
  {
    accessorKey: "product",
    accessorFn: (row) => row.Items.Product.name,
    header: ({ column }) => <TableSorter column={column} header="PRODUCT" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "brand",
    accessorFn: (row) => row.Items.Brand.name,
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "type",
    accessorFn: (row) => row.Items.name,
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "code",
    accessorFn: (row) => row.Items.code,
    header: ({ column }) => <TableSorter column={column} header="CODE/SK" />,
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
