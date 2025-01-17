import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await prisma.project.findMany();
    res.json(project);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to fetch projects ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Failed to create project ${error.message}` });
  }
};
