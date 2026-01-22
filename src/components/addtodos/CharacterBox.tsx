import styled from "styled-components";

interface I_CharacterBox {
    charNm?: string;
    charClass?: string;
    charImg?: string;
    charLV?: number;
    worldNm?: string;
};

const Container = styled.div`
    width: 90%;
    height: 20%;
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
        width: 180px;
        height: 200px;
    }
`;

export default function CharacterBox({charImg}: I_CharacterBox){
    return (
        <Container>
            <ImageBox>
                <img src={charImg} />
            </ImageBox>
        </Container>
    );
}