export const BREAKPOINT_SM = 640;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;
export const BREAKPOINT_SUBXL = 1200;
export const BREAKPOINT_XL = 1280;
export const BREAKPOINT_2XL = 1550;
export const BREAKPOINT_3XL = 1920;

// Backend API base URL. Defaults to staging; the prod build overrides this
// via the VITE_API_BASE_URL environment variable (set in the prod deploy workflow).
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://stage-api.mb-finder.org";
