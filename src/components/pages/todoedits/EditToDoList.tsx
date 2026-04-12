"use client"

import { styled } from "styled-components";
import { ToDoList_Container, ToDoList_SelectBox } from "../commons/todolist_commons";
import { Categories, MapleToDoDataStore } from "@/stores";
import { useEffect, useState } from "react";
import ShowEditToDos from "./ShowToDos";
import WeeklyToDoEdits, { I_WeeklyEditData } from "./WeeklyToDoEdits";
import BossToDoEdits, { I_BossEditData } from "./BossToDoEdits";
import { useStore } from "zustand";
import { GetCharData } from "@/game_datas/Fetchs";

export interface I_EditToDoDatas {
    WeeklyToDos: I_WeeklyEditData[];
    BossToDos: I_BossEditData[];
};

const Container = styled(ToDoList_Container)``;
const CategorySelect = styled(ToDoList_SelectBox)``;
const EditToDosForm = styled.form``;

export default function EditToDoList({charname}: {charname?: string}){
    //카테고리 관련
    const CategoryData = Categories;
    const [NowCategory, setNowCategory] = useState<string>("");

    //기존 To Do data 관련
    const {
        CharToDos, UpdateCharToDos, 
        Bookmarks, UpdateBookmarks
    } = useStore(MapleToDoDataStore);
    const [EditToDoDatas, setEditToDoDatas] = useState<I_EditToDoDatas>();

    const Category_change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        setNowCategory(value);
    };

    const EditToDoDataSetting = () => {
        const idx = CharToDos.findIndex((chardata) => chardata.charNm === charname);

        if(idx === -1){
            console.log(`'${charname}'의 메할일 데이터를 찾지 못했습니다.`);
            return;
        } else {
            //메할일 데이터 컨버전
            const GetWeeklyData = CharToDos[idx].WeeklyToDos.map((data) => {
                return {
                    contentsId: data.ContentsId,
                    contentsNm: data.ContentsNm
                } as I_WeeklyEditData;
            });

            const GetBossData = CharToDos[idx].BossToDos.map((data) => {
                return {
                    bossId: data.bossId,
                    bossNm: data.bossNm,
                    bossRank: data.rankId
                } as I_BossEditData;
            });

            const EditData: I_EditToDoDatas = {
                WeeklyToDos: GetWeeklyData,
                BossToDos: GetBossData
            };
            setEditToDoDatas(EditData);
        }
    };

    useEffect(() => {
        EditToDoDataSetting();
    }, []);

    useEffect(() => console.log(EditToDoDatas), [EditToDoDatas]);

    return (
        <Container>
            <CategorySelect onChange={Category_change} value={NowCategory}>
                <option key={"non-select"} value="">
                    {"-- 카테고리를 선택해주세요 --"}
                </option>
                {
                    CategoryData.map((data) => {
                        return <option key={data.categoryId} value={data.categoryId}>{data.categoryNm}</option>
                    })
                }
            </CategorySelect>
            <EditToDosForm>
                {
                    NowCategory === "" ? (
                        <ShowEditToDos 
                            WeeklyToDos={EditToDoDatas?.WeeklyToDos}
                            BossToDos={EditToDoDatas?.BossToDos}
                        />
                    ) : null
                }
                {
                    NowCategory === CategoryData[0].categoryId ? (
                        <WeeklyToDoEdits 
                            WeeklyEditData={EditToDoDatas?.WeeklyToDos}
                            setEditData={setEditToDoDatas}
                            setCategory={setNowCategory}
                        />
                    ): null
                }
                {
                    NowCategory === CategoryData[1].categoryId ? (
                        <BossToDoEdits 
                            BossToDoData={EditToDoDatas?.BossToDos}
                            setEditToDos={setEditToDoDatas}
                            setCategory={setNowCategory}
                        />
                    ) : null
                }
                {NowCategory === "" ? (<button>메할일 저장</button>) : null}
            </EditToDosForm>
        </Container>
    );
}