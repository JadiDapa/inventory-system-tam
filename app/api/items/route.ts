import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.item.findMany({
      orderBy: {
        id: "asc",
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

    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = await fileUpload(image, "uploads");

    const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;

    console.log(name, code, detail, productSlug, brandSlug, filePath, "0");

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
