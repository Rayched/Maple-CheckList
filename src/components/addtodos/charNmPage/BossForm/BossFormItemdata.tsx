"use client";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface I_BossFormItemdataProps {
    bossid: string;
    bossNm: string;
    bossSubNm?: string;
    defaultRank: string;
    IsToDoAdds: boolean;
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BossIconImgs = styled.img``;

const Checkbox = styled.input``;

const BossNameBox = styled.div``;

export default function BossFormItemdata({bossid, bossNm, bossSubNm}: I_BossFormItemdataProps){
    const {register} = useFormContext();

    return (
        <Container>
            <Checkbox 
                type="checkbox"
            />
            <BossIconImgs src={`/imgs/boss_monsters/${bossid}.png`}/>
            <BossNameBox>{bossSubNm !== undefined ? `${bossSubNm}` : `${bossNm}`}</BossNameBox>
        </Container>
    );
}