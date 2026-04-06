"use client"

import { WorldDatas } from "@/game_datas/contentsData";
import { BookmarkStore } from "@/stores/BookmarkStore";
import { CharToDoStore } from "@/stores/CharToDoStore";
import { ChartodosPage_ModeStore } from "@/stores/ModeStore";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useStore } from "zustand";

interface I_BookmarkCardProps {
    charname?: string;
    charclass?: string;
    charlevel?: number;
    charimgurl?: string;
    worldname?: string;
};

const Container = styled.div`
    width: 50%;
    height: 60%;
    min-width: 250px;
    max-width: 265px;
    min-height: 320px;
    max-height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: white;

    &:hover {
        background-color: rgb(241, 242, 246);
    }
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
    background-color: rgb(241, 242, 246);
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

        .charclassdata-child {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 15px;
        };

        #level {
            min-width: 80px;
            justify-content: flex-start;
        }

        #charclass {
            min-width: 100px;
            justify-content: flex-end;
        }
    };
`;

function BookmarkCard({charname, charclass, charimgurl, charlevel, worldname}: I_BookmarkCardProps){
    const {EditTarget, setEditTarget} = useStore(ChartodosPage_ModeStore);
    const {deleteCharToDo} = useStore(CharToDoStore);
    const {DeleteBookmark} = useStore(BookmarkStore);

    const router = useRouter();
    const GetWorldId = WorldDatas.find((worlds) => worlds.worldNm === worldname);

    //'ShowEditBarBtn' click event listener
    const ShowEditBarBtnClickEvent = () => {
        if(!charname){
            console.log("charname is undefined");
            return;
        } else if(EditTarget === ""){
            setEditTarget(charname);
        } else {
            setEditTarget("");
        }
    };

    //Editbar-delbtn click event listener
    const BookmarkDeleteEvent = () => {
        const Confirm = window.confirm(
            `'${charname}/${worldname}/Lv.${charlevel}/${charclass}'\n해당 캐릭터 카드를 삭제하겠습니까?\n(해당 캐릭터의 메할일 및 북마크가 삭제 됩니다.)`
        );

        if(!Confirm){
            setEditTarget("");
            return;
        } else if(!charname){
            console.log("charname is undefined");
        } else {
            setTimeout(() => {
                deleteCharToDo(charname);
                DeleteBookmark(charname);
            }, 200);
        }
    };

    const BookmarkEditEvent = () => {
        //todoedits page 이동
        router.push(`/todoedits/${charname}`);
    };

    return (
        <Container>
            <Card_Headers>
                <div key={"showeditbarbtn"} onClick={ShowEditBarBtnClickEvent}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#000000" width={"30"} height={"30"}>
                        <path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/>
                    </svg>
                </div>
                {
                    EditTarget === charname ? (
                        <EditBar>
                            <EditBtn key="bookmarkeditbtn" onClick={BookmarkEditEvent}>편집</EditBtn>
                            <EditBtn key="bookmarkdelbtn" onClick={BookmarkDeleteEvent}>삭제</EditBtn>
                        </EditBar>
                    ): null
                }
            </Card_Headers>
            <Card_Bodys onClick={() => router.push(`/chartodos/${charname}`)}>
                <CharImgs>
                    <img src={charimgurl} />
                </CharImgs>
                <CharDataBox>
                    <div className="charnamedata">
                        <img src={`/imgs/worlds/${GetWorldId?.worldId}.png`} />
                        <span>{charname}</span>
                    </div>
                    <div className="charclassdata">
                        <div className="charclassdata-child" id="level">{`LV.${charlevel}`}</div>
                        <div className="charclassdata-child" id="charclass">{`${charclass}`}</div>
                    </div>
                </CharDataBox>
            </Card_Bodys>
        </Container>
    );
}

export default BookmarkCard;