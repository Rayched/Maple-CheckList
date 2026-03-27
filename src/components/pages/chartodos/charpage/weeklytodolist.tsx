"use client"

import { I_WeeklyToDos, MapleToDoDataStore } from "@/stores";
import React from "react";
import { useForm } from "react-hook-form";
import {styled} from "styled-components";
import { useStore } from "zustand";
import { ToDoItem, ToDoListContainer } from "./todoitem/todolist_commons";

interface I_WeeklyToDoList {
    charname?: string;
    WeeklyToDoDatas?: I_WeeklyToDos[];
};

interface I_FormValue {
    WeeklyToDoSelect: string[];
};

interface I_CheckedEventListenerProps {
    contentsId?: string;
    contentsUnit?: string;
};

const Container = styled(ToDoListContainer)``;
const WeeklyToDoItem = styled(ToDoItem)``;

function WeeklyToDoList({charname, WeeklyToDoDatas}: I_WeeklyToDoList){
    const {CharToDos, AccountWeeklys, UpdateCharToDos, UpdateAccWeeklys} = useStore(MapleToDoDataStore);

    const {register} = useForm<I_FormValue>({
        defaultValues: {
            WeeklyToDoSelect: []
        }
    });

    /**
        * contentsId, contentsUnit 필요
        * contentsId => check된 todo 분류용
        * contentsUnit => 계정단위 콘텐츠 구분용
    */
    const ToDoChecked = ({contentsId, contentsUnit}: I_CheckedEventListenerProps) => {
        const targetIdx = CharToDos.findIndex((data) => data.charNm === charname);
        
        if(targetIdx === -1){
            alert(`'${charname}'의 메할일 데이터를 찾지 못했습니다.`);
            return;
        } else if(contentsUnit === "account"){
            //계정단위 (메이플 id) 컨텐츠인 경우
            const NewAccWeeklys = AccountWeeklys.map((accweekly) => {
                if(accweekly.ContentsId === contentsId){
                    return {
                        ContentsId: accweekly.ContentsId,
                        ContentsNm: accweekly.ContentsNm,
                        IsDone: true,
                        Units: accweekly.Units
                    } as I_WeeklyToDos
                } else {
                    return accweekly;
                }
            });

            const NewWeeklyToDo = CharToDos[targetIdx].WeeklyToDos.map((data) => {
                if(data.ContentsId === contentsId){
                    return {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: true,
                        Units: data.Units
                    } as I_WeeklyToDos
                } else {
                    return data;
                }                
            });

            UpdateAccWeeklys(NewAccWeeklys);
            UpdateCharToDos([
                ...CharToDos.slice(0, targetIdx),
                {
                    charNm: CharToDos[targetIdx].charNm,
                    WeeklyToDos: NewWeeklyToDo,
                    BossToDos: CharToDos[targetIdx].BossToDos
                },
                ...CharToDos.slice(targetIdx + 1)
            ]);
        } else {
            //캐릭터 단위인 경우
            const NewWeeklyToDo = CharToDos[targetIdx].WeeklyToDos.map((data) => {
                if(data.ContentsId === contentsId){
                    return {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: true,
                        Units: data.Units
                    } as I_WeeklyToDos
                } else {
                    return data;
                }                
            });
            UpdateCharToDos([
                ...CharToDos.slice(0, targetIdx),
                {
                    charNm: CharToDos[targetIdx].charNm,
                    WeeklyToDos: NewWeeklyToDo,
                    BossToDos: CharToDos[targetIdx].BossToDos
                },
                ...CharToDos.slice(targetIdx + 1)
            ]);
        }
    };

    const ToDoUnchecked = ({contentsId, contentsUnit}: I_CheckedEventListenerProps) => {
        const targetIdx = CharToDos.findIndex((data) => data.charNm === charname);

        if(targetIdx === -1){
            alert(`'${charname}'의 메할일 데이터를 찾지 못했습니다.`);
            return;
        } else if(contentsUnit === "account"){
            //계정 단위 (메이플 id) 컨텐츠인 경우
            const NewAccWeeklys = AccountWeeklys.map((data) => {
                if(data.ContentsId === contentsId){
                    return {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        Units: data.Units
                    } as I_WeeklyToDos
                } else {
                    return data;
                }
            });

            const NewWeeklyToDo = CharToDos[targetIdx].WeeklyToDos.map((data) => {
                if(data.ContentsId === contentsId){
                    return {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        Units: data.Units
                    } as I_WeeklyToDos
                } else {
                    return data;
                }
            });

            UpdateAccWeeklys(NewAccWeeklys);
            UpdateCharToDos([
                ...CharToDos.slice(0, targetIdx),
                {
                    charNm: CharToDos[targetIdx].charNm,
                    WeeklyToDos: NewWeeklyToDo,
                    BossToDos: CharToDos[targetIdx].BossToDos
                },
                ...CharToDos.slice(targetIdx + 1)
            ]);
        } else {
            //캐릭터 단위 컨텐츠인 경우
            const NewWeeklyToDo = CharToDos[targetIdx].WeeklyToDos.map((data) => {
                if(data.ContentsId === contentsId){
                    return {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        Units: data.Units
                    } as I_WeeklyToDos
                } else {
                    return data;
                }
            });
            UpdateCharToDos([
                ...CharToDos.slice(0, targetIdx),
                {
                    charNm: CharToDos[targetIdx].charNm,
                    WeeklyToDos: NewWeeklyToDo,
                    BossToDos: CharToDos[targetIdx].BossToDos
                },
                ...CharToDos.slice(targetIdx + 1)
            ]);
        }
    };

    return (
        <Container>
            {
                WeeklyToDoDatas?.map((data) => {
                    if(data.Units === "account"){
                        const AccWeeklyData = AccountWeeklys.find((weekly) => weekly.ContentsId === data.ContentsId);

                        return (
                            <WeeklyToDoItem key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    value={data.ContentsId}
                                    data-contentsunit={data.Units}
                                    defaultChecked={AccWeeklyData?.IsDone}
                                    {...register("WeeklyToDoSelect", {
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: {value},
                                                target: {checked, dataset:{contentsunit}}
                                            } = event;

                                            if(checked){
                                                ToDoChecked({contentsId: value, contentsUnit: contentsunit});
                                            } else {
                                                ToDoUnchecked({contentsId: value, contentsUnit: contentsunit})
                                            }
                                        }
                                    })}
                                />
                                <span>{data.ContentsNm}</span>
                            </WeeklyToDoItem>
                        );
                    } else {
                        return (
                            <WeeklyToDoItem key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    value={data.ContentsId}
                                    data-contentsunit={data.Units}
                                    defaultChecked={data.IsDone}
                                    {...register("WeeklyToDoSelect", {
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: {value},
                                                target: {checked, dataset:{contentsunit}}
                                            } = event;

                                            if(checked){
                                                ToDoChecked({contentsId: value, contentsUnit: contentsunit});
                                            } else {
                                                ToDoUnchecked({contentsId: value, contentsUnit: contentsunit})
                                            }
                                        }
                                    })}
                                />
                                <span>{data.ContentsNm}</span>
                            </WeeklyToDoItem>
                        );
                    }
                })
            }
        </Container>
    );
}

export default WeeklyToDoList;