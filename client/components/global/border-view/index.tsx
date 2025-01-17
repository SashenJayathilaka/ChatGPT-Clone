import { useGetTasksQuery, useUpdateTasksMutation } from "@/state/api";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Spinner } from "../loader/spinner";
import TaskColumn from "../task-column";

type Props = {
  id: string;
  setIsModelNewTasOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

function BorderView({ id, setIsModelNewTasOpen }: Props) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [updateTaskStatus] = useUpdateTasksMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>An error has occurred</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModelNewTasOpen={setIsModelNewTasOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default BorderView;
