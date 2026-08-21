import { useBreakpoints } from "@hooks";
import type { HeaderItem } from "@ui-kit";

export const useBioDataHeaders = () => {
  const { mdAndUp } = useBreakpoints();

  const headers: HeaderItem[] = [
    {
      text: () => (
        <span>
          incubation time, <span className="lowercase">h</span>

        </span>
      ),
      value: "incubationTime",
      maxWidth: mdAndUp ? 120 : undefined,
    },
    {
      text: () => (
        <span className="normal-case">
          IC<span className="align-sub text-xs">50</span> μM
        </span>
      ),
      value: "numeric_value",
      maxWidth: mdAndUp ? 120 : undefined,
    },
    // stability and in vivo are not per-measurement; the card shows them once above.
    { text: "method", value: "method", maxWidth: mdAndUp ? 120 : undefined },
  ];

  return {
    headers,
  };
};
