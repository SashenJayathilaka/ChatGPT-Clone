"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksByUserQuery } from "@/state/api";
import { Priority, TasksTypes } from "@/types/type";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { priorityColumns } from "../data/columns";
import TaskCard from "../global/task-card";
import Header from "../Header";
import ModelNewTask from "../modal/model-new-task";
import { useAppSelector } from "../wrapper/redux";

type Props = {
  priority: Priority;
};

function PriorityPage({ priority }: Props) {
  const [view, setView] = useState("list");
  const [isMobileNewTaskOpen, setIsMobileNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: task,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, { skip: userId == null });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = task?.filter(
    (t: TasksTypes) => t.priority === priority,
  );

  if (isTasksError || !task) return <div>An error occurred</div>;

  return (
    <div className="m-5 p-4">
      <ModelNewTask
        isOpen={isMobileNewTaskOpen}
        onClose={() => setIsMobileNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsMobileNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`rounded-bl-md rounded-tl-md px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } `}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-br-md rounded-tr-md px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } `}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: TasksTypes) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={priorityColumns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
}

export default PriorityPage;
