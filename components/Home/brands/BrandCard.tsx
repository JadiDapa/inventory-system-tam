import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Cctv } from "lucide-react";
import Link from "next/link";

interface BrandCardProps {
  name: string;
  slug: string;
  image?: string;
  detail?: string;
}

export default function BrandCard({ name, slug, image }: BrandCardProps) {
  const productCount = 0;
  const itemCount = 0;
  return (
    <Link href={`/brands/${slug}`}>
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
          <div className="flex flex-row justify-between gap-2 lg:flex-col lg:gap-3">
            <div className="flex items-center space-x-1 lg:justify-between">
              <div className="flex items-center space-x-2">
                <Cctv className="h-5 w-5 text-muted-foreground" />
                <span className="hidden text-sm font-medium lg:inline">
                  Products
                </span>
              </div>

              <Badge variant={"default"} className="hidden lg:block">
                {productCount}
              </Badge>
              <p className="text-lg text-primary lg:hidden">{productCount}</p>
            </div>
            <div className="flex items-center space-x-1 lg:justify-between">
              <div className="flex items-center space-x-2">
                <Boxes className="h-5 w-5 text-muted-foreground" />
                <span className="hidden text-sm font-medium lg:inline">
                  Items
                </span>
              </div>
              <Badge variant={"default"} className="hidden lg:block">
                {itemCount}
              </Badge>
              <p className="text-lg text-primary lg:hidden">{productCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
