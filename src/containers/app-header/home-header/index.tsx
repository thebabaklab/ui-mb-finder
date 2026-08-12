import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

import newLogo from "@assets/img/app-logo.svg";
import { API_BASE_URL } from "@utils";
import axios from "axios";

import { StatHexagon } from "../../stat-hexagon";
import { Link } from "@tanstack/react-router";

export const HomeHeader = () => {
  const [counts, setCounts] = useState<{
    compoundsCount: number;
    referenceCount: number;
    cellsCount: number;
    ic50Count?: number;
    metalCounts?: Record<string, number>;
  }>({
    compoundsCount: 0,
    referenceCount: 0,
    cellsCount: 0,
    ic50Count: 0,
    metalCounts: {},
  });
  const location = useLocation();
  const pathname = location.pathname;

  const getCounts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/get-count`,
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
        <div className="relative lg:absolute top-8 lg:top-8 right-0 lg:right-8 flex flex-wrap min-w-[375px] justify-center gap-1 sm:min-w-0 lg:h-[660px] lg:w-[220px]">
          <StatHexagon
            value={counts.cellsCount}
            name="Cell Lines"
            className="bg-titanium-gray border-titanium-gray lg:absolute lg:top-0 lg:right-0"
          />

          <StatHexagon
            value={counts.ic50Count ?? 0}
            name={
              <>
                IC<sub>50</sub> Values
              </>
            }
            className="bg-secondary border-secondary lg:absolute lg:top-[60px] lg:left-0"
          />

          <StatHexagon
            value={counts.referenceCount}
            name="References"
            className="bg-primary border-primary lg:absolute lg:top-[120px] lg:right-0"
          />

          <StatHexagon
            value={counts.metalCounts?.Cu ?? 0}
            name="Cu Compounds"
            className="bg-[#B87333] border-[#B87333] lg:absolute lg:top-[360px] lg:left-0"
          />

          <StatHexagon
            value={counts.metalCounts?.Pt ?? 0}
            name="Pt Compounds"
            className="bg-titanium-gray border-titanium-gray lg:absolute lg:top-[420px] lg:right-0"
          />

          <StatHexagon
            value={counts.metalCounts?.Au ?? 0}
            name="Au Compounds"
            className="bg-primary border-primary lg:absolute lg:top-[480px] lg:left-0"
          />

          <StatHexagon
            value={counts.metalCounts?.Re ?? 0}
            name="Re Compounds"
            className="bg-[#B87333] border-[#B87333] lg:absolute lg:top-[540px] lg:right-0"
          />
        </div>
      )}
    </>
  );
};
