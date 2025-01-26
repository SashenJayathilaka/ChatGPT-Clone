import ClientOnly from "@/components/global/client-only";
import PriorityPage from "@/components/priority-page";
import { Priority } from "@/types/type";

type Props = {};

function Page({}: Props) {
  return (
    <ClientOnly>
      <PriorityPage priority={Priority.Backlog} />
    </ClientOnly>
  );
}

export default Page;
