"use client";

import { useState } from "react";
import BorderView from "../global/border-view";
import ProjectHeader from "../global/project-header";
import ListView from "../list-view";
import ModelNewTask from "../modal/model-new-task";
import TableView from "../table-view";
import Timeline from "../timeline-view";

type Props = {
  id: string;
};

function ProjectPage({ id }: Props) {
  const [activeTAB, setActiveTAB] = useState("Board");
  const [isModelNewTasOpen, setIsModelNewTasOpen] = useState(false);

  return (
    <div>
      <ModelNewTask
        id={id}
        isOpen={isModelNewTasOpen}
        onClose={() => setIsModelNewTasOpen(false)}
      />
      <ProjectHeader activeTab={activeTAB} setActiveTab={setActiveTAB} />
      {activeTAB === "Board" && (
        <BorderView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
      )}
      {activeTAB === "List" && (
        <ListView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
      )}
      {activeTAB === "Timeline" && (
        <Timeline id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
      )}
      {activeTAB === "Table" && (
        <TableView id={id} setIsModelNewTasOpen={setIsModelNewTasOpen} />
      )}
    </div>
  );
}

export default ProjectPage;
