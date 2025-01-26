import ImageUpload from "@/components/global/image-upload";
import { ButtonLoader } from "@/components/global/loader/buttonLoader";
import {
  useCreateTasksMutation,
  useGetUserQuery,
  useLazyGetTasksQuery,
} from "@/state/api";
import { Priority, Status } from "@/types/type";
import { formatISO } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";

type Props = {
  id?: string | null;
  userId?: string;
  isOpen: boolean;
  onClose: () => void;
};

function ModelNewTask({ id, userId, isOpen, onClose }: Props) {
  const { data: user, error } = useGetUserQuery({
    userId: userId ?? "defaultUserId",
  });
  const [createTask, { isLoading }] = useCreateTasksMutation();
  const [refetchTasks] = useLazyGetTasksQuery();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [imageSrc, setImageSrc] = useState({
    secure_url: "",
  });

  const handleSubmit = async () => {
    if (!title || !(id !== null || projectId)) return;

    const formateStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formateEndDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formateStartDate,
      dueDate: formateEndDate,
      authorUserId: /* user?.id */ userId,
      projectId: id !== null ? id : projectId,
      imageSrc: imageSrc.secure_url,
      userId: user?.id,
    })
      .then(() =>
        toast.success("Task Created Successfully!", {
          position: "bottom-right",
        })
      )
      .catch(() =>
        toast.error("Task Created Error", { position: "bottom-right" })
      );
    refetchTasks({ projectId: String(id) });

    setTitle("");
    setDescription("");
    setStatus(Status.ToDo);
    setPriority(Priority.Backlog);
    setTags("");
    setStartDate("");
    setDueDate("");
    setProjectId("");
    setImageSrc({
      secure_url: "",
    });

    onClose();
  };

  const isFormValid = () => {
    return title && (id !== null || projectId) && startDate && dueDate;
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyle =
    "w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyle}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyle}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyle}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyle}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="font-semibold text-center text-[15px] text-black dark:text-gray-400">
            Add Attachment
          </p>
          <ImageUpload setImageSrc={setImageSrc} value={imageSrc.secure_url} />
        </div>

        {/*         <input
          type="text"
          className={inputStyle}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        /> */}
        {id === undefined && (
          <input
            type="text"
            className={inputStyle}
            placeholder="Project Id"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? <ButtonLoader /> : "Create Task"}
        </button>
      </form>
    </Modal>
  );
}

export default ModelNewTask;
