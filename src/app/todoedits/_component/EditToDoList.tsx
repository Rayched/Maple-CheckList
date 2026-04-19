"use client"

import { ToDoList_Container, ToDoList_Mains, ToDoList_SelectBox } from "@/components/pages/commons/todolist_commons";
import { Categories } from "@/stores";
import { BookmarkStore } from "@/stores/BookmarkStore";
import { CharToDoStore, I_BossToDos, I_WeeklyToDos } from "@/stores/CharToDoStore";
import React, { useEffect, useState } from "react";
import {styled} from "styled-components";
import { useStore } from "zustand";
import ShowEditToDos from "./ShowEditToDos";
import EditWeeklyToDos from "./EditWeeklyToDos";
import EditBossToDos from "./EditBossToDos";
import { useRouter } from "next/navigation";

interface I_EditToDoListProps {
    charname?: string;
    ocids?: string;
};

const Container = styled(ToDoList_Container)``;
const CategorySelect = styled(ToDoList_SelectBox)``;
const ToDosContainer = styled(ToDoList_Mains)`
    height: 90%;
    max-width: 350px;
    min-height: 330px;
    max-height: 350px;
    overflow: hidden;
`;

const ToDoSaveBtn = styled.div`
    border: 2px solid black;
    border-radius: 8px;
    padding: 3px 4px;
`;

function EditToDoList({charname, ocids}: I_EditToDoListProps){
    const [NowCategory, setNowCategory] = useState("");
    const CategoryData = Categories;

    const {chartodos, editCharToDo} = useStore(CharToDoStore);

    const [EditWeeklyData, setEditWeeklyData] = useState<I_WeeklyToDos[]>([]);
    const [EditBossData, setEditBossData] = useState<I_BossToDos[]>([]);

    const router = useRouter();

    const CategoryChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = e;

        setNowCategory(value);
    };

    const UpdateEditData = () => {
        const idx = chartodos.findIndex((data) => data.ocid === ocids);

        if(!EditWeeklyData || !EditBossData) return;

        if(idx === -1){
            console.log(`'${charname}'의 메할일 데이터를 찾지 못했습니다.`);
            return;
        } else if(!charname || !ocids){
            console.log("charname 혹은 ocids가 undefined 일수도 있습니다.");
            return;
        } else {
            editCharToDo({
                charname: charname,
                ocid: ocids,
                weeklyToDos: EditWeeklyData,
                bossToDos: EditBossData
            });

            router.push("/chartodos");
        }
    };

    useEffect(() => {
        const GetTargetData = chartodos.find((data) => data.ocid === ocids);

        if(!GetTargetData){
            alert(`'${charname}'의 메할일 데이터를 가져오지 못했습니다.`);
            router.push("/chartodos");
        } else {
            setEditWeeklyData(GetTargetData.weeklyToDos);
            setEditBossData(GetTargetData.bossToDos);
        }
    }, []);

    return (
        <Container>
            <CategorySelect onChange={CategoryChangeEvent} defaultValue={NowCategory}>
                <option key={"defaultcategory"} value="">-- 카테고리를 선택해주세요 --</option>
                {
                    CategoryData.map((category) => {
                        return (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryNm}
                            </option>
                        );
                    })
                }
            </CategorySelect>
            <ToDosContainer>
                {
                    NowCategory === "" ? (
                        <ShowEditToDos 
                            EditWeeklyToDoDatas={EditWeeklyData}
                            EditBossToDoDatas={EditBossData}
                        />
                    ) :null
                }
                {
                    NowCategory === CategoryData[0].categoryId ? (
                        <EditWeeklyToDos 
                            EditWeeklyToDosData={EditWeeklyData}
                            setEditWeeklyToDosData={setEditWeeklyData}
                            setNowCategory={setNowCategory}
                        />
                    ): null
                }
                {
                    NowCategory === CategoryData[1].categoryId ? (
                        <EditBossToDos 
                            EditBossToDoDatas={EditBossData}
                            setEditBossToDoDatas={setEditBossData}
                            setNowCategory={setNowCategory}
                        />
                    ):null
                }
                {
                    NowCategory === "" ? (
                        <ToDoSaveBtn onClick={UpdateEditData}>메할일 수정</ToDoSaveBtn>
                    ): null
                }
            </ToDosContainer>
        </Container>
    );
}

export default EditToDoList;