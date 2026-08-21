import { type FC, useState } from "react";
import { mdiFullscreen, mdiMinus } from "@mdi/js";
import { useStore } from "@store";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { TSubstance } from "@types";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";
import biodataIcon from "@assets/img/biodata-icon.svg";
import referenceIcon from "@assets/img/references-icon.svg";

interface SubstanceCardProps {
  substance: TSubstance;
  index: number;
}

export const SubstanceCard: FC<SubstanceCardProps> = ({ substance, index }) => {
  const navigate = useNavigate();
  // Carry the active filters into the drill-downs so the counts on these buttons
  // match what opens (cards are only ever rendered on filterable routes).
  const { filters } = useSearch({ strict: false });
  const setSelectedImage = useStore((s) => s.setSelectedImage);
  const setDialogs = useStore((s) => s.setDialogs);
  const setSearch = useStore((s) => s.setSearch);
  const [showSmiles, setShowSmiles] = useState(false);

  const handleFullscreen = () => {
    setSelectedImage({
      title: `ID: ${substance.imageId}`,
      src: substance.imageUrl,
    });
    setDialogs(["fullscreenImage"]);
  };

  const toggleSmiles = () => setShowSmiles(!showSmiles);

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
    navigate({ to: "/references", search: { page: 1, imgId: substance.imageId, filters } });
  };

  const handleBioDataClick = () => {
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
    navigate({ to: "/substances/bio-data/$imgId", params: { imgId: substance.imageId }, search: { page: 1, filters } });
  };

  return (
    <div className="border-primary rounded-4xl border">
      <div className="bg-primary rounded-full px-8 py-4 font-bold text-base text-gunmetal">
        {index}. ID: {substance.imageId}
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap gap-10">
          <div className="border-primary relative w-fit rounded-4xl border p-3">
            <img src={substance.imageUrl} alt={substance.imageId} className="border-1 border-platinum-silver bg-platinum-silver rounded-3xl h-[200px] w-[240px] object-contain" />

            <Button variant="transparent" size="icon" className="absolute top-6 right-6" onClick={handleFullscreen}>
              <Icon name={mdiFullscreen} />
            </Button>
          </div>

          <div className="flex flex-col gap-2 text-white font-light">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">Name:</span>
              {substance.name || <Icon name={mdiMinus} dense />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">CAS:</span>
              {substance.casNumber || <Icon name={mdiMinus} dense />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">Molecular Weight:</span>
              {substance.weight || <Icon name={mdiMinus} dense />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">cLogP:</span>
              {substance.cLogP ? (+substance.cLogP).toFixed(2) : <Icon name={mdiMinus} dense />}
            </div>
          </div>
        </div>

        {showSmiles && <div className="text-white font-light break-all">{substance.smiles}</div>}

        <div className={cn("flex flex-col justify-between items-center gap-3 md:flex-row", showSmiles ? "mt-0" : "mt-11")}>
          <Button variant={"back"} size="small" className="text-base font-light py-6 max-w-[250px]" onClick={toggleSmiles}>
            SMILES
          </Button>

          <div className="flex flex-col gap-3 md:flex-row">
            <Button variant={"transparent"} size="small" className="text-primary text-base font-light" onClick={handleBioDataClick}>
              <img className="w-[25px]" src={biodataIcon} aria-hidden="true" />
              View Bio Data ({substance.bioDataCount})
            </Button>
            <Button variant={"transparent"} size="small" className="text-primary text-base font-light" onClick={handleReferencesClick}>
              <img className="w-[20px]" src={referenceIcon} aria-hidden="true" />
              References ({substance.referenceCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
