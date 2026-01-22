import type { FC } from "react";

import { mdiFullscreen } from "@mdi/js";
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
    <div className="border-primary rounded-4xl border">
      <div className="bg-primary rounded-full px-6 py-3 font-bold text-gunmetal">
        {index + 1}. {bioData.name}
      </div>

      <div className="flex flex-wrap items-start gap-10 p-6 md:flex-nowrap lg:flex-wrap xl:flex-nowrap">
        <div className="border-primary relative w-fit rounded-4xl border p-3">
          <img src={bioData.compounds.imageUrl} alt="" className="border-1 border-platinum-silver rounded-3xl h-[200px] w-[240px]" />

          <Button variant="transparent" size="icon" className="absolute top-6 right-6" onClick={handleFullscreen}>
            <Icon name={mdiFullscreen} />
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="flex items-start gap-2">
            {/* <Icon name={mdiFileDocumentOutline} color="state-warning-foreground" className="mt-1" /> */}

            <a
              href={`https://www.doi.org/${bioData.compounds.doi}`}
              target="_blank"
              className="text-primary line-clamp-3 font-bold"
            >
              {bioData.compounds.title}
            </a>
          </h3>

          {/* <div className="px-1"> */}
          {/* </div> */}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="border-platinum-silver overflow-hidden rounded-4xl border">
          <DataTable headers={headers} items={[bioData.compounds as TableItem]} hideFooter />
        </div>
      </div>
    </div>
  );
};
