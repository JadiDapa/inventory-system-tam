import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
import { InputCsv, transformData } from "../entries/route";
import readCSV from "@/lib/csv-parse";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.consume.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { ConsumeItem: { select: { quantity: true } } },
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
    const csvFile = formData.get("csvFile") as File;

    if (!image || !csvFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const imageName = await fileUpload(image, "uploads");
    const imagePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${imageName}`;

    const csvName = await fileUpload(csvFile, "uploads");
    const csvPath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${csvName}`;

    const csvData = (await readCSV(csvFile)) as InputCsv[];

    const result = await prisma.$transaction(async (tx) => {
      const newConsume = await tx.consume.create({
        data: {
          reason,
          status,
          detail,
          image: imagePath,
          csvFile: csvPath,
        },
      });

      const items = await prisma.item.findMany();

      const transformedData = transformData(csvData);

      await tx.consumeItem.createMany({
        data: transformedData.map((serial) => ({
          consumeId: newConsume.id,
          itemId: items.find((item) => serial.itemName === item.name)!.id,
          quantity: serial.quantity ? Number(serial.quantity) : 0,
        })),
      });

      const consumeItemRecord = await tx.consumeItem.findMany({
        where: { consumeId: newConsume.id },
      });

      const serialNumbers = transformedData.flatMap((serial) => {
        if (!serial.serialNumber) return [];

        const matchingItem = items.find(
          (item) => serial.itemName === item.name,
        );
        if (!matchingItem) return [];

        const matchingConsumeItem = consumeItemRecord.find(
          (entryItem) => entryItem.itemId === matchingItem.id,
        );
        if (!matchingConsumeItem) return [];

        return serial.serialNumber.map((sn) => ({
          itemId: matchingItem.id,
          number: sn.serial,
          consumeItemId: matchingConsumeItem.id, // Updating this field
        }));
      });

      // Instead of createMany, update only the consumeItemId
      for (const serial of serialNumbers) {
        await tx.serialNumber.updateMany({
          where: { itemId: serial.itemId, number: serial.number },
          data: { consumeItemId: serial.consumeItemId },
        });
      }

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
