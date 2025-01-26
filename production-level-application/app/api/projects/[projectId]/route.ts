import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { projectId?: string } }
) {
  const { projectId } = params;

  if (!projectId)
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

  try {
    const deleteTask = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return NextResponse.json(deleteTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { projectId?: string } }
) {
  const { projectId } = params;
  const body = await request.json();
  const { userId } = body;

  if (!projectId)
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

  try {
    const checkItsAvailable = await prisma.project.findUnique({
      where: {
        id: projectId,
        authorsIds: {
          has: userId,
        },
      },
    });

    if (checkItsAvailable)
      return NextResponse.json(
        { error: "Your Already In Project Or Current Project Not available!" },
        { status: 401 }
      );

    const updateProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        authorsIds: {
          push: userId,
        },
      },
    });

    return NextResponse.json(updateProject, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
