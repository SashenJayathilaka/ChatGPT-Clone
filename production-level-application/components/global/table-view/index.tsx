import { columns } from "@/components/data/columns";
import Header from "@/components/header";
import { useAppSelector } from "@/components/wrapper/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import { Spinner } from "../loader/spinner";

type Props = {
  id: string;
  setIsModelNewTasOpen: (isOpen: boolean) => void;
};

function TableView({ id, setIsModelNewTasOpen }: Props) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: id });

  if (isLoading) return <Spinner />;
  if (error) return <div>An error has occurred</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModelNewTasOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}

export default TableView;
