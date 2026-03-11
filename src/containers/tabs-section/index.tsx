import type { FC } from "react";

// import { mdiFileDocumentOutline, mdiFlask, mdiMolecule } from "@mdi/js";
import { useStore } from "@store";
import type { TTabValue } from "@types";
import { Icon, Tabs, TabsList, TabsTrigger } from "@ui-kit";
import { cn } from "@utils";
import substanceLogo from "@assets/img/substances-icon.svg";
import cellLineLogo from "@assets/img/cell_lines-icon.svg";
import referenceLogo from "@assets/img/references-icon.svg";
import { Link } from "@tanstack/react-router";
import { mdiGestureTap } from "@mdi/js";

interface TabsSectionProps {
  selectedTab: TTabValue;
  onChange: (value: TTabValue) => void;
}

export const TabsSection: FC<TabsSectionProps> = ({ selectedTab = "substances", onChange }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);

  const handleTabChange = (tab: "substances" | "cell-lines" | "references") => {
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

  return (
    <Tabs value={selectedTab} className="py-0">
      <TabsList className="relative md:gap-[78px]">
        <TabsTrigger value="substances" className="" onClick={() => handleTabChange("substances")}>
          <img src={substanceLogo} className="mr-2" />
          Substances
        </TabsTrigger>
        <TabsTrigger value="cell-lines" className="" onClick={() => handleTabChange("cell-lines")}>
          <img src={cellLineLogo} className="mr-2" />
          Cell Lines
        </TabsTrigger>
        <TabsTrigger value="references" className="" onClick={() => handleTabChange("references")}>
          <img src={referenceLogo} className="mr-2" />
          References
        </TabsTrigger>

        <Link to="/predict-activity" className="flex items-center text-white font-light mb-2 hidden lg:block">
          <Icon name={mdiGestureTap} size={36} color="secondary" />
          Predict Activity
        </Link>
      </TabsList>

      <div className="px-1">
        <div
          className={cn("bg-primary h-0.5 w-[108px] transition-all sm:w-40", {
            "translate-x-[120px] sm:translate-x-57": selectedTab === "cell-lines",
            "translate-x-[236px] sm:translate-x-112": selectedTab === "references",
          })}
        />
      </div>
    </Tabs>
  );
};
