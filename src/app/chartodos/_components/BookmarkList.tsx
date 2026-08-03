"use client"

import { BookmarkStore } from "@/stores/BookmarkStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import styles from "../_styles/bookmarklist.module.css";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import BookmarkItem from "./BookmarkItem";
import { WorldDatas } from "@/game_datas/contentsData";

const UtilButton = styled.div`
    width: 80px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 8px;
    color: black;
    background-color: white;

    label {
        margin-left: 5px;
    }
`;

export default function BookmarkList(){
    const {Bookmarks} = useStore(BookmarkStore);
    const router = useRouter();

    const [IsEdits, setEdits] = useState(false);
    //'편집' 버튼 클릭 여부
    /**
     * true => '캐릭터 추가'/'편집 취소' 버튼 render
     * false => '편집' 버튼 render (default)
     */
    const [InnerWidth, setInnerWidth] = useState(0);

    const SearchCharname = () => {
        const searchparams = window.prompt("캐릭터 이름을 입력해주세요.");

        if(searchparams === "" || searchparams === null){
            alert("캐릭터 이름을 입력하지 않았습니다.");
            return;
        } else {
            router.push(`/chartodos/${searchparams}`);
        }
    };

    useEffect(() => {
        const WidthResized = () => {
            setInnerWidth(window.innerWidth);
        };

        WidthResized();

        window.addEventListener("resize", WidthResized);

        return () => {
            window.removeEventListener("resize", WidthResized);
        }
    }, []);

    return (
        <div className={styles.bookmarklist_container}>
            <div className={styles.bookmarklist_header}>
                <span>캐릭터 목록</span>
                <div className={styles.bookmarklist_header_buttons}>
                    {!IsEdits ? (
                        <UtilButton onClick={() => setEdits(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"14"} height={"14"}>
                                <path d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z"/>
                            </svg>
                            <label>편집</label>
                        </UtilButton>
                    ) : null}
                    {
                        IsEdits ? (
                            <div className={styles.bookmarklist_header_editbtns}>
                                <UtilButton onClick={SearchCharname}>
                                    {InnerWidth <= 600 ? "추가" : "캐릭터 추가"}
                                </UtilButton>
                                <UtilButton onClick={() => setEdits(false)}>취소</UtilButton>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <main className={styles.bookmarklist_mains}>
                {
                    Bookmarks.map((data, idx) => {
                        const GetWorldData = WorldDatas.find((worlds) => worlds.worldNm === data.worldname);
                        return (
                            <BookmarkItem 
                                key={`bookmarkitem_${idx}`}
                                charname={data.charname}
                                charimgurl={data.charimgurl}
                                worldId={!GetWorldData ? data.worldname : GetWorldData.worldId}
                                isEditMode={IsEdits}
                            />
                        );
                    })
                    /**
                     * BookmarkList, cookie data 참고하여
                     * nexon open api의 ocid api, 스케줄러 api 호출함
                     * 
                     * ocid => 스케줄러 api 사용하기 위한 선제 조건
                     * 스케줄러 api => 실시간으로 스케줄러 데이터 조회용
                     * 
                     * localstorage에 스케줄러 수행 여부 저장하는 방식도
                     * 생각을 해봤지만, 이 경우 실시간 데이터 확인에
                     * 다소 불편함이 있기 때문에 그냥 bookmarklist에서
                     * 스케줄러 api 호출하고, 그걸 참고해서
                     * 현재 메할일 수행 여부를 보여주는 방식이 더 나음
                     */
                }
            </main>
        </div>
    );
}