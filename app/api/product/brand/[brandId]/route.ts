import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { brandId: string } },
) {
  try {
    const brandId = params.brandId;
    const result = await prisma.product.findMany({
      where: {
        brandId: brandId,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
