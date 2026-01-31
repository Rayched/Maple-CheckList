"use client"

import { BookmarkData, Categories, I_CharToDos, MapleToDoDataStore } from "@/stores";
import { useState } from "react";
import styled from "styled-components";
import WeeklyForms from "./Forms/WeeklyForms";
import BossForms from "./Forms/BossForms";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";

const Container = styled.div`
    width: 90%;
    height: 80%;
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

export default function AddToDosLayout({charNm}: {charNm?: string}){
    const CategoryData = Categories;
    const router = useRouter();

    const [ToDos, setToDos] = useState<I_CharToDos>({
        charNm: "",
        WeeklyToDos: [],
        BossToDos: []
    });

    const [NowCategory, setNowCategory] = useState("");

    const {MapleToDoData, setMapleToDoData} = useStore(MapleToDoDataStore);

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    };

    const SavedCharToDo = () => {
        const NewBookmark: BookmarkData = {
            charNm: String(charNm),
            charWorld: "",
            charImg: "",
            charLV: "",
        };
        setMapleToDoData(NewBookmark);
        setTimeout(() => router.push("/"), 500);
    }

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
                {NowCategory === CategoryData[0].categoryId ? <WeeklyForms charNm={String(charNm)} ToDosData={ToDos} setToDosData={setToDos}/> : null}
                {NowCategory === CategoryData[1].categoryId ? <BossForms charNm={String(charNm)} ToDosData={ToDos} setToDosData={setToDos} /> : null}
            </div>
            <button onClick={SavedCharToDo}>메할일 저장하기</button>
        </Container>
    );
}