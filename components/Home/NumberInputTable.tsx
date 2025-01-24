import useRequestItemStore from "@/stores/selectItemStore";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  index: number;
};

export default function NumberInputTable({ value, index }: Props) {
  const { updateQuantity } = useRequestItemStore();
  const [newQuantity, setNewQuantity] = useState(value);

  useEffect(() => {
    updateQuantity(index, newQuantity);
  }, [index, newQuantity, updateQuantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setNewQuantity(newQuantity + 1);
  };

  const handleDecrease = () => {
    setNewQuantity(newQuantity - 1);
  };

  return (
    <div className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-2">
      <div className="flex items-center gap-x-1.5">
        <button
          onClick={handleDecrease}
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        <input
          className="w-12 border-0 bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white"
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <button
          onClick={handleIncrease}
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
