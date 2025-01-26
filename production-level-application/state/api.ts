import { ProjectTypes, TasksTypes, User } from "@/types/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    createUser: build.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: build.query<User, { userId: string }>({
      query: ({ userId }) => `user/${userId}`,
      providesTags: (result, error, { userId }) =>
        result ? [{ type: "Users", id: userId }] : [],
    }),
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
    getTasks: build.query<TasksTypes[], { projectId: string }>({
      query: ({ projectId }) => `tasks/${projectId}`,
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
          url: `move/${taskId}`,
          method: "PATCH",
          body: { status },
        }),
        invalidatesTags: (result, error, { taskId }) => [
          { type: "Tasks", id: taskId },
        ],
      }
    ),
    deleteTasks: build.mutation<void, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `move/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
    updateProjectAuthors: build.mutation<
      ProjectTypes,
      { projectId: string; userId: string }
    >({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: build.mutation<void, { projectId: string }>({
      query: ({ projectId }) => ({
        url: `projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    removeUserFromTask: build.mutation<
      ProjectTypes,
      { projectId: string; userId: string }
    >({
      query: ({ projectId, userId }) => ({
        url: `tasks/${projectId}`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useGetTasksByUserQuery,
  useCreateTasksMutation,
  useUpdateTasksMutation,
  useDeleteTasksMutation,
  useDeleteProjectMutation,
  useGetUserQuery,
  useUpdateProjectAuthorsMutation,
  useRemoveUserFromTaskMutation,
  useLazyGetTasksQuery,
} = api;
