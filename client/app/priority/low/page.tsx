import PriorityPage from "@/components/priorityPage";
import { Priority } from "@/types/type";

type Props = {};

function Page({}: Props) {
  return <PriorityPage priority={Priority.Low} />;
}

export default Page;
