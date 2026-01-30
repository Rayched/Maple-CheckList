"use client";

import { WorldDatas } from "@/utils/contentsData";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface I_CharacterBox {
    charNm?: string;
    charClass?: string;
    charImg?: string;
    charLV?: number;
    worldNm?: string;
};

const Container = styled.div`
    width: 70%;
    max-width: 400px;
    height: 12%;
    background-color: darkgray;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ImageBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;

    img {
        width: 150px;
        height: 160px;
    }
`;

const DataBox = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default function CharacterBox({charImg, worldNm, charLV, charClass}: I_CharacterBox){
    const [worldId, setWorldId] = useState("");

    const GetWorldId = () => {
        const FindId = WorldDatas.findIndex((data) => data.worldNm === worldNm);
        setWorldId(WorldDatas[FindId].worldId);
    };

    useEffect(() => {
        GetWorldId();
    }, [])

    return (
        <Container>
            <ImageBox>
                <img src={charImg} />
            </ImageBox>
            <DataBox>
                <div>
                    <img src={`/imgs/worlds/${worldId}.png`} /> 손곈
                </div>
                <div>LV.{charLV}</div>
                <div>{charClass}</div>
            </DataBox>
        </Container>
    );
}