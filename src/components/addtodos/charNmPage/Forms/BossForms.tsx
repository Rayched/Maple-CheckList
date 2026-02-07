import { BossContentsData, RankInfo } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import { useEffect, useState } from "react";
import BossFormItem from "./BossFormItem";
import { useForm } from "react-hook-form";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_RankIcon {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

const Container = styled.div`
    width: 100%;
    margin: 5px 0px;
    min-height: 50px;
    background-color: darkgray;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseToggleBar = styled.div`
    width: 100%;
    height: 20px;
    padding: 3px 0px;
    background-color: #8f8d8d;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .messagebox {
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    };
    .toggleicon {
        width: 5%;
        padding-right: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    };
`;

const BossForm = styled.form`
    width: 100%;
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormItem = styled.div`
    width: 95%;
    height: 30px;
    margin: 3px 0px;
    background-color: rgb(207, 207, 208);
    border: 2px solid rgb(212, 213, 215);
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
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

const RanksBox = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RankItem = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0px 3px;
`;

const RankIcon = styled.div<I_RankIcon>`
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
`;

export default function BossForms({ToDosData, setToDosData}: I_AddToDoForms){
    const BossContents = BossContentsData;

    const {register} = useForm();

    const [isClosed, setClosed] = useState(true);

    return (
        <Container>
            <CloseToggleBar onClick={() => setClosed((prev) => !prev)}>
                <div className="messagebox">주간 보스 목록</div>
                <div className="toggleicon">{isClosed ? "▼" : "▲"}</div>
            </CloseToggleBar>
            {
                !isClosed ? (
                    <BossForm>
                        {
                            BossContents.map((data) => {
                                return (
                                    <FormItem key={data.BossId}>
                                        <BossIcons>
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        </BossIcons>
                                        <RanksBox>
                                        {
                                            data.Ranks.map((rankdata) => {
                                                const rankboxkey = data.BossId + "_" + rankdata.rank;

                                                const RankColors = RankColorInfos.find((colordata) => colordata.rankId === rankdata.rank);

                                                if(RankColors){
                                                    return (
                                                        <RankItem key={rankboxkey}>
                                                            <input type="checkbox" />
                                                            <RankIcon 
                                                                textcolor={RankColors.fontColor}
                                                                bgcolor={RankColors.bgColor}
                                                                bordercolor={RankColors.borderColor}
                                                            >{rankdata.rank.slice(0, 1)}</RankIcon>
                                                        </RankItem>
                                                );
                                                } else {
                                                    return <div>Color, rankid error</div>
                                                }
                                                
                                            })
                                        }
                                        </RanksBox>
                                    </FormItem>
                                );
                            })
                        }
                    </BossForm>
                ): null
            }
        </Container>
    );
}