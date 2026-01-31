import { create } from "zustand";

type CategoryType = {
    categoryId: string;
    categoryNm: string;
};

export type BookmarkData = {
    charNm: string;
    charWorld: string;
    charImg: string;
    charLV: string;
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

interface I_MapleToDoDatas {
    Bookmarks: BookmarkData[];
    CharToDos: I_CharToDos[];
    AccountWeeklys: I_WeeklyToDos[];
};

export const Categories: CategoryType[] = [
    {categoryId: "category00", categoryNm: "주간 컨텐츠"},
    {categoryId: "category01", categoryNm: "주간 보스"}
];

interface I_MapleToDoDataStore {
    MapleToDoData: BookmarkData[],
    setMapleToDoData: (UpdateValue: BookmarkData) => void;
};

export const MapleToDoDataStore = create<I_MapleToDoDataStore>((set) => ({
    MapleToDoData: [],
    setMapleToDoData: (UpdateValue) => set((s) => ({MapleToDoData: [...s.MapleToDoData, UpdateValue]}))
}));