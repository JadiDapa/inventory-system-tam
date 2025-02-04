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
import TablePagination from "../TablePagination";
import ExcelExport from "../ExcelExport";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserTable: React.FC<UserTableProps<any, any>> = ({ columns, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
                (table.getColumn("username")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("role")?.setFilterValue("");
              } else {
                table.getColumn("role")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search User's Role Here..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="mt-1.5 text-base" value="clear">
                  {"Select User's Role"}
                </SelectItem>
                <SelectItem value={"admin"}>Admin</SelectItem>
                <SelectItem value={"employee"}>Employee</SelectItem>
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

      <TablePagination table={table} />
    </div>
  );
};

export default UserTable;
