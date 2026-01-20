import { useMemo, useState } from "react";

import {
  AdvancedSearchFieldsSection,
  AppFooter,
  AppHeader,
  emptySearchField,
  SearchSection,
  SubstanceDrawer,
  TabsSection,
} from "@containers";
import { useStore } from "@store";
import { useNavigate } from "@tanstack/react-router";
import {
  ENUM_SEARCH_FIELD_TYPE,
  type TFilterItem,
  type TSearchField,
  type TTabValue,
} from "@types";

import substanceLogo from "@assets/img/substances-icon.svg";
import cellLineLogo from "@assets/img/cell_lines-icon.svg";
import referenceLogo from "@assets/img/references-icon.svg";
import mariaPhoto from "@assets/img/maria.svg";
import daniilPhoto from "@assets/img/daniil.svg";
import dmitriiPhoto from "@assets/img/dmitrii.svg";
import hojungPhoto from "@assets/img/ho-jung.svg";
import maryanaPhoto from "@assets/img/maryana.svg";
import bekirPhoto from "@assets/img/bekir.svg";
import jackyPhoto from "@assets/img/jacky.svg";
import tamaraPhoto from "@assets/img/tamara.svg";

export const MainPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TTabValue>("substances");
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [searchFields, setSearchFields] = useState<TSearchField[]>([]);

  const hasSearchField = useMemo(() => {
    return searchFields.some(
      (field) =>
        (field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber &&
          field.casRegistryNumber) ||
        (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime &&
          (field.incubationTime.length || field.otherValue)) ||
        (field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug &&
          field.clinicalDrug.length) ||
        (field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight &&
          (field.startWeight || field.endWeight)),
    );
  }, [searchFields]);

  const addSearchField = () => {
    setSearchFields([...searchFields, emptySearchField]);
  };

  const removeSearchField = (index: number) => {
    const newSearchFields = [...searchFields];
    newSearchFields.splice(index, 1);
    setSearchFields(newSearchFields);
  };

  const handleSearchFieldsChange = (field: TSearchField, index: number) => {
    const newSearchFields = [...searchFields];
    newSearchFields.splice(index, 1, field);
    setSearchFields(newSearchFields);
  };

  const handleDrawerSubmit = (smiles: string) => {
    setSearch({
      ...search,
      filters: [
        { filterType: ENUM_SEARCH_FIELD_TYPE.Smiles, filterValue: smiles },
      ],
    });
    setOpen(false);
    if (selectedTab === "substances")
      navigate({ to: "/substances", search: { page: 1 } });
    else if (selectedTab === "cell-lines")
      navigate({ to: "/cell-lines", search: { page: 1 } });
    else if (selectedTab === "references")
      navigate({ to: "/references", search: { page: 1 } });
  };

  const handleSearch = () => {
    const filters: TFilterItem[] = [];

    searchFields.forEach((field) => {
      if (field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber) {
        filters.push({
          filterType: field.type,
          filterValue: field.casRegistryNumber || "",
        });
      } else if (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime) {
        filters.push({
          filterType: field.type,
          filterValue: [
            ...field.incubationTime.filter((t) => t !== "all"),
            field.otherValue,
          ],
        });
      } else if (field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug) {
        filters.push({
          filterType: field.type,
          filterValue: field.clinicalDrug,
        });
      } else if (field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight) {
        filters.push({
          filterType: field.type,
          filterValue: {
            startWeight: field.startWeight,
            endWeight: field.endWeight,
          },
        });
      }
    });

    setSearch({ ...search, filters });
    if (selectedTab === "substances")
      navigate({ to: "/substances", search: { page: 1 } });
    else if (selectedTab === "cell-lines")
      navigate({ to: "/cell-lines", search: { page: 1 } });
    else if (selectedTab === "references")
      navigate({ to: "/references", search: { page: 1 } });
  };

  return (
    <>
      <AppHeader />

      <main className="max-w-[1284px] mx-auto px-8 pt-50 sm:px-30">
        <section className="mb-30">
          <div className="flex w-full flex-col items-center gap-5">
            <h1 className="max-w-2xl text-primary text-center section-title font-extrabold">
              Metal Based Drug Search Engine
            </h1>

            <div className="flex w-full max-w-2xl items-center flex-col gap-3 mb-5">
              <TabsSection
                selectedTab={selectedTab}
                onChange={setSelectedTab}
              />

              <SearchSection
                search={search}
                hasSearchField={hasSearchField}
                onDrawerClick={() => setOpen(true)}
                onChange={(queryStr) => setSearch({ ...search, queryStr })}
                onSearch={handleSearch}
              />

              <SubstanceDrawer
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleDrawerSubmit}
              />
            </div>

            <AdvancedSearchFieldsSection
              searchFields={searchFields}
              onAdd={addSearchField}
              onRemove={removeSearchField}
              onChange={handleSearchFieldsChange}
            />
          </div>
        </section>

        {/* Metal based drug finder info */}
        <section className="mb-30">
          <h2 className="headline uppercase font-black text-primary mb-30">
            METAL BASED DRUG<br />FINDER
          </h2>

          {/* First row */}
          <div className="flex justify-between gap-20 mb-30">
            <article className="frame-container white py-10 pr-12">
              <p className="text-title text-primary font-extrabold mb-5">
                The Power and The Problem
              </p>

              <p className="w-[300px] text-white font-light">
                Metallodrugs are innovative therapies containing metal ions, offering unique mechanisms to fight cancer that are unavailable to conventional drugs; however, critical data on these promising compounds is severely fragmented and absent from public databases, hindering vital research.
              </p>
            </article>

            <article className="frame-container gold py-10 pr-12">
              <p className="text-title text-primary font-extrabold mb-5">
                Our Solution
              </p>

              <p className="w-[300px] text-white font-light">
                MB Finder directly addresses this gap as the first comprehensive, online search engine dedicated to standardizing and curating biological and physico-chemical data for metal-based anticancer compounds, providing researchers with a single, trusted source.
              </p>
            </article>

            <article className="frame-container silver py-10 pr-12">
              <p className="text-title text-primary font-extrabold mb-5">
                Explore the Data
              </p>

              <p className="w-[300px] text-white font-light">
                Our platform enables you to instantly search and compare key metrics like IC50, lipophilicity, and stability for a wide range of complexes, including Platinum, Copper, Ruthenium, Gold, and other transition metals.
              </p>
            </article>
          </div>

          {/* Second row */}
          <div className="flex justify-between gap-18">
            <article className="">
              <img src={substanceLogo} aria-hidden="true" className="w-[94px] mb-5" />

              <p className="section-title text-primary font-extrabold mb-5">
                Search by Structures<br />"Substances"
              </p>

              <p className="text-white font-light">
                Find metal-based compounds by drawing or
                specifying their chemical structure. Use our
                integrated drawing tool to sketch a complete
                molecule or a key fragment. This search will
                return all substances in our database that
                match your query, ideal for identifying
                known drugs or discovering new compounds
                with similar structural features.
              </p>
            </article>

            <article className="">
              <img src={cellLineLogo} aria-hidden="true" className="w-[90px] mb-5" />

              <p className="section-title text-primary font-extrabold mb-5">
                Search by Cell Lines<br />"Cell Lines"
              </p>

              <p className="text-white font-light">
                Explore the biological activity of metal-based drugs
                against specific cancer or disease models. Search by
                selecting a cell line (e.g., HeLa, MCF-7) to retrieve a
                curated list of substances tested on it, along with
                their reported efficacy, IC50 values,
                and other experimental results.
              </p>
            </article>

            <article className="">
              <img src={referenceLogo} aria-hidden="true" className="w-[70px] mb-5" />

              <p className="section-title text-primary font-extrabold mb-5">
                Search by Scientific References<br />"References"
              </p>

              <p className="text-white font-light">
                Locate the primary scientific literature for
                any compound in our database. Search by author,
                journal, publication year, or keyword to directly find
                the original research articles, reviews, and clinical
                studies that document the synthesis, properties,
                and biological effects of metal-based drugs.
              </p>
            </article>
          </div>
        </section>

        {/* Our team */}
        <section>
          <h3 className="uppercase sub-heading text-primary font-black mb-18">
            Our team
          </h3>

          <div className="flex items-start flex-wrap gap-18">
            <article>
              <img src={mariaPhoto} alt="Prof. Maria Babak" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Prof. Maria Babak</b><br />
                Principal Investigator<br />
                PhD / Chemist
              </p>
            </article>

            <article>
              <img src={daniilPhoto} alt="Daniil Rusanov" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Daniil Rusanov</b><br />
                Project Lead<br/>
                PhD(c) / Chemist
              </p>
            </article>

            <article>
              <img src={dmitriiPhoto} alt="Dmitrii Brezgunov" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Dmitrii Brezgunov</b><br />
                Research Assistant
              </p>
            </article>

            <article>
              <img src={hojungPhoto} alt="Ho-Jung Choe" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Ho-Jung Choe</b><br />
                Undergraduate Student
              </p>
            </article>

            <article>
              <img src={maryanaPhoto} alt="Maryana Yarshova" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Maryana Yarshova</b><br />
                Undergraduate student
              </p>
            </article>

            <article>
              <img src={bekirPhoto} alt="Bekir Pashaliev" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Bekir Pashaliev</b><br />
                Research Assistant
              </p>
            </article>

            <article>
              <img src={jackyPhoto} alt="Jacky Luk Ka Ho" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Jacky Luk Ka Ho</b><br />
                Undergraduate Student
              </p>
            </article>

            <article>
              <img src={tamaraPhoto} alt="Tamara Petrovic" className="w-[180px] mb-3" />

              <p className="text-white text-center font-light leading-5">
                <b className="font-bold">Tamara Petrovic</b><br />
                PhD / Chemist
              </p>
            </article>
          </div>
        </section>
      </main>

      <AppFooter />
    </>
  );
};
