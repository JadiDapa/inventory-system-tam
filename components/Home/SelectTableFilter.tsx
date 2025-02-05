import { Table } from "@tanstack/react-table";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectTableFilterProps {
  table: Table<unknown>;
  placeholder?: string;
  column: string;
  options: Record<string, string>[];
}

export default function SelectTableFilter({
  table,
  placeholder,
  column,
  options,
}: SelectTableFilterProps) {
  return (
    <Select
      onValueChange={(value) => {
        if (value === "clear") {
          table.getColumn(column)?.setFilterValue("");
        } else {
          table.getColumn(column)?.setFilterValue(value);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="mt-1.5 text-base" value="clear">
            {placeholder}
          </SelectItem>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
