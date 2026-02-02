"use client"

import { Categories, I_CharToDos, I_WeeklyToDos } from "@/stores";
import { WeeklyContentsData } from "@/game_datas/contentsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";
import { I_ToDosData, WeeklyToDoType } from "../AddToDosLayout";

export interface I_AddToDoForms {
    ToDosData: I_ToDosData;
    setToDosData: (newValue: I_ToDosData) => void;
    setCategory: (newValue: string) => void;
};

const WeeklyToDoForms = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: lightgray;
    padding: 2px 5px;
`;

type WeeklyFormValuesType = {
    selectedTargets: string[];
};

export default function WeeklyForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const WeeklyContents = WeeklyContentsData;

    const {register, handleSubmit, setValue} = useForm<WeeklyFormValuesType>({
        defaultValues: {
            selectedTargets: []
        }
    });

    const onValid = ({selectedTargets}: WeeklyFormValuesType) => {
        const GetWeeklysData = selectedTargets?.map((data) => {
            const GetData = WeeklyContents.find((origin) => origin.ContentsId === data);
            
            if(!GetData){
                return;
            } else {
                const Convert: WeeklyToDoType = {
                    contentsId: GetData.ContentsId,
                    contentsNm: GetData.ContentsNm,
                    IsDone: false,
                    contentsUnit: GetData.Units
                };

                return Convert;
            }
        }) as WeeklyToDoType[];
        
        const Outputs: I_ToDosData = {
            WeeklyToDos: [...GetWeeklysData],
            BossToDos: ToDosData.BossToDos
        };
        setToDosData(Outputs);
        setValue("selectedTargets", []);
        setCategory("");
    };

    useEffect(() => console.log(ToDosData), [ToDosData.WeeklyToDos]);

    return (
        <WeeklyToDoForms onSubmit={handleSubmit(onValid)}>
            {
                WeeklyContents.map((data) => {
                    const DuplicateCheck = ToDosData.WeeklyToDos.findIndex((s) => s.contentsId === data.ContentsId);

                    if(DuplicateCheck !== -1){
                        return (
                            <div key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    defaultChecked
                                />
                                <span>{data.ContentsNm}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    value={data.ContentsId}
                                    {...register("selectedTargets")}
                                />
                                <span>{data.ContentsNm}</span>
                            </div>
                        );
                    }
                })
            }
            <button>저장</button>
        </WeeklyToDoForms>
    );
}