"use client"

import { Categories } from "@/stores";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import ShowToDosData from "./ShowToDos";
import { CharToDoStore, I_BossToDos, I_CharToDo, I_WeeklyToDos } from "@/stores/CharToDoStore";
import { BookmarkStore, I_BookmarkData } from "@/stores/BookmarkStore";
import WeeklyForms from "./_weeklyform/WeeklyForms";
import BossForms from "./_bossform/BossForms";

interface I_AddToDosLayout {
    ocid?: string;
    charNm?: string;
    charLv?: number;
    charClass?: string;
    charImg?: string;
    worldNm?: string;
}

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
    height: 90%;
    max-width: 350px;
    min-height: 330px;
    max-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

export default function AddToDosLayout({ocid, charNm, charLv, charClass, charImg, worldNm}: I_AddToDosLayout){
    const CategoryData = Categories;
    const router = useRouter();

    const [NowCategory, setNowCategory] = useState<string>("");
    const [WeeklyToDoData, setWeeklyToDoData] = useState<I_WeeklyToDos[]>([]);
    const [BossToDoData, setBossToDoData] = useState<I_BossToDos[]>([]);

    const {chartodos, addNewCharToDo} = useStore(CharToDoStore);
    const {Bookmarks, AddNewBookmark} = useStore(BookmarkStore);

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    };

    const CharToDoDataSubmit = () => {
        const BookmarkCheck = Bookmarks.findIndex((data) => data.charname === charNm);
        const CharToDosCheck = chartodos.findIndex((data) => data.charname === charNm);
        
        if(BookmarkCheck !== -1 || CharToDosCheck !== -1){
            alert(`'${charNm}/${worldNm}/Lv.${charLv}/${charClass}'\n해당 캐릭터의 메할일이 존재 합니다.`);
            setTimeout(() => {
                alert("메할일 목록 페이지로 이동합니다.");
                router.push("/chartodos")
            }, 1000);
        } else {
            if(!charNm || !charLv || !charImg || !charClass || !worldNm || !ocid){
                alert("api data error");
                return;
            } else {
                const NewBookmarkData: I_BookmarkData = {
                    charname: charNm,
                    charlevel: charLv,
                    charimgurl: charImg,
                    charclass: charClass,
                    worldname: worldNm
                };
                const NewCharToDo: I_CharToDo = {
                    ocid: ocid,
                    charname: charNm,
                    weeklyToDos: WeeklyToDoData,
                    bossToDos: BossToDoData
                };

                AddNewBookmark(NewBookmarkData);
                addNewCharToDo(NewCharToDo);

                setTimeout(() => {
                    router.push("/chartodos");
                }, 1000);
            }
        }
    };

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
                    NowCategory === "" ? (
                        <ShowToDosData
                            WeeklyToDos={WeeklyToDoData}
                            BossToDos={BossToDoData}
                        />
                    ) : null
                }
                {
                    NowCategory === CategoryData[0].categoryId ? (
                        <WeeklyForms 
                            WeeklyToDoData={WeeklyToDoData}
                            setWeeklyToDoData={setWeeklyToDoData}
                            setCategory={setNowCategory}
                        />
                    ): null
                }
                {
                    NowCategory === CategoryData[1].categoryId ? (
                        <BossForms 
                            BossToDoData={BossToDoData}
                            setBossToDoData={setBossToDoData} 
                            setCategory={setNowCategory}
                        />
                    ) : null
                }
                {NowCategory === "" && <SaveBtn onClick={CharToDoDataSubmit}>메할일 등록</SaveBtn>}
            </FormOutlet>
        </Container>
    );
}