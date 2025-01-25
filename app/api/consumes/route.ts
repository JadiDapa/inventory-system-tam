import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.consume.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { ConsumedItems: { select: { quantity: true } } },
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
    const formData = await req.formData();

    const reason = formData.get("reason") as string;
    const status = formData.get("status") as string;
    const detail = formData.get("detail") as string;
    const image = formData.get("image") as File;

    const consumedItems = JSON.parse(
      formData.get("consumedItems") as string,
    ) as {
      itemCode: string;
      quantity: string;
    }[];

    console.log(consumedItems);

    // Validate input
    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (
      !reason ||
      !status ||
      !Array.isArray(consumedItems) ||
      consumedItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid input. Ensure all fields are provided." },
        { status: 400 },
      );
    }

    const filename = await fileUpload(image, "uploads");
    const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;

    const result = await prisma.$transaction(async (tx) => {
      const newConsume = await tx.consume.create({
        data: {
          reason,
          status,
          detail,
          image: filePath,
        },
      });

      const consumedItemsData = consumedItems.map((item) => ({
        itemCode: item.itemCode,
        quantity: item.quantity,
        consumeId: newConsume.id,
      }));

      await tx.consumedItem.createMany({
        data: consumedItemsData,
      });

      return newConsume;
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
