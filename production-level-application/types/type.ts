export interface ProjectTypes {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  user?: String;
  userId?: string;
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface User {
  id?: string;
  userId?: number;
  firstName: string;
  secondName: string;
  email: string;
  profilePictureUrl?: string;
  clerkId?: string;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface TasksTypes {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: string;
  authorUserId?: string;
  assignedUserId?: number;
  imageSrc?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: TasksTypes[];
  projects?: ProjectTypes[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

export type TaskTypeItems = "task" | "milestone" | "project";

export interface ImageCardProps {
  src: string;
  aspectRatio: string;
  marginTop?: string;
}
