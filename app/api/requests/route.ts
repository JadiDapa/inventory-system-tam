import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RequestItem } from "@prisma/client";

export async function GET() {
  try {
    const result = await prisma.request.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { RequestItem: { select: { quantity: true } } },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = await prisma.$transaction(async (prisma) => {
      const request = await prisma.request.create({
        data: {
          username: data.username,
          detail: data.detail,
          reason: data.reason,
        },
      });

      await prisma.requestItem.createMany({
        data: data.RequestItem.map((item: RequestItem) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          requestId: request.id,
        })),
      });

      return await prisma.request.findUnique({
        where: { id: request.id },
        include: {
          RequestItem: true,
        },
      });
    });

    return NextResponse.json(result, { status: 201 });
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
