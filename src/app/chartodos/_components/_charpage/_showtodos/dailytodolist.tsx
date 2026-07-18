"use client"

import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { ContextType, useEffect, useState } from "react";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { ToDoItem_Contents, ToDoItem_Quest } from "./todoitems";
import { I_ScheduleData } from "./weeklytodolist";
import ToDoEmptyMessage from "./EmptyMessage";

interface I_DailyToDoList {
    dailycontentsdata?: ContentsType[];
};

export default function DailyToDoList({dailycontentsdata}: I_DailyToDoList){
    const {dailys} = DailyAndWeeklyData;
    const [ScheduleData, setScheduleData] = useState<I_ScheduleData[]>([]);

    useEffect(() => {
        if(!dailycontentsdata || dailycontentsdata.length === 0) return;

        const TypeContents = dailycontentsdata.filter((data) => data.type === "contents" && data.registration_flag === "true");
        const TypeQuest = dailycontentsdata.filter((data) => data.type === "quest" && data.registration_flag === "true");

        const NewScheduleDatas: I_ScheduleData[] = [
            {
                titleText: "일일 컨텐츠",
                contents_data: TypeContents
            },
            {
                titleText: "일일 퀘스트",
                contents_data: TypeQuest
            }
        ];
        setScheduleData(NewScheduleDatas);
    }, []);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.todolist_container}>
                {
                    ScheduleData.length === 0 ? (
                        <ToDoEmptyMessage 
                            message_refname={"일일 컨텐츠"}
                        />
                    ) : null
                }
                {
                    ScheduleData.map((data, idx) => {
                        const ContentsEmpty = data.contents_data.filter((contentsdata) => contentsdata.type === "contents").length === 0;
                        const QuestsEmpty = data.contents_data.filter((contentsdata) => contentsdata.type === "quest").length === 0;
                       
                        return (
                            <div key={`dailytodos_${idx}`} className={styles.todolist_todos}>
                                <div className={styles.todolist_todos_titles}>{data.titleText}</div>
                                <div className={styles.todolist_todos_bodys}>
                                    {
                                        ContentsEmpty === true && data.titleText === "일일 컨텐츠" ? (
                                            <ToDoEmptyMessage message_refname="일일 컨텐츠" />
                                        ) : null
                                    }
                                    {
                                        QuestsEmpty === true && data.titleText === "일일 퀘스트" ? (
                                            <ToDoEmptyMessage message_refname="일일 퀘스트"/>
                                        ) : null
                                    }
                                    {
                                        data.contents_data.map((contents) => {
                                            const GetRefData = dailys.find((daily) => daily.contentsName === contents.content_name);

                                            if(!GetRefData){
                                                return null;
                                            } else if(contents.type === "contents" && !ContentsEmpty){
                                                return (
                                                    <ToDoItem_Contents 
                                                        key={GetRefData.contentsId}
                                                        contents_name={contents.content_name}
                                                        little_name={GetRefData.little_name}
                                                        now_count={contents.now_count}
                                                        max_count={contents.max_count}
                                                    />
                                                );
                                            } else if(contents.type === "quest" && !QuestsEmpty){
                                                return (
                                                    <ToDoItem_Quest 
                                                        key={GetRefData.contentsId}
                                                        contents_name={contents.content_name}
                                                        little_name={GetRefData.little_name}
                                                        quest_state={contents.quest_state}
                                                        now_count={contents.now_count}
                                                        max_count={GetRefData.max_count}
                                                    />
                                                );
                                            };
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