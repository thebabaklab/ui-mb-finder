import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const TotalRecordsSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative mt-1 overflow-hidden rounded-xl")}>
      <div className="h-5 w-60 rounded-md bg-gray-200 text-sm font-medium" />
    </div>
  );
};
