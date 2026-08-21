import type { FC, ReactNode } from "react";

import { mdiChevronDown, mdiChevronUp, mdiMinus } from "@mdi/js";
import clsx from "clsx";

import type { HeaderItem, TableItem } from "..";
import { Icon } from "../../icon";

const alignments = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

function isTableItem(item: string | number | boolean | TableItem | undefined): item is TableItem {
  return !(!item || typeof item === "string" || typeof item === "number" || typeof item === "boolean");
}

interface TableRowProps {
  item: TableItem;
  headers: HeaderItem[];
  expandable?: boolean;
  expandContent?: ReactNode;
  expanded?: boolean;
  onExpand?: () => void;
}

export const TableRow: FC<TableRowProps> = ({ item, headers, expandable, expandContent, expanded, onExpand }) => {
  return (
    <>
      <tr className="group">
        {headers.map(({ text, value, align = "start", width, maxWidth }, hi) => (
          <td
            key={hi}
            className={clsx(
              "group flex h-14 items-center justify-between px-5 text-base font-light text-platinum-silver lg:table-cell lg:px-3",
              "border-border",
              // Stacked below lg: each record is a block of label/value lines, so the rule
              // closes off a record rather than sitting between its own lines — and the
              // last record needs none, the card border already ends it.
              "max-lg:last-of-type:border-b max-lg:group-last-of-type:last-of-type:border-b-0",
              // Table layout at lg+: cells sit side by side, so rules separate rows and columns.
              "lg:border-b lg:group-last-of-type:border-b-0 lg:border-r lg:last-of-type:border-r-0",
              "overflow-hidden text-ellipsis",
              alignments[align]
            )}
            style={{ width, maxWidth }}
            title={typeof value === "string" && typeof item[value] === "string" ? item[value] : undefined}
          >
            <div className={clsx("overflow-hidden font-light text-ellipsis whitespace-nowrap lg:hidden")}>
              {typeof text === "function" ? <>{text()}</> : <>{text}</>}
            </div>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {typeof value === "function" ? (
                value(item)
              ) : !isTableItem(item[value]) ? (
                item[value] === 0 ? (
                  item[value]
                ) : (
                  item[value] || <Icon name={mdiMinus} dense />
                )
              ) : (
                <Icon name={mdiMinus} dense />
              )}
            </div>
          </td>
        ))}

        {expandable && (
          <td
            className={clsx(
              "group flex h-14 items-center justify-between px-5 text-sm text-gray-600 lg:table-cell lg:px-3",
              "border-b lg:border-r lg:last-of-type:border-r-0",
              "overflow-hidden text-ellipsis"
            )}
          >
            <Icon
              name={expanded ? mdiChevronUp : mdiChevronDown}
              color="current"
              className="cursor-pointer"
              onClick={onExpand}
            />
          </td>
        )}
      </tr>

      {expanded && (
        <tr>
          <td
            colSpan={headers.length + 1}
            className={clsx(
              "group flex h-14 items-center justify-between px-5 text-sm text-gray-600 lg:table-cell lg:px-3",
              "border-b lg:border-r lg:last-of-type:border-r-0",
              "overflow-hidden text-ellipsis"
            )}
          >
            {expandContent}
          </td>
        </tr>
      )}
    </>
  );
};
