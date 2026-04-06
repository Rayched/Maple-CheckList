"use client"

import BookmarkList from "@/components/pages/chartodos/BookmarkList";
import CreateNewCharTodo from "@/components/pages/chartodos/CreateToDoBtn";
import { useEffect, useState } from "react";
import styled from "styled-components";
import M_BookmarkList from "./_bookmarklists/M_BookmarkList";
import P_BookmarkList from "./_bookmarklists/P_BookmarkList";
import { ChartodosPage_ModeStore } from "@/stores/ModeStore";
import { useStore } from "zustand";

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    min-height: 600px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const EditWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    position: fixed;
`;

/**
 * 사용자가 접속한 환경에 따라 각기 다른 형태의
 * 'BookmarkList'를 보여주는 컴포넌트
 * 초기명은 '...Box'였지만
 * 해당 컴포넌트의 역할(접속 환경에 대응되는 bookmarklist render)
 * 고려했을때 'Box'라는 이름보단 'layout'이라는 이름이 더 직관적인 느낌이
 * 들었기에 컴포넌트 명을 'CharToDosBookmarkList_layout'으로 선정하였음
 * 
 * 2026.04.06 16:40 기준 작업 완료
 * - 공용 style code 분리는 고려하지 않은 작업이므로
 * - 모바일 버전 BookmarkList 작업 시, 공용 style code 분리 작업
 *   동시에 진행할 것
 */

function CharToDosBookmarkList_layout(){
    const [V_Width, setV_Width] = useState<number>(window.innerWidth);
    const {EditTarget, setEditTarget} = useStore(ChartodosPage_ModeStore);

    useEffect(() => {
        const ResizeEventListener = () => {
            setV_Width(window.innerWidth);
        };
        window.addEventListener("resize", ResizeEventListener);
    }, [V_Width]);

    useEffect(() => {
        console.log(V_Width);
    }, [V_Width]);

    return (
        <Wrapper>
            {
                V_Width <= 640 ? (
                    <M_BookmarkList />
                ) : null
            }
            {
                V_Width > 640 ? (
                    <P_BookmarkList />
                ) : null
            }
            {
                EditTarget !== "" ? <EditWrapper onClick={() => setEditTarget("")}></EditWrapper> : null
            }
        </Wrapper>
    );
};

export default CharToDosBookmarkList_layout;