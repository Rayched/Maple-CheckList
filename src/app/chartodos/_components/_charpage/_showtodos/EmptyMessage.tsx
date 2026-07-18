import styled from "styled-components";

interface I_ToDoEmptyMessage {
    message_refname: string;
};

const EmptyMessages = styled.div`
    width: 90%;
    height: 30%;
    min-height: 60px;
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`;

export default function ToDoEmptyMessage({message_refname}: I_ToDoEmptyMessage){
    return (
        <EmptyMessages>
            {`등록된 ${message_refname}가 없습니다.`}
        </EmptyMessages>
    );
}