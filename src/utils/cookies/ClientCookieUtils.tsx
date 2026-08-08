"use client";

import { BookmarkStore } from "@/stores/BookmarkStore";
import { getCookie, setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

interface I_CookieOptions {
    expires: Date|number;
    maxAge: Date|number;
    path: string;
    domain: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: "lax"|"strict"|"none";
};

export default function useClientCookieUtils(){
    const charnameCookies = getCookie("mapletodos_bookmark_charnames");
    const [Charnames, setCharnames] = useState<string[]>(charnameCookies ? JSON.parse(decodeURIComponent(charnameCookies)) : []);
    const {Bookmarks} = useStore(BookmarkStore);

    //Cookie data 추가
    const AddNewCharnames = (targetname: string) => {
        /**
         * cookie(mapletodos_bookmark_charnames) 저장되는
         * charname data는 중복이 있으면 안됨
         */
        const IsIncludes = Charnames.includes(targetname);
        
        if(IsIncludes){
            console.log("북마크 중복");
            return;
        } else {
            const NewValues = [...Charnames, targetname];
            setCookie(
                "mapletodos_bookmark_charnames", 
                JSON.stringify(NewValues),
                {
                    maxAge: 60 * 60 * 24 * 30, //30일
                    path: "/",
                    httpOnly: true
                }
            );
        }
    }

    //BookmarkStore에 저장된 charnames setting 용
    useEffect(() => {
        if(!Charnames || Charnames.length === 0){
            const NewCookieDatas = Bookmarks.map((data) => data.charname);

            if(NewCookieDatas.length === 0) return;

            setCharnames(NewCookieDatas);
        } else {
            const DataMatches = Bookmarks.map((bookmark) => {
                const isIncludes = Charnames.includes(bookmark.charname);

                if(isIncludes){
                    return null;
                } else {
                    return bookmark.charname;
                }
            }).filter((data) => data !== null);

            setCharnames((prev) => [...prev, ...DataMatches]);
        }
    }, []);

    return {
        BookmarkCharnames: Charnames,
        AddNewCharnames: AddNewCharnames,
    };
}