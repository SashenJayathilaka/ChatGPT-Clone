import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [{ authorUserId: userId }, { assignedUserId: userId }],
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to get user tasks ${error.message}` },
      { status: 500 }
    );
  }
}
