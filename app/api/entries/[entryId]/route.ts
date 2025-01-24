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
        EntryItems: {
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

      const entryItems = await tx.entryItem.findMany({
        where: { entryId },
        include: {
          Items: true,
        },
      });

      if (status === "confirmed") {
        for (const entryItem of entryItems) {
          await tx.item.update({
            where: { code: entryItem.itemCode },
            data: {
              quantity: (
                BigInt(entryItem.Items.quantity) + BigInt(entryItem.quantity)
              ).toString(),
            },
          });

          await tx.entryItem.update({
            where: { id: entryItem.id },
            data: { status: "approved" },
          });
        }
      } else if (status === "canceled") {
        for (const entryItem of entryItems) {
          await tx.entryItem.update({
            where: { id: entryItem.id },
            data: { status: "canceled" },
          });
        }
      }

      return updatedEntry;
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
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
