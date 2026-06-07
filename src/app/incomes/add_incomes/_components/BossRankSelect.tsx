"use client"

import { BossContentsData, I_RankType } from "@/game_datas/contentsData";
import { I_BossIncomeData, I_FormValue } from "./AddIncomeForms";
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

interface I_RankChangeEventListenerProps {
    rankId: string;
    targetId: string;
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
    const {watch, register, setValue} = useFormContext<I_FormValue>();

    const ColorDatas = RankColorInfos.map((color) => {
        const RankIdDatas = RanksData.map((data) => data.rankId);

        if(!RankIdDatas.includes(color.rankId)){
            return null;
        } else {
            return color;
        }
    }).filter((data) => data !== null);

    const RankChangeEventListener = ({rankId, targetId}: I_RankChangeEventListenerProps) => {
        const [BossId, BossRank] = targetId.split("_");

        const idx = StateData.findIndex((data) => data.bossid === BossId);
        const TargetData = BossContentsData.find((data) => data.BossId === BossId);

        if(idx === -1){
            console.log(`'${BossId}'를 가진 IncomeData를 찾지 못했습니다.`);
            return;
        } else if(!TargetData){
            console.log(`'${BossId}'와 동일한 보스 콘텐츠 데이터를 찾지 못했습니다.`);
            return;
        } else {
            const PriceData = TargetData.Ranks.find((data) => data.rankId === rankId);

            if(!PriceData){
                console.log("Cannot find Rank data");
                return;
            } else {
                const UpdateValue: I_BossIncomeData = {
                    bossid: StateData[idx].bossid,
                    bossname: StateData[idx].bossname,
                    bossrank: StateData[idx].bossrank,
                    price: PriceData.price,
                    membercount: 1
                };

                setStateFn((prev) => [
                    ...prev.slice(0, idx),
                    UpdateValue,
                    ...prev.slice(idx + 1)
                ]);
                setValue(`Membercounts.${BossId}`, 1);
            }
        }
    };

    return (
        <RankContainer key={`${bossid}_ranks`}>
            {
                RanksData.map((data) => {
                    const isChecked = watch("BossRankRadios")[`${data.rankId}`];
                    const GetColors = ColorDatas.find((color) => color.rankId === data.rankId);

                    if(!GetColors) return null;

                    return (
                        <RankSelectItem key={`${bossid}_${data.rankId}`}>
                            <input 
                                type="radio"
                                data-bossid={`${bossid}_${data.rankId}`}
                                value={`${data.rankId}`}
                                defaultChecked={isChecked === data.rankId}
                                {...register(`BossRankRadios.${bossid}`, {
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                        const {
                                            currentTarget: {value},
                                            target: {
                                                dataset: {bossid}
                                            }
                                        } = event;

                                        if(!bossid){
                                            console.log("bossid error");
                                            return;
                                        } else {
                                            RankChangeEventListener({
                                                rankId: value,
                                                targetId: bossid
                                            });
                                        }
                                    }
                                })}
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