"use client"

import { useState } from "react";
import styles from "../../_styles/_charpage/showtodos.module.css";
import { BossContentsType, ContentsType } from "@/game_datas/Fetchs";
import DailyToDoList from "./_showtodos/dailytodolist";
import WeeklyToDoList from "./_showtodos/weeklytodolist";
import BossToDoList from "./_showtodos/bosstodolist";
import styled from "styled-components";
import { motion } from "framer-motion";

interface I_ToDoList {
    dailycontentsdata?: ContentsType[];
    weeklycontentsdata?: ContentsType[];
    bosscontentsdata?: BossContentsType[];
    boss_clear_count?: number;
};

type CategoryType = {
    categoryId: string;
    categoryname: string;
}

const CategoryItem = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 15px;
    position: relative;
`;

const SelectIcon = styled(motion.div)`
    width: 95%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: black;
    background-color: rgb(210, 210, 210);
    position: absolute;
    bottom: 0px;
`;

const Categories: CategoryType[] = [
    {categoryId: "category01", categoryname: "일일"},
    {categoryId: "category02", categoryname: "주간"},
    {categoryId: "category03", categoryname: "보스"},
]

export default function ShowToDos({dailycontentsdata, weeklycontentsdata, bosscontentsdata, boss_clear_count}: I_ToDoList){
    const [NowCategory, setNowCategory] = useState("category01");

    const CategoryChangeEvent = (categoryId: string) => {
        if(NowCategory === categoryId){
            return;
        } else {
            setNowCategory(categoryId);
        }
    };

    return (
        <div className={styles.showtodos_wrapper}>
            <div className={styles.showtodos_titlebox}>
                {
                    Categories.map((category) => {
                        return (
                            <CategoryItem key={category.categoryId} onClick={() => CategoryChangeEvent(category.categoryId)}>
                                <span>{category.categoryname}</span>
                                {NowCategory === category.categoryId ? (
                                    <SelectIcon layoutId="selecticon" transition={{duration: 0.1}}>{category.categoryname}</SelectIcon>
                                ) : null}
                            </CategoryItem>
                        );
                    })
                }
            </div>
            <div className={styles.showtodos_todolist_area}>
                {
                    NowCategory === Categories[0].categoryId ? (
                        <DailyToDoList 
                            dailycontentsdata={dailycontentsdata}
                        />
                    ) : null
                }
                {
                    NowCategory === Categories[1].categoryId ? (
                        <WeeklyToDoList 
                            weeklycontentsdata={weeklycontentsdata}
                        />
                    ) : null
                }
                {
                    NowCategory === Categories[2].categoryId ? (
                        <BossToDoList 
                            weekly_boss_clearcount={boss_clear_count}
                            boss_contentsdata={bosscontentsdata}
                        />
                    ) : null
                }
            </div>
        </div>
    );
}