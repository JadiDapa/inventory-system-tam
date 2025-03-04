import TableSorter from "@/components/Home/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ConsumeItemType } from "../types/consume-item";

export const consumeItemColumn: ColumnDef<ConsumeItemType>[] = [
  {
    accessorKey: "type",
    accessorFn: (row) => row.Item.name,
    header: ({ column }) => (
      <TableSorter column={column} header="TYPE" isFirst />
    ),
    cell: ({ getValue }) => (
      <div className="translate-x-4 capitalize">{getValue() as string}</div>
    ),
  },
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
    accessorKey: "quantity",
    accessorFn: (row) => row.quantity,
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ row }) => {
      return (
        <div className="item-center flex w-28 justify-between text-xl text-primary">
          <p>
            {row.original.quantity > 0
              ? row.original.quantity
              : row.original.SerialNumber.length}
          </p>
          {row.original.SerialNumber.find((sn) => sn.number !== null) && (
            <Dialog>
              <DialogTrigger asChild>
                <Badge>Detail</Badge>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    Serial Number : {row.original.Item.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {row.original.SerialNumber.map((sn, index) => (
                    <div key={sn.number} className="flex gap-2">
                      <p className="w-4 font-medium">{index + 1}.</p>
                      <p className="">{sn.number}</p>
                    </div>
                  ))}
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      );
    },
  },
];
