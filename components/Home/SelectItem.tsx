import { useEffect, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/lib/networks/item";
import NumberInput from "./NumberInput";
import useRequestItemStore from "@/stores/selectItemStore";
import { ItemType } from "@/lib/types/item";
import { requestItemsColumn } from "@/lib/columns/request-item";
import SelectItemTable from "./SelectItemTable";

export default function SelectItem() {
  const { requestedItems, addItem, clearItem } = useRequestItemStore();
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  useEffect(() => {
    return () => {
      clearItem();
    };
  }, [clearItem]);

  function createRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const getStock = items?.find(
      (request: ItemType) => request.code === selectedCode,
    );

    if (selected && quantity >= 1) {
      const newItem = {
        name: selected,
        code: selectedCode,
        stock: getStock ? getStock.quantity : 0,
        quantity: quantity,
      };
      addItem(newItem);
      setSelected("");
      setQuantity(1);
    }
  }

  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md">
      <h2 className="text-xl font-medium">Select Requested Items</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="relative grow font-medium">
          <div
            onClick={() => setOpen(!open)}
            className={`flex w-full items-center justify-between rounded border bg-white px-4 py-2 ${
              !selected && "text-gray-700"
            }`}
          >
            {selected ? selected : "Select Item Name / Code"}
            <ChevronDown
              size={20}
              className={`transition-all duration-300 ${open && "rotate-180"}`}
            />
          </div>
          <ul
            className={`absolute z-50 w-full overflow-y-auto bg-white transition-all duration-300 ${
              open ? "mt-2 max-h-60 border" : "max-h-0"
            } `}
          >
            <div className="sticky top-0 flex items-center border-b bg-white px-4">
              <Search size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Enter item name or code"
                className="p-2 outline-none placeholder:text-gray-700"
              />
            </div>
            {items?.map((item) => (
              <li
                key={item.name}
                className={`group px-4 py-2 text-sm hover:bg-sky-600 hover:text-white ${
                  (item.name?.toLowerCase() === selected?.toLowerCase() ||
                    item.code?.toLowerCase() === selected?.toLowerCase()) &&
                  "bg-sky-600 text-white"
                } ${
                  item.name?.toLowerCase().startsWith(inputValue) ||
                  item.code?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => {
                  if (
                    item.code?.toLowerCase() !== selected?.toLowerCase() &&
                    item.name?.toLowerCase() !== selected?.toLowerCase()
                  ) {
                    setSelected(item.name);
                    setSelectedCode(item.code);
                    setOpen(false);
                    setInputValue("");
                  }
                }}
              >
                <div className="flex gap-3">
                  <span className="text-primary group-hover:text-white">
                    {item.code}
                  </span>
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between gap-4 lg:block">
          <NumberInput value={quantity} onChange={setQuantity} />
          <Button
            onClick={(e) => {
              createRequest(e);
            }}
            className="flex w-full items-center gap-2 lg:hidden"
          >
            <span>Add</span>
            <Plus />
          </Button>
        </div>
        <Button
          onClick={(e) => {
            createRequest(e);
          }}
          className="hidden items-center gap-2 lg:flex"
        >
          <span>Add</span>
          <Plus />
        </Button>
      </div>

      <SelectItemTable columns={requestItemsColumn} data={requestedItems} />
    </div>
  );
}
