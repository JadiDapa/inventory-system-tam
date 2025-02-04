import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/file-upload";

export async function GET(
  request: Request,
  { params }: { params: { entryId: string } },
) {
  try {
    const entryId = params.entryId;
    const result = await prisma.entry.findUnique({
      where: {
        id: entryId,
      },
      include: {
        EntryItem: {
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
  { params }: { params: { entryId: string } },
) {
  try {
    const entryId = params.entryId;

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
      const updatedEntry = await tx.entry.update({
        where: { id: entryId },
        data: {
          reason: reason,
          status: status,
          detail: detail,
          image: filePath,
        },
      });

      if (status === "confirmed") {
        const entryItems = await tx.entryItem.findMany({
          where: { entryId },
        });

        for (const entryItem of entryItems) {
          // Update item quantity
          await tx.item.update({
            where: { id: entryItem.itemId },
            data: {
              quantity: { increment: entryItem.quantity as number },
            },
          });

          // Mark serial numbers as confirmed
          await tx.serialNumber.updateMany({
            where: { entryItemId: entryItem.id },
            data: { status: "available" },
          });
        }
      } else if (status === "canceled") {
        // Cancel Entry Item
      }

      return updatedEntry;
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
  { params }: { params: { entryId: string } },
) {
  try {
    const entryId = params.entryId;
    const result = await prisma.entry.delete({
      where: {
        id: entryId,
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
