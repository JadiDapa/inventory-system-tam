import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { ItemType } from "../types/item";
import NumberInputTable from "@/components/Home/NumberInputTable";
import RemoveRequestedItem from "@/components/Home/RemoveRequestedItem";

export const requestItemsColumn: ColumnDef<ItemType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "product",
    header: ({ column }) => <TableSorter column={column} header="PRODUCT" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ getValue, row: { index } }) => {
      const value = getValue();
      return <NumberInputTable value={value as number} index={index} />;
    },
  },

  {
    accessorKey: "action",
    header: "REMOVE",
    cell: ({ row: { index } }) => {
      return <RemoveRequestedItem index={index} />;
    },
  },
];
