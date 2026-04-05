import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface I_BookmarkData {
    charname: string;
    charlevel: number;
    charclass: string;
    charimgurl: string;
    worldname: string;
};

interface I_BookmarkStore {
    Bookmarks: I_BookmarkData[],
    AddNewBookmark: (NewBookmarkData: I_BookmarkData) => void;
    EditBookmarks: (EditBookmarkData: I_BookmarkData) => void;
    DeleteBookmark: (targetname: string) => void;
};

export const BookmarkStore = create<I_BookmarkStore>()(
    persist((set) => ({
        Bookmarks: [],
        AddNewBookmark: (NewBookmarkData) => set((state) => ({
            Bookmarks: [
                ...state.Bookmarks,
                NewBookmarkData
            ]
        })),
        EditBookmarks: (EditBookmarkData) => set((state) => {
            const idx = state.Bookmarks.findIndex((data) => data.charname === EditBookmarkData.charname);

            if(idx === -1){
                return {
                    Bookmarks: state.Bookmarks
                }
            } else {
                return {
                    Bookmarks: [
                        ...state.Bookmarks.slice(0, idx),
                        EditBookmarkData,
                        ...state.Bookmarks.slice(idx + 1)
                    ]
                }
            }
        }),
        DeleteBookmark: (targetname) => set((state) => {
            if(!targetname){
                return {
                    Bookmarks: state.Bookmarks
                }
            } else {
                const TargetFilter = state.Bookmarks.filter((data) => data.charname !== targetname);

                return {
                    Bookmarks: [
                        ...TargetFilter
                    ]
                }
            }
        })
    }), {
        name: "MapleToDo-BookmarkStore",
        partialize: (state) => ({
            Bookmarks: state.Bookmarks
        })
    })
)