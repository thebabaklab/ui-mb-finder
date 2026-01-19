import type { FC } from "react";

import { mdiAtom, mdiFileDocumentOutline, mdiFlask } from "@mdi/js";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import type { TCellLine } from "@types";
import { Button, Icon } from "@ui-kit";

interface CellLineCardProps {
  cellLine: TCellLine;
  index: number;
}

export const CellLineCard: FC<CellLineCardProps> = ({ cellLine, index }) => {
  const navigate = useNavigate();
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);

  const handleSubstancesClick = () => {
    setSearch({
      queryStr: search.queryStr,
      filters: [],
      cellLinesTable: "ic50",
      complexTable: "compounds",
      compoundId: "",
      size: 5,
      title: "",
      imgId: "",
    });
    navigate({ to: "/substances", search: { page: 1, ceillineName: cellLine.name } });
  };

  const handleReferencesClick = () => {
    setSearch({
      queryStr: search.queryStr,
      filters: [],
      cellLinesTable: "ic50",
      complexTable: "compounds",
      compoundId: "",
      size: 5,
      title: "",
      imgId: "",
    });
    navigate({ to: "/references", search: { page: 1, ceillineName: cellLine.name } });
  };

  const handleBioDataClick = () => {
    navigate({ to: "/cell-lines/bio-data/$cellId", params: { cellId: cellLine.id }, search: { page: 1 } });
  };

  return (
    <div className="border-border rounded-xl border">
      <div className="bg-secondary rounded-t-xl px-6 py-3 font-semibold text-white">
        {index + 1}. {cellLine.name}
      </div>

      <div className="flex flex-wrap gap-3 p-6">
        <Button size="small" onClick={handleSubstancesClick}>
          <Icon name={mdiFlask} color="current" dense />
          Substances ({cellLine.substancesCount})
        </Button>

        <Button size="small" onClick={handleReferencesClick}>
          <Icon name={mdiFileDocumentOutline} color="current" dense />
          References ({cellLine.referenceCount})
        </Button>

        <Button size="small" onClick={handleBioDataClick}>
          <Icon name={mdiAtom} color="current" dense />
          View Bio Data ({cellLine.bioDataCount})
        </Button>
      </div>
    </div>
  );
};
