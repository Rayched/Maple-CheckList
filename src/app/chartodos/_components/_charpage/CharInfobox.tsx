"use client";

import { ClassDatas, WorldDatas } from "@/game_datas/contentsData";
import styles from "../../_styles/_charpage/charinfobox.module.css";
import { useStore } from "zustand";
import { BookmarkStore, I_BookmarkData } from "@/stores/BookmarkStore";
import styled from "styled-components";
import { ViewportWidthStore } from "@/stores/ViewportStore";
import { useEffect } from "react";

interface I_CharInfobox {
    charname?: string;
    charlevel?: number;
    charclass?: string;
    charimgurl?: string;
    worldname?: string;
};

export default function Charpage_CharInfobox({charname, charlevel, charclass, charimgurl, worldname}: I_CharInfobox){
    const {Bookmarks, AddNewBookmark, DeleteBookmark} = useStore(BookmarkStore);
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);

    const GetWorldData = WorldDatas.find((worlds) => worlds.worldNm === worldname);
    const GetClassData = ClassDatas.find((data) => data.class_fullNm === charclass);
    const BookmarkCheck = Bookmarks.find((data) => data.charname === charname);

    const AddBookmark = () => {
        if(BookmarkCheck){
            console.log("해당 북마크 중복됨");
            return;
        } else if(!charname || !charclass || !charlevel || !worldname || !charimgurl){
            console.log(`props is undefined`);
            return;
        } else {
            const NewBookmarkData: I_BookmarkData = {
                charname: charname,
                charlevel: charlevel,
                charclass: charclass,
                charimgurl: charimgurl,
                worldname: worldname
            }
            AddNewBookmark(NewBookmarkData);
        }
    }

    const DelBookmark = () => {
        if(!charname){
            console.log(`ocid or charname이 undefined일 수도 있습니다.`);
            return;
        } else {
            DeleteBookmark({
                targetname: charname
            });
        }
    };

    return (
        <div className={styles.charinfobox_container}>
            <img src={charimgurl} className={styles.charimage}/>
            <div className={styles.charinfobox_chardatabox}>
                <div className={styles.chardatabox_chardata}>
                    <div className={styles.charnamebox}>
                        {GetWorldData ? (
                            <img src={`/imgs/worlds/${GetWorldData.worldId}.png`} className={styles.worldicon} />
                        ) : null}
                        <span className={styles.charnametext}>{charname}</span>
                    </div>
                    <div className={styles.charlevelbox}>
                        <span className={styles.charleveldata}>{`LV.${charlevel}`}</span>
                        <span className={styles.charclassdata}>
                            <img src={`/imgs/job_icons/${GetClassData?.class_category}.png`} />
                            <div>
                                {NowViewportWidthValue <= 500 && String(charclass).length >= 6 ? `${GetClassData?.class_littleNm}`: null}
                                {String(charclass).length < 6 ? `${charclass}` : null}
                            </div>
                        </span>
                    </div>
                </div>
                <div className={styles.chardatabox_bookmarkbtnbox}>
                    {!BookmarkCheck ? (
                        <button onClick={AddBookmark} className={styles.bookmarkbtn_isadds_false}>★ 북마크 추가</button>
                    ) : null}
                    {BookmarkCheck ? (
                        <button onClick={DelBookmark} className={styles.bookmarkbtn_isadds_true}>★ 북마크 해제</button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}