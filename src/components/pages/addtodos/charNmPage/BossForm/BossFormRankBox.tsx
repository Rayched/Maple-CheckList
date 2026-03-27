"use client"

import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import styled from "styled-components";
import { I_BossToDoData } from "../AddToDosLayout";
import { I_SelectTarget } from "./BossForms";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { BossContentsData } from "@/game_datas/contentsData";

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
    todosData?: I_BossToDoData;
    SelectedTargets: I_SelectTarget[];
    setSelected: Function;
};

interface I_SingleRankBoxContainer {
    textcolor: string;
    bgcolor: string;
    border_color: string;
};

//Rank Select box 용 styled components
const RankSelectBoxContainer = styled.select``;

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
`;

export function RankSelectBox({bossid, ranks, todosData, setSelected, SelectedTargets}: I_RankSelectBox){
    const {register, watch} = useFormContext();

    const RankChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        
        const BossData = value.split("_");
        const targetId = BossData[0];
        const Rank = BossData[1];

        const idx = SelectedTargets.findIndex((data) => data.bossid === targetId);
        /**
         * boss todo, checkbox 클릭 시
         * 'Selected' 배열, default data 자동 추가
         * default data 자동 추가가 안됐을 경우, 반영용
         */

        if(idx === -1){
            const GetBossNm = BossContentsData.find((origin) => origin.BossId === targetId);
            const NewData: I_SelectTarget = {
                bossid: targetId,
                bossNm: GetBossNm?.BossNm,
                rankid: Rank
            };
            setSelected((prev: I_SelectTarget[]) => [...prev, NewData]);
        } else {
            /**
             * boss todo, checkbox check 시
             * default data, 'Selected(SelectedTarget)' 자동 추가
             * 자동으로 추가가 안되는 등의 이슈가 발생하는 것이 아니라면
             * 보통은 else {...} 실행된다.
             */
            const PrevData = SelectedTargets[idx];

            const RankUpdateData: I_SelectTarget = {
                bossid: PrevData.bossid,
                bossNm: PrevData.bossNm,
                rankid: Rank
            };

            setSelected((prev: I_SelectTarget[]) => [
                ...prev.slice(0, idx),
                RankUpdateData,
                ...prev.slice(idx + 1)
            ]);
        }
    }

    return (
        <RankSelectBoxContainer
            onChange={RankChangeEvent}
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
            >{rankNm}</SingleRankBoxContainer>
        );
    }
}