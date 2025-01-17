"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTeamsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomToolbar } from "../data/columns";
import { Spinner } from "../global/loader/spinner";
import Header from "../Header";
import { useAppSelector } from "../wrapper/redux";

type Props = {};

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 150 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

function TeamPage({}: Props) {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <Spinner />;
  if (isError) return <div>An error has occurred</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <DataGrid
        rows={teams || []}
        columns={columns}
        pagination
        slots={{
          toolbar: CustomToolbar,
        }}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}

export default TeamPage;
