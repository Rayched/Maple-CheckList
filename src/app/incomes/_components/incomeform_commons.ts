/**
 * <AddIncomeForms />, <EditIncomeForms />
 * Common Components
 * 
 * css module로 사용할 수 없는 props 쓰기 위해
 * 만든 styled-components
 */

import styled from "styled-components";

interface I_ToDoItemProps {
    min_height: string;
    isdisabled: string;
}

interface I_SingleRankProps {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
}

export const GetRankBoxMinHeights = (RanksLength: number) => {
    if(RanksLength === 1){
        return "50px";
    } else if(RanksLength === 2){
        return "65px";
    } else if(RanksLength === 3){
        return "85px";
    } else {
        return "115px";
    }
};

const ToDoItem = styled.div<I_ToDoItemProps>`
    min-height: ${(props) => props.min_height};
    color: ${(props) => props.isdisabled === "1" ? "rgb(87, 101, 116)" : "black"};
    background-color: ${(props) => props.isdisabled === "1" ? "rgb(209, 216, 224)" : "white"};
    border: 2px solid ${(props) => props.isdisabled === "1" ? "rgb(209, 216, 224)" : "black"};

    span {
        text-decoration: ${(props) => props.isdisabled === "1" ? "line-through" : "none"};
    }
`;

const SingleRank = styled.div<I_SingleRankProps>`
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
`;

export const IncomeFormsCommons = {
    ToDoItem, SingleRank
}