import { useEffect, useState } from "react";

import { API_BASE_URL } from "@utils";
import axios from "axios";

/**
 * The tissues cell lines are assigned to, for the search dropdown. Read from
 * the API rather than hardcoded, so a tissue added by a later data import
 * appears on its own.
 *
 * Fetched the first time the Tissue field is chosen, not on page load — most
 * visits never open it.
 */
export const useTissues = (enabled: boolean) => {
  const [tissues, setTissues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || tissues.length || loading) return;

    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API_BASE_URL}/api/v2/get-tissues`)
      .then(({ data }) => {
        if (!cancelled) setTissues(Array.isArray(data?.data) ? data.data : []);
      })
      .catch((err) => console.error("Error", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { tissues, loading };
};
