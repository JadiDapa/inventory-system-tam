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
        ConsumeItem: {
          include: {
            Item: {
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
            SerialNumber: true,
          },
        },
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

      if (status === "confirmed") {
        const consumeItems = await tx.consumeItem.findMany({
          where: { consumeId },
        });

        for (const consumeItem of consumeItems) {
          await tx.item.update({
            where: { id: consumeItem.itemId },
            data: {
              quantity: { decrement: consumeItem.quantity as number },
            },
          });

          await tx.serialNumber.updateMany({
            where: { consumeItemId: consumeItem.id },
            data: { status: "used" },
          });
        }
      } else if (status === "canceled") {
      }

      return updatedConsume;
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
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
