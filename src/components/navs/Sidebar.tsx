"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { PathDataTypes } from "./Navigations";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "zustand";
import { BookmarkStore } from "@/stores/BookmarkStore";
import { ClassDatas, WorldDatas } from "@/game_datas/contentsData";
import { useEffect, useState } from "react";

interface SidebarProps {
    pathData: PathDataTypes[];
    setStateFn: () => void;
};

interface I_CharToDoPathItemProps {
    ismatchs: string;
};

const Container = styled(motion.div)`
    width: 50%;
    height: 98%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    background-color: rgb(241, 242, 246);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const CloseBtn = styled.div`
    width: 100%;
    height: 7%;
    border-top-left-radius: inherit;
    background-color: rgb(53, 59, 72);
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
`;

const LinkBox = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 50%;
    margin-top: 10px;
    background-color: rgb(220, 221, 225);
`;

const LinkItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 95%;
    height: 40%;
    margin: 5px 0px;
    color: black;
    font-weight: bold;
    font-size: 17px;
    position: relative;

    .pathNm {
        z-index: 2;
        margin-left: 5px;
    };
`;

const CharToDosURLBox = styled(LinkItem)`
    height: auto;
    flex-direction: column;
    margin-bottom: 10px;

    .pathitem {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: inherit;
        margin: 5px 0px;
    };
`;

const CharToDoPathItem = styled.div<I_CharToDoPathItemProps>`
    width: 90%;
    height: 50%;
    max-height: 30px;
    margin-left: 8px;
    margin-top: 3px;
    padding: 3px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: normal;
    background-color: ${(props) => props.ismatchs === "1" ? "white" : "rgb(220, 221, 225)"};

    img {
        width: 16px;
        height: 16px;
    };

    .chardatabox {
        width: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
            margin: 0px 2px;
        };
    };
`;

const Variants = {
    "init": {
        x: 40,
        opacity: 0
    },
    "animate": {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    "exit": {
        x: 35,
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};

export default function Sidebar({pathData, setStateFn}: SidebarProps){
    const NowPath = usePathname();
    const router = useRouter();
    const {Bookmarks} = useStore(BookmarkStore);
    const [isBmkListClose, setBmkListClose] = useState(false);

    const LinkClicked = (targetURL: string) => {
        if(NowPath === targetURL){
            return;
        } else {
            router.push(targetURL);
            setStateFn();
        }
    };

    useEffect(() => console.log(NowPath), [NowPath]);

    return (
        <Container 
            variants={Variants} 
            initial="init" 
            animate="animate"
            exit={"exit"}
            transition={{type: "tween"}}
        >
            <CloseBtn onClick={setStateFn}>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 640 640" fill="#ffffff">
                    <path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/>
                </svg>
                <div>Close</div>
            </CloseBtn>
            <LinkBox>
                <CharToDosURLBox key={"chartodos_urlbox"}>
                    <div className="pathitem" key={`chartodos`} onClick={() => LinkClicked(pathData[0].pathValue)}>
                        <span className="pathNm">{pathData[0].pathNm}</span>
                        <span className="bmklistbtn" onClick={() => setBmkListClose((prev) => !prev)}>
                           {isBmkListClose ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
                                    <path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                                </svg>
                           ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
                                <path d="M169.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 306.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                            </svg>
                           )}
                        </span>
                    </div>
                    {
                        isBmkListClose && (Bookmarks.map((data, idx) => {
                            const GetWorldId = WorldDatas.find((world) => world.worldNm === data.worldname)?.worldId;
                            const GetClassData = ClassDatas.find((classdata) => classdata.class_fullNm === data.charclass);
                            const PathValue = `/chartodos/${data.charname}`;

                            if(!GetWorldId || !GetClassData) return null;

                            return (
                                <CharToDoPathItem 
                                    key={`chartodo_${idx}`} 
                                    onClick={() => LinkClicked(`/chartodos/${data.charname}`)}
                                    ismatchs={NowPath === PathValue ? "1" : "0"}
                                >
                                    <div className="chardatabox">
                                        <img src={`/imgs/worlds/${GetWorldId}.png`} />
                                        <span className="chardata">
                                            {`${data.charname} / `}
                                            {!GetClassData.class_littleNm ? `${data.charclass}` : `${GetClassData.class_littleNm}`}
                                        </span>
                                    </div>
                                </CharToDoPathItem>
                            );
                        }))
                    }
                </CharToDosURLBox>
                <LinkItem key={`incomes_path`} onClick={() => LinkClicked(pathData[1].pathValue)}>
                    <div className="pathNm">{pathData[1].pathNm}</div>
                    {NowPath === pathData[1].pathValue ? <div className="urlmatchicon">◀</div> : null}
                </LinkItem>
            </LinkBox>
        </Container>
    );
}