import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/file-upload";

export async function GET(
  request: Request,
  { params }: { params: { typeId: string } },
) {
  try {
    const typeId = params.typeId;
    const result = await prisma.type.findUnique({
      where: {
        id: typeId,
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
  { params }: { params: { typeId: string } },
) {
  try {
    const typeId = params.typeId;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const detail = formData.get("detail") as string;
    const productId = formData.get("productId") as string;
    const image = formData.get("image") as File | string;

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

    const result = await prisma.type.update({
      where: {
        id: typeId,
      },
      data: {
        name: name,
        code: code,
        detail: detail,
        productId: productId,
        image: filePath,
      },
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
  { params }: { params: { typeId: string } },
) {
  try {
    const typeId = params.typeId;
    const result = await prisma.type.delete({
      where: {
        id: typeId,
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
