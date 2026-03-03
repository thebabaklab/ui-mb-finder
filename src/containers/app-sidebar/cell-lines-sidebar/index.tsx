import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { Button } from "@ui-kit";

export const CellLinesSidebar = () => {
  const { imgId, incuTime, incuOther, icStart, icEnd } = useSearch({ from: "/search/cell-lines" });
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    incuTime: incuTime ?? [],
    incuOther: incuOther,
    icStart: icStart,
    icEnd: icEnd,
  });

  const applyFilters = () => {
    if (filters.icEnd === 0 && filters.icEnd === 0 && !filters.incuOther && filters.incuTime.length === 0) {
      return;
    }

    navigate({
      to: "/cell-lines", search: (prev) => ({
        ...prev,
        page: 1,
        ...filters,
      })
    });
  }

  useEffect(() => {
    setFilters({
      incuTime: incuTime ?? [],
      incuOther: incuOther,
      icStart: icStart ?? 0,
      icEnd: icEnd ?? 0,
    });
  }, [imgId, incuTime, incuOther, icStart, icEnd]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      <IncubationTimeFilter inititalOtherValue={filters.incuOther} initialSelectedValues={filters.incuTime} onChange={(values) => setFilters((prev) => ({ ...prev, incuTime: values }))} onOtherChange={(value) => setFilters((prev) => ({ ...prev, incuOther: value }))} />

      <Ic50RangeFilter initialIcStart={filters.icStart} initialIcEnd={filters.icEnd} onChange={(values_ic) => setFilters((prev) => ({ ...prev, ...values_ic }))} />
    </div>
  );
};
