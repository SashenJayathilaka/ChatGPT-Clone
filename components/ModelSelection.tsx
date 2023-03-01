"use client";

import React from "react";
import Select from "react-select";
import useSWR from "swr";

type Props = {};

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

function ModelSelection({}: Props) {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  // console.log(models);

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOption}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
