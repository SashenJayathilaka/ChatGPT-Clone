import ProjectPage from "@/components/project-page";

type Props = {
  params: {
    id: string;
  };
};

function Page({ params }: Props) {
  const { id } = params;

  return <ProjectPage id={id} />;
}

export default Page;
