import { loadComponents } from "next/dist/server/load-components";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WeeklyContentsData } from "./game_datas/contentsData";

type CategoryType = {
    categoryId: string;
    categoryNm: string;
};

export const Categories: CategoryType[] = [
    {categoryId: "category00", categoryNm: "주간 컨텐츠"},
    {categoryId: "category01", categoryNm: "주간 보스"}
];

interface I_EditTargetStore {
    EditTarget: string;
    setEditTarget: (newValue: string) => void;
};

export const EditTargetStore = create<I_EditTargetStore>((set) => ({
    EditTarget: "",
    setEditTarget: (newValue) => set({EditTarget: newValue})
}))