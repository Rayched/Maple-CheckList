"use client";

import { ClassDatas, WorldDatas } from "@/game_datas/contentsData";
import styles from "../../_styles/_charpage/charinfobox.module.css";
import { useStore } from "zustand";
import { BookmarkStore, I_BookmarkData } from "@/stores/BookmarkStore";
import styled from "styled-components";
import { ViewportWidthStore } from "@/stores/ViewportStore";
import { AddNewCookies, DeleteCookies } from "@/utils/CookieUtils";
import { RegistFlagStore } from "@/stores/RegistFlagStore";
import { useEffect, useState } from "react";

interface I_CharInfobox {
    charname?: string;
    charlevel?: number;
    charclass?: string;
    charimgurl?: string;
    worldname?: string;
};

const BtnStyle = {
    true: {
        color: "rgb(230, 230, 230)",
        backgroundColor: "black",
        borderColor: "white"
    },
    false: {
        color: "black",
        backgroundColor: "rgb(210, 210, 210)",
        borderColor: "black"
    }
};

export default function Charpage_CharInfobox({charname, charlevel, charclass, charimgurl, worldname}: I_CharInfobox){
    const {Bookmarks, AddNewBookmark, DeleteBookmark} = useStore(BookmarkStore);
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);
    const {ShowAllRegist, setShowAllRegist} = useStore(RegistFlagStore);

    const [IsAddBookmarks, setIsAddBookmarks] = useState(false);
    const [WorldIconName, setWorldIconName] = useState("");
    const [ClassIconName, setClassIconName] = useState("");

    const BookmarkBtnClicked = () => {
        /**
         * IsAddBookmarks: true => 북마크 등록 상태
         * IsAddBookmarks: false => 북마크 미등록 상태
         */
        if(!charname || !charclass || !charlevel || !charimgurl || !worldname){
            console.log("북마크 등록 필요한 데이터에 undefined가 존재함.");
            return;
        } else if(IsAddBookmarks === false){
            const NewBookmarkData: I_BookmarkData = {
                charname: charname,
                charlevel: charlevel,
                charclass: charclass,
                charimgurl: charimgurl,
                worldname: worldname
            };
            AddNewBookmark(NewBookmarkData);
            setIsAddBookmarks(true);
        } else {
            const idx = Bookmarks.findIndex((data) => data.charname === charname);

            if(idx === -1){
                console.log(`'${charname}', 해당 닉네임을 가진 캐릭터 북마크가 존재하지 않습니다.`);
                return;
            } else {
                DeleteBookmark({targetname: charname});
            }
            setIsAddBookmarks(false);
        }
    };

    const RegistFlagBtnClicked = () => {
        if(ShowAllRegist){
            setShowAllRegist(false);
        } else {
            setShowAllRegist(true);
        }
    };

    useEffect(() => {
        if(!worldname || !charclass || !charname) return;

        setShowAllRegist(false);

        const GetWorldData = WorldDatas.find((worlds) => worlds.worldNm === worldname);
        const GetClassData = ClassDatas.find((classdata) => classdata.class_fullNm === charclass);
        const BookmarkCheck = Bookmarks.find((data) => data.charname === charname);

        if(!GetWorldData || !GetClassData || !BookmarkCheck){
            return;
        } else {
            setWorldIconName(GetWorldData.worldId);
            setClassIconName(GetClassData.class_category);
            setIsAddBookmarks(true);
        }
    }, []);

    return (
        <div className={styles.charinfobox_container}>
            <div className={styles.charinfobox_charimage_area}>
                <img src={charimgurl} className={styles.charimage}/>
            </div>
            <div className={styles.charinfobox_chardata_buttons_area}>
                <div className={styles.charinfobox_chardata_area}>
                    <div className={styles.chardatabox_chardata}>
                        <div className={styles.charnamebox}>
                            {WorldIconName !== "" ? (<img src={`/imgs/worlds/${WorldIconName}.png`} className={styles.worldicon} />) : null}
                            <span className={styles.charnametext}>{charname}</span>
                        </div>
                        <div className={styles.charlevelbox}>
                            <span className={styles.charleveldata}>{`LV.${charlevel}`}</span>
                            <span className={styles.charclassdata}>
                                {ClassIconName !== "" ? <img src={`/imgs/job_icons/${ClassIconName}.png`} /> : null}
                                <div>
                                    {String(charclass).length < 6 ? `${charclass}` : null}
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.charinfobox_buttons_area}>
                    <div className={styles.charinfo_buttons_area_buttonbox}>
                        <button 
                            onClick={BookmarkBtnClicked}
                            style={IsAddBookmarks ? BtnStyle.true : BtnStyle.false}
                        >
                            {!IsAddBookmarks ? "☆ 북마크 등록" : "★ 북마크 해제"}
                        </button>
                    </div>
                    <div className={styles.charinfo_buttons_area_buttonbox}>
                        <button onClick={RegistFlagBtnClicked} className={styles.registflag_button} style={ShowAllRegist ? BtnStyle.true : BtnStyle.false}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512" fill={ShowAllRegist ? "white" : "black"}>
                                <path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/>
                            </svg>
                            {ShowAllRegist ? "등록 항목" : "전체 항목"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}