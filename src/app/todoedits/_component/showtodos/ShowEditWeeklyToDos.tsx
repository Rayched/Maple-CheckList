import { ShowToDos_Commons } from "@/app/addtodos/[charNm]/_component/_showtodos/Showtodos_commons";
import { I_WeeklyToDos } from "@/stores/CharToDoStore";
import styled from "styled-components";

interface I_ShowEditWeeklyToDosProps {
    WeeklyToDoDatas: I_WeeklyToDos[];
};

const Container = styled(ShowToDos_Commons.ItemListContainer)``;

const Titles = styled(ShowToDos_Commons.ItemListTitle)`
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;
const ItemList = styled(ShowToDos_Commons.ItemListBox)``;

const WeeklyItem = styled(ShowToDos_Commons.ToDoItem)`
    justify-content: space-between;
    .weeklyNmBox {
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 6px;
    };

    .unitsBox {
        width: 30%;
        min-width: 50px;
        max-width: 60px;
        margin-right: 3px;
        padding: 2px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid darkgray;
        border-radius: 5px;
        font-size: 15px;
        color: rgb(245, 245, 245);
    }

    #unit-char {
        background-color: #319DBC;
    };

    #unit-acc {
        background-color: #aa3355;
    };
`;

export default function ShowEditWeeklyToDos({WeeklyToDoDatas}: I_ShowEditWeeklyToDosProps){
    return (
        <Container>
            <Titles>주간 컨텐츠 목록</Titles>
            <ItemList>
                {
                    WeeklyToDoDatas.map((data) => {
                        return (
                            <WeeklyItem key={data.contentsId}>
                                <div className="weeklyNmBox">{data.contentsNm}</div>
                                {
                                    data.contentsUnit === "character" ? (
                                        <div className="unitsBox" id="unit-char">캐릭터</div>
                                    ): null
                                }
                                {
                                    data.contentsUnit === "account" ? (
                                        <div className="unitsBox" id="unit-acc">계정</div>
                                    ) : null
                                }
                            </WeeklyItem>
                        );
                    })
                }
            </ItemList>
        </Container>
    );
}