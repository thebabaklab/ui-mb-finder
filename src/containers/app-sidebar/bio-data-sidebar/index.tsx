import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { Button } from "@ui-kit";

export const BioDataSidebar = () => {
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { incuTime, incuOther, icStart, icEnd } = useSearch({
    from: "/search/cell-lines/bio-data/$cellId",
  });
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    incuTime: incuTime ?? [],
    incuOther: incuOther,
    icStart: icStart,
    icEnd: icEnd,
  });

  const applyFilters = () => {
    navigate({
      to: "/cell-lines/bio-data/$cellId", params: { cellId: cellId }, search: (prev) => ({
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
  }, [cellId, incuTime, incuOther, icStart, icEnd]);

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

