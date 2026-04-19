//ShowToDos Components
//공용 컴포넌트 모음집

import styled from "styled-components";

const ItemListContainer = styled.div`
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ItemListTitle = styled.div`
    width: 100%;
    height: 5%;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    color: black;
    background-color: rgb(116, 125, 140);
    font-weight: bold;
    font-size: 15px;
`;

const ItemListBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToDoItem = styled.div`
    width: 95%;
    height: 5%;
    min-height: 45px;
    max-height: 50px;
    margin: 3px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    font-weight: bold;
`;

export const ShowToDos_Commons = {
    ItemListContainer, ItemListTitle, ItemListBox, ToDoItem
};