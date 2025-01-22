import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes } from "lucide-react";

interface BrandCardProps {
  name: string;
  slug: string;
  image?: string;
  totalItems?: number;
}

export default function BrandCard({ name, image, totalItems }: BrandCardProps) {
  return (
    <Card className="w-full cursor-pointer overflow-hidden rounded-lg border bg-tertiary">
      <CardHeader className="relative h-40 w-full p-0 lg:h-48">
        <Image
          src={image || "/images/logo-placeholder.jpg"}
          alt={`${name} logo`}
          fill
          className="rounded-lg border-b object-contain object-center"
        />
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2 bg-tertiary p-2 lg:flex-row lg:items-center">
        <CardTitle className="font-normal lg:text-lg lg:font-medium">
          {name}
        </CardTitle>
        <div className="flex flex-row items-center justify-end gap-2 lg:gap-3">
          <div className="flex items-center">
            <Boxes className="h-5 w-5 text-muted-foreground" />
          </div>
          <Badge variant={"default"} className="h-5">
            {totalItems}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
