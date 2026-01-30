"use client"

import { Categories } from "@/stores";
import { useState } from "react";
import styled from "styled-components";
import WeeklyForms from "./WeeklyForms";
import BossForms from "./BossForms";

const Container = styled.div`
    width: 90%;
    height: 80%;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategorySelect = styled.select`
    width: 300px;
    height: 30px;
    margin-top: 5px;
    text-align: center;
`;

export default function AddToDosLayout(){
    const CategoryData = Categories;

    const [NowCategory, setNowCategory] = useState("");
    const [AddToDoData, setAddToDoData] = useState();

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    };

    return (
        <Container>
            <CategorySelect onChange={CategoryChange}>
                <option value="">-- 카테고리를 선택해주세요 --</option>
                {
                    CategoryData.map((data) => {
                        return <option key={data.categoryId} value={data.categoryId}>{data.categoryNm}</option>
                    })
                }
            </CategorySelect>
            <div>
                {NowCategory === CategoryData[0].categoryId ? <WeeklyForms setStateFn={setAddToDoData} /> : null}
                {NowCategory === CategoryData[1].categoryId ? <BossForms setStateFn={setAddToDoData} /> : null}
            </div>
        </Container>
    );
}