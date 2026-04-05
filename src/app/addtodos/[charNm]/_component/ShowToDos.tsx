import { useState } from "react";
import styled from "styled-components";
import { FormSliderBox, NewFormContainer } from "./FormCommons";
import { CharToDoStore, I_BossToDos, I_WeeklyToDos } from "@/stores/CharToDoStore";
import ShowWeeklyToDos from "./_showtodos/ShowWeeklyToDos";
import ShowBossToDos from "./_showtodos/ShowBossToDos";
import { useStore } from "zustand";

interface I_ShowToDosDataProps {
    WeeklyToDos: I_WeeklyToDos[];
    BossToDos: I_BossToDos[];
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ToDoItemList = styled(NewFormContainer)`
    min-height: 280px;
    max-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .TodosEmptyMessage {
        font-size: 18px;
        font-weight: bold;
    };
`;

const ToDoItemScrollBox = styled(FormSliderBox)`
    padding: 0px;
    border-radius: 8px;
    border: 2px solid rgb(116, 125, 140);
`;

function ShowToDosData({WeeklyToDos, BossToDos}: I_ShowToDosDataProps){
    return(
        <Container>
            <ToDoItemList>
                {
                    (WeeklyToDos.length === 0 && BossToDos.length === 0) ? (
                        <div className="TodosEmptyMessage">추가된 메할일이 없습니다.</div>
                    ) : (
                        <ToDoItemScrollBox>
                            {
                                WeeklyToDos.length !== 0 ? (
                                    <ShowWeeklyToDos 
                                        WeeklyToDoDatas={WeeklyToDos}
                                    />
                                ): null
                            }
                            {
                                BossToDos.length !== 0 ? (
                                    <ShowBossToDos 
                                        BossToDoDatas={BossToDos}
                                    />
                                ): null
                            }
                        </ToDoItemScrollBox>
                    )
                }
            </ToDoItemList>
        </Container>
    );
};

export default ShowToDosData;