import type { FC } from "react";

import { useStore } from "@store";
import type { TTabValue } from "@types";
import { Tabs, TabsList, TabsTrigger } from "@ui-kit";
import { cn } from "@utils";
import substanceLogo from "@assets/img/substances-icon.svg";
import cellLineLogo from "@assets/img/cell_lines-icon.svg";
import referenceLogo from "@assets/img/references-icon.svg";
import predictLogo from "@assets/img/predict-icon.svg";
import convertLogo from "@assets/img/convert-3d-icon.svg";
import { Link } from "@tanstack/react-router";

interface TabsSectionProps {
  selectedTab: TTabValue;
  onChange: (value: TTabValue) => void;
}

export const TabsSection: FC<TabsSectionProps> = ({ selectedTab = "substances", onChange }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);

  const handleTabChange = (tab: TTabValue) => {
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
    onChange(tab);
  };

  // The underline is drawn by the active tab itself, so it follows the tab
  // wherever the row puts it.
  const triggerClass = cn(
    // On phones the four tabs share ~300px, so labels may wrap under the icon.
    "relative px-0 text-sm leading-tight whitespace-normal text-center sm:text-base sm:leading-normal sm:whitespace-nowrap",
    "after:absolute after:inset-x-0 after:-bottom-[11px] after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity",
    "data-[state=active]:after:opacity-100",
  );

  return (
    <Tabs value={selectedTab} className="w-full max-w-4xl py-0">
      {/* A little inside the search box below it, the items spread evenly across. */}
      <TabsList className="flex w-full justify-between gap-2 px-0 sm:px-8">
        <TabsTrigger value="substances" className={triggerClass} onClick={() => handleTabChange("substances")}>
          <img src={substanceLogo} className="sm:mr-2" />
          Substances
        </TabsTrigger>
        <TabsTrigger value="cell-lines" className={triggerClass} onClick={() => handleTabChange("cell-lines")}>
          <img src={cellLineLogo} className="sm:mr-2" />
          Cell Lines
        </TabsTrigger>
        <TabsTrigger value="references" className={triggerClass} onClick={() => handleTabChange("references")}>
          <img src={referenceLogo} className="sm:mr-2" />
          References
        </TabsTrigger>

        {/* A page of its own, not a tab. On narrower screens it sits under
            the row instead. */}
        <Link to="/predict-activity" className="hidden lg:flex items-center whitespace-nowrap text-white font-light">
          <img src={predictLogo} className="w-8 mr-2" />
          Predict Activity
        </Link>

        <TabsTrigger value="convert-3d" className={triggerClass} onClick={() => handleTabChange("convert-3d")}>
          <img src={convertLogo} className="sm:mr-2" />
          Convert to 3D
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
