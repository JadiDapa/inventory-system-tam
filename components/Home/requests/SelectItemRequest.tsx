import { useEffect, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/lib/networks/item";
import { ItemType } from "@/lib/types/item";
import { requestItemsColumn } from "@/lib/columns/request-item";
import useRequestItemStore from "@/stores/selectItemStore";
import NumberInput from "../NumberInput";
import { Button } from "@/components/ui/button";
import SelectItemRequestTable from "./SelectItemRequestTable";

export default function SelectItemRequest() {
  const { requestedItems, addItem, clearItem } = useRequestItemStore();
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
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
      (request: ItemType) => request.name === selected,
    );

    if (selected && quantity >= 1) {
      const newItem = {
        name: selected,
        id: getStock?.id,
        product: getStock?.Product.name,
        brand: getStock?.Brand.name,
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
            <li className={`group px-4 py-2`}>
              <div className="flex gap-3 font-semibold text-primary">
                <span className="flex-[2]">TYPE</span>
                <span className="flex-[2]">PRODUCT</span>
                <span className="flex-[3]">BRAND</span>
              </div>
            </li>
            {items?.map((item) => (
              <li
                key={item.name}
                className={`group px-4 py-2 text-sm hover:bg-sky-600 hover:text-white ${
                  (item.name?.toLowerCase() === selected?.toLowerCase() ||
                    item.Product.name?.toLowerCase() ===
                      selected?.toLowerCase() ||
                    item.Brand.name?.toLowerCase() ===
                      selected?.toLowerCase()) &&
                  "bg-sky-600 text-white"
                } ${
                  item.name?.toLowerCase().startsWith(inputValue) ||
                  item.Product.name?.toLowerCase().startsWith(inputValue) ||
                  item.Brand.name?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => {
                  if (
                    item.Product.name?.toLowerCase() !==
                      selected?.toLowerCase() &&
                    item.name?.toLowerCase() &&
                    item.Brand.name?.toLowerCase() !== selected?.toLowerCase()
                  ) {
                    setSelected(item.name);
                    setOpen(false);
                    setInputValue("");
                  }
                }}
              >
                <div className="flex gap-3">
                  <span className="flex-[2] text-primary group-hover:text-white">
                    {item.name}
                  </span>
                  <span className="flex-[2]">{item.Product.name}</span>
                  <span className="flex-[3]">{item.Brand.name}</span>
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

      <SelectItemRequestTable
        columns={requestItemsColumn}
        data={requestedItems}
      />
    </div>
  );
}
