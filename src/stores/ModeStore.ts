/**
 * Maple To Do App 전체
 * 
 * Mode와 관련된 store 모음집
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// '/chartodos' page mode store's

interface I_ChartodosPage_ModeStore {
    EditTarget: string;
    setEditTarget: (TargetNm: string) => void;
    SearchMode: boolean;
    setSearchMode: (Value: boolean) => void;
};

interface I_BookmarkListToggleStore {
    BookmarkListToggleValues: boolean;
    setBookmarkListToggleValues: (newValue: boolean) => void;
}

/**
 * EditTarget
 * '/chartodos' PC 버전에서, 특정 캐릭터 카드의 '...'(편집 버튼)
 * 클릭 시 [편집 / 삭제], Editbar Render 할때 참고할 용도의 전역 state
 * EditTarget의 값과 각 캐릭터 카드의 Id(charname or ocid) 비교해서
 * 일치하는 Id를 가진 캐릭터 카드에만 Editbar Render 함.
 * 
 * SearchMode
 * '메할일 검색' 모드에서 사용하는 전역 상태
 * prompt 창에 입력한 charname과 일치하는 캐릭터 카드만을 render
 */
export const ChartodosPage_ModeStore = create<I_ChartodosPage_ModeStore>((set) => ({
    EditTarget: "",
    setEditTarget: (TargetNm) => set({EditTarget: TargetNm}),
    SearchMode: false,
    setSearchMode: (Value) => set({SearchMode: Value})
}));

/**
 * 모바일, Sidebar '메할일 목록 Open/Close 저장용 Store
 */
export const BookmarkListToggleStore = create<I_BookmarkListToggleStore>()(
    persist((set, get) => ({
        BookmarkListToggleValues: false,
        setBookmarkListToggleValues: (NewValue) => set({
            BookmarkListToggleValues: NewValue
        })
    }), {
        name: "BookmarkListToggleStore",
        partialize: (state) => ({
            BookmarkListToggleValues: state.BookmarkListToggleValues
        })
    })
);