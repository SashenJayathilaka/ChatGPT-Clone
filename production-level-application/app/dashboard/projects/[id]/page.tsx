import ClientOnly from "@/components/global/client-only";
import ProjectPage from "@/components/global/project-page";

type Props = {
  params: {
    id: string;
  };
};

function Page({ params }: Props) {
  const { id } = params;

  return (
    <ClientOnly>
      <ProjectPage id={id} />
    </ClientOnly>
  );
}

export default Page;
