"use client"

import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { useEffect } from "react";

interface I_DailyToDoList {
    dailycontentsdata?: ContentsType[];
};

export default function DailyToDoList({dailycontentsdata}: I_DailyToDoList){
    useEffect(() => {
        console.log(dailycontentsdata);
    }, []);
    return (
        <div className={styles.todolist_commons_container}>
            
        </div>
    );
}