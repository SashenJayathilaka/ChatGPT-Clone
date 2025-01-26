import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { taskId?: string } }
) {
  const { taskId } = params;
  const body = await request.json();
  const { status } = body;

  if (!taskId)
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });

  try {
    const updateTasks = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(updateTasks);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Failed to update task ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId?: string } }
) {
  const { taskId } = params;

  if (!taskId)
    return NextResponse.json({ error: "Missing taskId" }, { status: 401 });

  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(deleteTask, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
