import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { Ic50RangeFilter } from "../ic50-range-filter";

export const CellLinesSidebar = () => {
  const { imgId, incuTime, incuOther, icStart, icEnd } = useSearch({ from: "/search/cell-lines" });
  const navigate = useNavigate();

  const getItems = useCallback((newFilters: Partial<{
    incuTime: number[];
    incuOther: string;
    icStart: number;
    icEnd: number;
  }>) => {
    navigate({
      to: "/cell-lines", search: (prev) => ({
        ...prev,
        page: 1,
        ...newFilters,
      })
    });
  }, [
    imgId,
    navigate
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <IncubationTimeFilter inititalOtherValue={incuOther} initialSelectedValues={incuTime} onSubmit={(value_time, value_other) => getItems({ incuTime: value_time, incuOther: value_other })} />

      <Ic50RangeFilter initialIcStart={icStart} initialIcEnd={icEnd} onSubmit={(value_icStart, value_icEnd) => getItems({ icStart: value_icStart, icEnd: value_icEnd })} />
    </div>
  );
};
