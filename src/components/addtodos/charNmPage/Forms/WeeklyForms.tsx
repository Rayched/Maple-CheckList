"use client"

import { I_CharToDos, I_WeeklyToDos } from "@/stores";
import { WeeklyContentsData } from "@/utils/contentsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";

export interface I_AddToDoForms {
    charNm: string;
    ToDosData: I_CharToDos,
    setToDosData: (newValue: I_CharToDos) => void;
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

export default function WeeklyForms({charNm, ToDosData, setToDosData}: I_AddToDoForms){
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
                const Convert: I_WeeklyToDos = {
                    ContentsId: GetData.ContentsId,
                    IsDone: false,
                    Units: GetData.Units
                };

                return Convert;
            }
        }) as I_WeeklyToDos[];
        
        const Outputs: I_CharToDos = {
            charNm: charNm,
            WeeklyToDos: [...ToDosData.WeeklyToDos, ...GetWeeklysData],
            BossToDos: ToDosData.BossToDos
        };
        setToDosData(Outputs);
        setValue("selectedTargets", []);
    };

    useEffect(() => console.log(ToDosData), [])

    return (
        <WeeklyToDoForms onSubmit={handleSubmit(onValid)}>
            {
                WeeklyContents.map((data) => {
                    const DuplicateCheck = ToDosData.WeeklyToDos.findIndex((s) => s.ContentsId === data.ContentsId);

                    if(DuplicateCheck !== -1){
                        return (
                            <div key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    checked
                                    disabled
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