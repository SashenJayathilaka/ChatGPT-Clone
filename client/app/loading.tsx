import { Spinner } from "@/components/global/loader/spinner";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;
