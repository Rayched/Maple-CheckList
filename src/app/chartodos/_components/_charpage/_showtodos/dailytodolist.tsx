"use client"

import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { ContextType, useEffect, useState } from "react";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { ToDoItem_Contents, ToDoItem_Quest } from "./todoitems";
import ToDoEmptyMessage from "./EmptyMessage";
import { useRegistFilter, useToDoRegistFilter } from "@/utils/RegistFilters";
import { useStore } from "zustand";
import { RegistFlagStore } from "@/stores/RegistFlagStore";

interface I_DailyToDoList {
    dailycontentsdata?: ContentsType[];
};

export default function DailyToDoList({dailycontentsdata}: I_DailyToDoList){
    const {dailys} = DailyAndWeeklyData;
    const {ContentsData, dailyFilter} = useToDoRegistFilter({contents_data: dailycontentsdata});
    const {ShowAllRegist} = useStore(RegistFlagStore);

    useEffect(() => {
        if(!dailycontentsdata || dailycontentsdata.length === 0){
            return;
        } else {
            console.log(dailycontentsdata);
            dailyFilter();
        }
    }, []);

    useEffect(() => {
        if(!dailycontentsdata || dailycontentsdata.length === 0){
            return;
        } else {
            dailyFilter();
        }
    }, [ShowAllRegist]);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.todolist_todoitems_container}>
                <div className={styles.todolist_titlebox}>
                    <div className={styles.todolist_titlebox_singlenamebox}>
                        {`일일 컨텐츠 / 퀘스트`}
                    </div>
                </div>
                <div className={styles.todolist_todoitems_area}>
                    <div className={styles.todolist_todoitemlist}>
                        {
                            ContentsData.map((data) => {
                                const RefData = dailys.find((contents) => contents.contentsName === data.content_name);

                                if(!RefData){
                                    return null;
                                } else if(data.type === "contents"){
                                    return (
                                        <ToDoItem_Contents 
                                            key={RefData.contentsId}
                                            contents_name={data.content_name}
                                            little_name={RefData.little_name}
                                            now_count={data.now_count}
                                            max_count={RefData.max_count}
                                        />
                                    );
                                } else {
                                    return (
                                        <ToDoItem_Quest 
                                            key={RefData.contentsId}
                                            contents_name={data.content_name}
                                            little_name={RefData.little_name}
                                            now_count={data.now_count}
                                            max_count={RefData.max_count}
                                            quest_state={data.quest_state}
                                        />
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}