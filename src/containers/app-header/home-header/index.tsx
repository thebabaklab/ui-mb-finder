// import { useEffect, useState } from "react";

import newLogo from "@assets/img/app-logo.svg";
// import axios from "axios";

// import { StatHexagon } from "../../stat-hexagon";
import { Link } from "@tanstack/react-router";

export const HomeHeader = () => {
  // const [counts, setCounts] = useState({
  //   compoundsCount: 0,
  //   referenceCount: 0,
  //   cellsCount: 0,
  // });

  // const getCounts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://stage-api.mb-finder.com/api/v2/get-count",
  //     );

  //     setCounts(data);
  //   } catch (err) {
  //     console.error("Error", err);
  //   }
  // };

  // useEffect(() => {
    // getCounts();
  // }, []);

  return (
    <>
      <nav className="fixed w-full bg-gunmetal z-100 flex items-center gap-25 justify-between px-8 py-4 sm:px-30">
        <Link to="/">
          <img src={newLogo} alt="Metal Based Drug Finder" />
        </Link>

        <ul className="flex items-center gap-25">
          <Link to="/about" className="flex items-center text-2xl text-white font-light gap-[10px]">
            About Us

            <div className="decorator bg-secondary rounded-full w-4 h-4"></div>
          </Link>

          <Link to="/contact" className="flex items-center text-2xl text-white font-light gap-[10px]">
            Contact
            <div className="decorator bg-secondary rounded-full w-4 h-4"></div>
          </Link>

          <a href="#" className="flex items-center text-2xl text-white font-light gap-[10px]">
            The Babak Lab
            <div className="decorator bg-secondary rounded-full w-4 h-4"></div>
          </a>
        </ul>

        <a href="#" className="transition-colors text-2xl text-white font-light bg-secondary py-5 px-10 rounded-full hover:bg-primary">
          Explore
        </a>
      </nav>

      {/* <header className="flex flex-col items-center justify-between gap-10 p-8 md:flex-row">
        <div className="relative flex flex-col items-center md:h-[120px] md:w-[400px] md:flex-row">
          <img
            src={appLogo}
            alt="app logo"
            className="ml-5 h-[130px] w-[236px] object-cover md:absolute md:-right-10 md:-bottom-20 md:h-[250px] md:w-[250px]"
          />
          <div className="text-secondary text-5xl font-semibold">MB Finder</div>
        </div>

        <div className="relative flex min-w-[375px] justify-center gap-1 sm:min-w-0 md:h-[240px] md:w-[220px]">
          <StatHexagon
            value={counts.compoundsCount}
            name="Compounds"
            className="bg-[#134B42] md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2"
          />

          <StatHexagon
            value={counts.cellsCount}
            name="Cell Lines"
            className="bg-[#80917D] md:absolute md:top-0 md:right-0"
          />

          <StatHexagon
            value={counts.referenceCount}
            name="References"
            className="bg-[#EEA83B] md:absolute md:right-0 md:bottom-0"
          />
        </div>
      </header> */}
    </>
  );
};
