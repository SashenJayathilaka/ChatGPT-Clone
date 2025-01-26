import { useDeleteTasksMutation } from "@/state/api";
import { TasksTypes } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { EllipsisVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDrag } from "react-dnd";
import ClientOnly from "../global/client-only";
import { toast } from "react-toastify";

type Props = {
  task: TasksTypes;
};

function Task({ task }: Props) {
  const { user } = useUser();
  const [deleteTask] = useDeleteTasksMutation();
  const [{ isDragging }, drop] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const handleDelete = async (taskId: number) => {
    if (!taskId) {
      console.error("taskId is undefined or invalid");
      return;
    }

    try {
      deleteTask({ taskId }).then(() =>
        toast.warning("Task Delete Successfully!", {
          position: "bottom-right",
        })
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const timeAgo = (dateString: string): string => {
    // Step 1: Check the original date format coming in
    //console.log("Original date string:", dateString);

    // If the date has 'Z' (UTC), convert it to ISO format
    let formattedDateString = dateString;

    // Check if the string includes a 'Z', if not, make sure the string is in ISO format
    if (!dateString.includes("Z") && dateString.includes(" ")) {
      formattedDateString = dateString.replace(" ", "T"); // Convert space to 'T' for ISO format
    }

    //console.log("Formatted to ISO 8601:", formattedDateString);

    // Step 2: Parse the string into a Date object
    const createdAt = new Date(formattedDateString);
    //console.log("Created At Date Object:", createdAt);

    // Step 3: Check if the Date is valid
    if (isNaN(createdAt.getTime())) {
      // console.error("Invalid Date:", formattedDateString);
      return "Invalid date"; // If the date is invalid
    }

    // Step 4: Get the current time for comparison
    const now = new Date();
    // console.log("Current Date:", now);

    // Step 5: Calculate the time difference in seconds
    const differenceInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000
    );
    //console.log("Difference in seconds:", differenceInSeconds);

    // Step 6: Handle different time differences
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hours ago`;
    } else if (differenceInSeconds < 2592000) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} days ago`;
    } else if (differenceInSeconds < 31536000) {
      const months = Math.floor(differenceInSeconds / 2592000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(differenceInSeconds / 31536000);
      return `${years} years ago`;
    }
  };

  const PriorityTags = ({ priority }: { priority: TasksTypes["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
          ? "bg-yellow-200 text-yellow-700"
          : priority === "Medium"
          ? "bg-green-200 text-green-700"
          : priority === "Low"
          ? "bg-blue-200 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <ClientOnly>
      <div
        ref={(instance) => {
          drop(instance);
        }}
        className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        {task.imageSrc && (
          <Image
            src={task.imageSrc}
            alt={task.imageSrc}
            width={400}
            height={200}
            className="h-auto w-full rounded-md"
          />
        )}
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {task.priority && <PriorityTags priority={task.priority} />}

              <div className="flex gap-2">
                {taskTagsSplit.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                  >
                    {" "}
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
          </div>
          <div className="my-3 flex justify-between">
            <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
            {typeof task.points === "number" && (
              <div className="text-xs font-semibold dark:text-white">
                {task.points} pts
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-neutral-500">
            {formattedStartDate && <span>{formattedStartDate} - </span>}
            {formattedDueDate && <span>{formattedDueDate}</span>}
          </div>
          <p className="text-sm font-semibold text-gray-600 dark:text-neutral-500">
            {task.description}
          </p>
          <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-[6px] overflow-hidden">
              {task.assignee && (
                <Image
                  src={`${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.firstName}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
              )}
              {task.author?.profilePictureUrl && (
                <Image
                  src={task.author.profilePictureUrl}
                  alt={task.author.firstName}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                />
              )}
            </div>
            {user?.id === task.authorUserId && (
              <div
                className="flex items-center text-gray-500 dark:text-neutral-500 hover:bg-red-500 cursor-pointer rounded-full px-2 py-2 hover:text-white"
                onClick={() => {
                  handleDelete(task.id);
                }}
              >
                <Trash2 size={20} />
              </div>
            )}
          </div>
          {task.createdAt && (
            <div className="flex justify-end items-center">
              <p className="text-gray-500  text-[10px]">
                {timeAgo(task.createdAt)}
              </p>
            </div>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}

export default Task;
