"use client"

import { CharToDoStore } from "@/stores/CharToDoStore"
import styled from "styled-components";
import { useStore } from "zustand"

/**
 * 자동 초기화 기능 완성 전까지 임시로 사용할
 * ToDoResetBtn Component
 * 
 * 해당 버튼을 클릭하면, localstorage에 저장된
 * 전체 캐릭터의 메할일 완료 기록을 초기화한다.
 */

const Container = styled.div`
    width: 30%;
    height: 100%;
    border: 3px solid white;
    border-radius: 8px;
    color: white;
    background-color: rgb(235, 77, 75);
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ToDoResetBtn(){
    const {chartodos, DoneRecordReset} = useStore(CharToDoStore);

    const ResetBtnClickEvent = () => {
        const confirm = window.confirm(`'${chartodos[0].charname}' 포함\n총 ${chartodos.length} 캐릭터의 일정 완료 기록을 초기화 하겠습니까?\n`);

        if(!confirm){
            alert("완료 기록 초기화 취소");
            return;
        } else {
            alert(`'${chartodos[0].charname}' 포함 총 ${chartodos.length} 캐릭터\n일정 완료 기록 초기화 완료`);
            setTimeout(() => DoneRecordReset(), 100);
        }
    };

    return (
        <Container onClick={ResetBtnClickEvent}>완료 기록 초기화</Container>
    );
}