import { useParams, useSearch } from "@tanstack/react-router";

import { BioDataView } from "./bio-data-view";

export const BioDataPage = () => {
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { page, filters } = useSearch({ from: "/search/cell-lines/bio-data/$cellId" });

  return <BioDataView scope={{ cellId }} page={page} filtersString={filters} />;
};

export const SubstanceBioDataPage = () => {
  const { imgId } = useParams({ from: "/search/substances/bio-data/$imgId" });
  const { page, filters } = useSearch({ from: "/search/substances/bio-data/$imgId" });

  return <BioDataView scope={{ imgId }} page={page} filtersString={filters} />;
};
