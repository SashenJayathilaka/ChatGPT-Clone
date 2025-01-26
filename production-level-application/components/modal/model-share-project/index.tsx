import { useState } from "react";
import Modal from "..";
import { useUpdateProjectAuthorsMutation } from "@/state/api";
import { toast } from "react-toastify";

type Props = {
  id: string;
  currentUserId: string;
  isOpen: boolean;
  onClose: () => void;
  sharedProjectId: string;
  setSharedProjectId: (sharedProjectId: string) => void;
};

function ModelShareModel({
  isOpen,
  onClose,
  id,
  currentUserId,
  setSharedProjectId,
  sharedProjectId,
}: Props) {
  const [updateProjectAuthors, { error: updateError }] =
    useUpdateProjectAuthorsMutation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleUpdateAuthors = async (authorIds: string, sProjectId: string) => {
    if (!authorIds) return;
    if (!sProjectId) return;

    try {
      await updateProjectAuthors({
        projectId: sProjectId,
        userId: authorIds,
      })
        .then(() => {
          if (
            updateError &&
            "status" in updateError &&
            updateError.status === 401
          ) {
            toast.error(
              "Your Already In Project Or Current Project Not available!",
              {
                position: "bottom-right",
              }
            );
          } else if (
            updateError &&
            "status" in updateError &&
            updateError.status === 400
          ) {
            toast.error("Missing projectId", {
              position: "bottom-right",
            });
          } else {
            toast.success("Project Join Successfully!", {
              position: "bottom-right",
            });

            setSharedProjectId("");
            onClose();
          }
        })
        .catch(() =>
          toast.error("Project Join Error", { position: "bottom-right" })
        );
    } catch (error: any) {
      console.log("🚀 ~ handleUpdateAuthors ~ error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Collaborate With Others">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col justify-start items-start">
          <p className="text-black dark:text-white p-2">Copy Id and Share</p>
          <div className="flex items-center space-x-4 p-4 border dark:border-dark-tertiary rounded-lg bg-gray-100 dark:bg-dark-secondary shadow-md w-full">
            <input
              type="text"
              value={id}
              readOnly
              className="w-full p-2 text-gray-700 dark:text-white border dark:border-gray-500 rounded-md bg-gray-200 dark:bg-dark-tertiary cursor-pointer"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="text-black dark:text-white p-2">{`For Join Other Member's Enter Shared Id`}</p>
          <div className="flex items-center space-x-4 p-4 border dark:border-dark-tertiary rounded-lg bg-gray-100 dark:bg-dark-secondary shadow-md w-full">
            <input
              type="text"
              value={sharedProjectId}
              onChange={(e) => setSharedProjectId(e.target.value)}
              placeholder="Enter Shared Id"
              className="w-full p-2 text-gray-700 dark:text-white border dark:border-gray-500 rounded-md bg-gray-200 dark:bg-dark-tertiary"
            />
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
              onClick={() =>
                handleUpdateAuthors(currentUserId, sharedProjectId)
              }
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModelShareModel;
