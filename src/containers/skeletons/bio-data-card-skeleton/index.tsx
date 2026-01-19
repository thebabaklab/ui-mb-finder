import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const BioDataCardSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative overflow-hidden rounded-xl bg-gray-100 shadow-sm")}>
      <div className="flex gap-2 rounded-t-xl px-6 py-3">
        <div className="h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
      </div>

      <div className="flex flex-col gap-5 bg-white p-6 md:flex-row md:items-start">
        <div className="h-[165px] w-[180px] rounded-xl bg-gray-200" />

        <div className="flex grow flex-col gap-5">
          <div className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-md bg-gray-200" />
            <div className="flex w-full flex-col gap-2">
              <div className="h-5 rounded-md bg-gray-200" />
              <div className="h-5 rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="h-[280px] overflow-hidden rounded-xl lg:h-[96px]">
            <div className="h-10 bg-gray-200" />
            <div className="h-full bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
