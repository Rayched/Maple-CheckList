"use client";

import { I_BossToDos } from "@/stores/CharToDoStore";
import styled from "styled-components";

interface I_RankSelectBoxProps {
    bossId: string;
    rankId: string;
    prevBossTododata: I_BossToDos;
    setEditBossToDoData: React.Dispatch<React.SetStateAction<I_BossToDos[]>>;
};

const SelectBox = styled.select``;

export default function RankSelectBox({bossId, rankId, prevBossTododata, setEditBossToDoData}: I_RankSelectBoxProps){
    return (
        <SelectBox></SelectBox>
    );
}