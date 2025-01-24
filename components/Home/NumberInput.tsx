import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function NumberInput({ value, onChange }: Props) {
  return (
    <div className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-2">
      <div className="flex items-center gap-x-1.5">
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => onChange(value - 1)}
        >
          <Minus size={16} />
        </button>
        <input
          className="w-12 border-0 bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white"
          type="text"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => onChange(value + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
