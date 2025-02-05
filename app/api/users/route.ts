import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  try {
    const result = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Request: {
          select: {
            _count: true,
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
    const { username, email, password } = await req.json();

    const isRegistered = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isRegistered) {
      return NextResponse.json(
        { error: "Email anda sudah terdaftar!" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const result = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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
