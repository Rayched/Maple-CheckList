"use client"

import { WorldDatas } from "@/game_datas/contentsData";
import { EditTargetStore, MapleToDoDataStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "zustand";

interface I_BookmarkCard {
    charNm?: string;
    charClass?: string;
    charLV?: number;
    worldNm?: string;
    charImg?: string;
};

const Container = styled.div`
    width: 90%;
    max-width: 250px;
    height: 90%;
    max-height: 300px;
    margin-bottom: 5px;
    background-color: rgb(223, 228, 234);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
        background-color: rgb(206, 214, 224);
    };
`;

const Card_Headers = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 10%;
    position: relative;
`;

const EditBar = styled.div`
    width: 55px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    position: absolute;
    top: 25px;
    right: 5px;
    z-index: 2;
    border-radius: 8px;
    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const EditBtn = styled.div`
    width: 95%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 14px;

    &:hover {
        background-color: rgb(228, 225, 225);
    }
`;

const Card_Bodys = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CharImgs = styled.div`
    width: 95%;
    height: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const CharDataBox = styled.div`
    width: 95%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .charnamedata {
        width: 100%;
        height: 40%;
        margin: 3px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        img {
            width: 15px;
            height: 13px;
        };

        span {
            margin-left: 5px;
            font-weight: bold;
        }
    };

    .charclassdata {
        width: 100%;
        height: 45%;
        margin: 3px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;

        .level {
            width: 30%;
            text-align: center;
        }

        .charclass {
            width: 30%;
            align-items: center;
            text-align: center;
        }
    };
`;

export default function BookmarkCard({charNm, charClass, charLV, charImg, worldNm}: I_BookmarkCard){
    const router = useRouter();
    const GetWorldId = WorldDatas.find((worlds) => worlds.worldNm === worldNm);
    const {Bookmarks, CharToDos, UpdateBookmarks, UpdateCharToDos} = useStore(MapleToDoDataStore);
    const {EditTarget, setEditTarget} = useStore(EditTargetStore);

    const EditBtnEventListener = () => {
        if(EditTarget === ""){
            setEditTarget(String(charNm));
        } else {
            setEditTarget("");
        }
    }

    const Bookmark_Delete = () => {
        const DeleteConfirm = window.confirm(
            `'${charNm}/${worldNm}/Lv.${charLV}/${charClass}'\n해당 캐릭터의 메할일을 삭제하겠습니까?`
        );

        if(DeleteConfirm){
            const BookmarkIdx = Bookmarks.findIndex((bookmark) => bookmark.charNm === charNm);
            const ChartodoIdx = CharToDos.findIndex((chartodo) => chartodo.charNm === charNm);

            if(BookmarkIdx === -1 || ChartodoIdx === -1){
                alert(`'${charNm}'의 메할일을 찾지 못했습니다.`);
                setEditTarget("");
                return;
            } else {
                alert(`'${charNm}', 메할일 삭제 완료`);
                UpdateBookmarks([
                    ...Bookmarks.slice(0, BookmarkIdx),
                    ...Bookmarks.slice(BookmarkIdx + 1)
                ]);
                UpdateCharToDos([
                    ...CharToDos.slice(0, ChartodoIdx),
                    ...CharToDos.slice(ChartodoIdx + 1)
                ]);
                setEditTarget("");
            }
        } else {
            setEditTarget("");
            return;
        }
    };

    const Redirect_EditPage = () => {
        router.push(`/todoedits/${charNm}`);
    }

    const Redirect_Charpage = () => {
        router.push(`/chartodos/${charNm}`)
    };

    useEffect(() => console.log(GetWorldId), []);

    return (
        <Container>
            <Card_Headers>
                <div onClick={EditBtnEventListener}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#000000" width={"30"} height={"30"}>
                        <path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/>
                    </svg>
                </div>
                {EditTarget === charNm ? (
                    <EditBar>
                        <EditBtn onClick={Redirect_EditPage}>편집</EditBtn>
                        <EditBtn onClick={Bookmark_Delete}>삭제</EditBtn>
                    </EditBar>
                ) : null}
            </Card_Headers>  
            <Card_Bodys onClick={Redirect_Charpage}>
                <CharImgs>
                    <img src={charImg} />
                </CharImgs>
                <CharDataBox>
                    <div className="charnamedata">
                        <img src={`/imgs/worlds/${GetWorldId?.worldId}.png`} />
                        <span>{charNm}</span>
                    </div>
                    <div className="charclassdata">
                        <div className="level">{`LV.${charLV}`}</div>
                        <div className="charclass">{`${charClass}`}</div>
                    </div>
                </CharDataBox>
            </Card_Bodys>
        </Container>
    );
}