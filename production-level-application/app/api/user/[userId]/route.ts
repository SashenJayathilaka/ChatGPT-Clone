import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    return NextResponse.json(findUser);
  } catch (error: any) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
