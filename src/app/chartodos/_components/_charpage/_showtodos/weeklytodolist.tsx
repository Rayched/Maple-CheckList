import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { useStore } from "zustand";
import { ViewportWidthStore } from "@/stores/ViewportStore";
import { useEffect, useState } from "react";
import { ToDoItem_Contents, ToDoItem_Quest } from "./todoitems";

export interface I_RegistData {
    titleText: string;
    contents_data: ContentsType[];
};

interface I_WeeklyToDoList {
    weeklycontentsdata?: ContentsType[];
};

export default function WeeklyToDoList({weeklycontentsdata}: I_WeeklyToDoList){
    const {weeklys} = DailyAndWeeklyData;
    const [RegistData, setRegistData] = useState<I_RegistData[]>([]);

    //registration_flag = "false" data 필터링용
    /**
     * registration_flag (스케줄러 등록 여부)
     * - true : 등록 O
     * - false : 등록 X
     * */
    useEffect(() => {
        //weeklycontentsdata == undefined 방지용 (api fetch한 data)
        console.log(weeklycontentsdata);
        
        if(!weeklycontentsdata) return;

        const TypeContents = weeklycontentsdata.filter((data) => data.type === "contents" && data.registration_flag === "true");
        const TypeQuest = weeklycontentsdata.filter((data) => data.type === "quest" && data.registration_flag === "true");

        const NewRegistData: I_RegistData[] = [
            {
                titleText: "주간 컨텐츠",
                contents_data: TypeContents
            },
            {
                titleText: "주간 퀘스트",
                contents_data: TypeQuest
            }
        ];

        setRegistData(NewRegistData);
    }, []);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.weeklytodolist_container}>
                {!weeklycontentsdata ? <div>주간 컨텐츠 데이터를 불러오지 못했습니다.</div> : null}
                {
                    RegistData.map((data, idx) => {
                        return (
                            <div key={`weeklytodos_${idx}`} className={styles.weeklytodolist_todos}>
                                <div className={styles.weeklytodolist_todos_titles}>
                                    {data.titleText}
                                </div>
                                <div className={styles.weeklytodolist_todos_bodys}>
                                    {
                                        data.contents_data.map((data) => {
                                            const GetRefData = weeklys.find((weekly) => weekly.contentsName === data.content_name);

                                            if(!GetRefData){
                                                return null;
                                            } else if(data.type === "contents"){
                                                return (
                                                    <ToDoItem_Contents 
                                                        key={GetRefData.contentsId}
                                                        contents_name={data.content_name}
                                                        little_name={GetRefData.little_name}
                                                        now_count={data.now_count}
                                                        max_count={GetRefData.max_count}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <ToDoItem_Quest 
                                                        key={GetRefData.contentsId}
                                                        contents_name={data.content_name}
                                                        little_name={GetRefData.little_name}
                                                        now_count={data.now_count}
                                                        max_count={GetRefData.max_count}
                                                        quest_state={data.quest_state}
                                                    />
                                                );
                                            }                                            
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}