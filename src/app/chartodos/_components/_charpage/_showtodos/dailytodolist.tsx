"use client"

import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { ContextType, useEffect, useState } from "react";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { ToDoItem_Contents, ToDoItem_Quest } from "./todoitems";

interface I_DailyToDoList {
    dailycontentsdata?: ContentsType[];
};

export default function DailyToDoList({dailycontentsdata}: I_DailyToDoList){
    const {dailys} = DailyAndWeeklyData;
    const [ContentsData, setContentsData] = useState<ContentsType[]>([]);

    if(!dailycontentsdata){
        return (
            <div>일일 퀘스트가 없습니다.</div>
        );
    }

    useEffect(() => {
        if(!dailycontentsdata) return;

        const RegistFilter = dailycontentsdata.filter((data) => data.registration_flag === "true");

        setContentsData(RegistFilter);
    }, []);

    useEffect(() => {
        console.log(ContentsData);
    }, [ContentsData]);

    return (
        <div className={styles.todolist_commons_container}>
            {
                ContentsData.map((data) => {
                    const RefData = dailys.find((dailys) => dailys.contentsName === data.content_name);

                    if(!RefData){
                        return null;
                    } else {
                        if(data.type === "contents"){
                            return (
                                <ToDoItem_Contents 
                                    key={RefData.contentsId}
                                    contents_name={data.content_name}
                                    little_name={RefData.little_name}
                                    now_count={data.now_count}
                                    max_count={data.max_count}
                                />
                            );
                        } else if(data.type === "quest"){
                            return (
                                <ToDoItem_Quest 
                                    key={RefData.contentsId}
                                    contents_name={data.content_name}
                                    little_name={RefData.little_name}
                                    quest_state={data.quest_state}
                                />
                            );
                        }
                    } 
                })
            }
        </div>
    );
}