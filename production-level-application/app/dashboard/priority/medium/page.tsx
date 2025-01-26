import ClientOnly from "@/components/global/client-only";
import PriorityPage from "@/components/priority-page";
import { Priority } from "@/types/type";

type Props = {};

function Page({}: Props) {
  return (
    <ClientOnly>
      <PriorityPage priority={Priority.Medium} />
    </ClientOnly>
  );
}

export default Page;
