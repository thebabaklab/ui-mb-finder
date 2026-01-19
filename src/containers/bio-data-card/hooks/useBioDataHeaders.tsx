import { useBreakpoints } from "@hooks";
import type { HeaderItem } from "@ui-kit";

export const useBioDataHeaders = () => {
  const { mdAndUp } = useBreakpoints();

  const headers: HeaderItem[] = [
    {
      text: "incubation time",
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
    { text: "method", value: "method", maxWidth: mdAndUp ? 120 : undefined },
    {
      text: "stability",
      value: (item) => (typeof item.stability === "string" ? item.stability : "Not Tested"),
      maxWidth: mdAndUp ? 120 : undefined,
    },
    {
      text: "in vivo",
      value: (item) => (typeof item.in_vivo === "string" ? item.in_vivo : "Not Tested"),
      maxWidth: mdAndUp ? 120 : undefined,
    },
  ];

  return {
    headers,
  };
};
