"use client"

import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { I_BossContents, RankInfo } from "@/game_datas/contentsData";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface I_BossFormItem {
    MonsterData: I_BossContents;
};

interface I_RankBox {
    text_color: string;
    bg_color: string;
    border_color: string
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px 2px;
    margin: 3px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(241, 242, 246);
    border: 1px solid rgb(241, 242, 246);
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
`;

const BossIcons = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 25px;
        height: 25px;
    }
`;

const RanksContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
`;

const RankItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const RankBox = styled.div<I_RankBox>`
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.text_color};
    background-color: ${(props) => props.bg_color};
    border: 3px solid ${(props) => props.border_color};
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
            <BossIcons>
                <img src={`/imgs/boss_monsters/${MonsterData.BossId}.png`}/>
            </BossIcons>
            <RanksContainer>
                {
                    GetRanksInfo.map((data) => {
                        const GetRankColors = RankColorInfos.find((color) => color.rankId === data?.rankId);

                        if(GetRankColors){
                            return (
                            <RankItem key={data?.rankId}>
                                <input type="checkbox" />
                                <RankBox 
                                    text_color={GetRankColors.fontColor} 
                                    bg_color={GetRankColors.bgColor} 
                                    border_color={GetRankColors.borderColor}
                                >
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