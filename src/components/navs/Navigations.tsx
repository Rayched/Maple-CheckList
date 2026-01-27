"use client"

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Container = styled.div`
    width: 30%;
    height: 100%;
    align-items: center;
`;

const LinkBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const LinkItem = styled.div`
    width: 50%;
    height: 100%;
    position: relative;

    a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        font-weight: bold;
        z-index: 1;
    }
`;

const PathCheck = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    border-radius: 10px;
    background-color: rgb(53, 59, 72);
`;

const OpenBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    svg {
        margin-right: 5px;
    }
`;

const SidebarWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100dvw;
    height: 100dvh;
    top: 0;
    right: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
`;

export default function Navigations(){
    const [IsHide, setHide] = useState(true);
    const [InnerWidth, setInnerWidth] = useState<number>(0);
    const pathName = usePathname();

    useEffect(() => {
        const WidthResized = () => {
            setInnerWidth(window.innerWidth);
        };

        WidthResized();

        window.addEventListener("resize", WidthResized);

        return () => {
            window.removeEventListener("resize", WidthResized);
        }
    }, []);

    return (
        <Container>
            {
                InnerWidth >= 640 ? (
                    <LinkBox>
                        <LinkItem>
                            <Link href={"/chartodos"}>메할일</Link>
                            {pathName === "/chartodos" ? <PathCheck>메할일</PathCheck>: null}
                        </LinkItem>
                        <LinkItem>
                            <Link href={"/incomes"}>주간 수익</Link>
                            {pathName === "/incomes" ? <PathCheck>주간 수익</PathCheck>: null}
                        </LinkItem>
                    </LinkBox>
                ): null
            }
            { 
                InnerWidth <= 640 ? (
                    <OpenBtn onClick={() => setHide(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={40} viewBox="0 0 640 640" fill="#ffffff">
                            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>
                        </svg>
                    </OpenBtn>
                ): null
            }
            <AnimatePresence>
                { 
                    !IsHide ? (
                        <SidebarWrapper>
                            <Sidebar setStateFn={() => setHide((s) => !s)} />
                        </SidebarWrapper>
                    ): null
                }
            </AnimatePresence>
        </Container>
    );
}