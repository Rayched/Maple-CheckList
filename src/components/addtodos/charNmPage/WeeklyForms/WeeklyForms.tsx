"use client"

import { WeeklyContentsData } from "@/game_datas/contentsData";
import { I_ToDosData, I_WeeklyToDoData } from "../AddToDosLayout";
import { CloseToggleBar, FormContainer, FormItem, Forms } from "../Commons";
import { FormProvider, useForm } from "react-hook-form";
import {styled} from "styled-components";
import { useEffect, useState } from "react";
import UnitsBox from "./UnitsBox";
import { WeeklyToDoSort } from "@/utils/SortFuncs";

export interface I_AddToDoForms {
    ToDosData: I_ToDosData;
    setToDosData: (newValue: I_ToDosData) => void;
    setCategory: (newValue: string) => void;
};

export interface I_FormValue {
    WeeklySelect: String[];
};

const WeeklyForm = styled(Forms)`
    padding: 0px;
`;

export default function WeeklyForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const WeeklysData = WeeklyContentsData

    const AccountWeeklys = WeeklysData.filter((data) => data.Units === "account" || data.ContentsId === "account01");
    const ArcaneWeeklys = WeeklysData.map((data) => {
        const targets = [
            "arcane01","arcane02","arcane03",
            "arcane04","arcane05","arcane06",
        ];

        if(!targets.includes(data.ContentsId)){
            return null;
        } else {
            return data;
        }
    }).filter((data) => data !== null);

    const CharWeeklys = WeeklysData.map((data) => {
        const targets = ["weekly01", "weekly02", "weekly03"];

        if(!targets.includes(data.ContentsId)){
            return null;
        } else {
            return data;
        };
    }).filter((data) => data !== null);
    
    const Methods = useForm<I_FormValue>({
        defaultValues: {
            WeeklySelect: []
        }
    });

    const {watch, handleSubmit, setValue} = Methods;

    const onValid = () => {
        const SelectedTargets = watch("WeeklySelect");

        if(SelectedTargets.length === 0){
            return;
        } else {
            const PrevData = ToDosData.WeeklyToDos.filter((todos) => {
                if(SelectedTargets.includes(String(todos.contentsId))){
                    return;
                } else {
                    return todos;
                }
            });

            const NewToDoData = WeeklysData.map((origin) => {
                const GetPrevIds = ToDosData.WeeklyToDos.map((data) => data.contentsId);

                if(GetPrevIds.includes(origin.ContentsId) || !watch("WeeklySelect").includes(origin.ContentsId)){
                    return null;
                } else {
                    const NewData: I_WeeklyToDoData = {
                        contentsId: origin.ContentsId,
                        contentsNm: origin.ContentsNm,
                        IsDone: false,
                        contentsUnit: origin.Units
                    };
                    return NewData;
                }
            }).filter((data) => data !== null);

            const UpdateData = WeeklyToDoSort({
                WeeklyToDoDatas: [...PrevData, ...NewToDoData]
            });

            setToDosData({
                WeeklyToDos: UpdateData,
                BossToDos: ToDosData.BossToDos
            });
            setCategory("");
        }
    };

    useEffect(() => console.log(watch("WeeklySelect")), [watch("WeeklySelect")])

    return (
        <FormContainer>
            <FormProvider {...Methods}>
                <WeeklyForm onSubmit={handleSubmit(onValid)}>
                    <UnitsBox 
                        titles={"주간 컨텐츠 / 계정 단위"}
                        contentsdata={AccountWeeklys}
                    />
                    <UnitsBox 
                        titles="아케인리버 주간 컨텐츠"
                        contentsdata={ArcaneWeeklys}
                    />
                    <UnitsBox 
                        titles="주간 컨텐츠 / 캐릭터 별"
                        contentsdata={CharWeeklys}
                    />
                    <button>저장</button>
                </WeeklyForm>
            </FormProvider>
        </FormContainer>
    );
}