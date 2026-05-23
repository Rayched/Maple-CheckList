"use client"

import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { I_IncomeData } from "@/stores/CharIncomeStore";
import styled from "styled-components";

/**
 * Income data를 
 * '0, 1' 혹은 '(length - 2), (length -1)' 
 * 형식으로 묶어서 보여주기 위한 components
 */

interface I_IncomeItemBoxProps {
    incomedatas: I_IncomeData[];
};

interface I_RankIcon {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 3px;

    .bossincomeitem {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 2px;

        img {
            width: 21px;
            height: 21px;
        }
    };
`;

const RankIcon = styled.div<I_RankIcon>`
    width: 17px;
    height: 17px;
    padding: 1px;
    margin-top: 3px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
`;

export default function IncomeItemBox({incomedatas}: I_IncomeItemBoxProps){
    return (
        <Container>
            {
                incomedatas.map((data) => {
                    const ColorData = RankColorInfos.find((color) => color.rankId === data.bossrank);

                    if(!ColorData) return;

                    return (
                        <div key={`${data.bossid}`} className="bossincomeitem">
                            <img src={`imgs/boss_monsters/${data.bossid}.png`} />
                            <RankIcon textcolor={ColorData.fontColor} bgcolor={ColorData.bgColor} bordercolor={ColorData.borderColor}>
                                {data.bossrank.slice(0, 1)}
                            </RankIcon>
                        </div>
                    );
                })
            }
        </Container>
    );
}