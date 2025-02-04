import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { entryItemId: string } },
) {
  try {
    const entryItemId = params.entryItemId;
    const result = await prisma.entryItem.findUnique({
      where: {
        id: entryItemId,
      },
      include: {
        Item: true,
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
  { params }: { params: { entryItemId: string } },
) {
  try {
    const entryItemId = params.entryItemId;
    const data = await req.json();

    const result = await prisma.entryItem.update({
      where: {
        id: entryItemId,
      },
      data: data,
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
  { params }: { params: { entryItemId: string } },
) {
  try {
    const entryItemId = params.entryItemId;
    const result = await prisma.entryItem.delete({
      where: {
        id: entryItemId,
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
