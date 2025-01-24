"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllItems } from "@/lib/networks/item";
import { useQuery } from "@tanstack/react-query";

interface AutoCompleteProps {
  onSelectItem: (itemCode: string) => void;
}

export default function AutoComplete({ onSelectItem }: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  if (!items) return null;

  // Filter items based on the search term
  const filteredItems = items.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.code === value)?.code
            : "Select item..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search item..."
            className="h-9"
            onValueChange={setSearchTerm} // Update search term on input change
          />
          <CommandList>
            {filteredItems.length === 0 ? (
              <CommandEmpty>No item found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelectItem(currentValue);
                    }}
                  >
                    {item.code} - {item.name} {/* Display both code and type */}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.code ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
