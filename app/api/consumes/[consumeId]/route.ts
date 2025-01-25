import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/file-upload";

export async function GET(
  request: Request,
  { params }: { params: { consumeId: string } },
) {
  try {
    const consumeId = params.consumeId;
    const result = await prisma.consume.findUnique({
      where: {
        id: consumeId,
      },
      include: {
        ConsumedItems: {
          include: {
            Items: {
              include: {
                Brand: {
                  select: {
                    name: true,
                  },
                },
                Product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
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

export async function PUT(
  req: Request,
  { params }: { params: { consumeId: string } },
) {
  try {
    const consumeId = params.consumeId;

    const formData = await req.formData();

    const reason = formData.get("reason") as string;
    const status = formData.get("status") as string;
    const detail = formData.get("detail") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let filePath;

    if (image instanceof File) {
      const filename = await fileUpload(image, "uploads");
      filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;
    } else {
      filePath = image;
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedConsume = await tx.consume.update({
        where: { id: consumeId },
        data: {
          reason: reason,
          status: status,
          detail: detail,
          image: filePath,
        },
      });

      const consumedItems = await tx.consumedItem.findMany({
        where: { consumeId },
        include: {
          Items: true,
        },
      });

      if (status === "confirmed") {
        for (const consumedItem of consumedItems) {
          await tx.item.update({
            where: { code: consumedItem.itemCode },
            data: {
              quantity: (
                BigInt(consumedItem.Items.quantity) -
                BigInt(consumedItem.quantity)
              ).toString(),
            },
          });

          await tx.consumedItem.update({
            where: { id: consumedItem.id },
            data: { status: "approved" },
          });
        }
      } else if (status === "canceled") {
        for (const consumedItem of consumedItems) {
          await tx.consumedItem.update({
            where: { id: consumedItem.id },
            data: { status: "canceled" },
          });
        }
      }

      return updatedConsume;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { consumeId: string } },
) {
  try {
    const consumeId = params.consumeId;
    const result = await prisma.consume.delete({
      where: {
        id: consumeId,
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
