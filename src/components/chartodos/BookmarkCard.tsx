"use client"

import { WorldDatas } from "@/game_datas/contentsData";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface I_BookmarkCard {
    charNm?: string;
    charClass?: string;
    charLV?: number;
    worldNm?: string;
    charImg?: string;
};

const Container = styled.div`
    width: 200px;
    height: 260px;
    background-color: rgb(223, 228, 234);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;

    &:hover {
        background-color: rgb(206, 214, 224);
    };
`;

const Card_Heads = styled.div`
    width: 100%;
    height: 10%;
`;

const Card_Bodys = styled.div`
    width: 100%;
    height: 90%;
`;

const CharImgBox = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CharDataBox = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .CharNameBox {
        width: 90%;
        height: 45%;
        font-weight: bold;

        span {
            margin-left: 5px;
        }
    };

    .CharClassBox {
        width: 85%;
        height: 45%;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    };
`;

export default function BookmarkCard({charNm, charClass, charLV, charImg, worldNm}: I_BookmarkCard){
    const router = useRouter();
    const GetWorldId = WorldDatas.find((worlds) => worlds.worldNm === worldNm);

    const Redirect_Charpage = () => {
        router.push(`/chartodos/${charNm}`)
    };

    return (
        <Container>
            <Card_Heads></Card_Heads>
            <Card_Bodys onClick={Redirect_Charpage}>
                <CharImgBox>
                    <img src={charImg} />
                </CharImgBox>
                <CharDataBox>
                    <div className="CharNameBox">
                        <img src={`/imgs/worlds/${GetWorldId?.worldId}.png`} />
                        <span>{charNm}</span>
                    </div>
                    <div className="CharClassBox">
                        <span>LV.{charLV}</span>
                        <span>{charClass}</span>
                    </div>
                </CharDataBox>
            </Card_Bodys>
        </Container>
    );
}