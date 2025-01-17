"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { CustomToolbar } from "../data/columns";
import { Spinner } from "../global/loader/spinner";
import Header from "../Header";
import { useAppSelector } from "../wrapper/redux";

type Props = {};

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

function UserPage({}: Props) {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <Spinner />;
  if (isError) return <div>An error has occurred</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <DataGrid
        rows={users || []}
        columns={columns}
        getRowId={(row) => row.userId}
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

export default UserPage;
