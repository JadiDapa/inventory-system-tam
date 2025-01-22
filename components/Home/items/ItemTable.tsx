"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import TablePagination from "../TablePagination";
import ExcelExport from "../ExcelExport";
import { getAllBrands } from "@/lib/networks/brand";
import { getAllProducts } from "@/lib/networks/product";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ItemTable: React.FC<DataTableProps<any, any>> = ({ columns, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: brands } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["brands"],
  });

  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="box-shadow w-full space-y-6 rounded-md bg-white p-4 shadow-md lg:p-6">
      <div className="">
        <div className="text-lg">Search Filters</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-4 lg:gap-6">
          <div className="relative">
            <Search
              size={18}
              className="text-text-400 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              placeholder="Search Item's Type Here..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("brand")?.setFilterValue("");
              } else {
                table.getColumn("brand")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search Items's Brand Here..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="mt-1.5 text-base" value="clear">
                  {"Select Items's Brand"}
                </SelectItem>
                {brands?.map((brand) => (
                  <SelectItem key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("product")?.setFilterValue("");
              } else {
                table.getColumn("product")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search Items's Product Here..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="mt-1.5 text-base" value="clear">
                  {"Select Item's Product"}
                </SelectItem>
                {products?.map((product) => (
                  <SelectItem key={product.slug} value={product.slug}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ExcelExport data={data} filename="items-list.xlsx" />
        </div>
      </div>

      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <hr />
      <TablePagination table={table} />
    </div>
  );
};

export default ItemTable;
