import type { ReactNode } from "react";

import type { HeaderItem, TableItem } from "..";
import { ProgressCircular } from "../../progress-circular";
import { TableRow } from "../table-row";

interface TableBodyProps {
  loading?: boolean;
  headers: HeaderItem[];
  items: TableItem[];
  expandable?: boolean;
  expandContent?: ReactNode;
  expandedRow?: number;
  onExpand?: (index: number) => void;
}

export const TableBody: React.FC<TableBodyProps> = ({
  loading,
  headers,
  items,
  expandable,
  expandContent,
  expandedRow,
  onExpand,
}) => {
  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={headers.length} className="h-[98px] text-center">
            <ProgressCircular indeterminate size="40" />
          </td>
        </tr>
      ) : !items?.length ? (
        <tr>
          <td colSpan={headers.length} className="h-[98px] text-center font-semibold">
            No data available
          </td>
        </tr>
      ) : (
        <>
          {items.map((item, i) => (
            <TableRow
              key={i}
              item={item}
              headers={headers}
              expandable={expandable}
              expanded={i === expandedRow}
              expandContent={expandContent}
              onExpand={() => onExpand?.(i)}
            />
          ))}
        </>
      )}
    </tbody>
  );
};
