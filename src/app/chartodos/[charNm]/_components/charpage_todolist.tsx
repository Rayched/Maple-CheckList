"use client";

import { Categories, MapleToDoDataStore } from "@/stores";
import { useState } from "react";
import styled from "styled-components";
import WeeklyToDoList from "./weeklytodolist";
import BossToDoList from "./bosstodolist";
import { useStore } from "zustand";
import { ToDoList_Container, ToDoList_Mains, ToDoList_SelectBox } from "../../../../components/commons/todolist_commons";
import { CharToDoStore } from "@/stores/CharToDoStore";

interface I_Charpage_todolist {
    charname?: string;
    ocid: string;
};

const Container = styled(ToDoList_Container)`
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategorySelect = styled(ToDoList_SelectBox)`
    display: block;
    width: 70%;
    min-width: 200px;
    max-width: 300px;
    min-height: 30px;
    margin: 5px 0px;
    text-align: center;
`;

const ToDoLists = styled(ToDoList_Mains)`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

export default function Charpage_ToDoList({charname, ocid}: I_Charpage_todolist){
    const CategoryData = Categories;

    const [NowCategory, setNowCategory] = useState<String>("category00");

    const CharToDoData = useStore(CharToDoStore).chartodos.find((data) => {
        if(data.ocid === ocid){
            return data;
        } else if(data.charname === charname){
            return data;
        } else {
            return undefined;
        }
    });

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            currentTarget: {value}
        } = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    }

    return (
        <Container>
            <CategorySelect onChange={CategoryChange}>
                {
                    CategoryData.map((data) => {
                        return (
                            <option key={data.categoryId} value={data.categoryId}>
                                {data.categoryNm}
                            </option>
                        );
                    })
                }
            </CategorySelect>
            <ToDoLists>
                { 
                    NowCategory === Categories[0].categoryId ? (
                        <WeeklyToDoList 
                            charname={CharToDoData?.charname}
                            ocid={ocid}
                            WeeklyToDoDatas={CharToDoData?.weeklyToDos}
                        /> 
                    ): null
                }
                { 
                    NowCategory === Categories[1].categoryId ? (
                        <BossToDoList 
                            charname={CharToDoData?.charname}
                            ocid={ocid}
                            BossToDoDatas={CharToDoData?.bossToDos}
                        />
                    ): null
                }
            </ToDoLists>
        </Container>
    );
}