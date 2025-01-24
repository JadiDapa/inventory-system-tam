import useRequestItemStore from "@/stores/selectItemStore";
import { Trash2 } from "lucide-react";

type Props = {
  index: number;
};

export default function RemoveRequestedItem({ index }: Props) {
  const { removeItem } = useRequestItemStore();

  return (
    <div
      className="max-w-fit rounded-md px-3 py-1.5 text-red-500 duration-300 hover:bg-red-500 hover:text-white"
      onClick={() => removeItem(index)}
    >
      <Trash2 size={20} strokeWidth={1.5} />
    </div>
  );
}
