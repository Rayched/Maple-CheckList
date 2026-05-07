"use client"

import { FormSliderBox } from "@/components/commons/FormCommons";
import { BossContentsData } from "@/game_datas/contentsData";
import { CharToDoStore, I_BossToDos } from "@/stores/CharToDoStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";

interface I_AddBossIncomeFormsProps {
    charname?: string;
    ocid?: string;
};

const Container = styled.div`
    width: 85%;
    height: 75%;
    min-height: 230px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(228, 225, 225);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
`;

const Titles = styled.div`
    width: 100%;
    height: 8%;
    color: white;
    background-color: black;
    font-weight: bold;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Forms = styled.form`
    width: 95%;
    height: 95%;
    min-height: 300px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

const ToDoList = styled.div`
    width: 100%;
    height: 80%;
    min-height: 285px;
    max-height: 320px;
    padding: 2px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 0px;
    };
`;

const ToDoItem = styled.div`
    width: 100%;
    height: 30%;
    min-height: 80px;
    padding: 2px 3px;
    margin: 2px 0px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .bossdatabox {
        width: 20%;
        height: 100%;
        min-width: 80px;
        max-width: 180px;
        margin-left: 3px;
        display: flex;
        align-items: center;

        img {
            width: 30%;
        };
        span {
            margin-left: 3px;
            width: 60%;
        };
    };

    .bossranks {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    };

    .membercountbox {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`;

const SubmitButton = styled.button`
    width: 80px;
    height: 35px;
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
`;

export default function AddBossIncomeForms({charname, ocid}: I_AddBossIncomeFormsProps){
    const {chartodos} = useStore(CharToDoStore);
    const ContentsData = BossContentsData;

    const {register} = useForm();

    const [TargetData, setTargetData] = useState<string[]>();

    useEffect(() => {
        const CharToDoCheck = chartodos.find((data) => data.ocid === ocid || data.charname === charname);

        if(!CharToDoCheck){
            return;
        } else {
            const NewTargetData = CharToDoCheck.bossToDos.map((data) => {
                const Values = `${data.contentsId}_${data.bossrank}`;
                return Values;
            });

            setTargetData(NewTargetData);
        }
    }, []);

    return (
        <Container>
            <Titles>주간 보스 목록</Titles>
            <Forms>
                <ToDoList>
                    {
                        ContentsData.map((data) => {
                            return (
                                <ToDoItem key={data.BossId}>
                                    <div className="bossdatabox">
                                        <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        <span>{!data.SubName ? `${data.BossNm}` : `${data.SubName}`}</span>
                                    </div>
                                    <div className="bossranks">
                                        {
                                            data.Ranks.map((ranks) => {
                                                return (
                                                    <div key={`${data.BossId}_${ranks.rankId}`}>
                                                        <input 
                                                            type="checkbox" 
                                                            key={`${data.BossId}_${ranks.rankId}`}
                                                            value={`${data.BossId}_${ranks.rankId}`}
                                                        />
                                                        <label>{ranks.rankId.slice(0, 1)}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="membercountbox">
                                        <select key={`${data.BossId}_memberscount`}>
                                            <option>파티원 수</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </select>
                                    </div>
                                </ToDoItem>
                            );
                        })
                    }
                </ToDoList>
                <SubmitButton>저장</SubmitButton>
            </Forms>
        </Container>
    );
}