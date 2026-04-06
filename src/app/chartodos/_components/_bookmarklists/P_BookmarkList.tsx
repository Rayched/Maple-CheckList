import { BookmarkStore } from "@/stores/BookmarkStore";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useStore } from "zustand";
import BookmarkCard from "./BookmarkCard";
import { ChartodosPage_ModeStore } from "@/stores/ModeStore";
import { useState } from "react";

interface I_SearchTarget {
    charname: string;
    charclass: string;
    charlevel: number;
    charimgurl: string;
    worldname: string;
};

const Container = styled.div`
    width: 90%;
    height: 100%;
    min-width: 500px;
    max-width: 550px;
    background-color: rgb(189, 195, 199);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
`;

const Titles = styled.div`
    width: 100%;
    height: 5%;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgb(83, 92, 104);
    font-weight: bold;
    font-size: 17px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;

const ButtonListBox = styled.div`
    width: 50%;
    height: 5%;
    margin: 10px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .utilBtn {
        background-color: rgb(83, 92, 104);
        &:hover {
            color: black;
            background-color: rgb(116, 125, 140);
        };
    };

    .cancelBtn {
        background-color: rgb(235, 77, 75);
        &:hover {
            color: black;
            background-color: rgb(255, 121, 121);
        };
    };
`;

const BookmarkList_UtilButton = styled.div`
    width: 40%;
    min-width: 110px;
    max-width: 120px;
    height: 100%;
    min-height: 35px;
    max-height: 40px;
    color: white;
    border-radius: 8px;
    border: 2px solid white;
    font-weight: bold;
    font-size: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const BookmarkList = styled.div`
    width: 100%;
    min-width: 500px;
    max-width: 550px;
    min-height: 350px;
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    gap: 20px 10px;

    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 0px;
    };

    &:nth-child(1){
        grid-column: 1;
        grid-row: 1;
    };
    &:nth-child(2){
        grid-column: 2;
        grid-row: 1;
    };
    &:nth-child(3){
        grid-column: 1;
        grid-row: 2;
    };
    &:nth-child(4){
        grid-column: 2;
        grid-row: 2;
    };
    &:nth-child(5){
        grid-column: 1;
        grid-row: 3;
    };
    &:nth-child(1){
        grid-column: 2;
        grid-row: 3;
    };
`;

const SearchOutputs = styled.div`
    width: 100%;
    height: 100%;
    min-width: 500px;
    max-width: 550px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
`;

export default function P_BookmarkList(){
    const router = useRouter();
    const {Bookmarks} = useStore(BookmarkStore);
    const {SearchMode, setSearchMode} = useStore(ChartodosPage_ModeStore);
    const [SearchTarget, setSearchTarget] = useState<I_SearchTarget>();

    //'메할일 추가' 버튼 Event Listener
    const AddBtnClickEvent = () => {
        const SearchParams = window.prompt("추가하실 캐릭터 명을 입력해주세요.", "");

        if(SearchParams === ""){
            alert("캐릭터 명을 입력하지 않았습니다.");
            return;
        } else {
            const BookmarkCheck = Bookmarks.find((bookmark) => bookmark.charname === SearchParams);

            if(BookmarkCheck !== undefined){
                alert(`'${SearchParams}'의 메할일이 이미 존재합니다.`);
                return;
            } else {
                setTimeout(() => {
                    router.push(`/addtodos/${SearchParams}`);
                }, 300);
            }
        }
    };

    const SearchBtnClick = () => {
        const SearchParams = window.prompt("검색하실 캐릭터 명을 입력 해주세요.", "");

        if(SearchParams === "" || SearchParams === null){
            alert("캐릭터 명을 입력하지 않았습니다.");
        } else {
            setSearchMode(true);
            const BookmarkCheck = Bookmarks.find((bookmark) => bookmark.charname === SearchParams);

            if(!BookmarkCheck){
                alert(`'${SearchParams}'의 메할일을 찾지 못했습니다.`);
                setSearchMode(false);
                return;
            } else {
                setSearchTarget({
                    charname: BookmarkCheck.charname,
                    charclass: BookmarkCheck.charclass,
                    charlevel: BookmarkCheck.charlevel,
                    charimgurl: BookmarkCheck.charimgurl,
                    worldname: BookmarkCheck.worldname
                });
                return;
            }
        }
    }

    const SearchCancelBtnClick = () => {
        setSearchMode(false);
        setSearchTarget(undefined);
    };

    return (
        <Container>
            <Titles>메할일 목록</Titles>
            <ButtonListBox>
                <BookmarkList_UtilButton className="utilBtn" onClick={AddBtnClickEvent}>메할일 추가</BookmarkList_UtilButton>
                {!SearchMode && (<BookmarkList_UtilButton className="utilBtn" onClick={SearchBtnClick}>메할일 검색</BookmarkList_UtilButton>)}
                {SearchMode && (<BookmarkList_UtilButton className="cancelBtn" onClick={SearchCancelBtnClick}>검색 취소</BookmarkList_UtilButton>)}
            </ButtonListBox>
            {
                !SearchMode && (
                    <BookmarkList>
                        {
                            Bookmarks.map((data, idx) => {
                                return (
                                    <BookmarkCard 
                                        key={`bookmarkcard_${idx}`}
                                        charname={data.charname}
                                        charlevel={data.charlevel}
                                        charclass={data.charclass}
                                        charimgurl={data.charimgurl}
                                        worldname={data.worldname}
                                    />
                                );
                            })
                        }
                    </BookmarkList>
                )
            }
            {
                (SearchMode && SearchTarget !== undefined) ? (
                    <SearchOutputs>
                        <BookmarkCard 
                            charname={SearchTarget.charname}
                            charlevel={SearchTarget.charlevel}
                            charclass={SearchTarget.charclass}
                            charimgurl={SearchTarget.charimgurl}
                            worldname={SearchTarget.worldname}
                        />
                    </SearchOutputs>
                ):null
            }
        </Container>
    );
}