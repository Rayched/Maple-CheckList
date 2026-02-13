import { BossContentsData, RankInfo } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { I_BossToDos } from "@/stores";
import { todo } from "node:test";

interface I_RankIcon {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

type BossFormValueType = {
    selectedTargets: string[];
};

interface I_onSelectProps {
    isSelect: boolean;
    targetId?: string;
    defaultRank?: string;
};

interface I_SelectTarget {
    bossid?: string;
    rankid?: string;
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
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bossNm {
        margin-left: 3px;
    };
`;

const RanksBox = styled.div``;

const RankSelect = styled.select`
    text-align: center;
`;

const RankIcon = styled.div<I_RankIcon>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 2px solid ${(props) => props.bordercolor};
`;

export default function BossForms({ToDosData, setToDosData}: I_AddToDoForms){
    const BossContents = BossContentsData;

    const {register, watch, handleSubmit} = useForm<BossFormValueType>({
        defaultValues: {
            selectedTargets: []
        },
        mode: "onChange"
    });

    const updateSelect = ({isSelect, targetId, defaultRank}: I_onSelectProps) => {
        if(!isSelect){
            const Filter = Selected.filter((data) => data.bossid !== targetId);
            setSelected(Filter);
        } else {
            if(Selected.length >= 12) return;

            const NewToDo: I_SelectTarget = {
                bossid: targetId,
                rankid: defaultRank
            };

            setSelected((prevData) => [
                ...prevData,
                NewToDo
            ]);
        }
    };

    const [isClosed, setClosed] = useState(false);
    const [Selected, setSelected] = useState<I_SelectTarget[]>([]);

    useEffect(() => console.log(Selected), [Selected]);

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
                                const {BossId, BossNm, SubName, Ranks} = data;

                                const RankData = Ranks.map((rankdata) => {
                                    const RankName = RankInfo.find((info) => info.RankId == rankdata.rank);

                                    return {
                                        rankId: rankdata.rank,
                                        rankNm: RankName?.RankNm,
                                        price: rankdata.price
                                    }
                                });

                                const ColorData = RankColorInfos.find((color) => color.rankId === Ranks[0].rank);

                                const SelectCheck = watch("selectedTargets").includes(BossId);

                                return (
                                    <FormItem key={BossId}>
                                        <BossIcons>
                                            <input 
                                                key={`checkbox_${BossId}`}
                                                type="checkbox"
                                                value={BossId}
                                                disabled={watch("selectedTargets").length === 12 && !SelectCheck}
                                                {...register("selectedTargets", {
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const {currentTarget: {value}} = e;
                                                        const {target: {checked}} = e;

                                                        if(!checked){
                                                            updateSelect({isSelect: false, targetId: value});
                                                        } else {
                                                            updateSelect({
                                                                isSelect: true,
                                                                targetId: value,
                                                                defaultRank: RankData[0].rankId
                                                            });
                                                        }
                                                    } 
                                                })}
                                            />
                                            <img src={`/imgs/boss_monsters/${BossId}.png`} />
                                            <div className="bossNm">
                                                {SubName === undefined ? BossNm : null}
                                                {SubName !== undefined ? SubName : null}
                                            </div>
                                        </BossIcons>
                                        <RanksBox>
                                            {
                                                Ranks.length < 2 && SelectCheck ? (
                                                    <RankIcon 
                                                        textcolor={ColorData?.fontColor} 
                                                        bgcolor={ColorData?.bgColor} 
                                                        bordercolor={ColorData?.borderColor}
                                                    >
                                                        {RankData[0].rankNm}
                                                    </RankIcon>
                                                ) : null
                                            }
                                            {
                                                Ranks.length >= 2 && SelectCheck ? (
                                                    <select key={`${BossId}_rankselect`}>
                                                        {
                                                            RankData.map((rank) => {
                                                                return (
                                                                    <option key={`${BossId}_${rank.rankId}`}>
                                                                        {rank.rankNm}
                                                                    </option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                ) : null
                                            }
                                        </RanksBox>
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