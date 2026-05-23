"use client"

import { SingleRankBox } from "@/app/addtodos/[charNm]/_component/_bossform/BossFormRankBox";
import { FormSliderBox } from "@/components/commons/FormCommons";
import { BossContentsData, WorldDatas } from "@/game_datas/contentsData";
import { CharToDoStore, I_BossToDos } from "@/stores/CharToDoStore";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";
import RankSelectBtns from "./BossRankSelect";
import RankSelect_TypeRadio from "./BossRankSelect";
import { BossToDoSort, IncomeDataSort } from "@/utils/SortFuncs";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import BossRankRadioBox from "./BossRankSelect";
import { CharIncomeStore, I_IncomeData } from "@/stores/CharIncomeStore";
import { useRouter } from "next/navigation";

interface I_AddBossIncomeFormsProps {
    charname?: string;
    ocid?: string;
    worldname?: string;
    charimg?: string;
};

interface I_ToDoItemProps {
    min_height: string;
    isdisabled: string;
};

export interface I_BossIncomeData {
    bossid: string;
    bossname: string;
    bossrank: string;
    price: number;
    membercount: number;
};

export interface I_FormValue {
    BossToDoCheckbox: string[];
    BossRankRadios: string[];
};

interface I_CheckedEventProps {
    targetId: string;
    isChecked: boolean;
};

interface I_SingleRankProps {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

const Container = styled.div`
    width: 85%;
    height: 80%;
    min-height: 230px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(228, 225, 225);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
`;

const Titles = styled.div`
    width: 100%;
    height: 8%;
    color: white;
    background-color: black;
    font-weight: bold;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

    .bosstododatacount {
        margin-left: 5px;
    }
`;

const Forms = styled.form`
    width: 95%;
    height: 95%;
    min-height: 300px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

const ToDoList = styled.div`
    width: 100%;
    height: 80%;
    min-height: 285px;
    max-height: 320px;
    padding: 2px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 0px;
    };
`;

const ToDoItem = styled.div<I_ToDoItemProps>`
    width: 95%;
    height: 30%;
    min-height: ${(props) => props.min_height};
    padding: 2px 3px;
    margin: 3px 0px;
    color: ${(props) => props.isdisabled === "1" ? "rgb(87, 101, 116)" : "black"};
    background-color: ${(props) => props.isdisabled === "1" ? "rgb(209, 216, 224)" : "white"};
    border: 2px solid ${(props) => props.isdisabled === "1" ? "rgb(209, 216, 224)" : "black"};
    border-radius: 8px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;

    .bossdatabox {
        width: 30%;
        height: 100%;
        min-width: 100px;
        max-width: 200px;
        margin-left: 3px;
        display: flex;
        align-items: center;

        img {
            width: 22px;
            height: 22px;
        };

        span {
            margin-left: 3px;
            width: 60%;
            text-decoration: ${(props) => props.isdisabled === "1" ? "line-through" : "none"};
            text-decoration-thickness: 3px;
        };
    };

    .BossRank_MemberCounts {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .bossranksbox {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            width: 65%;
            height: 100%;
        }

        .memberselectbox {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            span {
                margin-right: 3px;
            }

            select {
                width: 35px;
                height: 23px;
                text-align: center;
                font-weight: bold;
                border: 2px solid black;
                border-radius: 3px;
            }
        };
    };
`;

const SingleRank = styled.div<I_SingleRankProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    padding: 2px 3px;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
    font-size: 16px;
    font-weight: bold;
`;

const SubmitButton = styled.button`
    width: 80px;
    height: 35px;
    margin-top: 5px;
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
`;

const GetRankBoxMinHeights = (RanksLength: number) => {
    if(RanksLength === 1){
        return "45px";
    } else if(RanksLength === 2){
        return "65px";
    } else if(RanksLength === 3){
        return "85px";
    } else {
        return "115px";
    }
}

export default function AddBossIncomeForms({charname, ocid, charimg, worldname}: I_AddBossIncomeFormsProps){
    const CharToDoData = useStore(CharToDoStore).chartodos.find((data) => data.ocid === ocid || data.charname === charname);
    const {CharIncomeDatas, AddNewCharIncomeData} = useStore(CharIncomeStore);
    const ContentsData = BossContentsData;

    const [IncomeDatas, setIncomeDatas] = useState<I_BossIncomeData[]>([]);
    const MemberCountArr = [1, 2, 3, 4, 5, 6];

    const FormMethods = useForm<I_FormValue>({
        defaultValues: {
            BossToDoCheckbox: [],
            BossRankRadios: []
        }
    });

    const {register, setValue, watch, handleSubmit} = FormMethods;
    const {push} = useRouter();

    const CheckedEvent = ({targetId, isChecked}: I_CheckedEventProps) => {
        if(!isChecked){
            const idx = IncomeDatas.findIndex((data) => data.bossid === targetId);

            if(idx === -1) return;

            setIncomeDatas((prev) => [
                ...prev.slice(0, idx),
                ...prev.slice(idx + 1)
            ]);
        } else {
            const GetData = ContentsData.find((data) => data.BossId === targetId);
            
            if(!GetData) return;

            const NewToDoData: I_BossIncomeData = {
                bossid: GetData.BossId,
                bossname: GetData.BossNm,
                bossrank: GetData.Ranks[0].rankId,
                price: GetData.Ranks[0].price,
                membercount: 1
            };

            setIncomeDatas((prev) => {
                const UpdateValue = IncomeDataSort({
                    IncomeDatas: [...prev, NewToDoData]
                });

                return UpdateValue;
            });
        }
    };

    const MembersChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            currentTarget: {value}
        } = e;

        const [TargetId, Counts] = value.split("_");

        const idx = IncomeDatas.findIndex((data) => data.bossid === TargetId);

        if(idx === -1){
            console.log("수정 대상을 찾지 못했습니다.");
            return;
        } else {
            const UpdateValue: I_BossIncomeData = {
                bossid: IncomeDatas[idx].bossid,
                bossname: IncomeDatas[idx].bossname,
                bossrank: IncomeDatas[idx].bossrank,
                price: IncomeDatas[idx].price,
                membercount: Number(Counts)
            };

            setIncomeDatas((prev) => [
                ...prev.slice(0, idx),
                UpdateValue,
                ...prev.slice(idx + 1)
            ]);
        }
    };

    const SaveCharIncomeData = () => {
        if(!charname || !ocid || !charimg || !worldname) return;

        const IsDuplicate = CharIncomeDatas.find((data) => data.charname === charname || data.ocid === ocid);
        const GetWorldData = WorldDatas.find((world) => world.worldNm === worldname);

        if(IsDuplicate){
            alert(`'${charname}'의 주간보스 수익 데이터가 존재합니다.`);
            return;
        } else {
            if(!GetWorldData){
                console.log('World data를 가져오지 못했습니다.');
                return;
            }

            const BossIncomeDataConvert = IncomeDatas.map((data) => {
                const Convert: I_IncomeData = {
                    bossid: data.bossid,
                    bossname: data.bossname,
                    bossrank: data.bossrank,
                    boss_price: data.price,
                    members: data.membercount
                };

                return Convert;
            });

            AddNewCharIncomeData({
                charname: charname,
                ocid: ocid,
                charimgurl: charimg,
                worldId: GetWorldData.worldId,
                incomeData: BossIncomeDataConvert
            });

            push("/incomes");
        }
    };

    /**
     * 해당 닉네임의 캐릭터의 메할일, 주간 보스 todo가
     * 존재하는 경우, defaultdata setting하는 Side effect
     */
    useEffect(() => {
        if(!CharToDoData){
            return;
        } else if(CharToDoData.bossToDos.length <= 0){
            return;
        } else {
            const TargetData = ContentsData.map((data) => {
                const IsInclude = CharToDoData.bossToDos.find((todo) => todo.contentsId === data.BossId);

                if(!IsInclude){
                    return null;
                } else {
                    const RankData = data.Ranks.find((ranks) => ranks.rankId === IsInclude.bossrank);

                    if(!RankData) return null;

                    const Format: I_BossIncomeData = {
                        bossid: data.BossId,
                        bossname: data.BossNm,
                        bossrank: IsInclude.bossrank,
                        price: RankData.price,
                        membercount: 1
                    };

                    return Format;
                }
            }).filter((data) => data !== null);

            const CheckboxDefaultData = CharToDoData.bossToDos.map((data) => data.contentsId);
            const BossRankDefaultData = CharToDoData.bossToDos.map((data) => `${data.contentsId}_${data.bossrank}`);

            setValue("BossToDoCheckbox", CheckboxDefaultData);
            setValue("BossRankRadios", BossRankDefaultData)

            setIncomeDatas(TargetData);
        }
    }, []);

    useEffect(() => {
        if(IncomeDatas.length === 0){
            return;
        } else {
            console.log(IncomeDatas);
        }
    }, [IncomeDatas]);

    return (
        <Container>
            <Titles>
                주간 보스 목록
                <span className="bosstododatacount">
                    {`( ${IncomeDatas.length} / 12 )`}
                </span>
            </Titles>
            <Forms onSubmit={handleSubmit(SaveCharIncomeData)}>
                <ToDoList>
                    {
                        ContentsData.map((data) => {
                            const MinHeights = GetRankBoxMinHeights(data.Ranks.length)
                            const IsIncludes = IncomeDatas.find((todos) => todos.bossid === data.BossId); 

                            const ColorData = RankColorInfos.find((colors) => {
                                const RankLength = data.Ranks.length;

                                if(RankLength >= 2){
                                    return undefined;
                                } else if(data.Ranks[0].rankId === colors.rankId){
                                    return colors;
                                } else {
                                    return undefined
                                }
                            });

                            const DisabledValue = (!watch("BossToDoCheckbox").includes(data.BossId) && IncomeDatas.length >= 12 ? "1" : "0");

                            return (
                                <ToDoItem key={data.BossId} min_height={MinHeights} isdisabled={DisabledValue}>
                                    <div className="bossdatabox">
                                        <input 
                                            type="checkbox"
                                            value={data.BossId}
                                            defaultChecked={!IsIncludes ? false : true}
                                            disabled={IncomeDatas.length >= 12 && !watch("BossToDoCheckbox").includes(data.BossId)}
                                            {...register("BossToDoCheckbox", {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const {
                                                        currentTarget: {value},
                                                        target: {checked}
                                                    } = e;
                                                    CheckedEvent({targetId: value, isChecked: checked})
                                                }
                                            })}
                                        />
                                        <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        <span>{data.SubName ? data.SubName : data.BossNm}</span>
                                    </div>
                                    <FormProvider {...FormMethods}>
                                        {
                                            watch("BossToDoCheckbox").includes(data.BossId) ? (
                                                <div className="BossRank_MemberCounts">
                                                    <div className="bossranksbox">
                                                        {
                                                            data.Ranks.length <= 1 ? (
                                                                <SingleRank textcolor={ColorData?.fontColor} bgcolor={ColorData?.bgColor} bordercolor={ColorData?.borderColor}>
                                                                    {data.Ranks[0].rankId.slice(0, 1)}
                                                                </SingleRank>
                                                            ) : null
                                                        }
                                                        {
                                                            data.Ranks.length > 1 ? (
                                                                <BossRankRadioBox 
                                                                    StateData={IncomeDatas}
                                                                    setStateFn={setIncomeDatas}
                                                                    bossid={data.BossId}
                                                                    RanksData={data.Ranks}
                                                                />
                                                            ) : null
                                                        }
                                                    </div>
                                                    <div className="memberselectbox">
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"15"} height={"15"}>
                                                                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                                                            </svg>
                                                        </span>
                                                        <select key={`${data.BossId}_membercount`} defaultValue={1} onChange={MembersChangeEvent}>
                                                            {
                                                                MemberCountArr.map((value, idx) => {
                                                                    return (
                                                                        <option key={`count${idx}`} value={`${data.BossId}_${value}`}>{value}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                    </FormProvider>
                                </ToDoItem>
                            );
                        })
                    }
                </ToDoList>
                <SubmitButton>저장</SubmitButton>
            </Forms>
        </Container>
    );
}