import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

import newLogo from "@assets/img/app-logo.svg";
import axios from "axios";

import { StatHexagon } from "../../stat-hexagon";
import { Link } from "@tanstack/react-router";

export const HomeHeader = () => {
  const [counts, setCounts] = useState({
    compoundsCount: 0,
    referenceCount: 0,
    cellsCount: 0,
  });
  const location = useLocation();
  const pathname = location.pathname;

  const getCounts = async () => {
    try {
      const { data } = await axios.get(
        "https://stage-api.mb-finder.org/api/v2/get-count",
      );

      setCounts(data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <>
      <nav className="w-full mx-auto bg-gunmetal z-40 px-8 py-4">
        <div className="max-w-[1284px] mx-auto flex items-center md:gap-25 lg:gap-0 justify-between lg:justify-center">
          <Link to="/" className="lg:mr-auto">
            <img src={newLogo} className="w-[116px]" alt="Metal Based Drug Finder" />
          </Link>

          <ul className="flex flex-col text-end lg:text-start lg:flex-row items-end lg:items-center lg:gap-25 lg:mr-auto">
            <Link to="/about" className="flex items-center text-base md:text-xl text-white font-light gap-[10px]">
              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
              About Us
            </Link>

            <Link to="/contact" className="flex items-center text-base md:text-xl text-white font-light gap-[10px]">
              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
              Contact
            </Link>

            <a href="https://thebabaklab.com/" target="_blank" className="flex items-center text-base md:text-xl text-white font-light gap-[10px]">
              <div className="decorator bg-secondary rounded-full w-3 h-3"></div>
              The Babak Lab
            </a>
          </ul>

        </div>
      </nav>

      {pathname === '/' && (
        <div className="relative lg:absolute top-8 lg:top-8 right-0 lg:right-8 flex min-w-[375px] justify-center gap-1 sm:min-w-0 lg:h-[240px] lg:w-[220px]">
          <StatHexagon
            value={counts.compoundsCount}
            name="Compounds"
            className="bg-secondary lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2"
          />

          <StatHexagon
            value={counts.cellsCount}
            name="Cell Lines"
            className="bg-titanium-gray lg:absolute lg:top-0 lg:right-0"
          />

          <StatHexagon
            value={counts.referenceCount}
            name="References"
            className="bg-primary lg:absolute lg:right-0 lg:bottom-0"
          />
        </div>
      )}
    </>
  );
};
