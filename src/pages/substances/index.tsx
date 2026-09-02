import { useCallback, useEffect } from "react";
import {
  FilterDialog,
  FullscreenImageDialog,
  NoDataFound,
  PaginationSection,
  SubstanceCard,
  SubstanceCardSkeleton,
} from "@containers";
import { mdiChevronLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { API_BASE_URL, cn } from "@utils";
import axios from "axios";
import { ENUM_SEARCH_FIELD_TYPE, type TSearchField } from "@types";

type TValidSearchField = Exclude<
  TSearchField,
  { type: "" } | { type: "error" }
>;

type ApiFilter = {
  filterType: string;
  filterValue: any;
}

type ApiGroup = {
  operator?: string;
  negate?: boolean;
  conditions: (ApiFilter | ApiGroup)[];
}

function isValidSearchField(filter: TSearchField): filter is TValidSearchField {
  return filter.type !== "" && filter.type !== "error";
}

const getFieldValues = (filter: TSearchField) => {
  switch (filter.type) {
    case ENUM_SEARCH_FIELD_TYPE.Author:
      return filter.values.author;
    case ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber:
      return filter.values.cas;
    case ENUM_SEARCH_FIELD_TYPE.Smiles:
      return filter.values.smiles;
    case ENUM_SEARCH_FIELD_TYPE.ClinicalDrug:
      return filter.values.cliDrug;
    case ENUM_SEARCH_FIELD_TYPE.Doi:
      return filter.values.doi;
    case ENUM_SEARCH_FIELD_TYPE.Method:
      return filter.values.method;
    case ENUM_SEARCH_FIELD_TYPE.CellLines:
      return filter.values.cellLine;
    case ENUM_SEARCH_FIELD_TYPE.IC50Range:
      return { "startIC50": filter.values.icStart, "endIC50": filter.values.icEnd };
    case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
      return filter.values.incuOther ? [...filter.values.incuTime, Number(filter.values.incuOther)] : [...filter.values.incuTime];
    case ENUM_SEARCH_FIELD_TYPE.MolecularWeight:
      return { "startWeight": filter.values.weightStart, "endWeight": filter.values.weightEnd };
    case ENUM_SEARCH_FIELD_TYPE.PublicationYear:
      return { "startYear": filter.values.pyearStart, "endYear": filter.values.pyearEnd };
  }
}

export function buildFilters(filters: TSearchField[]): any | null {
  const validFilters = filters.filter(isValidSearchField);

  if (!validFilters.length) return null;

  let result = {};
  let currentGroup: ApiGroup | null = null;

  validFilters.forEach((filter, index) => {
    const apiFilter: ApiFilter = {
      filterType: filter.type,
      filterValue: getFieldValues(filter),
    }

    if (!currentGroup) {
      currentGroup = {
        operator: validFilters.length === 1 ? "AND" : filter.logicalOperator ?? "AND",
        conditions: [apiFilter],
      }

      if (filter.negate)
        currentGroup.negate = filter.negate;

      result = currentGroup;
      return;
    }

    const prevOperator = validFilters[index - 1]?.logicalOperator;
    const prevNegate = validFilters[index - 1]?.negate;

    if (index === validFilters.length - 1) {
      if (filter.negate !== prevNegate) {
        const prevGroup = currentGroup;

        currentGroup = {
          operator: prevOperator,
          negate: filter.negate ?? false,
          conditions: [apiFilter],
        }

        prevGroup.conditions.push(currentGroup);
        return;
      }

      currentGroup.conditions.push(apiFilter);
      return;
    }

    if (filter.logicalOperator === prevOperator && filter.negate === prevNegate) {
      currentGroup.conditions.push(apiFilter);
    }
    else {
      const prevGroup = currentGroup;

      currentGroup = {
        operator: filter.logicalOperator ?? "AND",
        negate: filter.negate ?? false,
        conditions: [apiFilter],
      }

      prevGroup.conditions.push(currentGroup);
    }
  })

  return result;
}


export const SubstancesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, title, ceillineName, queryStr, searchBy, filters: filtersString } = useSearch({ from: "/search/substances", });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const substances = useStore((s) => s.substances);
  const setSubstances = useStore((s) => s.setSubstances);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = Number(page);

  const getSubstances = useCallback(async () => {
    try {
      setLoading(true);
      let apiFilters = null;

      if (filtersString)
        apiFilters = buildFilters(JSON.parse(filtersString));

      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/get-substances`,
        {
          ...search,
          queryStr,
          searchBy,
          currentPage,
          paper_id: title,
          ceil_line_name: ceillineName,
          filters: apiFilters ? apiFilters : {},
        },
      );
      setSubstances(Array.isArray(data?.data) ? data.data : []);
      setTotalPages(data?.meta?.last_page ?? 1);
      setTotalRecords(data?.meta?.total ?? 0);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, title, ceillineName, queryStr, searchBy, filtersString]);
  // }, [search, currentPage, title, ceillineName, queryStr, smiles, cliDrug, cas, incuTime, incuOther, weightStart, weightEnd]);

  useEffect(() => {
    void getSubstances();
  }, [page, title, ceillineName, queryStr, searchBy, filtersString]);
  // }, [page, title, ceillineName, queryStr, smiles, cliDrug, cas, incuTime, incuOther, weightStart, weightEnd]);

  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          "flex",
          // queryStr || title || ceillineName || smiles || cliDrug || cas || incuTime || incuOther || weightStart || weightEnd ? "justify-between" : "justify-end lg:hidden",
          "justify-between",
        )}
      >
        <Button variant="back" size="small" className="w-fit text-base font-light pl-2 pr-4 py-2" onClick={() => back()}>
          <Icon name={mdiChevronLeft} color="current" large />
          Back
        </Button>

        <Button variant="back" size="small" className="w-fit text-base font-light px-4 py-2 lg:hidden" onClick={() => setDialogs(["filter"])}>
          <Icon name={mdiFilterOutline} color="current" dense />
          Filter
        </Button>

        <FilterDialog />
      </div>

      {loading ? (
        <>
          <SubstanceCardSkeleton />
          <SubstanceCardSkeleton />
          <SubstanceCardSkeleton />
        </>
      ) : substances.length ? (
        <>
          {substances.map((substance, i) => (
            <SubstanceCard key={i + 1} substance={substance} index={search.size * (currentPage - 1) + i + 1} />
          ))}

          {!!substances.length && totalPages > 1 && (
            <PaginationSection currentPage={page || 1} length={totalPages} />
          )}

          <FullscreenImageDialog />
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
