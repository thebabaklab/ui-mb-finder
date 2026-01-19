import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const ReferenceCardSkeleton = () => {
  return (
    <div
      className={cn(shimmer, "relative max-w-[calc(100vw_-_2.5rem)] overflow-hidden rounded-xl bg-gray-100 shadow-sm")}
    >
      <div className="flex gap-2 rounded-t-xl px-3 py-3 sm:px-6">
        <div className="h-[26px] w-6 rounded-md bg-gray-200 text-sm font-medium" />
      </div>

      <div className="flex flex-col gap-10 truncate bg-white px-3 py-6 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2 pr-7.5">
            <div className="h-6 w-6 rounded-md bg-gray-200" />
            <div className="h-6 w-full rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col gap-2 px-7.5 text-sm">
            <div className="h-5 w-64 rounded-md bg-gray-200 sm:w-80" />
            <div className="h-5 w-32 rounded-md bg-gray-200" />
            <div className="h-5 w-52 rounded-md bg-gray-200 sm:w-60" />
          </div>
        </div>

        <div className="flex flex-col gap-1 px-7.5">
          <div className="h-5 w-32 rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-full rounded-md bg-gray-200" />
          <div className="h-5 w-32 rounded-md bg-gray-200" />
        </div>

        <div className="flex justify-end bg-white px-7.5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-[calc(100vw_-_7.75rem)] rounded-xl bg-gray-200 sm:w-[191px]" />

            <div className="h-10 w-[calc(100vw_-_7.75rem)] bg-gray-200 sm:w-[198px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
