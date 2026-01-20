// import { useLocation } from "@tanstack/react-router";

import { HomeHeader } from "./home-header";
// import { SearchHeader } from "./search-header";

export const AppHeader = () => {
  // const location = useLocation();
  // const pathname = location.pathname;

  // return pathname === "/" ? <HomeHeader /> : <SearchHeader />;
  return <HomeHeader />;
};
