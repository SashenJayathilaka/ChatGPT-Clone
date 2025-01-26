/* eslint-disable @next/next/no-img-element */
"use client";

import ModalNewProject from "@/components/modal/modal-new-project";
import { useCreateUserMutation, useGetProjectsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { PlusSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import HomePage from "..";

type Props = {};

function RootHomePage({}: Props) {
  const { isSignedIn, user } = useUser();
  const [createUser] = useCreateUserMutation();
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const [isModalNameProjectOpen, setIsModalNameProjectOpen] = useState(false);

  const createCurrentUser = useMemo(
    () => async () => {
      if (user?.id) {
        await createUser({
          firstName: user.firstName! || user.username!,
          secondName: user.lastName! || "",
          profilePictureUrl: user.firstName
            ? user.imageUrl
            : `https://api.dicebear.com/9.x/initials/png?seed=${user.username}`,
          clerkId: user.id,
        });
      }
    },
    [
      createUser,
      user?.firstName,
      user?.id,
      user?.imageUrl,
      user?.lastName,
      user?.username,
    ]
  );

  useEffect(() => {
    createCurrentUser();
  }, [createCurrentUser, user?.id]);

  return (
    <div>
      {projects && projects.length > 0 ? (
        <HomePage projectId={projects[0].id} project={projects} />
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <img
            src="https://projectvectors.com.au/_next/image?url=%2Fimages%2Fmanagement.png&w=1080&q=75"
            alt="img"
            className="w-[500px]"
          />
          <p className="text-black dark:text-white text-lg font-semibold mt-4">
            {`Currently You Don't have Project`}
          </p>
          <div className="flex justify-center mt-4 gap-x-2">
            <ModalNewProject
              isOpen={isModalNameProjectOpen}
              onClose={() => setIsModalNameProjectOpen(false)}
            />
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600 w-full"
              onClick={() => setIsModalNameProjectOpen(true)}
            >
              <PlusSquare className="mr-1 h-5 w-5" /> New Board
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RootHomePage;
