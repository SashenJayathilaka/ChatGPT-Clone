import { useGetTasksQuery, useUpdateTasksMutation } from "@/state/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-toastify";
import { Spinner } from "../loader/spinner";
import TaskColumn from "../task-column";

type Props = {
  id: string;
  setIsModelNewTasOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

function BorderView({ id, setIsModelNewTasOpen }: Props) {
  const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: id });

  const [updateTaskStatus, { data }] = useUpdateTasksMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    const toastId = toast.loading("Updating task status...", {
      position: "bottom-right",
    });

    try {
      updateTaskStatus({ taskId, status: toStatus });

      toast.update(toastId, {
        render: "Task status updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Auto-close after 3 seconds
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: "Failed to update task status. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000, // Auto-close after 5 seconds
      });
    }
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
