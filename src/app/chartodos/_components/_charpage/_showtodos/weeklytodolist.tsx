import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { useStore } from "zustand";
import { ViewportWidthStore } from "@/stores/ViewportStore";
import { useEffect, useState } from "react";
import { ToDoItem_Contents, ToDoItem_Guilds, ToDoItem_Quest } from "./todoitems";
import ToDoEmptyMessage from "./EmptyMessage";

export interface I_ScheduleData {
    titleText: string;
    contents_data: ContentsType[];
};

interface I_WeeklyToDoList {
    weeklycontentsdata?: ContentsType[];
};

export default function WeeklyToDoList({weeklycontentsdata}: I_WeeklyToDoList){
    const {weeklys} = DailyAndWeeklyData;
    const [ScheduleData, setScheduleData] = useState<I_ScheduleData[]>([]);

    //registration_flag = "false" data 필터링용
    /**
     * registration_flag (스케줄러 등록 여부)
     * - true : 등록 O
     * - false : 등록 X
     * */
    useEffect(() => {
        //weeklycontentsdata == undefined 방지용 (api fetch한 data)
        console.log(weeklycontentsdata);
        
        if(!weeklycontentsdata || weeklycontentsdata.length === 0) return;

        const TypeContents = weeklycontentsdata.filter((data) => data.type === "contents" && data.registration_flag === "true" && !data.content_name.includes("[길드]"));
        const TypeQuest = weeklycontentsdata.filter((data) => data.type === "quest" && data.registration_flag === "true");
        const TypeGuild = weeklycontentsdata.filter((data) => data.content_name.includes("[길드]"));

        const NewScheduleData: I_ScheduleData[] = [
            {
                titleText: "주간 컨텐츠",
                contents_data: TypeContents
            },
            {
                titleText: "길드 컨텐츠",
                contents_data: TypeGuild
            },
            {
                titleText: "주간 퀘스트",
                contents_data: TypeQuest
            }
        ];

        setScheduleData(NewScheduleData);
    }, []);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.todolist_container}>
                {
                    ScheduleData.length === 0 ? (
                        <ToDoEmptyMessage 
                            message_refname={"주간 컨텐츠"}
                        />
                    ) : null
                }
                {
                    ScheduleData.map((data, idx) => {
                        const ContentsEmpty = data.contents_data.filter((weeklycontents) => weeklycontents.type === "contents").length === 0;
                        const QuestEmpty = data.contents_data.filter((weeklycontents) => weeklycontents.type === "quest").length === 0;
                        return (
                            <div key={`weeklytodos_${idx}`} className={styles.todolist_todos}>
                                <div className={styles.todolist_todos_titles}>
                                    {data.titleText}
                                </div>
                                <div className={styles.todolist_todos_bodys}>
                                    {ContentsEmpty === true && data.titleText === "주간 컨텐츠" ? (
                                        <ToDoEmptyMessage 
                                            message_refname={data.titleText}
                                        />
                                    ) : null}
                                    {QuestEmpty === true && data.titleText === "주간 퀘스트" ? (
                                        <ToDoEmptyMessage 
                                            message_refname={data.titleText}
                                        />
                                    ) : null}
                                    {
                                        data.contents_data.map((data) => {
                                            const GetRefData = weeklys.find((weekly) => weekly.contentsName === data.content_name);

                                            if(!GetRefData){
                                                return null;
                                            } else if(GetRefData.contents_type === "contents"){
                                                return (
                                                    <ToDoItem_Contents 
                                                        key={GetRefData.contentsId}
                                                        contents_name={data.content_name}
                                                        little_name={GetRefData.little_name}
                                                        now_count={data.now_count}
                                                        max_count={GetRefData.max_count}
                                                    />
                                                );
                                            } else if(GetRefData.contents_type === "quest"){
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
                                            } else if(GetRefData.contents_type === "guild"){
                                                return (
                                                    <ToDoItem_Guilds 
                                                        key={GetRefData.contentsId}
                                                        contents_name={data.content_name}
                                                        little_name={GetRefData.little_name}
                                                        now_count={data.now_count}
                                                        max_count={GetRefData.max_count}
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