//WeeklyForm, BossForm 공통 components 모음집

import styled from "styled-components";

//FormCommons 신버전 styled's

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 330px;
    max-height: 350px;
    margin: 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    color: black;
    background-color: rgb(189, 195, 199);
    overflow: hidden;
`;

export const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5%;
    min-height: 30px;
    max-height: 35px;
    color: black;
    background-color: rgb(116, 125, 140);
    font-weight: bold;
    font-size: 15px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;

export const FormSliderBox = styled.div`
    width: 90%;
    height: 90%;
    min-height: 280px;
    max-height: 300px;
    margin-top: 3px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 0px;
    };
`;

export const FormItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(241, 242, 246);
    border-radius: 8px;
    border: 2px solid black;
`;

export const CloseToggleBar = styled.div`
    width: 100%;
    height: 20px;
    padding: 3px 0px;
    background-color: #8f8d8d;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .messagebox {
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    };
    
    .toggleicon {
        width: 5%;
        padding-right: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    };
`;