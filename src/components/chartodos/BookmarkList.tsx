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

    const [InnerWidth, setInnerWidth] = useState(window.innerWidth);

    const ResizeEventListener = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        addEventListener("resize", ResizeEventListener);
    }, [InnerWidth]);

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