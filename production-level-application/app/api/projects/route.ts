import { onCurrentUser } from "@/actions";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await onCurrentUser();

  const currentUserId = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!currentUserId)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const project = await prisma.project.findMany({
      where: {
        authorsIds: {
          has: currentUserId.id,
        },
      },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch projects ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, startDate, endDate, user } = body;

  try {
    const createUser = await prisma.user.findFirst({
      where: {
        clerkId: user,
      },
    });

    if (!createUser?.id)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        userId: createUser?.id,
        authorsIds: [createUser?.id],
      },
    });

    return NextResponse.json({ newProject }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to create project ${error.message}` },
      { status: 500 }
    );
  }
}
