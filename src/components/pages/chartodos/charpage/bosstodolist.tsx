"use client"

import { I_BossToDos } from "@/stores";
import { styled } from "styled-components"
import { ToDoItem, ToDoListContainer } from "./todoitem/todolist_commons";
import { useState } from "react";
import { BossContentsData } from "@/game_datas/contentsData";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_BossToDoList {
    BossToDoDatas?: I_BossToDos[];
    charname?: string;
};

interface I_Rankbox {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

const Container = styled(ToDoListContainer)`
    width: 85%;
    min-width: 300px;
    max-width: 350px;
    max-height: 270px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 10px;
    background-color: rgb(149, 165, 166);
    border-radius: 10px;

    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-snap-align: start;
    scroll-behavior: smooth;
    scrollbar-width: none;
    scroll-snap-stop: normal;
`;

const BossToDoItem = styled(ToDoItem)`
    justify-content: space-between;
    .bossname {
        width: 75%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        img {
            margin-right: 3px;
        }
    }
`;

const Rankbox = styled.div<I_Rankbox>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
    width: 20px;
    height: 20px;
    margin: 0px 5px;
`;

function BossToDoList({BossToDoDatas, charname}: I_BossToDoList){
    return (
        <Container>
            {
                BossToDoDatas?.map((data) => {
                    const BossLittleNm= BossContentsData.find((origin) => origin.BossId === data.bossId || origin.BossNm === data.bossNm)?.SubName;
                    const RankColor = RankColorInfos.find((colors) => colors.rankId === data.rankId);

                    return (
                        <BossToDoItem key={data.bossId}>
                            <input type="checkbox" />
                            <span className="bossname">
                                <img src={`/imgs/boss_monsters/${data.bossId}.png`} />
                                {!BossLittleNm ? data.bossNm : BossLittleNm}
                            </span>
                            <Rankbox textcolor={RankColor?.fontColor} bgcolor={RankColor?.bgColor} bordercolor={RankColor?.borderColor}>
                                {data.rankId.slice(0, 1)}
                            </Rankbox>
                        </BossToDoItem>
                    );
                })
            }
        </Container>
    );
};

export default BossToDoList;