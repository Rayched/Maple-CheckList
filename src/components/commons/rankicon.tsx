import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import styled from "styled-components";

interface I_RankIconProps {
    bossrank: string;
};

interface I_Container {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

export type RankDataType = {
    rankname: string;
    rankicontext: string;
};



const Container = styled.div<I_Container>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
    font-size: 14px;
    font-weight: bold;
`;

export default function RankIcon({bossrank}: I_RankIconProps){
    const RankData: RankDataType[] = [
        {rankicontext: "e", rankname: "easy"},
        {rankicontext: "N", rankname: "normal"},
        {rankicontext: "H", rankname: "hard"},
        {rankicontext: "C", rankname: "chaos"},
        {rankicontext: "E", rankname: "extreme"}
    ];

    const GetRankIconText = RankData.find((data) => data.rankname === bossrank);
    const ColorData = RankColorInfos.find((color) => color.rankId === bossrank);

    if(!GetRankIconText || !ColorData){
        return null;
    } else {
        return (
            <Container textcolor={ColorData.fontColor} bgcolor={ColorData.bgColor} bordercolor={ColorData.borderColor}>
                {GetRankIconText.rankicontext}
            </Container>
        );
    }
};