"use client"

import { WeeklyContentsData } from "@/game_datas/contentsData";
import { FormHeader, FormSliderBox, NewFormContainer } from "../FormCommons";
import { FormProvider, useForm } from "react-hook-form";
import {styled} from "styled-components";
import { useEffect, useState } from "react";
import { WeeklyToDoSort } from "@/utils/SortFuncs";
import { I_WeeklyToDos } from "@/stores/CharToDoStore";
import WeeklyFormItems from "./WeeklyFormItems";

export interface I_AddToDoForms {
    WeeklyToDoData: I_WeeklyToDos[];
    setWeeklyToDoData: React.Dispatch<React.SetStateAction<I_WeeklyToDos[]>>;
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

const Container = styled(NewFormContainer)``;
const BoxHeader = styled(FormHeader)``;
const SliderBox = styled(FormSliderBox)``;

export default function WeeklyForms({WeeklyToDoData, setWeeklyToDoData, setCategory}: I_AddToDoForms){
    const FormMethods = useForm<I_FormValue>({
        defaultValues: {
            WeeklySelect: []
        }
    });

    //일반 주간 컨텐츠, 아케인리버 주간 컨텐츠 데이터 분리
    const ArcaneRivercontents = WeeklyContentsData.map((data) => {
        const targets = ["arcane01", "arcane02", "arcane03", "arcane04", "arcane05", "arcane06"];

        if(targets.includes(data.ContentsId)){
            return data;
        } else {
            return null;
        }
    }).filter((data) => data !== null);

    const NonArcaneContents = WeeklyContentsData.map((data) => {
        const targets = ["arcane01", "arcane02", "arcane03", "arcane04", "arcane05", "arcane06"];

        if(!targets.includes(data.ContentsId)){
            return data;
        } else {
            return null;
        }
    }).filter((data) => data !== null);

    return (
        <Container>
            <BoxHeader>주간 컨텐츠 목록</BoxHeader>
            <SliderBox>
                <FormProvider {...FormMethods}>
                    <WeeklyFormItems 
                        WeeklyItemsTitle="아케인리버 주간 컨텐츠"
                        WeeklyContentsDatas={ArcaneRivercontents}
                        WeeklyToDoDatas={WeeklyToDoData}
                        setWeeklyToDoDatas={setWeeklyToDoData}
                    />
                    <WeeklyFormItems 
                        WeeklyItemsTitle="주간 컨텐츠"
                        WeeklyContentsDatas={NonArcaneContents}
                        WeeklyToDoDatas={WeeklyToDoData}
                        setWeeklyToDoDatas={setWeeklyToDoData}
                    />
                </FormProvider>
            </SliderBox>
        </Container>
    );
}