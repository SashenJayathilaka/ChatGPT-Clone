import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, secondName, clerkId, profilePictureUrl } = body;

    const checkUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (checkUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 404 }
      );
    } else {
      const newUsers = await prisma.user.create({
        data: {
          firstName,
          secondName,
          clerkId,
          profilePictureUrl,
        },
      });
      return NextResponse.json({
        message: "User created successfully",
        newUsers,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Failed to fetch users ${error.message}`,
      },
      { status: 500 }
    );
  }
}
