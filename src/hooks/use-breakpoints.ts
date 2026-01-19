import { useEffect, useState } from "react";

import * as breakpoints from "@utils";

const getWindowDimensions = () => {
  const width = window.innerWidth;
  const xs = width < breakpoints.BREAKPOINT_SM;
  const sm = width >= breakpoints.BREAKPOINT_SM && width < breakpoints.BREAKPOINT_MD;
  const md = width >= breakpoints.BREAKPOINT_MD && width < breakpoints.BREAKPOINT_LG;
  const lg = width >= breakpoints.BREAKPOINT_LG && width < breakpoints.BREAKPOINT_XL;
  const subXl = width >= breakpoints.BREAKPOINT_SUBXL && width < breakpoints.BREAKPOINT_XL;
  const xl = width >= breakpoints.BREAKPOINT_XL && width < breakpoints.BREAKPOINT_2XL;
  const xxl = width >= breakpoints.BREAKPOINT_2XL && width < breakpoints.BREAKPOINT_3XL;
  const xxxl = width >= breakpoints.BREAKPOINT_3XL;
  const smAndDown = width <= breakpoints.BREAKPOINT_SM;
  const mdAndUp = width >= breakpoints.BREAKPOINT_MD;
  const lgAndDown = width <= breakpoints.BREAKPOINT_LG;
  const lgAndUp = width >= breakpoints.BREAKPOINT_LG;
  const subXlAndUp = width >= breakpoints.BREAKPOINT_SUBXL;
  const xlAndUp = width >= breakpoints.BREAKPOINT_XL;

  return {
    xs,
    sm,
    md,
    lg,
    subXl,
    xl,
    "2xl": xxl,
    "3xl": xxxl,
    smAndDown,
    mdAndUp,
    lgAndDown,
    lgAndUp,
    subXlAndUp,
    xlAndUp,
  };
};

export const useBreakpoints = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    subXl: false,
    xl: false,
    "2xl": false,
    "3xl": false,
    smAndDown: false,
    mdAndUp: false,
    lgAndDown: false,
    lgAndUp: false,
    subXlAndUp: false,
    xlAndUp: false,
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", () => setWindowDimensions(getWindowDimensions()));
    return () => window.removeEventListener("resize", () => setWindowDimensions(getWindowDimensions()));
  }, []);

  return { ...windowDimensions };
};
