import { I_BossToDos, I_WeeklyToDos } from "@/stores/CharToDoStore";
import styled from "styled-components";
import {ShowToDos_Commons} from "../../addtodos/[charNm]/_component/_showtodos/Showtodos_commons";
import { FormContainer, FormSliderBox } from "@/components/commons/FormCommons";
import ShowEditWeeklyToDos from "./showtodos/ShowEditWeeklyToDos";
import ShowEditBossToDos from "./showtodos/ShowEditBossToDos";

interface I_ShowEditToDosProps {
    EditWeeklyToDoDatas: I_WeeklyToDos[];
    EditBossToDoDatas: I_BossToDos[];
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
`;

const ToDoItemList = styled(FormContainer)`
    min-height: 300px;
    justify-content: center;
    overflow: hidden;

    .TodosEmptyMessage {
        font-size: 18px;
        font-weight: bold;
    }
`;

const ToDoItemScrollBox = styled(FormSliderBox)`
    min-height: 250px;
    max-height: 300px;
    padding: 0px;
    border-radius: 8px;
    border: 2px solid rgb(116, 125, 140);
`;

export default function ShowEditToDos({EditWeeklyToDoDatas, EditBossToDoDatas}: I_ShowEditToDosProps){
    return (
        <Container>
            <ToDoItemList>
                {
                    (EditWeeklyToDoDatas.length === 0 && EditBossToDoDatas.length === 0) ? (
                        <div className="TodosEmptyMessage">메할일 데이터가 존재하지 않습니다.</div>
                    ):null
                }
                <ToDoItemScrollBox>
                    {EditWeeklyToDoDatas?.length !== 0 ? (<ShowEditWeeklyToDos WeeklyToDoDatas={EditWeeklyToDoDatas} />) : null}
                    {EditBossToDoDatas?.length !== 0 ? (<ShowEditBossToDos BossToDoDatas={EditBossToDoDatas}/>) : null}
                </ToDoItemScrollBox>
            </ToDoItemList>
        </Container>
    );
}