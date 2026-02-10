import { BossContentsData, RankInfo } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_RankIcon {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

interface I_ContentsData {
    bossId: string;
    rankNm: string
};

interface onCheckedProps {
    e: ChangeEvent<HTMLInputElement>;
    id: string;
};

type BossFormValueType = {
    selectedTargets: string[];
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

const RankSelect = styled.select``;

export default function BossForms({ToDosData, setToDosData}: I_AddToDoForms){
    const BossContents = BossContentsData;

    const {register, watch} = useForm<BossFormValueType>({
        defaultValues: {
            selectedTargets: []
        },
        mode: "onChange"
    });

    const [isClosed, setClosed] = useState(true);

    useEffect(() => console.log(watch("selectedTargets")), [watch("selectedTargets")])

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
                                            <input 
                                                type="checkbox" 
                                                value={data.BossId} 
                                                {...register("selectedTargets")}
                                            />
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        </BossIcons>
                                        {
                                            watch("selectedTargets").includes(data.BossId) && (
                                                <RanksBox>
                                                    {
                                                        data.Ranks.length >= 2 ? (
                                                            <RankSelect >
                                                                <option value="">-- 난이도 선택 --</option>
                                                                {
                                                                    data.Ranks.map((rankdata) => {
                                                                        const keys = data.BossId + "_" + rankdata.rank;
                                                                        const GetRankNm = RankInfo.find((info) => info.RankId === rankdata.rank);

                                                                        return (
                                                                            <option key={keys}>
                                                                                {GetRankNm?.RankNm}
                                                                            </option>
                                                                        );
                                                                    })
                                                                }
                                                            </RankSelect>
                                                        ) : (
                                                            <div>
                                                                {data.Ranks[0].rank}
                                                            </div>
                                                        )
                                                    }
                                                </RanksBox>
                                            )
                                        }
                                    </FormItem>
                                );
                            })
                        }
                        <button>저장</button>
                    </BossForm>
                ): null
            }
        </Container>
    );
}