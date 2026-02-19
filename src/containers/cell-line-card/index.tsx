import type { FC } from "react";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import { type TCellLine } from "@types";
import { Button } from "@ui-kit";
import biodataIcon from "@assets/img/biodata-icon.svg";
import substanceIcon from "@assets/img/substances-icon.svg";
import referenceIcon from "@assets/img/references-icon.svg";

interface CellLineCardProps {
  cellLine: TCellLine;
  index: number;
}

export const CellLineCard: FC<CellLineCardProps> = ({ cellLine, index }) => {
  const navigate = useNavigate();
  const setSearch = useStore((s) => s.setSearch);

  const handleSubstancesClick = () => {
    setSearch({
      queryStr: "",
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
      queryStr: "",
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
    <div className="border-primary rounded-4xl border">
      <div className="bg-primary rounded-full px-6 py-3 font-bold text-gunmetal">
        {index}. {cellLine.name}
      </div>

      <div className="flex flex-wrap gap-3 p-6">
        <Button variant={"transparent"} className="text-primary text-base font-light" size="small" onClick={handleSubstancesClick}>
          <img className="w-[22px]" src={substanceIcon} aria-hidden="true" />
          Substances ({cellLine.substancesCount})
        </Button>

        <Button variant={"transparent"} className="text-primary text-base font-light" size="small" onClick={handleReferencesClick}>
          <img className="w-[20px]" src={referenceIcon} aria-hidden="true" />
          References ({cellLine.referenceCount})
        </Button>

        <Button variant={"transparent"} className="text-primary text-base font-light" size="small" onClick={handleBioDataClick}>
          <img className="w-[25px]" src={biodataIcon} aria-hidden="true" />
          View Bio Data ({cellLine.bioDataCount})
        </Button>
      </div>
    </div>
  );
};
