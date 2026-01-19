import { cn } from "@utils";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const SubstanceCardSkeleton = () => {
  return (
    <div className={cn(shimmer, "relative overflow-hidden rounded-xl bg-gray-100 shadow-sm")}>
      <div className="flex gap-2 rounded-t-xl px-6 py-3">
        <div className="h-6 w-40 rounded-md bg-gray-200 text-sm font-medium" />
      </div>

      <div className="flex flex-col gap-5 truncate bg-white p-6">
        <div className="flex flex-wrap gap-5">
          <div className="h-[167px] w-[182px] rounded-xl bg-gray-200" />

          <div className="flex flex-col gap-2">
            <div className="h-6 w-36 rounded-md bg-gray-200" />
            <div className="h-6 w-48 rounded-md bg-gray-200" />
            <div className="h-6 w-60 rounded-md bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 bg-white md:flex-row">
          <div className="h-10 w-[250px] rounded-xl bg-gray-200 md:w-[115px]" />

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="h-10 w-[250px] rounded-xl bg-gray-200 md:w-[188px]" />

            <div className="h-10 w-[250px] rounded-xl bg-gray-200 md:w-[177px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
