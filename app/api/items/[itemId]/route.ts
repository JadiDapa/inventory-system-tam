import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/file-upload";

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } },
) {
  try {
    const id = params.itemId;
    const result = await prisma.item.findUnique({
      where: {
        id: id,
      },
      include: {
        SerialNumber: true,
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
  { params }: { params: { itemId: string } },
) {
  try {
    const itemId = params.itemId;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const detail = formData.get("detail") as string;
    const productSlug = formData.get("productSlug") as string;
    const brandSlug = formData.get("brandSlug") as string;
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

    const result = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        name: name,
        detail: detail,
        productSlug: productSlug,
        brandSlug: brandSlug,
        image: filePath,
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
  { params }: { params: { itemId: string } },
) {
  try {
    const id = params.itemId;
    const result = await prisma.item.delete({
      where: {
        id: id,
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
