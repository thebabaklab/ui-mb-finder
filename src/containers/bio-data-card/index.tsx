import type { FC } from "react";

import { mdiFileDocumentOutline, mdiFullscreen } from "@mdi/js";
import { useStore } from "@store";
import type { TBioData } from "@types";
import { Button, DataTable, Icon, type TableItem } from "@ui-kit";

import { useBioDataHeaders } from "./hooks/useBioDataHeaders";

interface BioDataCardProps {
  bioData: TBioData;
  index: number;
}

export const BioDataCard: FC<BioDataCardProps> = ({ bioData, index }) => {
  const setSelectedImage = useStore((s) => s.setSelectedImage);
  const setDialogs = useStore((s) => s.setDialogs);
  const { headers } = useBioDataHeaders();

  const handleFullscreen = () => {
    setSelectedImage({
      title: `ID: ${bioData.name}`,
      src: bioData.compounds.imageUrl,
    });
    setDialogs(["fullscreenImage"]);
  };

  return (
    <div className="border-border rounded-xl border">
      <div className="bg-secondary rounded-t-xl px-6 py-3 font-semibold text-white">
        {index + 1}. {bioData.name}
      </div>

      <div className="flex flex-wrap items-start gap-5 p-6 md:flex-nowrap lg:flex-wrap xl:flex-nowrap">
        <div className="border-border relative w-fit min-w-[180px] rounded-xl border p-5">
          <img src={bioData.compounds.imageUrl} alt="" className="h-[125px] w-[140px]" />

          <Button variant="icon" size="icon" className="absolute top-0 right-0" onClick={handleFullscreen}>
            <Icon name={mdiFullscreen} />
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="flex items-start gap-2">
            <Icon name={mdiFileDocumentOutline} color="state-warning-foreground" className="mt-1" />

            <a
              href={`https://www.doi.org/${bioData.compounds.doi}`}
              target="_blank"
              className="text-foreground-muted line-clamp-2 font-bold underline underline-offset-2"
            >
              {bioData.compounds.title}
            </a>
          </h3>

          <div className="px-1">
            <div className="border-border overflow-hidden rounded-xl border">
              <DataTable headers={headers} items={[bioData.compounds as TableItem]} hideFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
