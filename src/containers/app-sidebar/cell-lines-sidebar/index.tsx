import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { Button } from "@ui-kit";

export const CellLinesSidebar = () => {
  const { imgId, incuTime, incuOther, incuTime_op, icStart, icEnd, ic_op } = useSearch({ from: "/search/cell-lines" });
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    incuTime: incuTime ?? [],
    incuOther: incuOther,
    incuTime_op: incuTime_op,
    icStart: icStart,
    icEnd: icEnd,
    ic_op: ic_op,
  });

  const applyFilters = () => {
    // if (filters.icEnd === 0 && filters.icEnd === 0 && !filters.incuOther && filters.incuTime.length === 0) {
    //   return;
    // }

    if (!filters.incuTime.length && !filters.incuOther)
      filters.incuTime_op = undefined;

    if (!filters.icStart && !filters.icEnd)
      filters.ic_op = undefined;

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
      incuTime_op: incuTime_op,
      icStart: icStart ?? 0,
      icEnd: icEnd ?? 0,
      ic_op: ic_op,
    });
  }, [imgId, incuTime, incuOther, incuTime_op, icStart, icEnd, ic_op]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      <IncubationTimeFilter inititalOtherValue={filters.incuOther} initialSelectedValues={filters.incuTime} logicalOperator={filters.incuTime_op} onChange={(values) => setFilters((prev) => ({ ...prev, incuTime: values }))} onOtherChange={(value) => setFilters((prev) => ({ ...prev, incuOther: value }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, incuTime_op: value }))} />

      <Ic50RangeFilter initialIcStart={filters.icStart} initialIcEnd={filters.icEnd} logicalOperator={filters.ic_op} onChange={(values_ic) => setFilters((prev) => ({ ...prev, ...values_ic }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, ic_op: value }))} />
    </div>
  );
};
