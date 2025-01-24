import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { EntryItems: { select: { quantity: true } } },
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

    const entryItems = JSON.parse(formData.get("entryItems") as string) as {
      itemCode: string;
      quantity: string;
    }[];

    console.log(entryItems);

    // Validate input
    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (
      !reason ||
      !status ||
      !Array.isArray(entryItems) ||
      entryItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid input. Ensure all fields are provided." },
        { status: 400 },
      );
    }

    // Upload the image file
    const filename = await fileUpload(image, "uploads");
    const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;

    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Create Entry
      const newEntry = await tx.entry.create({
        data: {
          reason,
          status,
          detail,
          image: filePath,
        },
      });

      // Step 2: Create EntryItems linked to the Entry
      const entryItemsData = entryItems.map((item) => ({
        itemCode: item.itemCode,
        quantity: item.quantity,
        entryId: newEntry.id, // Reference the newly created Entry
      }));

      await tx.entryItem.createMany({
        data: entryItemsData,
      });

      return newEntry;
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
