"use client"

import { BookmarkStore } from "@/stores/BookmarkStore";
import { CharToDoStore } from "@/stores/CharToDoStore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";
import Categoryselect from "./CategorySelect";
import { WorldDatas } from "@/game_datas/contentsData";

export interface I_WorldData {
    categoryId: string;
    categoryNm: string;
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

export default function IncomeContainer(){
    const {Bookmarks} = useStore(BookmarkStore);
    const {chartodos} = useStore(CharToDoStore);

    const [WorldData, setWorldDatas] = useState<I_WorldData[]>([]);
    const [NowSelectWorldNm, setNowSelectWorldNm] = useState(""); 
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(!Bookmarks || !chartodos){
            console.log("bookmark data or chartodo data error");
            return;
        };

        const GetWorldData = WorldDatas.map((world) => {
            const WorldNames = Bookmarks.map((bookmark) => bookmark.worldname);

            if(!WorldNames.includes(world.worldNm)){
                return null;
            } else {
                return {
                    categoryId: world.worldId,
                    categoryNm: world.worldNm
                } as I_WorldData;
            }
        }).filter((data) => data !== null);

        setWorldDatas(GetWorldData);
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, []);

    useEffect(() => console.log(WorldData), [WorldData]);

    return (
        <Wrapper>
            {
                isLoading ? <h4>캐릭터 데이터를 가져오고 있습니다...</h4>
                : (
                    <Container>
                        <Categoryselect 
                            worldDatas={WorldData}
                            NowCategory={NowSelectWorldNm}
                            setNowCategory={setNowSelectWorldNm}
                        />
                        <div>{NowSelectWorldNm}</div>
                    </Container>
                )
            }
        </Wrapper>
    );
}