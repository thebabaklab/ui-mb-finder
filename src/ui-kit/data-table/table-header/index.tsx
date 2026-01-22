import { cn } from "@utils";

import type { HeaderItem } from "..";

const alignments = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

interface TableHeaderProps {
  headers: HeaderItem[];
  fixedHeader?: boolean;
  expandable?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ headers, fixedHeader, expandable }) => {
  return (
    <thead className={cn("hidden lg:table-header-group", fixedHeader && "sticky top-0 z-10 bg-[#FBFBFB]")}>
      <tr>
        {headers.map(({ text, align = "start", sortable = true, width, maxWidth }, i) => (
          <th
            key={i}
            role="columnheader"
            className={cn(
              "group first-of-type:rounded-s-full last-of-type:rounded-e-full bg-platinum-silver text-gunmetal text-base font-light",
              "border-gunmetal h-10 border-r px-3 py-4 capitalize last-of-type:border-r-0",
              alignments[align],
              sortable && "pointer-events-auto outline-0"
            )}
            style={{ minWidth: width, width, maxWidth }}
          >
            <div className="flex flex-nowrap items-center" style={{ justifyContent: align }}>
              {typeof text === "function" ? <>{text()}</> : <span>{text}</span>}
            </div>
          </th>
        ))}

        {expandable && (
          <th
            className={cn(
              "group bg-platinum-silver text-gunmetal max-w-12 text-base font-light",
              "h-10 border-r border-b px-3 capitalize last-of-type:border-r-0"
            )}
          ></th>
        )}
      </tr>
    </thead>
  );
};
