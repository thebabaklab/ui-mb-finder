import { useCallback } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";

export const BioDataSidebar = () => {
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { incuTime, incuOther, icStart, icEnd } = useSearch({
    from: "/search/cell-lines/bio-data/$cellId",
  });
  const navigate = useNavigate();

  const getItems = useCallback((newFilters: Partial<{
    incuTime: number[];
    incuOther: string;
    icStart: number;
    icEnd: number;
  }>) => {
    navigate({
      to: "/cell-lines/bio-data/$cellId", params: { cellId: cellId }, search: (prev) => ({
        ...prev,
        page: 1,
        ...newFilters,
      })
    });
  }, [
    cellId,
    navigate
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <IncubationTimeFilter inititalOtherValue={incuOther} initialSelectedValues={incuTime} onSubmit={(value_time, value_other) => getItems({ incuTime: value_time, incuOther: value_other })} />

      <Ic50RangeFilter initialIcStart={icStart} initialIcEnd={icEnd} onSubmit={(value_icStart, value_icEnd) => getItems({ icStart: value_icStart, icEnd: value_icEnd })} />
    </div>
  );
};

