"use client"

import { MapleToDoDataStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";

const SearchBar = styled.div`
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
    };
`;

const AddBtn = styled.div`
    width: 12%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit;
    border: 0px;
    margin-left: 5px;

    &:hover {
        background-color: rgb(93, 100, 112);
    };
`;

export default function CreateNewCharTodo(){
    const routers = useRouter();
    const {Bookmarks, CharToDos} = useStore(MapleToDoDataStore);
    const [InputText, setInputText] = useState("");

    const onChangeEventListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = e;
        setInputText(value);
    }

    const Redirect_addtodos = () => {
        const BookmarkCheck = Bookmarks.find((bookmark) => bookmark.charNm === InputText);
        const CharToDoCheck = CharToDos.find((chartodo) => chartodo.charNm === InputText);

        if(InputText === ""){
            alert("캐릭터 명을 입력하지 않았습니다.");
            return;
        } else if(BookmarkCheck || CharToDoCheck){
            alert(`'${InputText}/LV ${BookmarkCheck?.charLV}/${BookmarkCheck?.charClass}'\n해당 캐릭터의 메할일은 이미 존재합니다.`)
            setInputText("");
            return;
        } else {
            routers.push(`/addtodos/${InputText}`);
        }
    };

    const EnterKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {code} = event;

        if(code === "Enter"){
            Redirect_addtodos();
        } else {
            return;
        }
    }

    return (
        <SearchBar>
            <InputBox 
                type="text"
                placeholder="추가하실 캐릭터 명을 입력해주세요."
                value={InputText}
                onChange={onChangeEventListener}
                onKeyDown={EnterKeyDownEvent}
                autoComplete="off"
            />
            <AddBtn onClick={Redirect_addtodos}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="35" height="35" fill="lightgray">
                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                </svg>
            </AddBtn>
        </SearchBar>
    );
}