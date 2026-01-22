"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgb(87, 96, 111);
    width: 350px;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
`;

const InputBox = styled.input`
    width: 80%;
    height: 50%;
    margin-right: 5px;
    background-color: inherit;
    outline: none;
    border-width: 0px;
    color: white;
    text-align: center;

    &::placeholder {
        color: lightgray;
    }
`;

const SearchBtn = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function SearchBar(){
    const [CharNm, setCharNm] = useState("");
    const routers = useRouter();

    const TextInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = event;
        setCharNm(value);
    };

    const Navigate = () => {
        if(CharNm === ""){
            alert("캐릭터 이름을 입력하지 않았습니다.");
            setCharNm("");
            return;
        } else {
            routers.push(`chartodos/addtodos/${CharNm}`)
        }
    };

    return (
        <Container>
            <InputBox
                type="text" 
                placeholder="캐릭터 이름을 입력해주세요." 
                value={CharNm}
                onChange={TextInputs}
            />
            <SearchBtn onClick={Navigate}>
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640" fill="#ffffff">
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
                </svg>
            </SearchBtn>
        </Container>
    );
}