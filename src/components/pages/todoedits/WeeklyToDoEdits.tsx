"use client"

import { WeeklyContentsData } from "@/game_datas/contentsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { I_EditToDoDatas } from "./EditToDoList";

export interface I_WeeklyEditData {
    contentsId: string;
    contentsNm: string;
};

interface I_WeeklyToDoEdits {
    WeeklyEditData?: I_WeeklyEditData[];
    setEditData: Function;
    setCategory: Function;
};

interface I_FormValue {
    WeeklyContents: string[];
};

//주간 컨텐츠 편집 form
export default function WeeklyToDoEdits({WeeklyEditData, setEditData, setCategory}: I_WeeklyToDoEdits){
    const GetWeeklyContents = WeeklyContentsData;

    const {register, handleSubmit, watch} = useForm<I_FormValue>({
        defaultValues: {
            WeeklyContents: []
        }
    });

    const onValid = () => {
        const WeeklyEditDatas = GetWeeklyContents.map((data) => {
            const isChecked = watch("WeeklyContents").includes(data.ContentsId);

            if(!isChecked){
                return null;
            } else {
                const Convert: I_WeeklyEditData = {
                    contentsId: data.ContentsId,
                    contentsNm: data.ContentsNm
                };
                return Convert;
            };
        }).filter((data) => data !== null);

        if(WeeklyEditDatas.length === 0){
            setEditData((state: I_EditToDoDatas) => {
                return {
                    WeeklyToDos: [] as I_WeeklyEditData[],
                    BossToDos: state.BossToDos
                } as I_EditToDoDatas;
            })
        } else {
            setEditData((state: I_EditToDoDatas) => {
                return {
                    WeeklyToDos: WeeklyEditDatas,
                    BossToDos: state.BossToDos
                } as I_EditToDoDatas
            });
        }
        setCategory("");
    }

    useEffect(() => console.log(watch("WeeklyContents")), [watch("WeeklyContents")])

    return (
        <div>
            <h4>주간 컨텐츠 목록</h4>
            <div>
                {
                    GetWeeklyContents.map((data) => {
                        const isChecked = WeeklyEditData?.find((editdata) => editdata.contentsId === data.ContentsId);

                        return (
                            <div key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    value={data.ContentsId}
                                    defaultChecked={!isChecked ? false : true}
                                    {...register("WeeklyContents")}
                                />
                                <span>{data.ContentsNm}</span>
                            </div>
                        );
                    })
                }
                <button onClick={onValid}>저장</button>
            </div>
        </div>
    );
}