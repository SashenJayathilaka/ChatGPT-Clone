import Header from "@/components/header";
import ModalNewProject from "@/components/modal/modal-new-project";
import ModelShareModel from "@/components/modal/model-share-project";
import {
  useDeleteProjectMutation,
  useGetUserQuery,
  useRemoveUserFromTaskMutation,
} from "@/state/api";
import { ProjectTypes } from "@/types/type";
import {
  Clock,
  Filter,
  Grid3x3,
  Grid3X3,
  List,
  LogOut,
  PlusSquare,
  Share2,
  Table,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import TabButton from "../tab-button";

type Props = {
  id: string;
  userId?: string;
  activeTab: string;
  projectsUserId?: ProjectTypes;
  setActiveTab: (tabName: string) => void;
};

function ProjectHeader({
  activeTab,
  setActiveTab,
  id,
  userId,
  projectsUserId,
}: Props) {
  if (!userId) {
    return <p>User ID is required.</p>; //TODO: Or any other fallback UI
  }
  const router = useRouter();

  const { data: user, error } = useGetUserQuery({ userId });
  const [deleteProject] = useDeleteProjectMutation();
  const [removeUsers, { error: removeUser }] = useRemoveUserFromTaskMutation();
  const [sharedProjectId, setSharedProjectId] = useState("");

  const [isModalNameProjectOpen, setIsModalNameProjectOpen] = useState(false);
  const [isModelShareProjectOpen, setIsModelShareProjectOpen] = useState(false);

  /*   const handleUpdateAuthors = async (authorIds: string, sProjectId: string) => {
    if (!authorIds) return;
    if (!sProjectId) return;

    try {
      await updateProjectAuthors({
        projectId: sProjectId,
        userId: authorIds,
      }).then(() => setIsModalNameProjectOpen(false));
    } catch (error: any) {
      console.log("🚀 ~ handleUpdateAuthors ~ error:", error);
    }
  }; */

  const handleRemoveAuthor = async (userId: string, projectId: string) => {
    if (!userId) return;
    if (!projectId) return;

    try {
      await removeUsers({
        projectId: projectId,
        userId: userId,
      }).then(() =>
        toast.warning("Leave Project Successfully!", {
          position: "bottom-right",
        })
      );
      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error removing user from Project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!projectId) {
      console.error("projectId is undefined or invalid");
      return;
    }

    try {
      deleteProject({ projectId }).then(() =>
        toast.warning("Project Delete Successfully!", {
          position: "bottom-right",
        })
      );
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting Project:", error);
    }
  };

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNameProjectOpen}
        onClose={() => setIsModalNameProjectOpen(false)}
      />
      <ModelShareModel
        id={id}
        currentUserId={String(user?.id)}
        sharedProjectId={sharedProjectId}
        setSharedProjectId={setSharedProjectId}
        isOpen={isModelShareProjectOpen}
        onClose={() => setIsModelShareProjectOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <div className="flex justify-center gap-x-3">
              {/*  <CreateOrganization /> */}

              <button
                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNameProjectOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5" /> New Board
              </button>
              <button
                className="flex items-center rounded-md bg-green-400 px-3 py-2 hover:text-white hover:bg-green-600"
                onClick={() => setIsModelShareProjectOpen(true)}
              >
                <Users className="mr-2 h-5 w-5" /> Invite or Join
              </button>
              {projectsUserId?.userId === user?.id ? (
                <button
                  className="flex items-center rounded-md bg-red-300 px-3 py-2 hover:text-white hover:bg-red-600"
                  onClick={() => handleDelete(id)}
                >
                  <Trash2 className="mr-2 h-5 w-5" /> Delete
                </button>
              ) : (
                <button
                  className="flex items-center rounded-md bg-red-300 px-3 py-2 hover:text-white hover:bg-red-600"
                  onClick={() =>
                    handleRemoveAuthor(
                      String(user?.id),
                      String(projectsUserId?.id)
                    )
                  }
                >
                  <LogOut className="mr-2 h-5 w-5" /> Leave
                </button>
              )}
            </div>
          }
        />
      </div>
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<List className="h5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;
