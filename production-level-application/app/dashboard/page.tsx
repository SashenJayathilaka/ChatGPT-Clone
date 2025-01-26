import ClientOnly from "@/components/global/client-only";
import RootHomePage from "@/components/home-page/root-home-page";

type Props = {};

async function Page({}: Props) {
  return (
    <ClientOnly>
      <RootHomePage />
    </ClientOnly>
  );
}

export default Page;
