import type { FC } from "react";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import { type TCellLine } from "@types";
import { mdiAlertOutline } from "@mdi/js";
import { Button, Icon } from "@ui-kit";
import biodataIcon from "@assets/img/biodata-icon.svg";
import substanceIcon from "@assets/img/substances-icon.svg";
import referenceIcon from "@assets/img/references-icon.svg";

/** One entry per species, linked to the first Cellosaurus line of that species. */
const cellLineSpecies = (cellLine: TCellLine) => {
  const seen = new Set<string>();

  return (cellLine.cellosaurus ?? []).filter(({ species }) => {
    if (!species || seen.has(species)) return false;
    seen.add(species);
    return true;
  }) as { accession: string; species: string }[];
};

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
        {/* Shown so a tissue search makes sense of its own results — without it
            a search for "Bladder" returns a list of codes and no reason why. */}
        {cellLine.tissue && <span className="font-light"> · {cellLine.tissue}</span>}
        {/* Each species links to its line's Cellosaurus page — the place to
            check what the line really is (contamination warnings included).
            A name with several meanings (CH1) can have several. */}
        {cellLineSpecies(cellLine).map(({ accession, species }) => (
          <span key={accession} className="font-light">
            {" · "}
            <a
              className="hover:underline"
              href={`https://www.cellosaurus.org/${accession}`}
              target="_blank"
              rel="noreferrer"
              title="Open this cell line in Cellosaurus"
            >
              {species}
            </a>
          </span>
        ))}
        {/* Only when a synonym, not the code, is what the search found — so a
            search for "Michigan Cancer Foundation" says why MCF-7 came back. */}
        {cellLine.matchedSynonym && (
          <span className="block text-sm font-light italic sm:inline">
            {" "}
            — matched “{cellLine.matchedSynonym}”
          </span>
        )}
      </div>

      {/* Cellosaurus flags lines shown to be something other than their name
          says — SGC-7901 is a HeLa derivative — which changes how its results
          read. Its literature references are left to the linked page. */}
      {(cellLine.cellosaurus ?? [])
        .filter(({ warning }) => warning)
        .map(({ accession, warning }) => (
          <p key={accession} className="text-secondary flex items-start gap-2 px-6 pt-4 text-sm font-light">
            <Icon name={mdiAlertOutline} color="current" dense className="mt-0.5 shrink-0" />
            <span>
              {warning!.replace(/\s*\(PubMed=[^)]*\)/g, "")}{" "}
              <a
                className="underline hover:text-white"
                href={`https://www.cellosaurus.org/${accession}`}
                target="_blank"
                rel="noreferrer"
              >
                Cellosaurus
              </a>
            </span>
          </p>
        ))}

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
