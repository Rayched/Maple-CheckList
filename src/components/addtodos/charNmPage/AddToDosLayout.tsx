"use client"

import { I_Bookmark, Categories, I_CharToDos, MapleToDoDataStore } from "@/stores";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WeeklyForms from "./Forms/WeeklyForms";
import BossForms from "./Forms/BossForms";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import ShowToDosData from "./Forms/ShowToDos";

interface I_AddToDosLayout {
    charNm?: string;
    charLv?: number;
    charClass?: string;
    charImg?: string;
    worldNm?: string;
}

export interface I_WeeklyToDoData {
    contentsId?: string;
    contentsNm: string;
    IsDone: boolean;
    contentsUnit: string;
};

export interface I_BossToDoData {
    BossId?: string;
    BossNm?: string;
    Rank?: string;
    IsDone: boolean;
};

export interface I_ToDosData {
    WeeklyToDos: I_WeeklyToDoData[],
    BossToDos: I_BossToDoData[]
};

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategorySelect = styled.select`
    width: 300px;
    height: 30px;
    margin: 5px 0px;
    text-align: center;
`;

const FormOutlet = styled.div`
    width: 90%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SaveBtn = styled.div`
    width: 150px;
    height: 40px;
    border: 2px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: darkgray;
`;

export default function AddToDosLayout({charNm, charLv, charClass, charImg, worldNm}: I_AddToDosLayout){
    const CategoryData = Categories;
    const router = useRouter();

    const [ToDos, setToDos] = useState<I_ToDosData>({
        WeeklyToDos: [],
        BossToDos: []
    });

    const [NowCategory, setNowCategory] = useState("");

    //const {MapleToDoData, setMapleToDoData} = useStore(MapleToDoDataStore);

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    };

    const SavedCharToDo = () => {
        const NewBookmark: I_Bookmark = {
            charNm: charNm,
            charLV: charLv,
            charClass: charClass,
            charImg: charImg,
            worldNm: worldNm
        };
        setTimeout(() => router.push("/"), 500);
    };

    useEffect(() => console.log(ToDos), [ToDos])

    return (
        <Container>
            <CategorySelect onChange={CategoryChange} value={NowCategory}>
                <option value="">-- 카테고리를 선택해주세요 --</option>
                {
                    CategoryData.map((data) => {
                        return <option key={data.categoryId} value={data.categoryId}>{data.categoryNm}</option>
                    })
                }
            </CategorySelect>
            <FormOutlet>
                {
                    NowCategory === "" ? <ShowToDosData ToDosData={ToDos}/> : null
                }
                {
                    NowCategory === CategoryData[0].categoryId ? (
                        <WeeklyForms 
                            ToDosData={ToDos} 
                            setToDosData={setToDos}
                            setCategory={setNowCategory}
                        />
                    ): null
                }
                {
                    NowCategory === CategoryData[1].categoryId ? (
                        <BossForms 
                            ToDosData={ToDos} 
                            setToDosData={setToDos} 
                            setCategory={setNowCategory}
                        />
                    ) : null
                }
            </FormOutlet>
            <SaveBtn onClick={SavedCharToDo}>메할일 등록</SaveBtn>
        </Container>
    );
}