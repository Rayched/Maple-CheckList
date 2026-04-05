"use client"

import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import styled from "styled-components";
import React, { useEffect } from "react";
import { BossContentsData } from "@/game_datas/contentsData";
import { I_BossToDos } from "@/stores/CharToDoStore";
import { BossToDoSort } from "@/utils/SortFuncs";

type RanksType = {
    rankId: string;
    rankNm: string;
};

export type FormRefConditionType = {
    isToDos?: boolean;
    isSelecteds?: boolean; 
}

interface I_SingleRankBox {
    rankid: string;
    rankNm: string;
};

interface I_RankSelectBox {
    bossid: string;
    ranks: RanksType[];
    todosData: I_BossToDos[];
    setToDosData: React.Dispatch<React.SetStateAction<I_BossToDos[]>>;
};

interface I_SingleRankBoxContainer {
    textcolor: string;
    bgcolor: string;
    border_color: string;
};

//Rank Select box 용 styled components
const RankSelectBoxContainer = styled.select`
    display: flex;
    text-align: center;
    width: 100%;
    min-width: 70px;
    max-width: 70px;
`;

//Single Rank Box 용 styled components
const SingleRankBoxContainer = styled.div<I_SingleRankBoxContainer>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 3px;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.border_color};
    border-radius: 8px;
    width: 20%;
    height: 20%;
    min-width: 18px;
    max-width: 20px;
    min-height: 18px;
    max-height: 20px;
`;

export function RankSelectBox({bossid, ranks, todosData, setToDosData}: I_RankSelectBox){
    const DefaultRank = todosData.find((todo) => todo.contentsId === bossid);
    const RankChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        
        const BossData = value.split("_");
        const targetId = BossData[0];
        const Rank = BossData[1];

        const idx = todosData.findIndex((data) => data.contentsId === targetId);
    
        if(idx === -1){
            const GetBossNm = BossContentsData.find((origin) => origin.BossId === targetId);
            const NewData: I_BossToDos = {
                contentsId: value,
                contentsNm: String(GetBossNm?.BossNm),
                bossrank: Rank,
                ToDoDone: false
            };
            setToDosData((state) => {
                const ToDoSort = BossToDoSort({
                    BossToDoDatas: [...state, NewData]
                });
                return ToDoSort;
            });
        } else {
            const PrevData = todosData[idx];

            const RankUpdateData: I_BossToDos = {
                contentsId: PrevData.contentsId,
                contentsNm: PrevData.contentsNm,
                bossrank: Rank,
                ToDoDone: PrevData.ToDoDone
            };

            setToDosData((state) => {
                const ToDoSort = BossToDoSort({
                    BossToDoDatas: [
                        ...state.slice(0, idx),
                        RankUpdateData,
                        ...state.slice(idx + 1)
                    ]
                });

                return ToDoSort;
            })
        }
    }

    return (
        <RankSelectBoxContainer
            onChange={RankChangeEvent}
            defaultValue={`${bossid}_${DefaultRank?.bossrank}`}
        >
            {
                ranks.map((data) => {
                    return (
                        <option 
                            key={`${bossid}_${data.rankId}`}
                            value={`${bossid}_${data.rankId}`}
                        >
                            {data.rankNm}
                        </option>
                    );
                })
            }
        </RankSelectBoxContainer>
    );
};

export function SingleRankBox({rankid, rankNm}: I_SingleRankBox){
    const ColorInfos = RankColorInfos.find((data) => data.rankId === rankid);

    if(!ColorInfos){
        return <div>rankid error</div>
    } else {
        return (
            <SingleRankBoxContainer
                textcolor={ColorInfos?.fontColor}
                bgcolor={ColorInfos.bgColor}
                border_color={ColorInfos.borderColor}
            >{rankid.slice(0, 1)}</SingleRankBoxContainer>
        );
    }
}