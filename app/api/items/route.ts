import { NextRequest, NextResponse } from "next/server";
import { fileUpload } from "@/lib/file-upload";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.item.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        Brand: { select: { name: true } },
        Product: { select: { name: true } },
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
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const detail = formData.get("detail") as string;
    const productSlug = formData.get("productSlug") as string;
    const brandSlug = formData.get("brandSlug") as string;
    const image = formData.get("image") as File;

    let filePath: string | null = null;

    // Ensure image exists and is a valid File before attempting upload
    if (image && image.name) {
      const filename = await fileUpload(image, "uploads");
      filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;
    }

    const result = await prisma.item.create({
      data: {
        name: name,
        code: code,
        detail: detail,
        productSlug: productSlug,
        brandSlug: brandSlug,
        image: filePath,
        quantity: "0",
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
