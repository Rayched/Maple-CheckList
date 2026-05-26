"use client"

import { I_RankType } from "@/game_datas/contentsData";
import { I_BossIncomeData, I_FormValue } from "./AddBossIncomeForms";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import styled from "styled-components";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_BossRank_Radios {
    StateData: I_BossIncomeData[];
    setStateFn: React.Dispatch<React.SetStateAction<I_BossIncomeData[]>>;
    bossid: string;
    RanksData: I_RankType[];
};

interface I_RankIconProps {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

const RankContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 40%;
    height: 95%;
    min-width: 70px;
    background-color: rgb(209, 216, 224);
    border-radius: 5px;
`;

const RankSelectItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 3px 0px;
`;

const RankIcon = styled.div<I_RankIconProps>`
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
    width: 15px;
    height: 15px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export default function BossRankRadioBox({StateData ,setStateFn, RanksData, bossid}: I_BossRank_Radios){
    const {watch} = useFormContext<I_FormValue>();

    const ColorDatas = RankColorInfos.map((color) => {
        const RankIdDatas = RanksData.map((data) => data.rankId);

        if(!RankIdDatas.includes(color.rankId)){
            return null;
        } else {
            return color;
        }
    }).filter((data) => data !== null);

    const RankChangeEventListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: {value}
        } = e;

        const [TargetId, TargetRank] = value.split("_");

        if(!TargetId || !TargetRank){
            console.log("input radio value error");
            return;
        } else {
            const Idx = StateData.findIndex((data) => data.bossid === TargetId);
            const GetPriceData = RanksData.find((data) => data.rankId === TargetRank);

            if(Idx === -1 || !GetPriceData){
                return;
            } else {
                const UpdateValue: I_BossIncomeData = {
                    bossid: StateData[Idx].bossid,
                    bossname: StateData[Idx].bossname,
                    bossrank: TargetRank,
                    price: GetPriceData.price,
                    membercount: StateData[Idx].membercount
                };

                setStateFn((prev) => [
                    ...prev.slice(0, Idx),
                    UpdateValue,
                    ...prev.slice(Idx + 1)
                ]);
            }
        }
    };

    return (
        <RankContainer key={`${bossid}_ranks`}>
            {
                RanksData.map((data, idx) => {
                    const isChecked = watch("BossRankRadios").includes(`${bossid}_${data.rankId}`);
                    const GetColors = ColorDatas.find((color) => color.rankId === data.rankId);

                    if(!GetColors) return null;

                    return (
                        <RankSelectItem key={`${bossid}_${data.rankId}`}>
                            <input 
                                type="radio"
                                name={bossid}
                                value={`${bossid}_${data.rankId}`}
                                defaultChecked={isChecked || idx === 0}
                                onChange={RankChangeEventListener}
                            />
                            <RankIcon textcolor={GetColors.fontColor} bgcolor={GetColors.bgColor} bordercolor={GetColors.borderColor}>
                                {data.rankId.slice(0, 1)}
                            </RankIcon>
                        </RankSelectItem>
                    );
                })
            }
        </RankContainer>
    );
}