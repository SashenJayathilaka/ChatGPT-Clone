"use client";

import ModelNewTask from "@/components/modal/model-new-task";
import { useGetProjectsQuery } from "@/state/api";
import { ProjectTypes } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import BorderView from "../border-view";
import ClientOnly from "../client-only";
import ListView from "../list-view";
import ProjectHeader from "../project-header";
import TableView from "../table-view";
import Timeline from "../timeline-view";

type Props = {
  id: string;
};

function ProjectPage({ id }: Props) {
  const { user } = useUser();
  const [activeTAB, setActiveTAB] = useState("Board");
  const [filterData, setFilterData] = useState<ProjectTypes>();
  const [isModelNewTasOpen, setIsModelNewTasOpen] = useState(false);
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  useEffect(() => {
    const filterData = projects?.find((p) => String(p.id) === String(id));
    setFilterData(filterData);
  }, [id, projects]);

  return (
    <div>
      <ModelNewTask
        id={id}
        userId={user?.id}
        isOpen={isModelNewTasOpen}
        onClose={() => setIsModelNewTasOpen(false)}
      />
      <ProjectHeader
        id={id}
        userId={user?.id}
        activeTab={activeTAB}
        setActiveTab={setActiveTAB}
        projectsUserId={filterData}
      />
      {activeTAB === "Board" && (
        <ClientOnly>
          <BorderView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
        </ClientOnly>
      )}
      {activeTAB === "List" && (
        <ClientOnly>
          <ListView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
        </ClientOnly>
      )}
      {activeTAB === "Timeline" && (
        <ClientOnly>
          <Timeline id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
        </ClientOnly>
      )}
      {activeTAB === "Table" && (
        <ClientOnly>
          <TableView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
        </ClientOnly>
      )}
    </div>
  );
}

export default ProjectPage;
