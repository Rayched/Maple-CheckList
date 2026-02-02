import { loadComponents } from "next/dist/server/load-components";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CategoryType = {
    categoryId: string;
    categoryNm: string;
};

export interface I_Bookmark {
    charNm?: string;
    charLV?: number;
    charClass?: string;
    charImg?: string;
    worldNm?: string;
};

export interface I_WeeklyToDos {
    ContentsId: string;
    IsDone: boolean;
    Units: string;
};

type BossToDosType = {
    bossId: string;
    ranks: string;
    IsDone: boolean;
}

export interface I_CharToDos {
    charNm: string;
    WeeklyToDos: I_WeeklyToDos[];
    BossToDos: BossToDosType[];
};

export const Categories: CategoryType[] = [
    {categoryId: "category00", categoryNm: "주간 컨텐츠"},
    {categoryId: "category01", categoryNm: "주간 보스"}
];

interface I_MapleToDoDataStore {
    CharToDos: I_CharToDos[],
    Bookmarks: I_Bookmark[],
    AccountWeeklys: I_WeeklyToDos[],
    UpdateCharToDos: (updateValue: I_CharToDos[]) => void;
    UpdateBookmarks: (updateValue: I_Bookmark[]) => void;
    UpdateAccWeeklys: (updateValue: I_WeeklyToDos[]) => void; 
};

/*
export const MapleToDoDataStore = create<I_MapleToDoDataStore>((set) => ({
    MapleToDoData: [],
    setMapleToDoData: (UpdateValue) => set((s) => ({MapleToDoData: [...s.MapleToDoData, UpdateValue]}))
}));
*/

export const MapleToDoDataStore = create<I_MapleToDoDataStore>()(
    persist((set, get) => ({
        CharToDos: [] as I_CharToDos[],
        Bookmarks: [] as I_Bookmark[],
        AccountWeeklys: [] as I_WeeklyToDos[],
        UpdateCharToDos: (newCharToDosData) => set({CharToDos: newCharToDosData}),
        UpdateBookmarks: (newBookmarkData) => set({Bookmarks: newBookmarkData}),
        UpdateAccWeeklys: (newAccWeeklysData) => set({AccountWeeklys: newAccWeeklysData})
    }), {
        name: "Maple-tododatas", 
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
            CharToDos: state.CharToDos,
            Bookmarks: state.Bookmarks,
            AccountWeeklys: state.AccountWeeklys
        })
    })
);