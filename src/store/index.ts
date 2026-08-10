import type { TBioData, TCellLine, TReference, TSearch, TSelectedImage, TSubstance } from "@types";
import { create } from "zustand";

export type DialogTypes = "substanceDrawer" | "fullscreenImage" | "filter";

interface IStoreState {
  search: TSearch;
  setSearch: (value: TSearch) => void;
  dialogs: DialogTypes[];
  setDialogs: (dialogs: DialogTypes[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  totalPages: number;
  setTotalPages: (value: number) => void;
  totalRecords: number;
  setTotalRecords: (value: number) => void;
  substances: TSubstance[];
  setSubstances: (value: TSubstance[]) => void;
  references: TReference[];
  setReferences: (value: TReference[]) => void;
  cellLines: TCellLine[];
  setCellLines: (value: TCellLine[]) => void;
  bioDatas: TBioData[];
  setBioDatas: (value: TBioData[]) => void;
  selectedImage: TSelectedImage | null;
  setSelectedImage: (value: TSelectedImage | null) => void;
  // Set when the API returns 429 (rate limited); drives the dismissible ThrottleBanner.
  throttleNotice: { message: string; contactUrl: string } | null;
  setThrottleNotice: (value: { message: string; contactUrl: string } | null) => void;
}

export const useStore = create<IStoreState>((set) => ({
  search: {
    queryStr: "",
    filters: [],
    cellLinesTable: "ic50",
    complexTable: "compounds",
    compoundId: "",
    size: 5,
    title: "",
    imgId: "",
  },
  setSearch: (search) => set({ search }),
  loading: true,
  dialogs: [],
  setDialogs: (dialogs) => set({ dialogs }),
  setLoading: (loading) => set({ loading }),
  totalPages: 0,
  setTotalPages: (totalPages) => set({ totalPages }),
  totalRecords: 0,
  setTotalRecords: (totalRecords) => set({ totalRecords }),
  substances: [],
  setSubstances: (substances) => set({ substances }),
  references: [],
  setReferences: (references) => set({ references }),
  cellLines: [],
  setCellLines: (cellLines) => set({ cellLines }),
  bioDatas: [],
  setBioDatas: (bioDatas) => set({ bioDatas }),
  selectedImage: null,
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  throttleNotice: null,
  setThrottleNotice: (throttleNotice) => set({ throttleNotice }),
}));
