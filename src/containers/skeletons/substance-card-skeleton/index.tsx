import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const SubstanceCardSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative overflow-hidden rounded-4xl bg-primary shadow-sm")}>
      <div className="flex gap-2 rounded-t-xl px-6 py-3">
        <div className="h-6 w-40 rounded-md bg-gunmetal text-gunmetal font-medium" />
      </div>

      <div className="flex flex-col gap-5 truncate bg-gunmetal p-6">
        <div className="flex flex-wrap gap-5">
          <div className="h-[167px] w-[182px] rounded-xl bg-platinum-silver" />

          <div className="flex flex-col gap-2">
            <div className="h-6 w-36 rounded-md bg-primary" />
            <div className="h-6 w-48 rounded-md bg-primary" />
            <div className="h-6 w-60 rounded-md bg-primary" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3  md:flex-row">
          <div className="h-10 w-[250px] rounded-xl bg-platinum-silver md:w-[115px]" />

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="h-10 w-[250px] rounded-xl bg-primary md:w-[188px]" />

            <div className="h-10 w-[250px] rounded-xl bg-primary md:w-[177px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
