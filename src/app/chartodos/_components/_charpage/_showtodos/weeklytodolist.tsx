import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { useStore } from "zustand";
import { ViewportWidthStore } from "@/stores/ViewportStore";
import { useEffect } from "react";
import { ToDoItem_Contents, ToDoItem_Quest } from "./todoitems";

interface I_WeeklyToDoList {
    weeklycontentsdata?: ContentsType[];
};

export default function WeeklyToDoList({weeklycontentsdata}: I_WeeklyToDoList){
    const {weeklys} = DailyAndWeeklyData;

    useEffect(() => {
        console.log(weeklycontentsdata);
    }, []);

    return (
        <div className={styles.todolist_commons_container}>
            {
                !weeklycontentsdata ? (
                    <div>스케줄러에 추가된 주간 컨텐츠가 없습니다.</div>
                ) : (
                    <div className={styles.todolist_weeklys_todos}>
                        {
                            weeklys.map((data) => {
                                const GetRefData = weeklycontentsdata.find((weekly) => weekly.content_name === data.contentsName);

                                if(!GetRefData){
                                    return null;
                                } else if(GetRefData.registration_flag === "false"){
                                    return null;
                                } else {
                                    if(GetRefData.type === "quest"){
                                        return (
                                            <ToDoItem_Quest 
                                                key={data.contentsId}
                                                quest_state={GetRefData.quest_state}
                                                contents_name={data.contentsName}
                                                little_name={data.littlename}
                                            />
                                        );
                                    } else if(GetRefData.type === "contents"){
                                        return (
                                            <ToDoItem_Contents 
                                                key={data.contentsId}
                                                contents_name={data.contentsName}
                                                little_name={data.littlename}
                                                now_count={GetRefData.now_count}
                                                max_count={GetRefData.max_count}
                                            />
                                        );
                                    }
                                }
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}