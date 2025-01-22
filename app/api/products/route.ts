import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { fileUpload } from "@/lib/file-upload";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        _count: {
          select: {
            Item: true,
          },
        },
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
    const slug = formData.get("slug") as string;
    const detail = formData.get("detail") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = await fileUpload(image, "uploads");

    const filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;

    const result = await prisma.product.create({
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
