import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const BioDataCardSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative overflow-hidden rounded-4xl bg-primary shadow-sm")}>
      <div className="flex gap-2 rounded-t-xl px-6 py-3">
        <div className="h-6 w-32 rounded-md bg-gunmetal text-sm font-medium" />
      </div>

      <div className="flex flex-col gap-5 bg-gunmetal p-6 md:flex-row md:items-start">
        <div className="h-[165px] w-[180px] rounded-xl bg-platinum-silver" />

        <div className="flex grow flex-col gap-5">
          <div className="flex items-start gap-2">
            <div className="flex w-full flex-col gap-2">
              <div className="h-5 rounded-md bg-primary" />
              <div className="h-5 rounded-md bg-primary" />
            </div>
          </div>

          <div className="h-[280px] overflow-hidden rounded-4xl lg:h-[96px]">
            <div className="h-10 bg-platinum-silver" />
            <div className="h-full bg-platinum-silver" />
          </div>
        </div>
      </div>
    </div>
  );
};
