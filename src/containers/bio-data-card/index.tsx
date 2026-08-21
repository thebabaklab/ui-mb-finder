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

/**
 * Stability and in vivo belong to the substance/paper pair — the measurement rows
 * only repeat them — so they are shown once per card rather than in every row.
 * Every unique value is listed, though in practice there is only ever one.
 */
const uniqueValues = (values: (string | null)[]) => {
  const unique = [...new Set(values.filter((value) => typeof value === "string" && value.trim()))];

  return unique.length ? unique.join(", ") : "Not Tested";
};

export const BioDataCard: FC<BioDataCardProps> = ({ bioData, index }) => {
  const setSelectedImage = useStore((s) => s.setSelectedImage);
  const setDialogs = useStore((s) => s.setDialogs);
  const { headers } = useBioDataHeaders();
  const measurements = bioData.measurements ?? [];

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
        {index}. {bioData.name}
      </div>

      <div className="flex flex-wrap items-start gap-10 p-6 md:flex-nowrap lg:flex-wrap xl:flex-nowrap">
        <div className="border-primary relative w-fit shrink-0 rounded-4xl border p-3">
          <img src={bioData.compounds.imageUrl} alt={bioData.name} className="border-1 border-platinum-silver bg-platinum-silver rounded-3xl h-[200px] w-[240px] object-contain" />

          <Button variant="transparent" size="icon" className="absolute top-6 right-6" onClick={handleFullscreen}>
            <Icon name={mdiFullscreen} />
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="flex items-start gap-2">
            <a
              href={`https://www.doi.org/${bioData.compounds.doi}`}
              target="_blank"
              className="text-primary line-clamp-3 font-bold"
            >
              {bioData.compounds.title}
            </a>
          </h3>

          {bioData.compounds.doi && (
            <a
              href={`https://www.doi.org/${bioData.compounds.doi}`}
              target="_blank"
              className="text-platinum-silver -mt-3 text-sm font-light break-all"
            >
              {bioData.compounds.doi}
            </a>
          )}

          <div className="flex flex-col gap-2 text-white font-light">
            <p>
              <span className="text-primary font-bold">Stability: </span>
              {uniqueValues(measurements.map((measurement) => measurement.stability))}
            </p>
            <p>
              <span className="text-primary font-bold">In Vivo: </span>
              {uniqueValues(measurements.map((measurement) => measurement.in_vivo))}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="border-platinum-silver overflow-hidden rounded-4xl border">
          <DataTable headers={headers} items={measurements as unknown as TableItem[]} hideFooter />
        </div>
      </div>
    </div>
  );
};
