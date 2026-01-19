import type { FC } from "react";

import { mdiFileDocumentOutline, mdiFlask, mdiMolecule } from "@mdi/js";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import type { TReference } from "@types";
import { Button, Icon } from "@ui-kit";

import { CollapsibleContent } from "./collapsible-content";

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
    <div className="border-border max-w-[calc(100vw_-_2.5rem)] rounded-xl border sm:max-w-none">
      <div className="bg-secondary rounded-t-xl px-4.5 py-3 text-lg font-semibold text-white sm:px-7.5">
        {index + 1}
      </div>

      <div className="flex flex-col gap-10 px-3 py-6 sm:p-6">
        <div className="flex flex-col gap-5">
          <h3 className="flex items-start gap-2">
            <Icon name={mdiFileDocumentOutline} color="state-warning-foreground" className="mt-1" />

            <a
              href={`https://www.doi.org/${reference.doi}`}
              className="font-bold underline underline-offset-2"
              target="_blank"
            >
              {reference.title}
            </a>
          </h3>

          <div className="flex flex-col gap-2 px-7.5 text-sm">
            <div>
              <span className="mr-2 font-bold">Authors:</span>
              {reference.authors}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Publication year:</span>
              {reference.year}
            </div>
            <div className="flex gap-2">
              <span className="font-bold">DOI:</span>
              {reference.doi}
            </div>
          </div>
        </div>

        <CollapsibleContent>{reference.abstract}</CollapsibleContent>

        <div className="flex flex-col justify-end gap-3 px-7.5 sm:flex-row">
          <Button size="small" onClick={handleSubstancesClick}>
            <Icon name={mdiFlask} color="current" dense />
            Substances ({reference.substancesCount})
          </Button>
          <Button size="small" onClick={handleCellLinesClick}>
            <Icon name={mdiMolecule} color="current" dense />
            Cell Lines ({reference.ceilLinesCount})
          </Button>
        </div>
      </div>
    </div>
  );
};
