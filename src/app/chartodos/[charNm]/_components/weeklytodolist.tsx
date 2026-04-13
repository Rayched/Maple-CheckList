"use client"

import React from "react";
import { useForm } from "react-hook-form";
import {styled} from "styled-components";
import { useStore } from "zustand";
import { ToDoItem, ToDoListContainer } from "./todoitem/todolist_commons";
import { CharToDoStore, I_WeeklyToDos } from "@/stores/CharToDoStore";
import { OcidConfirms } from "@/components/pages/commons/OcidConfirm";

interface I_WeeklyToDoList {
    charname?: string;
    ocid: string;
    WeeklyToDoDatas?: I_WeeklyToDos[];
};

interface I_FormValue {
    WeeklyToDoSelect: string[];
    AccWeeklyToDoSelect: string[];
};

interface I_WeeklyUpdateProps {
    targetId: string;
    targetNm: string;
    isChecked: boolean;
};

const Container = styled(ToDoListContainer)``;
const WeeklyToDoItem = styled(ToDoItem)`
    span {
        text-decoration: ${(props) => props.todochecked === "true" ? "line-through" : "none"};
    }
`;

function WeeklyToDoList({charname, ocid, WeeklyToDoDatas}: I_WeeklyToDoList){
    const {chartodos, accWeeklyToDos, editCharToDo, updateAccWeeklyToDos} = useStore(CharToDoStore);

    const {register} = useForm<I_FormValue>({
        defaultValues: {
            WeeklyToDoSelect: []
        }
    });

    //계정 단위 주간 컨텐츠 todo event listener
    const AccWeeklyUpdate = ({targetId, targetNm, isChecked}: I_WeeklyUpdateProps) => {
        if(!charname) return console.log("charname의 값이 undefined일수도 있습니다.");

        const idx = chartodos.findIndex((data) => data.ocid === ocid || data.charname === charname);
        const GetAccWeeklyData = accWeeklyToDos.find((data) => data.contentsId === targetId || data.contentsNm === targetNm);

        if(idx === -1){
            console.log(`'${charname}'의 메할일을 찾지 못했습니다.`);
            return;
        } else if(!GetAccWeeklyData){
            console.log("accWeeklyToDos data를 가져오지 못했습니다.")
        } else {
            //todoitem checkbox check 한 경우
            console.log("accWeeklyToDos data 가져오기 성공")
            const ocidcheck = OcidConfirms({prevOcid: chartodos[idx].ocid, newOcid: ocid});

            const UpdateWeeklyToDoData = chartodos[idx].weeklyToDos.map((data) => {
                if(data.contentsId !== targetId){
                    return data;
                } else {
                    const NewToDo: I_WeeklyToDos = {
                        contentsId: data.contentsId,
                        contentsNm: data.contentsNm,
                        ToDoDone: isChecked ? true : false,
                        contentsUnit: data.contentsUnit
                    };

                    return NewToDo;
                }
            });

            updateAccWeeklyToDos({
                contentsId: GetAccWeeklyData.contentsId,
                contentsNm: GetAccWeeklyData.contentsNm,
                tododone: isChecked ? true : false
            });

            editCharToDo({
                ocid: ocidcheck ? chartodos[idx].ocid : ocid,
                charname: chartodos[idx].charname,
                weeklyToDos: UpdateWeeklyToDoData,
                bossToDos: chartodos[idx].bossToDos
            });
        } 
    }

    //캐릭터 단위 주간 컨텐츠 todo event Listener
    const CharWeeklyUpdate = ({targetId, targetNm, isChecked}: I_WeeklyUpdateProps) => {
        const idx = chartodos.findIndex((data) => data.ocid === ocid || data.charname === charname);

        if(idx === -1){
            console.log(`'${charname}'의 메할일을 찾지 못했습니다.`);
            return;
        } else {
            const TargetData = chartodos[idx];
            const ocidCheck = OcidConfirms({prevOcid: TargetData.ocid, newOcid: ocid});

            const UpdateWeeklyToDo = TargetData.weeklyToDos.map((data) => {
                if(data.contentsId !== targetId){
                    return data;
                } else {
                    const NewToDo: I_WeeklyToDos = {
                        contentsId: data.contentsId,
                        contentsNm: data.contentsNm,
                        ToDoDone: isChecked ? true : false,
                        contentsUnit: data.contentsUnit
                    };

                    return NewToDo;
                }
            });

            editCharToDo({
                ocid: ocidCheck ? TargetData.ocid : ocid,
                charname: TargetData.charname,
                weeklyToDos: UpdateWeeklyToDo,
                bossToDos: TargetData.bossToDos
            });
        }
    }

    return (
        <Container>
            {
                WeeklyToDoDatas?.map((data) => {
                    if(data.contentsUnit === "account"){
                        const AccWeeklyData = accWeeklyToDos.find((weekly) => weekly.contentsId === data.contentsId);

                        if(!AccWeeklyData) return null;

                        return (
                            <WeeklyToDoItem key={data.contentsId} todochecked={AccWeeklyData?.ToDoDone ? "true" : "false"}>
                                <input 
                                    type="checkbox" 
                                    value={data.contentsId}
                                    data-contentsname={data.contentsNm}
                                    defaultChecked={AccWeeklyData.ToDoDone}
                                    {...register("AccWeeklyToDoSelect", {
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: {value},
                                                target: {checked, dataset:{contentsname}}
                                            } = event;

                                            if(!contentsname) return console.log("contentsname props is undefined")

                                            AccWeeklyUpdate({
                                                targetId: value,
                                                targetNm: contentsname,
                                                isChecked: checked ? true: false
                                            });
                                        }
                                    })}
                                />
                                <span>{data.contentsNm}</span>
                            </WeeklyToDoItem>
                        );
                    } else {
                        return (
                            <WeeklyToDoItem key={data.contentsId} todochecked={data.ToDoDone ? "true" : "false"}>
                                <input 
                                    type="checkbox" 
                                    value={data.contentsId}
                                    data-contentsname={data.contentsNm}
                                    defaultChecked={data.ToDoDone}
                                    {...register("WeeklyToDoSelect", {
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: {value},
                                                target: {checked, dataset:{contentsname}}
                                            } = event;

                                            if(!contentsname) return;
                                            CharWeeklyUpdate({
                                                targetId: value,
                                                targetNm: contentsname,
                                                isChecked: checked ? true: false
                                            })
                                        }
                                    })}
                                />
                                <span>{data.contentsNm}</span>
                            </WeeklyToDoItem>
                        );
                    }
                })
            }
        </Container>
    );
}

export default WeeklyToDoList;