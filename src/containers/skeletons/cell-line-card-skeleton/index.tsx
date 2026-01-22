import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const CellLineCardSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative overflow-hidden rounded-4xl bg-primary shadow-sm")}>
      <div className="flex gap-2 rounded-t-xl px-6 py-3">
        <div className="h-6 w-32 rounded-md bg-gunmetal text-sm font-medium" />
      </div>

      <div className="flex flex-wrap gap-3 bg-gunmetal p-6">
        <div className="h-10 w-[188px] rounded-xl bg-primary" />

        <div className="h-10 w-[191px] rounded-xl bg-primary" />

        <div className="h-10 w-[205px] rounded-xl bg-primary" />
      </div>
    </div>
  );
};
