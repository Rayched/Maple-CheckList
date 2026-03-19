"use client";

import { Categories } from "@/stores";
import { useState } from "react";
import styled from "styled-components";
import WeeklyToDoList from "./weeklytodos";
import BossToDoList from "./bosstodos";

const Container = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategorySelect = styled.select`
    display: block;
    width: 70%;
    min-width: 200px;
    max-width: 300px;
    min-height: 30px;
    margin: 5px 0px;
    text-align: center;
`;

const ToDoListContainer = styled.div``;

export default function Charpage_ToDoList(){
    const CategoryData = Categories;

    const [NowCategory, setNowCategory] = useState<String>("category00");

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
            <ToDoListContainer>
                { NowCategory === Categories[0].categoryId ? <WeeklyToDoList /> : null}
                { NowCategory === Categories[1].categoryId ? <BossToDoList /> : null}
            </ToDoListContainer>
        </Container>
    );
}