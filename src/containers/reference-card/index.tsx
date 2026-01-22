import type { FC } from "react";

import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import type { TReference } from "@types";
import { Button } from "@ui-kit";

import { CollapsibleContent } from "./collapsible-content";
import substanceIcon from "@assets/img/substances-icon.svg";
import celllineIcon from "@assets/img/cell_lines-icon.svg";


interface ReferenceCardProps {
  reference: TReference;
  index: number;
}

export const ReferenceCard: FC<ReferenceCardProps> = ({ reference, index }) => {
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
    navigate({ to: "/substances", search: { page: 1, title: reference.title } });
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
    navigate({ to: "/cell-lines", search: { page: 1, title: reference.title } });
  };

  return (
    <div className="border-primary max-w-[calc(100vw_-_2.5rem)] rounded-4xl border sm:max-w-none">
      <div className="bg-primary rounded-full px-4 py-4 text-lg font-bold text-gunmetal sm:px-8">
        {index + 1}.
      </div>

      <div className="flex flex-col gap-10 px-3 py-6 sm:p-6">
        <div className="flex flex-col gap-5">
          <h3 className="flex items-start gap-2">
            <a
              href={`https://www.doi.org/${reference.doi}`}
              className="font-bold text-primary"
              target="_blank"
            >
              {reference.title}
            </a>
          </h3>

          <div className="flex flex-col gap-2 text-white text-base font-light">
            <div>
              <span className="mr-2 font-bold text-primary">Authors:</span>
              {reference.authors}
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-primary">Publication year:</span>
              {reference.year}
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-primary">DOI:</span>
              {reference.doi}
            </div>
          </div>
        </div>

        <CollapsibleContent>{reference.abstract}</CollapsibleContent>

        <div className="flex flex-col justify-end gap-3 sm:flex-row">
          <Button variant={"transparent"} className="text-primary text-base font-light" size="small" onClick={handleSubstancesClick}>
            {/* <Icon name={mdiFlask} color="current" dense /> */}
            <img className="w-[22px]" src={substanceIcon} aria-hidden="true" />
            Substances ({reference.substancesCount})
          </Button>
          <Button variant={"transparent"} className="text-primary text-base font-light" size="small" onClick={handleCellLinesClick}>
            {/* <Icon name={mdiMolecule} color="current" dense /> */}
            <img className="w-[22px]" src={celllineIcon} aria-hidden="true" />
            Cell Lines ({reference.ceilLinesCount})
          </Button>
        </div>
      </div>
    </div>
  );
};
