import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff9f6]">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-8 w-8 text-[#ff4d2d]" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
