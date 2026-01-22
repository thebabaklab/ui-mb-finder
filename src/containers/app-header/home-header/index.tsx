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
  //       "https://stage-api.mb-finder.org/api/v2/get-count",
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
      <nav className="fixed w-full mx-auto bg-gunmetal z-40 px-8 py-4">
        <div className="max-w-[1284px] mx-auto flex items-center md:gap-25 justify-between">
          <Link to="/">
            <img src={newLogo} className="w-[100px]" alt="Metal Based Drug Finder" />
          </Link>

          <ul className="flex flex-col md:flex-row items-end md:items-center md:gap-25">
            <Link to="/about" className="flex items-center text-xl text-white font-light gap-[10px]">
              About Us

              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
            </Link>

            <Link to="/contact" className="flex items-center text-xl text-white font-light gap-[10px]">
              Contact
              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
            </Link>

            <a href="https://thebabaklab.com/" target="_blank" className="flex items-center text-xl text-white font-light gap-[10px]">
              The Babak Lab
              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
};
