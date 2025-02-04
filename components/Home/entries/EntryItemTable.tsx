import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EntryItemType } from "@/lib/types/entry-item";

interface EntryItemTableProps {
  entryItems: EntryItemType[];
}

export function EntryItemTable({ entryItems }: EntryItemTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entryItems?.map((items) => (
          <TableRow key={items.id}>
            <TableCell>{items.Item.Product.name}</TableCell>
            <TableCell>{items.Item.Brand.name}</TableCell>
            <TableCell>{items.Item.name}</TableCell>
            <TableCell>
              {items.quantity > 0 ? items.quantity : items.SerialNumber.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
