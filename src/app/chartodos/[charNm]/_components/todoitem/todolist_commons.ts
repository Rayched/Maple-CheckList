import styled from "styled-components";

interface I_ToDoItemProps {
    todochecked: string;
};

export const ToDoListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ToDoItem = styled.div<I_ToDoItemProps>`
    width: 80%;
    margin: 5px 0px;
    padding: 5px 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: black;
    background-color: ${(props) => props.todochecked === "true" ? "rgb(116, 125, 140)" : "white"};
    border-radius: 10px;
    box-shadow: 1px 2px rgba(0, 0, 0, 0.5);

    input {
        width: 18px;
        height: 18px;
        display: block;
    }

    span {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;