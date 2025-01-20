import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface StatisticCardProps {
  Icon?: LucideIcon;
  title: string;
  value: number;
  image?: string;
}

export default function StatisticCard({
  Icon,
  title,
  value,
  image,
}: StatisticCardProps) {
  return (
    <div className="bg-tertiary flex h-28 w-full items-center gap-3 rounded-xl p-4 shadow-sm">
      <div className="grid size-14 place-items-center rounded-full bg-primary">
        {Icon && <Icon size={28} className="text-tertiary" />}
      </div>
      <div className="space-y-1">
        <p className="font-medium text-primary/50">{title}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
      {image && (
        <figure className="relative h-20 w-20">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center"
          />
        </figure>
      )}
    </div>
  );
}
