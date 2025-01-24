import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.entryItem.findMany({
      orderBy: {
        id: "desc",
      },
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

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid data format. Expected an array." },
        { status: 400 },
      );
    }

    const result = await prisma.entryItem.createMany({
      data,
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
