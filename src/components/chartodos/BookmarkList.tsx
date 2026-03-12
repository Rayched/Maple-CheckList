"use client"

import { MapleToDoDataStore } from "@/stores";
import styled from "styled-components";
import { useStore } from "zustand";
import BookmarkCard from "./BookmarkCard";

const BookmarkListContainer = styled.div`
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export default function BookmarkList(){
    const {Bookmarks} = useStore(MapleToDoDataStore);

    return (
        <BookmarkListContainer>
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
        </BookmarkListContainer>
    );
}