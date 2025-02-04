import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { requestId: string } },
) {
  try {
    const requestId = params.requestId;
    const result = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      include: {
        RequestItem: {
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
          },
        },
        User: true,
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
  { params }: { params: { requestId: string } },
) {
  try {
    const requestId = params.requestId;

    const data = await req.json();

    const result = await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        username: data.username,
        detail: data.detail,
        reason: data.reason,
        status: data.status,
        RequestItem: {
          updateMany: {
            where: {
              requestId: requestId,
            },
            data: {
              status: data.status,
            },
          },
        },
      },
      include: {
        RequestItem: true,
      },
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
  { params }: { params: { requestId: string } },
) {
  try {
    const requestId = params.requestId;
    const result = await prisma.request.delete({
      where: {
        id: requestId,
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
