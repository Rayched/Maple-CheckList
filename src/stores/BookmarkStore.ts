import { getCookie, setCookie } from "cookies-next/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

//'/chartodos', 캐릭터 별 메할일 수행 여부 파악용
/**
 * 일일히 캐릭터 별 페이지에 접속해서 데이터 갱신하는 것은
 * Real-time으로 수행 여부를 확인할 수 있어야함
 * 이를 위해선 api fetch를 해야하는데, nextjs를 베이스로 두고 있기에
 * client에선 api 호출에 제약이 걸림
 */
interface I_AuthStore {};


//Bookmark Store
/**
 * 북마크 데이터 (캐릭터 명, 레벨, 직업 등등)
 * localstorage 저장
 */

export type DeleteTarget = {
    targetname: string;
};

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
    DeleteBookmark: (deletetarget: DeleteTarget) => void;
};

export const BookmarkStore = create<I_BookmarkStore>()(
    persist((set) => ({
        Bookmarks: [],
        AddNewBookmark: (NewBookmarkData) => set((state) => {
            const cookiedatas = getCookie("mapletodos_bookmarknames");
            const Charnames: string[]|null = cookiedatas ? JSON.parse(decodeURIComponent(cookiedatas)) : null;

            if(Charnames === null){
                setCookie(
                    "mapletodos_bookmarknames", 
                    JSON.stringify([NewBookmarkData.charname]), 
                    {
                        path: "/chartodos",
                        maxAge: 60 * 60 * 24 * 30, //30일
                    }
                );
            } else {
                const isIncludes = Charnames.includes(NewBookmarkData.charname);

                if(isIncludes){
                    console.log("중복된 북마크 입니다.");
                } else {
                    setCookie(
                        "mapletodos_bookmarknames", 
                        JSON.stringify([...Charnames, NewBookmarkData.charname]), 
                        {
                            path: "/chartodos",
                            maxAge: 60 * 60 * 24 * 30, //30일
                        }
                    );
                }
            }

            return {
                Bookmarks: [
                    ...state.Bookmarks,
                    NewBookmarkData
                ]
            }
        }),
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
        DeleteBookmark: (deletetarget) => set((state) => {
            if(!deletetarget){
                return {
                    Bookmarks: state.Bookmarks
                }
            } else {
                const cookiedatas = getCookie("mapletodos_bookmarknames");
                const Charnames: string[]|null = cookiedatas ? JSON.parse(decodeURIComponent(cookiedatas)) : null;

                if(Charnames === null){
                    console.log("mapletodos_bookmarknames라는 key 값을 가진 cookie data가 존재하지 않음");
                } else {
                    const idx = Charnames.findIndex((value) => value === deletetarget.targetname);

                    if(idx === -1){
                        console.log(`${deletetarget.targetname}이라는 닉네임을 가진 cookie data가 존재하지 않음`);
                    } else {
                        const UpdateCharnames = [
                            ...Charnames.slice(0, idx),
                            ...Charnames.slice(idx + 1)
                        ];
                        setCookie(
                            "mapletodos_bookmarknames",
                            UpdateCharnames,
                            {
                                path: "/chartodos",
                                maxAge: 60 * 60 * 24 * 30, //30일
                            }
                        )
                    }
                }

                const TargetFilter = state.Bookmarks.filter((data) => data.charname !== deletetarget.targetname);

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