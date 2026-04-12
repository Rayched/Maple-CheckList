"use client"

import styled from "styled-components";
import { BookmarkList_Commons } from "../BookmarkList_commons";
import { useStore } from "zustand";
import { BookmarkStore } from "@/stores/BookmarkStore";
import BookmarkCard from "../pc/BookmarkCard";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, isDragging, motion, MotionValue, PanInfo, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import M_BookmarkCard from "./M_BookmarkCard";
import { useRouter } from "next/navigation";

const Container = styled(BookmarkList_Commons.BookmarkListContainer)`
    width: 98%;
    height: 100%;
    margin-top: 5%;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BookmarkListHeader = styled.div`
    width: 90%;
    max-width: 340px;
    height: 10%;
    color: white;
    background-color: black;
    border: 2px solid black;
    border-bottom-width: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-weight: bold;
    font-size: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    span {
        margin: 0px 2px;
    };
`;

const SliderBox = styled.div`
    width: 90%;
    max-width: 340px;
    height: 60%;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgb(228, 225, 225);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 2px solid black;
    border-top-width: 0px;
`;

const SlideItem = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65%;
    height: 70%;
    min-width: 260px;
    max-width: 280px;
    min-height: 330px;
    max-height: 350px;
    border-radius: 8px;
`;

const BookmarkEmptyGuideMessage = styled.div`
    font-size: 17px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
        margin: 3px 0px;
    }
`;

const UtilBtnList = styled.div`
    width: 90%;
    height: 20%;
    max-width: 340px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const UtilBtnContainer = styled.div`
    width: 45%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 5px;

    .utilbtn {
        width: 35px;
        height: 35px;
        margin-bottom: 5px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgb(87, 96, 111);
        background-color: rgb(116, 125, 140);
    };

    .utilbtn_label {
        font-size: 14px;
    }
`;

function M_BookmarkList(){
    const {Bookmarks} = useStore(BookmarkStore);

    const [NowIndex, setNowIndex] = useState(0);
    const [IsLeftDrag, setIsLeftDrag] = useState(false);

    const router = useRouter();

    const DRAG_RANGE = 30;

    const DragEventListener = (event: MouseEvent|TouchEvent|PointerEvent, info: PanInfo) => {
        const offsetX = info.offset.x;
        const MaxIndex = Bookmarks.length - 1;
        
        //왼쪽으로 드래그 => 다음 idx bookmark card render
        if(offsetX < -DRAG_RANGE){
            setIsLeftDrag(true);
            setNowIndex((prev) => {
                if(prev >= MaxIndex){
                    /**
                     * NowIndex가 최댓값(혹은 그 이상)에 도달했을 경우
                     */
                    return 0;
                } else {
                    return prev + 1;
                }
            })
        } else if(offsetX > DRAG_RANGE){
            //오른쪽으로 드래그 => 이전 idx bookmark card render
            setIsLeftDrag(false);
            setNowIndex((prev) => {
                if(prev <= 0){
                    /**
                     * NowIndex의 값이 0 혹은 그 미만 값인 상태에서
                     * 오른쪽 드래그 시, 마지막 번호를 가진
                     * 캐릭터 카드 랜더링 해야함.
                     */
                    return MaxIndex;
                } else {
                    return prev - 1;
                }
            })
        }
    };

    //'메할일 추가' 버튼 Event Listener
    const AddBtnClickEvent = () => {
        const SearchParams = window.prompt("추가하실 캐릭터 명을 입력해주세요.", "");

        if(SearchParams === "" || SearchParams === null){
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

    return (
        <Container>
            <BookmarkListHeader>
                <span key={"header-title"}>캐릭터 목록</span>
                {
                    Bookmarks.length !== 0 ? (
                        <span key={"header-charlist"}>
                            {`( ${NowIndex + 1} / ${Bookmarks.length} )`}
                        </span>
                    ): null
                }
            </BookmarkListHeader>
            <SliderBox>
                {
                    Bookmarks.length === 0 ? (
                        <BookmarkEmptyGuideMessage>
                            <span>{`'메할일 추가' 버튼을 클릭해서`}</span>
                            <span>{`메할일을 추가해주세요.`}</span>
                        </BookmarkEmptyGuideMessage>
                    ) : null 
                }
                <AnimatePresence custom={IsLeftDrag} mode="wait">
                    {
                        Bookmarks.map((data, idx) => {
                            if(idx === NowIndex){
                                return (
                                    <SlideItem 
                                        key={`bookmarkcard_${idx}`}
                                        drag="x"
                                        dragConstraints={{left: -100, right: 100}}
                                        dragElastic={0.2}
                                        onDragEnd={DragEventListener}
                                    >
                                        <M_BookmarkCard 
                                            charname={data.charname}
                                            charlevel={data.charlevel}
                                            charclass={data.charclass}
                                            charimgurl={data.charimgurl}
                                            worldname={data.worldname}
                                            IsLeftDrag={IsLeftDrag}
                                        />
                                    </SlideItem>
                                );
                            } else {
                                return null;
                            }
                        })
                    }
                </AnimatePresence>
            </SliderBox>
            <UtilBtnList>
                <UtilBtnContainer onClick={AddBtnClickEvent}>
                    <div className="utilbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#ffffff" viewBox="0 0 640 640">
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                        </svg>
                    </div>
                    <div className="utilbtn_label">메할일 추가</div>
                </UtilBtnContainer>
                <UtilBtnContainer>
                    <div className="utilbtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#ffffff" width={"25"} height={"25"}>
                            <path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/>
                        </svg>
                    </div>
                    <div className="utilbtn_label">메뉴</div>
                </UtilBtnContainer>
            </UtilBtnList>
        </Container>
    );
};

export default M_BookmarkList