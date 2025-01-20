import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const productId = params.productId;
    const result = await prisma.type.findMany({
      where: {
        productId: productId,
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
