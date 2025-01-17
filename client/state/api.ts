import {
  ProjectTypes,
  SearchResults,
  TasksTypes,
  Team,
  User,
} from "@/types/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<ProjectTypes[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<ProjectTypes, Partial<ProjectTypes>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTasks: build.query<TasksTypes[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getTasksByUser: build.query<TasksTypes[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    createTasks: build.mutation<TasksTypes, Partial<TasksTypes>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTasks: build.mutation<TasksTypes, { taskId: number; status: string }>(
      {
        query: ({ taskId, status }) => ({
          url: `tasks/${taskId}/status`,
          method: "PATCH",
          body: { status },
        }),
        invalidatesTags: (result, error, { taskId }) => [
          { type: "Tasks", id: taskId },
        ],
      },
    ),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTasksMutation,
  useUpdateTasksMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserQuery,
} = api;
