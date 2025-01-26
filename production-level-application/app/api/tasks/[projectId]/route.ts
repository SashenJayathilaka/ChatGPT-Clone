import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  projectId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { projectId } = params;

  if (!projectId)
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        author: true,
        comments: true,
        attachments: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Failed to fetch tasks ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { projectId?: string } }
) {
  const { projectId } = params;
  const body = await request.json();
  const { userId } = body;

  if (!projectId || !userId)
    return NextResponse.json(
      { error: "Missing projectId or userId" },
      { status: 400 }
    );

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        authorsIds: true,
      },
    });

    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const updateUsers = project.authorsIds.filter((id) => id !== userId);

    const removeUserFromProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        authorsIds: {
          set: updateUsers,
        },
      },
    });

    return NextResponse.json(removeUserFromProject);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
