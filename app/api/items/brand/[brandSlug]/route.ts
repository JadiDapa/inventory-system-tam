import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { brandSlug: string } },
) {
  try {
    const brandSlug = params.brandSlug;
    const result = await prisma.item.findMany({
      where: {
        brandSlug: brandSlug,
      },
      include: {
        Brand: true,
        Product: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
