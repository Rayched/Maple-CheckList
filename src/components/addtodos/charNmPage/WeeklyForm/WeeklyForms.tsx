"use client"

import { WeeklyContentsData } from "@/game_datas/contentsData";
import { I_ToDosData, I_WeeklyToDoData } from "../AddToDosLayout";
import { CloseToggleBar, FormContainer, FormItem, Forms } from "../FormCommons";
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

export interface I_SelectTarget {
    weeklyId: string;
    weeklyNm: string;
    weeklyUnits: string;
};

const WeeklyForm = styled(Forms)`
    padding: 0px;
`;

export default function WeeklyForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const WeeklysData = WeeklyContentsData;

    const [SelectTarget, setSelectTarget] = useState<I_SelectTarget[]>([]);

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

    const {watch, handleSubmit} = Methods;

    const onValid = () => {
        if(SelectTarget.length === 0){
            setToDosData({
                WeeklyToDos: [],
                BossToDos: ToDosData.BossToDos
            });
        } else {
            const UpdateWeeklyToDos = SelectTarget.map((data) => {
                const GetWeeklyToDoData = ToDosData.WeeklyToDos.find((tododata) => tododata.contentsId === data.weeklyId);

                if(!GetWeeklyToDoData){
                    const Format: I_WeeklyToDoData = {
                        contentsId: data.weeklyId,
                        contentsNm: data.weeklyNm,
                        contentsUnit: data.weeklyUnits,
                        IsDone: false
                    };
                    return Format;
                } else {
                    const UpdateData: I_WeeklyToDoData = {
                        contentsId: data.weeklyId,
                        contentsNm: data.weeklyNm,
                        contentsUnit: data.weeklyUnits,
                        IsDone: GetWeeklyToDoData.IsDone
                    };
                    return UpdateData;
                }
            });
            setToDosData({
                WeeklyToDos: UpdateWeeklyToDos,
                BossToDos: ToDosData.BossToDos
            });
        }
        setCategory("");
    };

    const DefaultSetting = () => {
        if(ToDosData.WeeklyToDos.length <= 0) return;
        const PrevWeeklyToDos = ToDosData.WeeklyToDos.map((tododata) => {
            const Format: I_SelectTarget = {
                weeklyId: String(tododata.contentsId),
                weeklyNm: tododata.contentsNm,
                weeklyUnits: tododata.contentsUnit
            };

            return Format;
        });

        setSelectTarget(PrevWeeklyToDos);
    };

    useEffect(() => console.log(watch("WeeklySelect")), [watch("WeeklySelect")]);
    useEffect(() => console.log(SelectTarget), [SelectTarget]);
    useEffect(() => DefaultSetting(), []);

    return (
        <FormContainer>
            <FormProvider {...Methods}>
                <WeeklyForm onSubmit={handleSubmit(onValid)}>
                    <UnitsBox 
                        titles={"주간 컨텐츠 / 계정 단위"}
                        contentsdata={AccountWeeklys}
                        SelectTargets={SelectTarget}
                        setSelectTargets={setSelectTarget}
                    />
                    <UnitsBox 
                        titles="아케인리버 주간 컨텐츠"
                        contentsdata={ArcaneWeeklys}
                        SelectTargets={SelectTarget}
                        setSelectTargets={setSelectTarget}
                    />
                    <UnitsBox 
                        titles="주간 컨텐츠 / 캐릭터 별"
                        contentsdata={CharWeeklys}
                        SelectTargets={SelectTarget}
                        setSelectTargets={setSelectTarget}
                    />
                    <button>저장</button>
                </WeeklyForm>
            </FormProvider>
        </FormContainer>
    );
}