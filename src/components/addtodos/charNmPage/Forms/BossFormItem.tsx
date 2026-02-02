"use client"

import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { I_BossContents, RankInfo } from "@/game_datas/contentsData";
import styled from "styled-components";

interface I_BossFormItem {
    MonsterData: I_BossContents;
};

interface I_RankBox {
    fontColor: string;
    bgColor: string;
    borderColor: string
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px 2px;
    margin: 3px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border: 1px solid black;
    font-size: 15px;
    font-weight: bold;
`;

const BossIconImg = styled.img`
    width: 30px;
    height: 30px;
`;

const RanksContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RankItem = styled.div`
    display: flex;
    flex-direction: row;
`;

const RankBox = styled.div<I_RankBox>`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.fontColor};
    background-color: ${(props) => props.bgColor};
    border: 2px solid ${(props) => props.borderColor};
`;

export default function BossFormItem({MonsterData}: I_BossFormItem){
    const GetRanksInfo = MonsterData.Ranks.map((data) => {
        const idx = RankInfo.findIndex((info) => info.RankId === data.rank);

        if(idx === -1){
            return;
        } else {
            const NewRankData = {
                rankId: RankInfo[idx].RankId,
                rankNm: RankInfo[idx].RankNm,
                price: data.price
            };
            return NewRankData;
        }
    });

    return (
        <Container>
            <BossIconImg src={`/imgs/boss_monsters/${MonsterData.BossId}.png`}/>
            <RanksContainer>
                {
                    GetRanksInfo.map((data) => {
                        const RankColors = RankColorInfos;

                        const GetRankColors = RankColorInfos.find((color) => color.rankId === data?.rankId);

                        if(GetRankColors){
                            return (
                            <RankItem key={data?.rankId}>
                                <input type="checkbox" />
                                <RankBox fontColor={GetRankColors?.fontColor} bgColor={GetRankColors.bgColor} borderColor={GetRankColors.borderColor}>
                                    {data?.rankId.slice(0, 1)}
                                </RankBox>
                            </RankItem>
                            );
                        } else {
                            return null;
                        }
                    })
                }
            </RanksContainer>
        </Container>
    );
}