import { useGetTasksQuery } from "@/state/api";
import { TasksTypes } from "@/types/type";
import { Spinner } from "../global/loader/spinner";
import TaskCard from "../global/task-card";
import Header from "../Header";

type Props = {
  id: string;
  setIsModelNewTasOpen: (isOpen: boolean) => void;
};

function ListView({ id, setIsModelNewTasOpen }: Props) {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <Spinner />;
  if (error) return <div>An error has occurred</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="hove:bg-blue-600 flex items-center rounded-md bg-blue-primary px-3 py-3 text-white"
              onClick={() => setIsModelNewTasOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: TasksTypes) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default ListView;
