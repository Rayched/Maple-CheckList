"use client"

import { EditTargetStore, MapleToDoDataStore } from "@/stores";
import styled from "styled-components";
import { useStore } from "zustand";
import BookmarkCard from "./BookmarkCard";
import { useEffect, useState } from "react";

interface I_BookmarkListContainer {
    now_width: string;
};

const BookmarkListContainer = styled.div<I_BookmarkListContainer>`
    width: 100%;
    margin-top: 1%;
    display: grid;
    grid-template-columns: ${(props) => props.now_width >= "580px" ? "repeat(2, 1fr)" : "1fr"};
    place-items: center;
    gap: 20px 10px;
    width: 100%;
    max-width: 500px;
    margin: 0, auto;

    &:nth-child(1){
        grid-column: 1;
        grid-row: 1;
    };
    &:nth-child(2){
        grid-column: 2;
        grid-row: 1;
    };
    &:nth-child(3){
        grid-column: 1;
        grid-row: 2;
    };
    &:nth-child(4){
        grid-column: 2;
        grid-row: 2;
    };
    &:nth-child(5){
        grid-column: 1;
        grid-row: 3;
    };
    &:nth-child(1){
        grid-column: 2;
        grid-row: 3;
    };
`;

const EditWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    position: absolute;
`;

export default function BookmarkList(){
    const {Bookmarks} = useStore(MapleToDoDataStore);
    const {EditTarget, setEditTarget} = useStore(EditTargetStore);

    const [InnerWidth, setInnerWidth] = useState(0);

    //viewport-width 크기를 조정하는 function
    //grid-template-column의 값을 조정함
    //pc에선 2/2/2, 모바일에선 1/1/1/1/1/1 식으로 나오게 하기 위함
    const ResizeEventListener = () => {
        setInnerWidth(window.innerWidth);
    };

    /**
     * Edittarget state가 전역 상태이기 때문에
     * 편집바가 활성화된 상태에서 다른 tab으로 갔다가 넘어와도
     * 사라지지 않고, 남아있게 됨
     * 이러한 이슈를 방지하기 위해 만든 function
     * 처음 한번 랜더링될 때, edittarget의 값이 "" 아닌 경우에
     * ""로 초기화하는 역할을 수행
     */
    const EditTargetValueReset = () => {
        if(EditTarget !== ""){
            setEditTarget("");
        } else {
            return;
        }
    }

    useEffect(() => {
        if(InnerWidth === 0){
            ResizeEventListener();
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        addEventListener("resize", ResizeEventListener);
    }, [InnerWidth]);

    useEffect(() => {
        EditTargetValueReset();
    }, [])

    return (
        <BookmarkListContainer now_width={String(InnerWidth)}>
            {
                Bookmarks.map((bookmarkdata, idx) => {
                    return (
                        <BookmarkCard 
                            key={`bookmarkcard_${idx}`}
                            charNm={bookmarkdata.charNm}
                            charLV={bookmarkdata.charLV}
                            charClass={bookmarkdata.charClass}
                            charImg={bookmarkdata.charImg}
                            worldNm={bookmarkdata.worldNm}
                        />
                    );
                })
            }
            {
                EditTarget !== "" ? <EditWrapper onClick={() => setEditTarget("")}></EditWrapper> : null
            }
        </BookmarkListContainer>
    );
}