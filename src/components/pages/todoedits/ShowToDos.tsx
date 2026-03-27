"use client";

import { I_BossToDos, I_WeeklyToDos } from "@/stores";
import { I_WeeklyEditData } from "./WeeklyToDoEdits";
import { I_BossEditData } from "./BossToDoEdits";

interface I_ShowEditToDos {
    WeeklyToDos?: I_WeeklyEditData[];
    BossToDos?: I_BossEditData[];
};

export default function ShowEditToDos({WeeklyToDos, BossToDos} : I_ShowEditToDos){
    return (
        <div>
            <h4>주간 컨텐츠 목록</h4>
            <ul>
                {
                    WeeklyToDos?.map((data) => {
                        return <li key={data.contentsId}>{data.contentsNm}</li>
                    })
                }
            </ul>
            <hr/>
            <h4>주간 보스 목록</h4>
            <ul>
                {
                    BossToDos?.map((data) => {
                        return <li key={data.bossId}>{data.bossNm} {`(${data.bossRank.slice(0, 1)})`}</li>
                    })
                }
            </ul>
        </div>
    );
}