"use client"

import { I_Bookmark, Categories, I_CharToDos, MapleToDoDataStore, I_WeeklyToDos, I_BossToDos } from "@/stores";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WeeklyForms from "./WeeklyForm/WeeklyForms";
import BossForms from "./BossForm/BossForms";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import ShowToDosData from "./ShowToDos";

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

    const {
        CharToDos, Bookmarks, UpdateCharToDos, UpdateBookmarks
    } = useStore(MapleToDoDataStore);

    const CategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(NowCategory === value){
            return;
        } else {
            setNowCategory(value);
        }
    };

    const SavedCharToDo = () => {
        /**
         * 1). 캐릭터 todo store 저장
         *  - 기존 저장 데이터 있으면 덮어쓰기
         *  - 없는 경우만 새로 쓰기
         *  - 수정 form에서도 쓴다는 것을 가정하고 로직 작성
         * 
         * 2). 북마크 캐릭터 데이터 저장
         *  - 캐릭터와 관련된 데이터가 항상 고정은 아니기에
         *  - 캐릭터 todo 수정 시, 북마크 데이터도 갱신할 것
         */
        const NewBookmark: I_Bookmark = {
            charNm: charNm,
            charLV: charLv,
            charClass: charClass,
            charImg: charImg,
            worldNm: worldNm
        };

        const IsSubmits = CharToDos.findIndex((data) => data.charNm === charNm);

        if(IsSubmits === -1){
            const WeeklysConvert = ToDos.WeeklyToDos.map((weeklys) => {
                if(weeklys.contentsId === "" || weeklys.contentsUnit === "") null;
                const format: I_WeeklyToDos = {
                    ContentsId: String(weeklys.contentsId),
                    Units: weeklys.contentsUnit,
                    IsDone: weeklys.IsDone,
                };

                return format;
            }).filter((data) => data !== null);

            const BossToDoConvert = ToDos.BossToDos.map((boss) => {
                if(boss.BossId === "" || boss.BossNm === "" || boss.Rank === ""){
                    return null;
                } else {
                    const format: I_BossToDos = {
                        bossId: String(boss.BossId),
                        bossNm: String(boss.BossNm),
                        rankId: String(boss.Rank),
                        IsDone: boss.IsDone
                    };

                    return format;
                }
            }).filter((data) => data !== null);

            const NewCharToDos: I_CharToDos = {
                charNm: String(charNm),
                WeeklyToDos: WeeklysConvert,
                BossToDos: BossToDoConvert
            };

            UpdateCharToDos([
                ...CharToDos, NewCharToDos
            ]);
            UpdateBookmarks([
                ...Bookmarks, NewBookmark
            ]);
        } else {}
        
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