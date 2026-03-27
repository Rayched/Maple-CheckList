"use client"

import { ClassDatas, WorldDatas } from "@/game_datas/contentsData";
import styled from "styled-components";

/**
 * '/chartodos/[charNm]', char data box components
 */

interface I_CharDataBox {
    charname?: string;
    charimgurl?: string;
    charlevel?: number;
    charExpRate?: string;
    charclass?: string;
    worldname?: string;
};

const Container = styled.div`
    width: 85%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 2px solid gray;

    .charimage {
        width: 50%;
        max-width: 200px;
        height: 60%;
        max-height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 0px;
    };
`;

const DataBox = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .chardatas {
        width: 100%;
        margin: 3px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        span {
            margin: 0px 2px;
        }
    };
`;

const DataBox_Icons = styled.img`
    width: 18px;
    height: 18px;
`;

export default function CharDataBox({charname, charclass, charimgurl, charlevel, charExpRate, worldname}: I_CharDataBox){
    const GetWorldId = WorldDatas.find((data) => data.worldNm === worldname);
    const GetClassData = ClassDatas.find((data) => data.class_fullNm === charclass);

    return (
        <Container>
            <div className="charimage">
                <img src={charimgurl} />
            </div>
            <DataBox>
                <div className="chardatas">
                    <DataBox_Icons src={`/imgs/worlds/${GetWorldId?.worldId}.png`} />
                    <span>{charname}</span>
                </div>
                <div className="chardatas">
                    <span>LV.{charlevel}</span>
                    <span>{` (${charExpRate}%)`}</span>
                </div>
                <div className="chardatas">
                    <DataBox_Icons src={`/imgs/class_icons/${GetClassData?.class_category}.png`} />
                    <span>{charclass}</span>
                </div>
            </DataBox>
        </Container>
    );
};