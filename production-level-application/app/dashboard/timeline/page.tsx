import ClientOnly from "@/components/global/client-only";
import TimeLinePage from "@/components/timeline";

type Props = {};

function Page({}: Props) {
  return (
    <ClientOnly>
      <TimeLinePage />
    </ClientOnly>
  );
}

export default Page;
