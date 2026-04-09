"use client"

import { styled } from "styled-components"
import { ToDoItem, ToDoListContainer } from "./todoitem/todolist_commons";
import { useState } from "react";
import { BossContentsData } from "@/game_datas/contentsData";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { CharToDoStore, I_BossToDos } from "@/stores/CharToDoStore";
import { useForm } from "react-hook-form";
import { useStore } from "zustand";

interface I_BossToDoList {
    charname?: string;
    BossToDoDatas?: I_BossToDos[];
};

interface I_Rankbox {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
    todochecked: string;
};

interface I_BossToDoUpdateProps {
    bossId: string;
    bossNm: string;
    isChecked: boolean;
};

interface I_FormValue {
    checkedValues: string[];
};

const Container = styled(ToDoListContainer)`
    width: 85%;
    min-width: 300px;
    max-width: 350px;
    max-height: 270px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 10px;
    background-color: rgb(149, 165, 166);
    border-radius: 10px;

    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-snap-align: start;
    scroll-behavior: smooth;
    scrollbar-width: none;
    scroll-snap-stop: normal;
`;

const BossToDoItem = styled(ToDoItem)`
    justify-content: space-between;
    .bossname {
        width: 75%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 15px;
        text-decoration: ${(props) => props.todochecked === "true" ? "line-through" : "none"};
        text-decoration-thickness: 3px;

        img {
            margin-right: 3px;
        }
    }
`;

const Rankbox = styled.div<I_Rankbox>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.todochecked === "true" ? "rgb(116, 125, 140)" : props.bgcolor};
    border: 3px solid ${(props) => props.todochecked === "true" ? "rgb(87, 96, 111)" : props.bordercolor};
    width: 20px;
    height: 20px;
    margin: 0px 5px;
`;

function BossToDoList({BossToDoDatas, charname}: I_BossToDoList){
    const {chartodos, editCharToDo} = useStore(CharToDoStore);
    const {register} = useForm<I_FormValue>({
        defaultValues: {
            checkedValues: []
        }
    });

    const BossToDoUpdate = ({bossId, bossNm, isChecked}: I_BossToDoUpdateProps) => {
        const idx = chartodos.findIndex((data) => data.charname === charname);

        if(idx === -1){
            console.log(`${charname}의 메할일 데이터를 찾지 못했습니다.`);
            return;
        } else {
            const NewBossToDoData = chartodos[idx].bossToDos.map((data) => {
                if(data.contentsId !== bossId && data.contentsNm !== bossNm){
                    return data;
                } else {
                    const GetBossData = BossContentsData.find((bossdata) => bossdata.BossId === data.contentsId || bossdata.BossNm === data.contentsNm);

                    if(data.contentsId !== bossId){
                        return {
                            contentsId: String(GetBossData?.BossId),
                            contentsNm: data.contentsNm,
                            ToDoDone: isChecked ? true : false,
                            bossrank: data.bossrank
                        } as I_BossToDos
                    } else if(data.contentsNm !== bossNm){
                        return {
                            contentsId: data.contentsId,
                            contentsNm: String(data.contentsNm),
                            ToDoDone: isChecked ? true : false,
                            bossrank: data.bossrank
                        } as I_BossToDos
                    } else {
                        return {
                            contentsId: data.contentsId,
                            contentsNm: data.contentsNm,
                            ToDoDone: isChecked ? true : false,
                            bossrank: data.bossrank
                        };
                    }
                }
            });

            editCharToDo({
                charname: chartodos[idx].charname,
                weeklyToDos: chartodos[idx].weeklyToDos,
                bossToDos: NewBossToDoData
            })
        }
    };

    return (
        <Container>
            {
                BossToDoDatas?.map((data) => {
                    const BossLittleNm= BossContentsData.find((origin) => origin.BossId === data.contentsId|| origin.BossNm === data.contentsNm)?.SubName;
                    const RankColor = RankColorInfos.find((colors) => colors.rankId === data.bossrank);

                    return (
                        <BossToDoItem key={data.contentsId} todochecked={data.ToDoDone ? "true" : "false"}>
                            <input 
                                type="checkbox" 
                                value={data.contentsId}
                                data-contentsname={data.contentsNm}
                                defaultChecked={data.ToDoDone ? true : false}
                                {...register("checkedValues", {
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        const {
                                            currentTarget: {value},
                                            target: {
                                                dataset: {contentsname},
                                                checked
                                            }
                                        } = e;

                                        if(!contentsname) return;

                                        BossToDoUpdate({
                                            bossId: value,
                                            bossNm: contentsname,
                                            isChecked: checked ? true : false
                                        });
                                    }
                                })}
                            />
                            <span className="bossname">
                                <img src={`/imgs/boss_monsters/${data.contentsId}.png`} />
                                {!BossLittleNm ? data.contentsNm : BossLittleNm}
                            </span>
                            <Rankbox 
                                textcolor={RankColor?.fontColor} 
                                bgcolor={RankColor?.bgColor} 
                                bordercolor={RankColor?.borderColor}
                                todochecked={data.ToDoDone ? "true" : "false"}
                            >
                                {data.bossrank.slice(0, 1)}
                            </Rankbox>
                        </BossToDoItem>
                    );
                })
            }
        </Container>
    );
};

export default BossToDoList;