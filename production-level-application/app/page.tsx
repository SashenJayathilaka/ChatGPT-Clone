import ClientOnly from "@/components/global/client-only";
import HomeNavBar from "@/components/navbar/home";

type Props = {};

function Page({}: Props) {
  return (
    <ClientOnly>
      <HomeNavBar />
    </ClientOnly>
  );
}

export default Page;
