import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Tag } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  slug: string;
  image?: string;
  detail?: string;
}

export default function ProductCard({ name, slug, image }: ProductCardProps) {
  name,
  slug,
  image,
  totalItems,
  return (
    <Link href={`/products/${slug}`}>
      <Card className="w-full cursor-pointer overflow-hidden rounded-lg border bg-tertiary">
        <CardHeader className="relative h-40 w-full p-0 lg:h-48">
          <Image
            src={image || "/images/logo-placeholder.jpg"}
            alt={`${name} logo`}
            fill
            className="rounded-lg border-b object-contain object-center"
          />
        </CardHeader>
        <CardContent className="bg-tertiary p-2 pt-3">
          <CardTitle className="mb-3 text-lg font-medium lg:text-xl lg:font-semibold">
            {name}
          </CardTitle>
          <div className="flex flex-row items-center justify-end gap-2 lg:gap-3">
            <div className="flex items-center">
              <Boxes className="h-5 w-5 text-muted-foreground" />
            </div>
            <Badge variant={"default"} className="h-5">
              {total}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
