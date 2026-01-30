"use client"

import { WeeklyContentsData } from "@/utils/contentsData";

export interface I_AddToDoForms {
    setStateFn: Function;
};

export default function WeeklyForms({setStateFn}: I_AddToDoForms){
    const WeeklyContents = WeeklyContentsData;

    return (
        <ul>
            {
                WeeklyContents.map((data) => {
                    return <li key={data.ContentsId}>{data.ContentsNm}</li>
                })
            }
        </ul>
    );
}