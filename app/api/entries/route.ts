import { NextRequest, NextResponse } from "next/server";
import { fileUpload } from "@/lib/file-upload";
import { prisma } from "@/lib/prisma";
import readCSV from "@/lib/csv-parse";

export async function GET() {
  try {
    const result = await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { EntryItem: { select: { quantity: true } } },
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
      const newEntry = await tx.entry.create({
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

      await tx.entryItem.createMany({
        data: transformedData.map((serial) => ({
          entryId: newEntry.id,
          itemId: items.find((item) => serial.itemName === item.name)!.id,
          quantity: serial.quantity ? Number(serial.quantity) : 0,
        })),
      });

      const entryItemRecords = await tx.entryItem.findMany({
        where: { entryId: newEntry.id },
      });

      const serialNumbers = transformedData.flatMap((serial) => {
        if (!serial.serialNumber) return [];

        const matchingItem = items.find(
          (item) => serial.itemName === item.name,
        );
        if (!matchingItem) return [];

        const matchingEntryItem = entryItemRecords.find(
          (entryItem) => entryItem.itemId === matchingItem.id,
        );
        if (!matchingEntryItem) return [];

        return serial.serialNumber.map((sn) => ({
          itemId: matchingItem.id,
          number: sn.serial,
          entryItemId: matchingEntryItem.id,
        }));
      });

      if (serialNumbers.length > 0) {
        await tx.serialNumber.createMany({
          data: serialNumbers,
        });
      }

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

export type InputCsv = {
  ItemName: string;
  SerialNumber?: string;
  Quantity?: number;
};

type OutputItem = {
  itemName: string;
  serialNumber?: { serial: string }[];
  quantity?: number;
};

export function transformData(data: InputCsv[]): OutputItem[] {
  const grouped: Record<string, OutputItem> = {};

  for (const item of data) {
    if (item.SerialNumber) {
      if (!grouped[item.ItemName]) {
        grouped[item.ItemName] = { itemName: item.ItemName, serialNumber: [] };
      }
      grouped[item.ItemName].serialNumber?.push({ serial: item.SerialNumber });
    } else {
      grouped[`${item.ItemName}-quantity`] = {
        itemName: item.ItemName,
        quantity: item.Quantity,
      };
    }
  }

  return Object.values(grouped);
}
