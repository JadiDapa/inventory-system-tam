import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface StatisticCardProps {
  Icon?: LucideIcon;
  title: string;
  value: number | string;
  image?: string | File;
}

export default function StatisticCard({
  Icon,
  title,
  value,
  image,
}: StatisticCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-tertiary p-4 shadow-sm lg:h-28 lg:flex-row lg:p-6">
      <div className="grid size-10 place-items-center rounded-full bg-primary lg:size-14">
        {Icon && <Icon className="size-5 text-tertiary lg:size-7" />}
      </div>
      <div className="space-y-1 text-center lg:text-start">
        <p className="font-medium text-primary/50">{title}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
      {image && (
        <figure className="ize-12 relative lg:size-20">
          <Image
            src={image as string}
            alt=""
            fill
            className="object-cover object-center"
          />
        </figure>
      )}
    </div>
  );
}
