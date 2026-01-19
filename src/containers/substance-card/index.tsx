import { type FC, useState } from "react";

import { mdiFileDocumentOutline, mdiFullscreen, mdiMinus, mdiMolecule } from "@mdi/js";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import type { TSubstance } from "@types";
import { Button, Icon } from "@ui-kit";

interface SubstanceCardProps {
  substance: TSubstance;
  index: number;
}

export const SubstanceCard: FC<SubstanceCardProps> = ({ substance, index }) => {
  const navigate = useNavigate();
  const setSelectedImage = useStore((s) => s.setSelectedImage);
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
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
      queryStr: search.queryStr,
      filters: [],
      cellLinesTable: "ic50",
      complexTable: "compounds",
      compoundId: "",
      size: 5,
      title: "",
      imgId: "",
    });
    navigate({ to: "/references", search: { page: 1, imgId: substance.imageId } });
  };

  const handleCellLinesClick = () => {
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
    navigate({ to: "/cell-lines", search: { page: 1, imgId: substance.imageId } });
  };

  return (
    <div className="border-border rounded-xl border">
      <div className="bg-secondary rounded-t-xl px-6 py-3 font-semibold text-white">
        {index + 1}. ID: {substance.imageId}
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap gap-5">
          <div className="border-border relative w-fit rounded-xl border p-5">
            <img src={substance.imageUrl} alt="" className="h-[125px] w-[140px]" />

            <Button variant="icon" size="icon" className="absolute top-0 right-0" onClick={handleFullscreen}>
              <Icon name={mdiFullscreen} />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">CAS:</span>
              {substance.casNumber || <Icon name={mdiMinus} dense />}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Molecular Weight:</span>
              {substance.weight || <Icon name={mdiMinus} dense />}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">cLogP:</span>
              {substance.cLogP ? (+substance.cLogP).toFixed(2) : <Icon name={mdiMinus} dense />}
            </div>
          </div>
        </div>

        {showSmiles && <div className="text-foreground-muted font-semibold">{substance.smiles}</div>}

        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <Button size="small" className="max-w-[250px]" onClick={toggleSmiles}>
            SMILES
          </Button>

          <div className="flex flex-col gap-3 md:flex-row">
            <Button size="small" className="max-w-[250px]" onClick={handleReferencesClick}>
              <Icon name={mdiFileDocumentOutline} color="current" dense />
              References ({substance.referenceCount})
            </Button>
            <Button size="small" className="max-w-[250px]" onClick={handleCellLinesClick}>
              <Icon name={mdiMolecule} color="current" dense />
              Cell Lines ({substance.ceilLineCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
