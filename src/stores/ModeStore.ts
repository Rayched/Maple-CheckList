/**
 * Maple To Do App 전체
 * 
 * Mode와 관련된 store 모음집
 */

import { create } from "zustand";

// '/chartodos' page mode store's

interface I_ChartodosPage_ModeStore {
    EditTarget: string;
    setEditTarget: (TargetNm: string) => void;
    SearchMode: boolean;
    setSearchMode: (Value: boolean) => void;
};

export const ChartodosPage_ModeStore = create<I_ChartodosPage_ModeStore>((set) => ({
    EditTarget: "",
    setEditTarget: (TargetNm) => set({EditTarget: TargetNm}),
    SearchMode: false,
    setSearchMode: (Value) => set({SearchMode: Value})
}))