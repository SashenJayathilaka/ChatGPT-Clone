import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: `Failed to fetch users ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;

  try {
    const users = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: `Failed to fetch user ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;

    const newUsers = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json({ message: "User created successfully", newUsers });
  } catch (error: any) {
    res.status(500).json({ error: `Failed to fetch users ${error.message}` });
  }
};
