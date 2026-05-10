"use client"

import { SingleRankBox } from "@/app/addtodos/[charNm]/_component/_bossform/BossFormRankBox";
import { FormSliderBox } from "@/components/commons/FormCommons";
import { BossContentsData } from "@/game_datas/contentsData";
import { CharToDoStore, I_BossToDos } from "@/stores/CharToDoStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";
import RankSelectBtns from "./RankSelect_Radio";
import RankSelect_TypeRadio from "./RankSelect_Radio";

interface I_AddBossIncomeFormsProps {
    charname?: string;
    ocid?: string;
};

interface I_ToDoItemProps {
    min_height: string;
};

export interface I_BossToDoData {
    bossid: string;
    bossname: string;
    bossrank: string;
    price: number;
};

interface I_FormValue {
    BossToDoCheckbox: string[];
};

const Container = styled.div`
    width: 85%;
    height: 75%;
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
    background-color: white;
    border: 2px solid rgb(209, 216, 224);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .bossdatabox {
        width: 20%;
        height: 100%;
        min-width: 80px;
        max-width: 180px;
        margin-left: 3px;
        display: flex;
        align-items: center;

        img {
            width: 30%;
        };
        span {
            margin-left: 3px;
            width: 60%;
        };
    };

    .RankAndMembers {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    };
`;

const SubmitButton = styled.button`
    width: 80px;
    height: 35px;
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
`;

export default function AddBossIncomeForms({charname, ocid}: I_AddBossIncomeFormsProps){
    const {chartodos} = useStore(CharToDoStore);
    const ContentsData = BossContentsData;

    const FormMethods = useForm<I_FormValue>({
        defaultValues: {
            BossToDoCheckbox: []
        }
    });

    const {register, watch} = FormMethods;

    const [BossToDoData, setBossToDoData] = useState<I_BossToDoData[]>();
    const MemberCountArr = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const CharToDoCheck = chartodos.find((data) => data.ocid === ocid || data.charname === charname);

        if(!CharToDoCheck){
            return;
        } else if(CharToDoCheck.bossToDos.length <= 0){
            return;
        } else {
            const NewTargetData = CharToDoCheck.bossToDos.map((data) => {
                const OriginData = BossContentsData.find((bossdata) => bossdata.BossId === data.contentsId);

                if(!OriginData){
                    return {
                        bossid: data.contentsId,
                        bossname: data.contentsNm,
                        bossrank: data.bossrank,
                        price: 0
                    } as I_BossToDoData
                } else {
                    const GetPriceData = OriginData.Ranks.find((rank) => rank.rankId === data.bossrank);

                    if(!GetPriceData){
                        return {
                            bossid: data.contentsId, 
                            bossname: data.contentsNm, 
                            bossrank: data.bossrank, 
                            price: 0
                        } as I_BossToDoData;
                    } else {
                        const Convert: I_BossToDoData = {
                            bossid: OriginData.BossId,
                            bossname: OriginData.BossNm,
                            bossrank: data.bossrank,
                            price: GetPriceData.price
                        };
                        return Convert;
                    }
                }
            });

            setBossToDoData(NewTargetData);
        }
    }, []);

    return (
        <Container>
            <Titles>주간 보스 목록</Titles>
            <Forms>
                <ToDoList>
                    {
                        ContentsData.map((data) => {
                            if(data.Ranks.length <= 1){
                                /**minheight=> 45 */
                                return (
                                    <ToDoItem key={data.BossId} min_height="45px">
                                        <div className="bossdatabox">
                                            <input 
                                                type="checkbox" 
                                                value={data.BossId} 
                                                {...register("BossToDoCheckbox")}
                                            />
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        </div>
                                        {
                                            watch("BossToDoCheckbox").includes(data.BossId) ? (
                                                <div className="RankAndMembers">
                                                    <SingleRankBox 
                                                        rankid={data.Ranks[0].rankId}
                                                        rankNm={data.Ranks[0].rankNm}
                                                    />
                                                    <select key={`${data.BossId}_memberSelect`}>
                                                        {
                                                            MemberCountArr.map((value) => {
                                                                return (
                                                                    <option key={`num_${value}`}>{value}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            ): null
                                        }
                                    </ToDoItem>
                                );
                            } else {
                                /**minheight 80px */
                                return (
                                    <ToDoItem key={data.BossId} min_height="80px">
                                        <div className="bossdatabox">
                                            <input 
                                                type="checkbox" 
                                                value={data.BossId} 
                                                {...register("BossToDoCheckbox")}
                                            />
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        </div>
                                        {
                                            watch("BossToDoCheckbox").includes(data.BossId) ? (
                                                <div className="RankAndMembers">
                                                    <RankSelect_TypeRadio 
                                                        StateData={BossToDoData}
                                                        setStateFn={setBossToDoData}
                                                        bossid={data.BossId}
                                                        RanksData={data.Ranks}
                                                    />
                                                    <select key={`${data.BossId}_memberSelect`}>
                                                        {
                                                            MemberCountArr.map((value) => {
                                                                return (
                                                                    <option key={`num_${value}`}>{value}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            ): null
                                        }
                                    </ToDoItem>
                                );
                            }
                        })
                    }
                </ToDoList>
                <SubmitButton>저장</SubmitButton>
            </Forms>
        </Container>
    );
}