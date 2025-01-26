import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    imageSrc,
    userId,
  } = body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        imageSrc,
        userId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ newTask }, { status: 201 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      { error: `Failed to create task ${error.message}` },
      { status: 500 }
    );
  }
}
