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

interface I_ToDoResetBtnProps {
    accessplatform: string;
};

const Container_commons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: rgb(235, 77, 75);
`;

const Wrapper = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ResetBtn_TypeA = styled(Container_commons)`
    width: 100%;
    height: 100%;
    border: 3px solid white;
    border-radius: 8px;
    font-weight: bold;
`;

const ResetBtn_TypeB = styled(Container_commons)`
    min-width: 35px;
    min-height: 35px;
    margin-bottom: 5px;
    border: 2px solid black;
    border-radius: 50px;
`;

export default function ToDoResetBtn({accessplatform}: I_ToDoResetBtnProps){
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
        <Wrapper onClick={ResetBtnClickEvent}>
            {accessplatform === "0" ? <ResetBtn_TypeA>완료 기록 초기화</ResetBtn_TypeA> : null}
            {
                accessplatform === "1" ? (
                    <ResetBtn_TypeB>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#ffffff" width={"20"} height={"20"}>
                            <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/>
                        </svg>
                    </ResetBtn_TypeB>
                ) : null
            }
        </Wrapper>
    );
};