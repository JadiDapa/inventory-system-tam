import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fileUpload } from "@/lib/file-upload";

export async function GET(
  request: Request,
  { params }: { params: { productSlug: string } },
) {
  try {
    const productSlug = params.productSlug;
    const result = await prisma.product.findUnique({
      where: {
        slug: productSlug,
      },
      include: {
        _count: true,
        Item: true,
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
  { params }: { params: { productSlug: string } },
) {
  try {
    const productSlug = params.productSlug;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const detail = formData.get("detail") as string;
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

    const result = await prisma.product.update({
      where: {
        slug: productSlug,
      },
      data: {
        name: name,
        slug: slug,
        detail: detail,
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
  { params }: { params: { productSlug: string } },
) {
  try {
    const productSlug = params.productSlug;
    const result = await prisma.product.delete({
      where: {
        slug: productSlug,
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
