"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import { Priority, ProjectTypes, TasksTypes } from "@/types/type";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, taskColumns } from "../data/columns";
import { Spinner } from "../global/loader/spinner";
import Header from "../header";
import { useAppSelector } from "../wrapper/redux";

type Props = {
  projectId?: number;
  project: ProjectTypes[];
};

function HomePage({ projectId, project }: Props) {
  const [selectProjectId, setSelectProjectId] = useState(projectId);
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({
    projectId: String(selectProjectId),
  });

  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <Spinner />;
  if (tasksError || !tasks || !projects)
    return <div>An error has occurred</div>;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: TasksTypes) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {}
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = tasks.reduce(
    (acc: Record<string, number>, task: TasksTypes) => {
      const { status } = task;
      acc[status as any] = (acc[status as any] || 0) + 1;
      return acc;
    },
    {}
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <>
      {tasks.length > 0 ? (
        <div className="h-screen w-screen bg-gray-100 bg-transparent p-8">
          <Header name="Project Management Dashboard" />
          <div>
            <select
              className={selectStyles}
              value={selectProjectId}
              onChange={(e) => setSelectProjectId(e.target.value as any)}
            >
              {project.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
              <h3 className="mb-4 text-lg font-semibold dark:text-white">
                Task Priority Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskDistribution}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartColors.barGrid}
                  />
                  <XAxis dataKey="name" stroke={chartColors.text} />
                  <YAxis stroke={chartColors.text} />
                  <Tooltip
                    contentStyle={{
                      width: "min-content",
                      height: "min-content",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill={chartColors.bar} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
              <h3 className="mb-4 text-lg font-semibold dark:text-white">
                Project Status
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="count"
                    data={projectStatus}
                    fill="#82ca9d"
                    label
                  >
                    {projectStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
              <h3 className="mb-4 text-lg font-semibold dark:text-white">
                Your Tasks
              </h3>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={tasks}
                  columns={taskColumns}
                  checkboxSelection
                  loading={tasksLoading}
                  getRowClassName={() => "data-grid-row"}
                  getCellClassName={() => "data-grid-cell"}
                  className={dataGridClassNames}
                  sx={dataGridSxStyles(isDarkMode)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          {project.length > 0 && (
            <div className="w-96">
              <select
                className={selectStyles}
                value={selectProjectId}
                onChange={(e) => setSelectProjectId(e.target.value as any)}
              >
                {project.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
          <img
            src="https://projectvectors.com.au/_next/image?url=%2Fimages%2Fmanagement.png&w=1080&q=75"
            alt="img"
            className="w-[500px]"
          />
          <p className="text-black dark:text-white text-lg font-semibold mt-4">
            Currently You Don't have Task
          </p>
        </div>
      )}
    </>
  );
}
export default HomePage;
